// Sponsor.js
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Card, Typography, CircularProgress, Box } from "@mui/material";
import { baseUrl } from "../../services/api";

const Component = styled("section")(({ theme }) => ({
  margin: "40px 67px 0 67px",
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    margin: "20px 16px",
  },
  "&>h4": {
    color: "#1C1C1C",
    fontFamily: "Poppins",
    fontSize: 36,
    fontWeight: 600,
    marginBottom: 24,
    lineHeight: "120%",
    [theme.breakpoints.down("md")]: {
      fontSize: 32,
    },
  },
}));

const SponsorCard = styled(Card)({
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

const SponsorName = styled(Typography)({
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
  // border: "1px solid #eee",
  background: "#fff",
});

const TierBadge = styled(Box)(({ tier }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  fontSize: 14,
  fontWeight: 700,
  fontFamily: "Poppins",
  color: "#1E88E5",
  padding: "6px 12px",
  borderRadius: 24,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  marginBottom: 12,
  textTransform: "uppercase",
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 24,
}));

const Sponsor = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/secured/event/all-sponsors/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to fetch sponsors");

        const data = await response.json();
        const sponsorsArray = Array.isArray(data?.sponsors)
          ? data.sponsors
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setSponsors(sponsorsArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
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
        <h4>Sponsors</h4>
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
            Sponsors
          </Typography>

          {/* Accessible Button */}
          <button
            aria-label="View sponsor details"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              window.location.href = window.location.origin + "/sponsor";
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
          </button>
        </Box>
      </Header>

      {sponsors.length === 0 ? (
        <p>No sponsors found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            marginTop: 32,
            justifyItems: "center",
            width: "100%",
          }}
        >
          {sponsors.map((sponsor) => {
            const handleClick = () => {
              const website = sponsor.website;
              if (website) {
                const url = website.startsWith("http")
                  ? website
                  : `https://${website}`;
                window.open(url, "_blank");
              }
            };

            const handleKeyPress = (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            };

            // Build accessible label (name + tier)
            const ariaLabel = sponsor.sponsorship_tier
              ? `${sponsor.name}, ${sponsor.sponsorship_tier} sponsor`
              : `Sponsor: ${sponsor.name}`;

            return (
              <SponsorCard
                key={sponsor._id}
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyDown={handleKeyPress}
                aria-label={ariaLabel}
              >
                {/* Logo is decorative */}
                <Logo
                  src={sponsor.logo_url ? (sponsor.logo_url.startsWith('http') ? sponsor.logo_url : `${baseUrl}/uploads/${encodeURIComponent(sponsor.logo_url)}`) : ""}
                  alt=""
                  aria-hidden="true"
                />

                <SponsorName>{sponsor.name}</SponsorName>

                {sponsor.sponsorship_tier && (
                  <TierBadge tier={sponsor.sponsorship_tier}>
                    {sponsor.sponsorship_tier}
                  </TierBadge>
                )}
              </SponsorCard>
            );
          })}
        </div>
      )}
    </Component>
  );
};

export default Sponsor;
