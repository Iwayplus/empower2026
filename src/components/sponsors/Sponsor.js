// Sponsor.js
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";
import { Card, Typography, CircularProgress, Box } from "@mui/material";
import { motion } from "framer-motion";

import redirect from '../../assets/redirect.svg'

import bullet from '../../assets/bullet.svg';
import checkGreen from '../../assets/checkGreen.svg';
import { sponsorshipPlans, rowLabels, sponsorshipBenefits } from "./data";
import emailIcon from "../../assets/mail.svg";       // your email icon
import websiteIcon from "../../assets/po.jpg";   // your website icon
import linkedInIcon from "../../assets/link.png"; // your LinkedIn icon
import { baseUrl, projectId } from "../../services/api";
const Component = styled('div')({});

const Cont1 = styled('div')(({ theme }) => ({
  fontFamily: 'Poppins',
  textAlign: 'left',
  //   overflow:'hidden',
  margin: "56px 70px",
  [theme.breakpoints.down("sm")]: { margin: "56px 8px" },
  '&>h1': { fontSize: 32, fontWeight: 600, lineHeight: '130%', color: '#000', margin: 0 },
  '&>p': { color: '#494949', fontSize: 20, fontWeight: 400, lineHeight: '150%', margin: "16px 0 0 0" },
}));

const Benifits = styled("div")(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginTop: 40,
  '&>div': {
    width: '47%',
    borderTop: '1px solid #D1D5DB',
    padding: "16px 0",
    [theme.breakpoints.down("sm")]: { width: '100%' }
  },
  [theme.breakpoints.down("sm")]: { flexDirection: 'column' }
}));

const Benifit = styled("div")({
  '&>div': { display: 'flex', alignItems: 'flex-start', gap: 16, marginTop: 8, '&>p': { margin: 0, minHeight: 48 } }
});

const BenifitTitleBx = styled("div")({
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  '&>h3': { margin: 0, fontSize: 20, fontWeight: 600, lineHeight: '120%' }
});

const TableBx = styled('div')(({ theme }) => ({
  overflowX: 'auto',
  width: '100%',
  '& > h3': { color: '#CD7F00', fontFamily: 'Poppins', fontSize: 24, fontWeight: 600, lineHeight: '120%', margin: 0 },
  '& > table': {
    minWidth: 600,
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 16,
    '& th, & td': { border: '1px solid #D1D5DB', padding: '8px 17px', fontFamily: 'Poppins', textAlign: 'left' },
    '& thead th': { background: '#E5E5E5', fontSize: 20, fontWeight: 600, lineHeight: '120%', height: 40 },
    '& tbody td': { fontSize: 16, fontWeight: 400, lineHeight: '150%', height: 40 },
  },
  [theme.breakpoints.down('sm')]: {
    '& > table': { minWidth: '100%', '& thead th': { fontSize: 16, padding: '6px 12px' }, '& tbody td': { fontSize: 14, padding: '6px 10px' } },
    '& > h3': { fontSize: 20 },
  },
}));

// Sponsors Card
const tierGradients = {
  Platinum: 'linear-gradient(90deg, #E5E5E5, #B0B0B0)',
  Gold: 'linear-gradient(90deg, #FFD700, #FFC700)',
  Silver: 'linear-gradient(90deg, #C0C0C0, #AFAFAF)',
  Bronze: 'linear-gradient(90deg, #CD7F32, #B66C2F)',
};

const tierEmoji = {
  Platinum: '💎',
  Gold: '🏆',
  Silver: '🥈',
  Bronze: '🥉',
};

const SponsorCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 240,
  borderRadius: 16,
  boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px 16px 20px 16px',
  background: '#fff',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90%',  // adapt to small screens
    padding: '16px 12px 16px 12px', // reduce padding
  },
}));

const Logo = styled("img")({
  width: 140,
  height: 90,
  borderRadius: 6,
  objectFit: 'contain',
  marginBottom: 12,
  border: '1px solid #eee',
  background: '#fff',
});

const TierBadge = styled(Box)(({ tier }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  color: '#1E88E5',
  fontSize: 14,
  fontWeight: 700,
  fontFamily: 'Poppins',
  padding: '6px 12px',
  borderRadius: 20,
  marginBottom: 12,
  //   background: tierGradients[tier] || '#eee',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
}));

const SponsorName = styled(Typography)({
  fontSize: 15,
  fontWeight: 700,
  fontFamily: 'Poppins',
  color: '#1C1C1C',
  textAlign: 'center',
  lineHeight: '20px',
  minHeight: 48,
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
});

const OpenFormBtn = styled('a')({
    padding: "10px 16px",
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    color: "#000",
    marginTop: 8,
    background: '#fff',
    width: "fit-content"

});

const Sponsor = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dynamicSection, setDynamicSection] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await fetch(`${baseUrl}/secured/event/all-sponsors/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`);
        const data = await res.json();
        setSponsors(Array.isArray(data?.sponsors) ? data.sponsors : []);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    };

    const fetchDynamicSection = async () => {
      try {
        const res = await fetch(`${baseUrl}/secured/cms/sponsor-content/all/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`);
        const data = await res.json();
        if (data.status && Array.isArray(data.data) && data.data.length > 0) {
          const published = data.data.find(sec => sec.status === "Published") || data.data[0];
          setDynamicSection(published);
        }
      } catch (err) {
        console.error("Error fetching dynamic sponsor content:", err);
      }
    };

    fetchSponsors();
    fetchDynamicSection();
  }, []);

  return (
    <Component>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Cont1>
          {/* <h2 style={{
            fontSize: 36, fontWeight: 600, margin: '40px 0 32px 10px',
          }}>Our Sponsors</h2> */}
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
              <CircularProgress />
            </div>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 16,

                marginTop: 24,
                justifyContent: "center",
              }}
            >
              {sponsors.map((sponsor) => (
                <SponsorCard
                  key={sponsor._id}
                  style={{
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between", // ✅ ensures consistent height
                  }}
                  onClick={() => {
                    sponsor.website &&
                      window.open(
                        sponsor.website.startsWith("http")
                          ? sponsor.website
                          : `https://${sponsor.website}`,
                        "_blank"
                      );
                  }}
                >
                  <Logo
                    src={
                      sponsor.logo_url.startsWith("http")
                        ? sponsor.logo_url
                        : `${baseUrl}/uploads/${sponsor.logo_url}` // 👈 Adjust "/uploads/" to match your backend's static folder path
                    }
                    alt={sponsor.name}
                  />

                  {sponsor.sponsorship_tier && (
                    <TierBadge tier={sponsor.sponsorship_tier}>
                      {sponsor.sponsorship_tier} {/* ✅ removed emoji */}
                    </TierBadge>
                  )}

                  <SponsorName>{sponsor.name}</SponsorName>

                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      marginTop: "auto",
                      justifyContent: "center",
                      alignItems: "center", // ✅ ensures vertical alignment
                    }}
                  >
                    {sponsor.email && (
                      <img
                        src={emailIcon}
                        alt="Email"
                        style={{ width: 28, height: 28, cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${sponsor.email}`;
                        }}
                      />
                    )}
                    {sponsor.website && (
                      <img
                        src={websiteIcon}
                        alt="Website"
                        style={{ width: 38, height: 38, cursor: "pointer" }} // ✅ same size
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = sponsor.website.startsWith("http")
                            ? sponsor.website
                            : `https://${sponsor.website}`;
                          window.open(url, "_blank");
                        }}
                      />
                    )}
                    {sponsor.social_media_links?.linkedin && (
                      <img
                        src={linkedInIcon}
                        alt="LinkedIn"
                        style={{ width: 26, height: 26, cursor: "pointer" }} // ✅ same size
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(sponsor.social_media_links.linkedin, "_blank");
                        }}
                      />
                    )}
                  </div>

                </SponsorCard>
              ))}
            </div>
          )}
        </Cont1>
      </motion.div>


      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <Cont1>
          <h1>{dynamicSection?.content?.title || "Partner With India’s Largest Assistive Technology Innovation Ecosystem"}</h1>
          <p>{dynamicSection?.content?.description || `${process.env.REACT_APP_APP_NAME} invites forward‑thinking organizations to join a national movement that brings breakthrough products, innovations, research, and community‑driven programs under one roof. Building on the remarkable success of ${process.env.REACT_APP_APP_NAME}, this year’s edition expands its reach, depth, and impact.`}</p>
        </Cont1>
        {!dynamicSection?.content?.benefits && (
          <Cont1 style={{ marginTop: 60 }}>
            <h3>As India’s premier platform for assistive technology, EMPOWER brings together:</h3>

            <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 1.6 }}>
              <li>Innovators and product creators showcasing next-generation AT solutions</li>
              <li>Researchers presenting state-of-the-art work from leading institutions</li>
              <li>Practitioners and NGOs sharing scalable community empowerment models</li>
              <li>Industry leaders and startups demonstrating accessible technologies</li>
              <li>Government bodies and policymakers shaping national AT priorities</li>
              <li>Users and lived-experience experts guiding design and evaluation</li>
            </ul>

            <p style={{ marginTop: 20, lineHeight: 1.7 }}>
              Your sponsorship directly strengthens India’s inclusive technology ecosystem and accelerates
              solutions that expand independence, opportunity, and dignity for persons with disabilities.
            </p>
          </Cont1>
        )}
        <Cont1>
          <Benifits>
            {(dynamicSection?.content?.benefits || sponsorshipBenefits)?.map((elm, inx, arr) => (
              <div key={inx} style={{ borderBottom: inx > arr.length - 3 ? "1px solid #D1D5DB" : "unset" }}>
                <BenifitTitleBx>
                  <img alt="" src={elm?.logo} />
                  <h3>{elm?.title}</h3>
                </BenifitTitleBx>
                <Benifit>
                  {elm?.benefits?.map((benefit, idx) => (
                    <div key={idx}>
                      <img src={bullet} alt="" />
                      <p>{benefit}</p>
                    </div>
                  ))}
                </Benifit>
              </div>
            ))}
          </Benifits>
        </Cont1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <Cont1>
          <TableBx>
            <table>
              <thead>
                <tr>
                  <th>Sponsorship Categories</th>
                  {(dynamicSection?.content?.plans || sponsorshipPlans).map(plan => <th key={plan.category} style={{ textAlign: 'center' }}>{plan.category}</th>)}
                </tr>
              </thead>
              <tbody>
                {rowLabels.map(row => (
                  <tr key={row.key}>
                    <td>{row.label}</td>
                    {(dynamicSection?.content?.plans || sponsorshipPlans).map(plan => (
                      <td key={plan.category + row.key} style={{ textAlign: 'center', fontWeight: row?.key === "amount" ? 600 : 400, fontSize: row?.key === "amount" ? 20 : 16 }}>
                        {row.isCurrency ? <>₹{(plan[row.key] || 0).toLocaleString()}</> : row.isYesNo ? plan[row.key] ? <img src={checkGreen} alt="" /> : "-" : plan[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </TableBx>
        </Cont1>
      </motion.div>


      <Cont1 style={{ marginTop: 60 }}>
        <h3>Who Attends EMPOWER?</h3>
        <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 1.6 }}>
          <li>Researchers from IITs, NITs, IIITs, and global universities</li>
          <li>Startups, AT companies, and technology innovators</li>
          <li>Government bodies: MSJE, DST, MeitY, AICTE, and state departments</li>
          <li>NGOs, DPOs, rehabilitation centers, and community organizations</li>
          <li>Occupational therapists, special educators, and clinicians</li>
          <li>Students, early-stage innovators, and design challenge participants</li>
          <li>International collaborators and development agencies</li>
        </ul>

        <h3 style={{ marginTop: 30 }}>What’s New in {process.env.REACT_APP_APP_NAME}?</h3>
        <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 1.6 }}>
          <li>Expanded exhibition hall with dedicated user-testing zones</li>
          <li>New practitioner track for community programs and field innovations</li>
          <li>Policy roundtable with national and state-level bodies</li>
          <li>Larger Student Innovation Challenge with deployment pathways</li>
          <li>International speakers and cross-border collaborations</li>
        </ul>
      </Cont1>

      <Cont1
    style={{
        background: "#A83D1B",
        padding: "24px",
        marginTop: 60
    }}
>
    <h3
        style={{
            fontSize: 20,
            color: "#eff1f3",
            margin: 0
        }}
    >
        Partner With Us
    </h3>

    <p
        style={{
            fontSize: 16,
            color: "#eff1f3",
            margin: "10px 0 0 0",
            lineHeight: 1.5
        }}
    >
        Join us in shaping India’s most influential platform for assistive
        technology innovation. Your partnership accelerates solutions that
        empower millions. Please do reach out to us at{" "}
        <a
            style={{ color: "#EFF1F3" }}
            href="mailto:info@empowerconference.in"
        >
            info@empowerconference.in
        </a>{" "}
        with the “Sponsorship” keyword at the beginning of the subject line.
    </p>

    <OpenFormBtn
        target="_blank"
        href="https://forms.gle/kCbGRLb3z7ecTCCQ6"
    >
        Sponsorship Interest Form
        <img src={redirect} alt="" />
    </OpenFormBtn>
</Cont1>
    </Component>
  )
}

export default Sponsor;
