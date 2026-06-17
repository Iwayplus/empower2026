import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import defaultSpeaker from "../../assets/default.png";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/api";


export default function Key() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpeakers = async () => {

      try {
        const res = await fetch(`${baseUrl}/secured/event/all-speaker/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`);

        const result = await res.json();
        const speakersArray = result?.data || [];

        const keynoteSpeakers = speakersArray
          .filter(speaker =>
            speaker.type?.some(t => t.toLowerCase().includes("keynote"))
          )
          .sort((a,b) => parseInt(a.special_requirements) - parseInt(b.special_requirements))
          .map((speaker, index) => ({
            id: speaker._id || index, // assign an id for navigation
            name: `${speaker.title || ""} ${speaker.full_name || ""}`.trim(),
            designation: speaker.designation,
            organization: speaker.organization,
            image: speaker.photo_url
              ? `${baseUrl}/uploads/${encodeURIComponent(
                speaker.photo_url
              )}`
              : defaultSpeaker,
            bio: speaker.short_bio || "", // ✅ add short_bio here
          }))


        setSpeakers(keynoteSpeakers);
      } catch (err) {
        console.error("Fetching speakers failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 4, md: 6 },
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 600,
          color: "#000",
          lineHeight: "130%",
          fontFamily: "Poppins",
          mb: 4,
          textAlign: "left",
        }}
      >
        Keynote Speakers
      </Typography>

      {/* Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // full width on small screens
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: 2, md: 4 },
          justifyItems: "center",
        }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.4)",
                p: 2,
                width: "100%",
                maxWidth: { xs: "100%", sm: 280 }, // responsive
                boxSizing: "border-box",
              }}
            >
              <Skeleton variant="circular" width={100} height={100} />
              <Skeleton width="70%" height={20} />
              <Skeleton width="50%" height={16} />
              <Skeleton width="40%" height={32} />
            </Box>
          ))
          : speakers.map((keynote, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              style={{ width: "100%", maxWidth: 280 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "20px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  p: 2,
                  gap: .5,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,245,255,0.9))",
                  textAlign: "center",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.03)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                  },
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    background: `lightgray url("${keynote.image}") center/cover no-repeat`,
                    mb: 2,
                    border: "4px solid #fff",
                    boxShadow: "0 0 0 4px rgba(99,102,241,0.2)",
                  }}
                />

                {/* Name */}
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "16px",
                    fontFamily: "Poppins",
                  }}
                >
                  {keynote.name}
                </Typography>

                {/* Designation */}
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#4B5563",
                    
                    fontFamily: "Poppins",
                    mb: 1,
                  }}
                >
                  {keynote.designation}, {keynote?.organization}
                </Typography>
                {/* Short Bio */}
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "#4A4A4A",
                    fontFamily: "Poppins",
                    mb: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 2, // limit to 2 lines
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {keynote.bio || "No description available"}
                </Typography>


                {/* Read More */}
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mt: 1,
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: "13px",
                    px: 2.5,
                    fontFamily: "Poppins",
                    borderColor: "#6366f1",
                    color: "#6366f1",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "#6366f1",
                      color: "#fff",
                      borderColor: "#6366f1",
                    },
                  }}
                  onClick={() => navigate(`/keynote-speakers`)} // ✅ navigate with keynote id
                >
                  Read More
                </Button>
              </Box>
            </motion.div>
          ))}
      </Box>
    </Box>
  );
}
