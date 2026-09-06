import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import headerIcon from '../../assets/data.webp';
import { Button, styled } from '@mui/material';
import { logout } from '../../services/api';
import { useSelector } from 'react-redux';

// 🔧 Constant style for header container
const authHeaderStyle = (isMobile, userData) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: isMobile && !userData ? 'center' : 'space-between',
  alignItems: 'center',
  margin: '0 auto',
  flexWrap: 'wrap',
  gap: '10px',
  paddingLeft: isMobile ? '20px' : '70px',
  paddingRight: isMobile ? '20px' : '70px',
});

const ButtonRegister = styled('button')(({ theme }) => ({
  padding: '8px 16px',
  textAlign: 'center',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: "22px",
  borderRadius: 4,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: "Poppins",
  background: '#2180E4',
  color: '#fff',
  border: 'none',
  '&:hover': {
    background: "#4996E9"
  },
  [theme.breakpoints.down("md")]: {
    padding: "8px 10px",
    fontSize: '1em',
    borderRadius: 3,
  }
}))

const AuthHeader = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const userData = useSelector(store => store.userSlice.profile);
  const exhibitorData = useSelector(store => store.userSlice.exhibitorProfile)
  const [searchParams, setSearchParams] = useSearchParams()

  const handleLogout = async () => {
    let type = userData ? "user" : "exhibitor"
    await logout(type);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  useEffect(() => {
    let accessToken = searchParams.get("access_token")
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken)

      navigate("/auth/register")
    }
    else {
      if(window.location.href.includes("/auth/signin") || window.location.href.includes("/auth/exhibitor/signin")) {
        localStorage.clear()
      }
    }

  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#041A32',
        borderBottom: '1px solid #D1D5DB',
        boxSizing: 'border-box',
        padding: '10px 0',
        width: '100%',
      }}
    >
      <div style={authHeaderStyle(isMobile, userData)}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, opacity 0.2s ease',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <img
            src={headerIcon}
            alt="Empower logo"
            style={{ height: '40px', maxWidth: '100%' }}
          />
        </Link>

        {
          !window.location.href.includes("/auth/organization-registrations") &&
           !(userData || exhibitorData) &&
          <>
            {window.location.href.includes("/auth/exhibitor/signin") ?
              <ButtonRegister
                title="register as individual"
                onClick={() => navigate("/auth/signin")}
              >
                Register as Individual
              </ButtonRegister>
              :
              <ButtonRegister
                title="Logout"
                onClick={() => navigate("/auth/exhibitor/signin")}
              >
                Register as Exhibitor
              </ButtonRegister>}
          </>
        }

        {(userData || exhibitorData) && (
          <Button
            style={{
              background: '#CD191F',
              color: '#fff',
              fontWeight: 700,
            }}
            title="Logout"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default AuthHeader;
