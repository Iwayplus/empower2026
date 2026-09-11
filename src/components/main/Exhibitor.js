import React, { useEffect, useState } from "react";
import { styled, Box } from "@mui/system";
import { Card, Typography, CircularProgress, Button } from "@mui/material";
import { baseUrl, projectId } from "../../services/api";

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
  maxWidth: 240,
  borderRadius: 14,
  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "12px 10px 10px 10px",
  background: "#fff",
  position: "relative",
  overflow: "hidden",

  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
  },
});

const ExhibitorName = styled(Typography)({
  fontSize: 15,
  fontWeight: 700,
  fontFamily: "Poppins",
  color: "#1C1C1C",
  textAlign: "center",
  lineHeight: "20px",
  display: "-webkit-box",
  overflow: "hidden",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  marginBottom: 0,
});

const Logo = styled("img")({
  width: 130,
  height: 80,
  borderRadius: 6,
  objectFit: "contain",
  marginBottom: 10,
  background: "#fff",
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
          `${baseUrl}/api/empower/fetch-paid-exhibitors?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to fetch exhibitors");

        const data = await response.json();
        const exhibitorsArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.exhibitors)
          ? data.exhibitors
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              color: "#000",
              lineHeight: 1.2,
              fontFamily: "Poppins",
              margin: 0,
            }}
          >
            Exhibitors
          </Typography>

          {/* Accessible See All Button */}
          <Box
            component="button"
            aria-label="View detailed exhibitors"
            onClick={() => {
              window.location.href = window.location.origin + "/exhibit";
            }}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              background: "transparent",
              border: "1.5px solid #FFB300",
              borderRadius: "20px",
              px: 2,
              py: 0.5,
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#000",
              lineHeight: 1,
              m: 0,
              outline: "none",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#FFB300",
                color: "#000",
                transform: "translateY(-1px)",
                boxShadow: "0 2px 6px rgba(255, 179, 0, 0.3)",
              },
            }}
          >
            See All
          </Box>
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
                  src={exhibitor.brandingDetails?.companyLogo ? (exhibitor.brandingDetails.companyLogo.startsWith('http') ? exhibitor.brandingDetails.companyLogo : `${baseUrl}/uploads/${encodeURIComponent(exhibitor.brandingDetails.companyLogo)}`) : ""}
                  alt=""
                  aria-hidden="true"
                />
                <ExhibitorName>{companyName}</ExhibitorName>
              </ExhibitorCard>
            );
          })}
        </div>
      )}
    </Component>
  );
};

export default Exhibitors;
