import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../redux/userSlice';
import axiosInstance from '../../services/axiosInstance';
import { getProfile } from '../../services/api';
import './Feedback.css';

const ratingFields = [
  ['overallExperience', 'Overall conference experience'],
  ['themesAndSessions', 'Themes and sessions'],
  ['inclusiveAndWelcoming', 'Inclusive and welcoming environment'],
  ['accessibility', 'Accessibility'],
  ['qualityAndRelevance', 'Quality and relevance'],
  ['overallLogistics', 'Event logistics'],
  ['overallAppExperiece', 'App experience'],
];
const roles = ['Delegate', 'Speaker', 'Exhibitor', 'Volunteer', 'Other'];

const roleFromProfile = (user) => {
  return [user?.participationType, user?.registrationType]
    .map((saved) => roles.find((role) => role.toLowerCase() === saved?.toLowerCase()))
    .find(Boolean) || '';
};

export default function Feedback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');
  const [form, setForm] = useState({ yourRole: '', overallExperience: '', mostValuablePart: '', attendNextYear: '', improvementForNextYear: '' });

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/auth/signin?returnTo=/download-certificate', { replace: true });
      return;
    }
    getProfile().then((response) => {
      if (response?.status === 200) {
        setProfileData(response.data.data);
        setForm((current) => ({ ...current, yourRole: current.yourRole || roleFromProfile(response.data.data) }));
      }
      else setError('Could not load your profile. Please sign in again.');
    }).finally(() => setLoading(false));
  }, [navigate]);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await axiosInstance.post('/api/empower/submit-feedback', form);
      const response = await getProfile();
      if (response?.status === 200) {
        setProfileData(response.data.data);
        dispatch(setProfile(response.data.data));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Feedback could not be submitted. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const download = async () => {
    setBusy(true);
    setError('');
    const certificateTab = window.open('', '_blank');
    try {
      const response = await axiosInstance.get('/api/empower/download-certificate');
      const url = response.data?.data?.url;
      if (!url) throw new Error('Certificate URL is missing');
      setCertificateUrl(url);
      if (certificateTab) {
        certificateTab.opener = null;
        certificateTab.location.href = url;
      }
    } catch (err) {
      if (certificateTab) certificateTab.close();
      setError(err.response?.data?.message || err.message || 'Could not download your certificate.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <main className="feedback-page"><p>Loading your feedback page…</p></main>;
  if (!profile) return <main className="feedback-page"><p role="alert">{error}</p></main>;

  const submitted = Boolean(profile.feedback?.submittedAt);
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ');
  const profileDetails = [
    ['Name', fullName],
    ['Email or mobile', profile.email || profile.secondaryMail || profile.mobile || profile.secondaryMobile],
    ['Affiliation', profile.affiliation],
    ['Registration', profile.registrationCategory],
  ].filter(([, value]) => value);
  return <main className="feedback-page">
    <header className="feedback-hero">
      <span className="feedback-eyebrow">EMPOWER 2026 · YOUR EXPERIENCE</span>
      <h1>{submitted ? 'Your certificate is ready' : 'Share your experience'}</h1>
      <p>{submitted ? 'Thank you for helping us improve Empower. Your certificate is saved and available whenever you need it.' : 'A few minutes of feedback will help shape next year’s conference. Submit your responses to unlock your participation certificate.'}</p>
      <div className="feedback-steps"><span className="active"><b>1</b> Share feedback</span><span className={submitted ? 'active' : ''}><b>2</b> Download certificate</span></div>
    </header>
    <section className="feedback-card feedback-profile" aria-labelledby="feedback-profile-heading">
      <div className="feedback-card-heading"><div><h2 id="feedback-profile-heading">Your registration</h2><p>These details are already saved in your Empower profile.</p></div></div>
      <dl className="feedback-profile-grid">{profileDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </section>
    {error && <p className="feedback-error" role="alert">{error}</p>}
    {!profile.paymentStatus ? <section className="feedback-card"><h2>Complete your registration</h2><p>Feedback and certificates are available after registration is complete.</p><button type="button" onClick={() => navigate('/auth/register')}>Go to registration →</button></section> : submitted ? <section className="feedback-card feedback-complete">
      <div className="feedback-success-icon" aria-hidden="true">✓</div>
      <h2>Thank you for your feedback</h2>
      <p>Your certificate is ready. You can return here to download it again.</p>
      <button type="button" disabled={busy} onClick={download}>{busy ? 'Preparing certificate…' : 'Download certificate ↗'}</button>
      {certificateUrl && <p><a href={certificateUrl} target="_blank" rel="noopener noreferrer">Open certificate again</a></p>}
    </section> : <form onSubmit={submit}>
      <section className="feedback-card">
        <div className="feedback-card-heading"><span className="feedback-icon" aria-hidden="true">01</span><div><h2>Your experience</h2><p>Rate each part of the conference from 1 to 5.</p></div></div>
        <label className="feedback-field">Your role at Empower 2026 <span aria-hidden="true">*</span>
          <select name="yourRole" value={form.yourRole} onChange={update} required><option value="">Select your role</option>{roles.map((role) => <option key={role}>{role}</option>)}</select>
          {form.yourRole && form.yourRole === roleFromProfile(profile) && <small>Filled from your profile. You can change it.</small>}
        </label>
        <div className="feedback-ratings">{ratingFields.map(([name, label]) => <fieldset className="feedback-rating" key={name}>
          <legend>{label}{name === 'overallExperience' && <span aria-hidden="true"> *</span>}</legend>
          <div className="feedback-rating-options">{[1, 2, 3, 4, 5].map((value) => <label key={value} className={Number(form[name]) >= value ? 'selected' : ''}>
            <input type="radio" name={name} value={value} checked={Number(form[name]) === value} onChange={update} required={name === 'overallExperience'} aria-label={`${value} out of 5`} />
            <span aria-hidden="true">★</span>
          </label>)}<small>{form[name] ? `${form[name]} / 5` : 'Choose a rating'}</small></div>
        </fieldset>)}</div>
      </section>
      <section className="feedback-card">
        <div className="feedback-card-heading"><span className="feedback-icon" aria-hidden="true">02</span><div><h2>Your thoughts</h2><p>Tell us what stood out and what we can improve.</p></div></div>
        <label className="feedback-field">What was the most valuable part? <span aria-hidden="true">*</span><textarea name="mostValuablePart" value={form.mostValuablePart} onChange={update} required rows="4" placeholder="Share a session, connection, or moment that mattered to you…" /></label>
        <label className="feedback-field">Would you attend next year?<select name="attendNextYear" value={form.attendNextYear} onChange={update}><option value="">Select an answer</option><option>Yes</option><option>No</option><option>Maybe</option></select></label>
        <label className="feedback-field">What should we improve next year?<textarea name="improvementForNextYear" value={form.improvementForNextYear} onChange={update} rows="4" placeholder="Your suggestions are welcome…" /></label>
      </section>
      <div className="feedback-submit"><span><strong>Ready to finish?</strong><br />Your certificate becomes available after submission.</span><button type="submit" disabled={busy}>{busy ? 'Submitting…' : 'Submit feedback & continue →'}</button></div>
    </form>}
  </main>;
}
