import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import pulkit from "../../assets/test.png";

const speakers = [
  { name: "John Doe", title: "Software Engineer, Stripe", image: pulkit },
  {
    name: "Jane Smith",
    title: "Product Manager, Google",
    image: "https://via.placeholder.com/420x520",
  },
  {
    name: "Michael Lee",
    title: "CTO, Amazon",
    image: "https://via.placeholder.com/420x520",
  },
  {
    name: "Sarah Johnson",
    title: "AI Researcher, OpenAI",
    image: "https://via.placeholder.com/420x520",
  },
  {
    name: "David Kim",
    title: "VP of Engineering, Meta",
    image: "https://via.placeholder.com/420x520",
  },
  {
    name: "Emily Brown",
    title: "Head of Product, Netflix",
    image: "https://via.placeholder.com/420x520",
  },
  {
    name: "Alex Carter",
    title: "Head of AI, Microsoft",
    image: "https://via.placeholder.com/420x520",
  },
];

const Speaker = () => {
  const [expanded, setExpanded] = useState(0);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md")); // <=900px
  const isSm = useMediaQuery(theme.breakpoints.down("sm")); // <=600px

  const handleExpandClick = (index) => {
    if (expanded === index) {
      if (index === 0) setExpanded(1); // first → auto expand second
      else if (index === speakers.length - 1) return; // last stays open
      else setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        p: { xs: "20px", sm: "28px", md: "40px" },
        gap: "32px",
      }}
    >
      {/* Heading */}
      <Typography
        sx={{
          color: "#000",
          fontFamily: "Poppins",
          fontSize: { xs: "28px", sm: "34px", md: "40px" },
          fontWeight: 700,
          lineHeight: "120%",
        }}
      >
        Meet Our Speakers
      </Typography>

      {/* Subheading */}
      <Typography
        sx={{
          color: "#4A4A4A",
          fontFamily: "Poppins",
          fontSize: { xs: "14px", sm: "15px", md: "16px" },
          fontWeight: 400,
          lineHeight: "150%",
          maxWidth: "888px",
        }}
      >
        Our speaker lineup comprises leaders from Stripe and beyond, who’ll
        share knowledge and advice on the most pressing topics facing companies
        today. Stay tuned for more announcements.
      </Typography>

      {/* Cards */}

<Box
  sx={{
    display: "flex",
    flexDirection: isSm ? "column" : "row",
    alignItems: isSm ? "stretch" : "flex-start",
    gap: isSm ? "12px" : "16px", // ✅ smaller gap for mobile
    width: "100%",
  }}
>
  {speakers.map((speaker, index) => {
    const isExpanded = expanded === index;
    return (
      <Box
        key={index}
        onClick={() => handleExpandClick(index)}
        sx={{
          cursor: "pointer",
          borderRadius: "15px",
          flexShrink: 0,
          overflow: "hidden",
          position: "relative",
          background:
            "linear-gradient(0deg, rgba(208,201,221,0.60) 0%, rgba(194,197,199,0.20) 97.47%)",

          width: isSm
            ? "100%"
            : isExpanded
            ? isMd
              ? "320px"
              : "536px"
            : "160px",
          height: isSm
            ? isExpanded
              ? "400px" 
              : "180px" 
            : "600px",

          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          boxShadow: isExpanded ? "0 4px 12px rgba(0,0,0,0.15)" : "none",

          // Slow mobile expansion
          transition: isSm ? "height 0.6s ease" : "all 0.3s ease",
        }}
      >
        {/* Thumbnail / Image */}
        <Box
          component="img"
          src={speaker.image}
          alt={speaker.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "inherit",
            transition: "all 0.3s ease",
          }}
        />

        {/* Text only visible when expanded */}
        {isExpanded && (
          <Box
            sx={{
              position: "absolute",
              top: "57px",
              left: "20px",
              zIndex: 2,
            }}
          >
            <Typography
              sx={{
                color: "#5C70FF",
                fontFamily: "Inter",
                fontSize: { xs: "13px", sm: "14px", md: "15px" },
                fontWeight: 500,
                mb: "10px",
              }}
            >
              {speaker.title}
            </Typography>
            <Typography
              sx={{
                color: "#303030",
                fontFamily: "Inter",
                fontSize: { xs: "22px", sm: "26px", md: "28px" },
                fontWeight: 500,
              }}
            >
              {speaker.name}
            </Typography>
          </Box>
        )}
      </Box>
    );
  })}
</Box>

    </Box>
  );
};

export default Speaker;
