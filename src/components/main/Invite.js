import React, { useEffect, useState } from "react";
import defaultSpeaker from "../../assets/default.png";
import { Typography, Box, styled } from "@mui/material";
import { baseUrl, projectId } from "../../services/api";
const API_URL = `${baseUrl}/secured/event/all-speaker/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`;


const Component = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "24px",
  width: "100%",
  padding: "48px 64px",
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    padding: "48px 2px",
  }
}))
const Invite = () => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.status && Array.isArray(data.data)) {
          const filtered = data.data.filter((spk) =>
            spk.type?.includes("invited speaker") ||
            spk.type?.includes("workshop speaker") ||
            spk.type?.includes("panel")
          ).sort((a, b) => parseInt(a?.special_requirements) - parseInt(b?.special_requirements));
          setSpeakers(filtered);
        }
      } catch (err) {
        console.error("Error fetching speakers:", err);
      }
    };
    fetchSpeakers();
  }, []);

  const getImageUrl = (photo) =>
    photo
      ? `${baseUrl}/uploads/${encodeURIComponent(photo)}`
      : defaultSpeaker;

  return (
    <Component
      role="region"
      aria-labelledby="invited-speakers-heading"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
          ml: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography
          id="invited-speakers-heading"
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
          Speakers
        </Typography>

        <Box
          component="button"
          aria-label="Explore our invited speakers, click to see all"
          onClick={() => {
            window.location.href = window.location.origin + "/invited";
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(176px, 1fr))",
          gap: "10px",
          justifyItems: "center",
          width: "100%",
        }}
      >
        {speakers.map((spk, idx) => (
          <div
            key={spk._id}
            role="group"
            aria-labelledby={`speaker-${idx}-name`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              width: "100%",
              maxWidth: "176px",
              transform: "translateY(20px)",
              opacity: 0,
              animation: `fadeUp 0.5s ease forwards ${idx * 0.1}s`,
            }}
          >
            {/* Image (decorative only) */}
            <div
              style={{
                width: "126px",
                aspectRatio: "1/1",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #E5E7EB",
                background: "#F9FAFB",
              }}
            >
              <img
                src={getImageUrl(spk.photo_url)}
                alt=""
                aria-hidden="true"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Text (only name is read aloud) */}
            {/* Text (name, designation, organization) */}
            {/* Text (name, designation + organization in one line with styling) */}
            <div style={{ textAlign: "center" }}>
              <Typography
                id={`speaker-${idx}-name`}
                component="h3"
                sx={{
                  color: "#0D141C",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  display: "block",
                }}
              >
                {spk.full_name}
              </Typography>

              {(spk.designation || spk.organization) && (
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    lineHeight: "21px",
                    display: "block",
                  }}
                >
                  {/* designation lighter */}
                  {spk.designation && (
                    <span style={{ color: "#4A4A4A", fontWeight: 400 }}>
                      {spk.designation}
                    </span>
                  )}
                  {/* comma if both exist */}
                  {spk.designation && spk.organization && ", "}
                  {/* organization darker */}
                  {spk.organization && (
                    <span style={{ color: "#0D141C", fontWeight: 500 }}>
                      {spk.organization}
                    </span>
                  )}
                </span>
              )}
            </div>



          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Component>
  );
};

export default Invite;
