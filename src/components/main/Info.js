import React from "react";
import { styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import red from "../../assets/rad.png";
import metro from "../../assets/fill.png";

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "80px 70px",
  background: "#F9F9F3",
  gap: 40,
  [theme.breakpoints.down("md")]: {
    padding: "40px 24px",
    gap: 24,
  },
  [theme.breakpoints.down("sm")]: {
    padding: "24px 16px",
    gap: 20,
  },
}));

const Header = styled("div")(({ theme }) => ({
  "& h2": {
    color: "#1C1C1C",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 36,
    lineHeight: "120%",
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
  },
}));

const Grid = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: 24,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: 20,
  },
}));

const Card = styled("article")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: 12,
  border: "1px solid #d1d5db",
  background: "#fff",
  overflow: "hidden",
  flex: 1,
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  },
}));

const ImageWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  aspectRatio: "16 / 9",
  background: "#fff", // optional background for empty space
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain", // shows full image, no stretching
    display: "block",
  },
}));



const Content = styled("div")(({ theme }) => ({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  "& h3": {
    fontFamily: "Poppins, sans-serif",
    fontSize: 22,
    fontWeight: 700,
    margin: 0,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
  },
  "& p": {
    fontFamily: "Poppins, sans-serif",
    fontSize: 15,
    fontWeight: 500,
    color: "#444",
    lineHeight: 1.6,
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
    },
  },
}));

const Actions = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "0 20px 20px 20px",
  "& button": {
    background: "transparent",
    border: "none",
    fontFamily: "Poppins, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    padding: 0,
    color: "#1C1C1C",
    display: "flex",
    alignItems: "center",
    gap: 4,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Home = () => {
  return (
    <Container>
      {/* Heading */}
      <Header>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            color: "#000",
            fontFamily: "Poppins, sans-serif",
            lineHeight: "130%",
          }}
        >
          Accommodation & Travel
        </Typography>
      </Header>

      {/* Cards */}
      <Grid>
        {/* Accommodation */}
        <Link
          to="/accommodation"
          style={{ textDecoration: "none", color: "inherit" }}
          aria-label="Explore Accommodation options near IIT Delhi"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card role="article">
              <ImageWrapper>
                <img src={red} alt="Accommodation options illustration" />
              </ImageWrapper>
              <Content>
                <h3>Accommodation</h3>
                <p>
                  Discover curated hotels, accessible stays, and budget-friendly
                  hostels near IIT Delhi, handpicked to make your Empower 2026
                  visit safe and comfortable.
                </p>
              </Content>
              <Actions>
                <button aria-label="Read more about Accommodation">
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.75.75 0 0 1 .75-.75h11.19l-3.72-3.72a.75.75 
                         0 1 1 1.06-1.06l5 5a.75.75 0 0 1 0 
                         1.06l-5 5a.75.75 0 1 1-1.06-1.06l3.72-3.72H1.75A.75.75 
                         0 0 1 1 8z"
                    />
                  </svg>
                </button>
              </Actions>
            </Card>
          </motion.div>
        </Link>

        {/* Travel Plan */}
        <Link
          to="/travel"
          style={{ textDecoration: "none", color: "inherit" }}
          aria-label="Explore Travel Plans to reach IIT Delhi"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card role="article">
              <ImageWrapper>
                <img src={metro} alt="Travel plan illustration" />
              </ImageWrapper>
              <Content>
                <h3>Travel Plan</h3>
                <p>
                  Get step-by-step guidance on reaching IIT Delhi by air, train,
                  bus, or metro, along with campus entry and parking details.
                </p>
              </Content>
              <Actions>
                <button aria-label="Read more about Travel Plans">
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.75.75 0 0 1 .75-.75h11.19l-3.72-3.72a.75.75 
                         0 1 1 1.06-1.06l5 5a.75.75 0 0 1 0 
                         1.06l-5 5a.75.75 0 1 1-1.06-1.06l3.72-3.72H1.75A.75.75 
                         0 0 1 1 8z"
                    />
                  </svg>
                </button>
              </Actions>
            </Card>
          </motion.div>
        </Link>
      </Grid>
    </Container>
  );
};

export default Home;
