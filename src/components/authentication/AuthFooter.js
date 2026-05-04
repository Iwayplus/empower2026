import React, { useState, useEffect } from 'react';

const AuthFooter = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer
      style={{
        backgroundColor: '#f9fafb',
        width: '100%',
        padding: isMobile ? '10px 20px' : '15px 70px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: isMobile ? '12px' : '14px',
        color: '#6B7280',
        boxSizing: 'border-box',
      }}
    >
    <p style={{ margin: 0, lineHeight: 1.5 }}>
  © 2026 Empower Conference. All rights reserved. Developed by{' '}
<a
  href="https://www.iwayplus.com/"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'inline-block',
    textDecoration: 'none',
    color: '#6B7280',
    transition: 'all 0.3s ease-in-out',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.opacity = '0.85';
    e.currentTarget.style.transform = 'scale(1.1)';
    e.currentTarget.style.color = '#374151'; // darker gray
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.color = '#6B7280'; // original gray
  }}
>
  Iwayplus
</a>

</p>

    </footer>
  );
};

export default AuthFooter;
