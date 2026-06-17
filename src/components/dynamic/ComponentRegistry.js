import React from 'react';

const baseCardStyle = {
  borderRadius: 12,
  background: '#fff',
  border: '1px solid #e5e7eb',
  padding: 20,
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
};

const FallbackRenderer = ({ section }) => (
  <section style={{ ...baseCardStyle, margin: '24px 70px 0 70px' }}>
    <h3 style={{ margin: 0, color: '#111827', fontSize: 22 }}>{section?.content?.title || 'Dynamic Section'}</h3>
    <p style={{ marginTop: 8, color: '#4b5563', lineHeight: 1.6 }}>
      {section?.content?.description || 'This section is available from the CMS and is ready to be rendered.'}
    </p>
  </section>
);

const HeroRenderer = ({ section }) => (
  <section style={{ ...baseCardStyle, margin: '24px 70px 0 70px', background: 'linear-gradient(135deg, #041A32 0%, #0f172a 100%)', color: '#fff' }}>
    <h2 style={{ margin: 0, fontSize: 30, lineHeight: 1.2 }}>{section?.content?.title || section?.content?.heading || 'Featured Section'}</h2>
    <p style={{ marginTop: 10, color: '#e5eefb', lineHeight: 1.6 }}>{section?.content?.description || section?.content?.body || ''}</p>
  </section>
);

const AboutRenderer = ({ section }) => (
  <section style={{ ...baseCardStyle, margin: '24px 70px 0 70px' }}>
    <h3 style={{ margin: 0, color: '#111827', fontSize: 22 }}>{section?.content?.heading || section?.content?.title || 'About this section'}</h3>
    <p style={{ marginTop: 10, color: '#4b5563', lineHeight: 1.6 }}>{section?.content?.description || section?.content?.body || ''}</p>
    {section?.content?.image && (
      <img src={section.content.image} alt={section?.content?.heading || 'Dynamic section'} style={{ width: '100%', marginTop: 12, borderRadius: 10, objectFit: 'cover' }} />
    )}
  </section>
);

const InfoRenderer = ({ section }) => (
  <section style={{ ...baseCardStyle, margin: '24px 70px 0 70px' }}>
    <h3 style={{ margin: 0, color: '#111827', fontSize: 22 }}>{section?.content?.info_title || section?.content?.title || 'Information'}</h3>
    <div style={{ marginTop: 10, color: '#4b5563', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
      {section?.content?.info_body || section?.content?.description || ''}
    </div>
  </section>
);

const FaqRenderer = ({ section }) => (
  <section style={{ ...baseCardStyle, margin: '24px 70px 0 70px' }}>
    <h3 style={{ margin: 0, color: '#111827', fontSize: 22 }}>{section?.content?.title || 'FAQs'}</h3>
    <ul style={{ marginTop: 12, paddingLeft: 18, color: '#374151', lineHeight: 1.6 }}>
      {(section?.content?.items || []).map((item, index) => (
        <li key={index} style={{ marginBottom: 8 }}>{typeof item === 'string' ? item : item?.question || item?.title || ''}</li>
      ))}
    </ul>
  </section>
);

export const SectionComponents = {
  hero: HeroRenderer,
  cover: HeroRenderer,
  about: AboutRenderer,
  info: InfoRenderer,
  faqs: FaqRenderer,
  gallery: FallbackRenderer,
  highlights: FallbackRenderer,
  footer: FallbackRenderer,
  fallback: FallbackRenderer,
};
