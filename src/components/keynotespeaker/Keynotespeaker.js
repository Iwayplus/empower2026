import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Link, SvgIcon, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import defaultSpeaker from "../../assets/default.png";

function LinkedInIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17.34V10.27H6V17.34H8.34M7.17 9.26A1.34 1.34 0 1 0 7.17 6.58A1.34 1.34 0 0 0 7.17 9.26M18 17.34V13.38C18 11.22 16.85 10.2 15.25 10.2C14.13 10.2 13.54 10.81 13.27 11.31H13.24V10.27H11V17.34H13.34V13.77C13.34 12.77 13.53 11.81 14.73 11.81C15.91 11.81 15.93 12.88 15.93 13.83V17.34H18Z" />
    </SvgIcon>
  );
}

function SpeakerCard({ name, designation, bio, talk, image, linkedin, reverse, organization }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: reverse ? "row-reverse" : "row" },
        p: { xs: "16px", sm: "20px", md: "24px" },
        alignItems: { xs: "center", md: "flex-start" },
        gap: { xs: "16px", md: "24px" },
        width: "100%",
        borderRadius: "24px",
        border: "1px solid #D1D5DB",
        background: "#FEFEFE",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: 140,
          height: 140,
          background: `lightgray url("${image}") center/cover no-repeat`,
          mb: 2,
          border: "4px solid #fff",
          boxShadow: "0 0 0 4px rgba(99,102,241,0.2)",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "24px",
          flex: 1,
          minWidth: 0,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Typography sx={{ color: "#000", fontFamily: "Poppins", fontSize: "24px", fontWeight: 600 }}>
            {name}
          </Typography>
          <Typography sx={{ color: "#4B5563", fontFamily: "Poppins", fontSize: "16px", fontWeight: 400 }}>
            {designation}, {organization}
          </Typography>
          {linkedin && (
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mt: "12px" }}>
              <Link href={linkedin} target="_blank" underline="hover">
                <Typography sx={{ fontFamily: "Poppins", fontSize: "16px", color: "#2180E4", fontWeight: 500 }}>
                  LinkedIn
                </Typography>
              </Link>
              <LinkedInIcon fontSize="small" />
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
          <Typography sx={{ color: "#000", fontFamily: "Poppins", fontSize: "18px", fontWeight: 500 }}>
            Speaker Bio:
          </Typography>
          <Typography sx={{ color: "#4A4A4A", fontFamily: "Poppins", fontSize: "16px", fontWeight: 400, lineHeight: "170%" }}>
            {bio}
          </Typography>
        </Box>
        {(talk?.title || talk?.desc) && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
            {talk?.title && (
              <Typography sx={{ color: "#1C1C1C", fontFamily: "Poppins", fontSize: "18px", fontWeight: 500 }}>
                {talk.title}
              </Typography>
            )}
            {talk?.desc && (
              <Typography sx={{ color: "#4A4A4A", fontFamily: "Poppins", fontSize: "16px", fontWeight: 400 }}>
                {talk.desc}{" "}
                <Link href="#" underline="hover">
                  Read more
                </Link>
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Fetch Token


// Keynote Speakers Component
export default function KeynoteSpeaker() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // get speaker id from URL
  const speakerRefs = useRef({}); // store refs for scrolling

  useEffect(() => {
    const fetchSpeakers = async () => {

      try {
        const res = await fetch(`https://maps.iwayplus.in/secured/event/all-speaker/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`);




        const result = await res.json();
        const speakersArray = result?.data || [];

        const keynoteSpeakers = speakersArray
          .filter(speaker => speaker.type?.some(t => t.toLowerCase().includes("keynote")))
          .sort((a, b) => parseInt(a.special_requirements) - parseInt(b.special_requirements))
          .map(speaker => ({
            _id: speaker._id,
            name: `${speaker.title || ""} ${speaker.full_name || ""}`.trim(),
            designation: speaker.designation,
            organization: speaker?.organization,
            bio: speaker.short_bio || "",
            talk: { title: speaker.slides_url ? "Talk details" : "", desc: "" },
            image: speaker.photo_url ? `https://maps.iwayplus.in/uploads/${encodeURIComponent(speaker.photo_url)}` : defaultSpeaker,
            linkedin: speaker.linkedin || "",
          }));

        setSpeakers(keynoteSpeakers);
      } catch (err) {
        console.error("Fetching speakers failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  useEffect(() => {
    if (!id || !speakers.length) return;
    const element = speakerRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [id, speakers]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: { xs: "24px", md: "32px" }, width: "100%", maxWidth: "1300px", mx: "auto", px: { xs: 2, sm: 3 }, mt: { xs: 5, md: 6 }, mb: { xs: 5, md: 8 }, overflowX: "hidden", boxSizing: "border-box" }}>
      <Typography sx={{ color: "#000", textAlign: "center", fontFamily: "Poppins", fontSize: "40px", fontWeight: 700, lineHeight: "120%" }}>
        Keynote Speakers
      </Typography>

      {speakers.length > 0 ? (
        speakers.map((speaker, index) => (
          <Box key={speaker._id} ref={(el) => (speakerRefs.current[speaker._id] = el)} sx={{ width: "100%" }}>
            <SpeakerCard {...speaker} reverse={index % 2 === 1} />
          </Box>
        ))
      ) : (
        <Typography>Upcoming Soon</Typography>
      )}
    </Box>
  );
}
