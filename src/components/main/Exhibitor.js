import React, { useEffect, useState } from "react";
import { styled, Box } from "@mui/system";
import { Card, Typography, CircularProgress, Button } from "@mui/material";


const Component = styled("section")(({ theme }) => ({
  margin: "40px 67px 0 67px",
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    margin: "20px 16px",
  },
  "&>h2": {
    color: "var(--Color-Heading, #1C1C1C)",
    fontFamily: "Poppins",
    fontSize: 34,
    fontWeight: 600,
    margin: 0,
    lineHeight: "120%",
    [theme.breakpoints.down("md")]: {
      fontSize: 28,
    },
  },
}));

const ExhibitorCard = styled(Card)({
  width: "100%",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  transition: "all 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px",
  background: "#fff",
});

const Logo = styled("img")({
  width: 90,
  height: 60,
  borderRadius: "6px",
  objectFit: "contain",
  marginBottom: "8px",
  // border: "1px solid #eee",
  background: "#fff",
});

const CompanyName = styled(Typography)({
  fontSize: "12px",
  fontWeight: 600,
  fontFamily: "Poppins",
  color: "#333",
  textAlign: "center",
  lineHeight: "16px",
  minHeight: "32px", // reserve ~2 lines
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 24,
  "& button": {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    background: "#fff",
    fontFamily: "Poppins, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "#f3f4f6",
      transform: "translateY(-2px)",
    },
  },
}));

const Exhibitors = () => {
  const [exhibitors, setExhibitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const response = await fetch(
          `https://maps.iwayplus.in/api/empower/fetch-paid-exhibitors?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to fetch exhibitors");

        const data = await response.json();
        const exhibitorsArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setExhibitors(exhibitorsArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitors();
  }, []);

  if (loading) {
    return (
      <Component>
        <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
          <CircularProgress />
        </div>
      </Component>
    );
  }

  if (error) {
    return (
      <Component>
        <h2>Exhibitors</h2>
        <p style={{ color: "red" }}>Error: {error}</p>
      </Component>
    );
  }

  return (
    <Component>
      <Header>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              color: "#000",
              lineHeight: "130%",
              fontFamily: "Poppins",
              margin: 0,
            }}
          >
            Exhibitors
          </Typography>

          {/* Accessible Button */}
       <Button
  aria-label="View detailed exhibitors"
  onClick={() => {
    const isLocal = window.location.hostname === "localhost";
    const targetUrl = isLocal
      ? "http://localhost:3000/exhibit"
      : "https://empowerconference.in/exhibit";
    window.location.href = targetUrl;
  }}
  sx={{
    minWidth: "auto",
    p: 1,
    border: "none !important",   // ⬅️ force override
    borderRadius: "6px",
    background: "#fff",
    "&:hover": {
      background: "#f3f4f6",
      transform: "translateY(-2px)",
    },
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFB300"
    strokeWidth="4.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="19" x2="19" y2="5" />
    <polyline points="7 5 19 5 19 17" />
  </svg>
</Button>

        </Box>
      </Header>

      {exhibitors.length === 0 ? (
        <p>No exhibitors found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "26px",
            marginTop: "24px",
          }}
        >
          {exhibitors.map((exhibitor) => {
            const companyName = exhibitor.organizationDetails?.organizationName || "Unknown";

            const handleClick = () => {
              const website = exhibitor.organizationDetails?.website;
              if (website) {
                const url = website.startsWith("http") ? website : `https://${website}`;
                window.open(url, "_blank");
              }
            };

            return (
              <ExhibitorCard
                key={exhibitor._id}
                onClick={handleClick}
                role="button"
                tabIndex={0}
                aria-label={`${companyName} exhibitor`}
              >
                {/* Decorative Logo */}
                <Logo
                  src={exhibitor.brandingDetails?.companyLogo}
                  alt=""
                  aria-hidden="true"
                />
                <CompanyName>{companyName}</CompanyName>
              </ExhibitorCard>
            );
          })}
        </div>
      )}
    </Component>
  );
};

export default Exhibitors;
