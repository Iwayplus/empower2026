// Partner.js
import React, { useEffect, useState } from "react";
import { styled, keyframes } from "@mui/system";
import { Card, Typography, CircularProgress, Box } from "@mui/material";
import { baseUrl, projectId } from "../../services/api";

// Animation
const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Container = styled("section")(({ theme }) => ({
  margin: "40px 40px 0 70px",
  [theme.breakpoints.down("md")]: {
    margin: "20px 16px",
  },
}));

// Card
const PartnersGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  justifyItems: "center",
  [theme.breakpoints.down("sm")]: {
    gap: "30px",
  },
}));

const PartnerCard = styled(Card)({
  width: "100%",
  maxWidth: 200,
  borderRadius: 14,
  boxShadow: "0 5px 14px rgba(0,0,0,0.08)",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "12px",
  background: "#fff",
  animation: `${fadeUp} 0.6s ease forwards`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
  },
});

// Logo
const Logo = styled("img")({
  width: 130,
  height: 80,
  borderRadius: 6,
  objectFit: "contain",
  marginBottom: 8,
  // border: "1px solid #eee",
  background: "#fff",
});

// Tier / Badge
const TierBadge = styled(Box)(({ tier }) => ({
  display: tier ? "inline-flex" : "none",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 600,
  fontFamily: "Poppins",
  color: "#1E88E5",
  padding: "3px 8px",
  borderRadius: 16,
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  marginBottom: 6,
  textTransform: "uppercase",
}));

// Title
const PartnerTitle = styled(Typography)({
  fontSize: 14,
  fontWeight: 600,
  fontFamily: "Poppins",
  color: "#1C1C1C",
  textAlign: "center",
  lineHeight: "18px",
  display: "-webkit-box",
  overflow: "hidden",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  marginBottom: 4,
});

// Description
const PartnerDescription = styled(Typography)({
  fontSize: 12,
  fontWeight: 400,
  color: "#555",
  textAlign: "center",
  lineHeight: 1.3,
  marginTop: 0,
  marginBottom: 2,
});

const Partner = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/secured/event/all-partner/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to fetch partners");

        const data = await response.json();
        const partnersArray = Array.isArray(data.data) ? data.data : [];
        setPartners(partnersArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <Container style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" align="center" color="red">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 600,
          color: "#000",
          lineHeight: "130%",
          fontFamily: "Poppins",
          marginBottom: 3,
        }}
      >
        Partners
      </Typography>

      <PartnersGrid>
        {partners.map((partner, index) => {
          const accessibleText = `${partner.title || ""} ${partner.description || ""} partner`;
          const partnerLogo = partner.logo_url || partner.logo;

          return (
            <PartnerCard
              key={partner._id}
              role="button"
              tabIndex={0}
              aria-label={accessibleText}
              onClick={() =>
                partner.url &&
                window.open(
                  partner.url.startsWith("http") ? partner.url : `https://${partner.url}`,
                  "_blank"
                )
              }
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Logo
                src={partnerLogo ? (partnerLogo.startsWith('http') ? partnerLogo : `${baseUrl}/uploads/${encodeURIComponent(partnerLogo)}`) : ""}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
              {partner.tier && <TierBadge tier={partner.tier}>{partner.tier}</TierBadge>}
              <PartnerTitle>{partner.title}</PartnerTitle>
              {partner.description && <PartnerDescription>{partner.description}</PartnerDescription>}
            </PartnerCard>
          );
        })}
      </PartnersGrid>
    </Container>
  );
};

export default Partner;
