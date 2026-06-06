import { styled, Box } from "@mui/material";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";
import bgImage from "../../assets/bg.jpeg"; 

import calander from "../../assets/calander.svg";
import locationRed from "../../assets/locationRed.svg";
import Spon from "../../assets/second.png";
import { coverTypography } from "./assets/typography";
import playStore from "../../assets/gp.png";
import appStore from "../../assets/sto.png";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { baseUrl, fetchPublicDynamicSections } from "../../services/api";

const Component = styled("section")({
  width: "100%",
  maxHeight: "max-content",
});

const Container = styled("div", {
  shouldForwardProp: (prop) => prop !== "bg",
})(({ theme, bg }) => ({
  position: "relative", 
  display: "flex",
  alignItems: "flex-start",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  padding: "80px 70px",
  width: "100%",
  height: "auto",
  minHeight: "100%",
  gap: 10,
  background: bg
    ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${bg}")`
    : "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
  backgroundSize: "cover",
  backgroundPosition: "center",
  boxSizing: "border-box",
  transition: "background 0.5s ease-in-out",
  [theme.breakpoints.down("md")]: {
    height: "100%",
    flexDirection: "column",
    padding: 16,
    justifyContent: "flex-start",
  },
}));



const CarouselImage = styled(motion.img)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});




const Dot = styled("div")(({ active }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: active ? "#C69300" : "rgba(255,255,255,0.6)",
  cursor: "pointer",
  transition: "all 0.3s ease",
}));


const Date = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderRadius: 4,
  padding: "8px 16px",
  border: "1px solid #D9D9D9",
  background: "linear-gradient(180deg, rgba(117,115,115,0.6) 0%, rgba(0,0,0,0.6) 100%)",
  "&>p": {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
    margin: 0,
  },
});

const Venue = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderRadius: 4,
  padding: "8px 16px",
  border: "1px solid #D9D9D9",
  background: "linear-gradient(180deg, rgba(117,115,115,0.6) 0%, rgba(0,0,0,0.6) 100%)",
  "&>p": {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
    margin: 0,
  },
  "&:hover > p": {
    textDecoration: "underline",
    textDecorationColor: "#FFFFFF",
  },
});

const Heading = styled("h1")(({ theme }) => ({
  color: "#fff",
  fontFamily: "Poppins",
  fontSize: 48,
  fontWeight: 700,
  lineHeight: "120%",
  textTransform: "uppercase",
  margin: "24px 0 0 0",
  background: "#C69300",
  padding: "0 6px",
  [theme.breakpoints.down("md")]: {
    fontSize: 32,
    margin: "12px 0 0 0",
  },
}));

const SubHeading = styled("p")(({ theme }) => ({
  color: "#fff",
  background:"rgba(117,115,115,0.6)",
  fontFamily: "Poppins",
  fontSize: 48,
  fontWeight: 700,
  lineHeight: "120%",
  margin: "8px 0 0 0",
    padding: "0 6px",
  [theme.breakpoints.down("md")]: {
    fontSize: 28,
    margin: "4px 0 0 0",
  },
}));

const RegisterBtn = styled("button")({
  marginTop: 16,
  padding: "18px 40px",
  borderRadius: 4,
  background: "#2180E4",
  color: "#fff",
  fontSize: "1.125em",
  fontWeight: 700,
  lineHeight: "20px",
  border: "none",
  cursor: "pointer",
});

// const Content = styled("div")(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "flex-start",
//   width: "70%",
//   [theme.breakpoints.down("md")]: {
//     width: "100%",
//   },
// }));
const Content = styled("div")(({ theme }) => ({
  position: "relative",   // <-- ensure relative
  zIndex: 10,             // <-- higher than carousel
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "70%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const DotsWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: 8,
  zIndex: 5, // above carousel (0), below content (10)

  // 🔹 Hide on small screens (<=768px)
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));


const QRWrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  right: 50,
  top: 120,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 12,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const CarouselWrapper = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 0,
});


const QRContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  background: "#fff",
  borderRadius: 10,
  padding: "10px 14px",
  border: "2px solid #041a32",
  width: "fit-content",
  maxWidth: 140,
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
}));

const QRText = styled("p")({
  color: "#000",
  fontWeight: 600,
  textAlign: "center",
  margin: 0,
  fontSize: 14,
});

const TimingVenue = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px 20px",
  marginTop: 32,
});
const MobileAppButtons = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start", // left aligned
  alignItems: "center",
  gap: 12, // slightly smaller gap
  marginTop: 16,
  width: "100%",        // make it full width
  flexWrap: "wrap",     // allow wrapping if needed
  boxSizing: "border-box",
  [theme.breakpoints.up("md")]: {
    display: "none", // hide on desktop
  },
}));




const Cover = () => {

  const [venue, setVenue] = useState(coverTypography.venueLong["en-us"]);
  const [carousel, setCarousel] = useState([]);
  const [dynamicHero, setDynamicHero] = useState(null);
  const [currentBg, setCurrentBg] = useState("");
  const [progress, setProgress] = useState(0);
  const [timerKey, setTimerKey] = useState(0); // bump to restart the timer

  const navigate = useNavigate();
  const userData = useSelector((store) => store.userSlice.profile);
  const exhibitorData = useSelector((store) => store.userSlice.exhibitorProfile);
  const [open, setOpen] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const SLIDE_DURATION = 5000; // ms per slide

  // Use a ref so the interval callback always sees the latest carousel
  const carouselRef = useRef([]);
  const indexRef = useRef(-1);

  useEffect(() => {
    carouselRef.current = carousel;
  }, [carousel]);

  // Advance to next slide — stable function, no stale closure
  const advance = useCallback(() => {
    const list = carouselRef.current;
    if (!list.length) return;
    // total slots = carousel images + 1 (the default bg at index -1)
    const total = list.length + 1;
    const next = (indexRef.current + 2) % total - 1; // cycles: -1, 0, 1, ..., N-1, -1, ...
    indexRef.current = next;
    setCurrentIndex(next);
    if (next === -1) {
      setCurrentBg(bgImage);
    } else {
      setCurrentBg(
        `${baseUrl}/uploads/${encodeURIComponent(list[next].image_url)}`
      );
    }
    setProgress(0); // reset progress bar on each new slide
  }, []);

  // Auto-advance interval — restarts whenever timerKey changes (e.g., dot click)
  useEffect(() => {
    if (!carousel.length) return;
    const interval = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [carousel, timerKey, advance]);

  // Smooth progress bar that fills over SLIDE_DURATION
  useEffect(() => {
    if (!carousel.length) return;
    setProgress(0);
    const step = 100 / (SLIDE_DURATION / 50); // update every 50ms
    const timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + step, 100));
    }, 50);
    return () => clearInterval(timer);
  }, [currentIndex, carousel]);

  // Fetch CMS Hero Dynamic Content + build carousel from hero images
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const sections = await fetchPublicDynamicSections(process.env.REACT_APP_PROJECT_ID, 'Published');
        const heroSection = sections.find(sec => sec.section_type === 'hero' || sec.section_type === 'cover');
        if (heroSection) {
          setDynamicHero(heroSection);

          // Build carousel from hero images array if present
          const heroImages = heroSection?.content?.images;
          if (Array.isArray(heroImages) && heroImages.length > 0) {
            // Normalise plain filename strings into { image_url } objects
            // so the existing advance() machinery works unchanged
            setCarousel(heroImages.map((filename) => ({ image_url: filename })));
          }
        }
      } catch (err) {
        console.error("Error fetching dynamic hero section", err);
      }
    };
    fetchHeroData();
  }, []);


  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const handleMediaChange = (e) =>
      setVenue(e.matches ? coverTypography.venueShort["en-us"] : coverTypography.venueLong["en-us"]);
    mediaQuery.addEventListener("change", handleMediaChange);
    handleMediaChange(mediaQuery);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // const handleRegister = () => navigate("/auth/signin");

  return (
    <Component id="cover">
      <Container >
        <CarouselWrapper>
  <AnimatePresence>
    {currentIndex === -1 ? (
      <CarouselImage
        key="default-bg"
        src={bgImage}
                aria-hidden="true" // ✅ Hide from screen readers

        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 1 }}
      />
    ) : (
      <CarouselImage
        key={currentIndex}
        src={`${baseUrl}/uploads/${encodeURIComponent(
          carousel[currentIndex].image_url
        )}`}
                aria-hidden="true" // ✅ Hide from screen readers

        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 1 }}
      />
    )}
  </AnimatePresence>

  {/* Progress bar */}
  {carousel.length > 1 && (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 4,
        background: "rgba(255,255,255,0.2)",
        zIndex: 4,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "#C69300",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  )}

  <DotsWrapper>
    <Dot
      active={currentIndex === -1}
      onClick={() => {
        indexRef.current = -1;
        setCurrentIndex(-1);
        setCurrentBg(bgImage);
        setProgress(0);
        setTimerKey((k) => k + 1); // restart interval
      }}
    />
    {carousel.map((img, idx) => (
      <Dot
        key={idx}
        active={currentIndex === idx}
        onClick={() => {
          indexRef.current = idx;
          setCurrentIndex(idx);
          setCurrentBg(
            `${baseUrl}/uploads/${encodeURIComponent(img.image_url)}`
          );
          setProgress(0);
          setTimerKey((k) => k + 1); // restart interval
        }}
      />
    ))}
  </DotsWrapper>
</CarouselWrapper>

        <Content>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <Heading>
              {dynamicHero?.content?.title || dynamicHero?.content?.heading || coverTypography.title["en-us"]}
            </Heading>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            <SubHeading>
              {dynamicHero?.content?.subtitle || dynamicHero?.content?.body || coverTypography.subTitle["en-us"]}
            </SubHeading>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
            {/* {!userData && !exhibitorData && (
              <RegisterBtn onClick={handleRegister}>{coverTypography.registerButton["en-us"]}</RegisterBtn>
            )} */}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
            <TimingVenue style={{ marginTop: userData || exhibitorData ? 100 : 32 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Date>
                  <img alt="" src={calander} />
                  <p>{dynamicHero?.content?.dates || coverTypography.dates["en-us"]}</p>
                </Date>
              </div>

              <Venue
                as="a"
                href="https://maps.app.goo.gl/vhuk9rFRuHYrwk6g9"
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
              >
                <img alt="" src={locationRed} />
                <p>{dynamicHero?.content?.venue || venue}</p>
              </Venue>
            </TimingVenue>
          </motion.div>

          {/* <Box
            component="img"
            src={Spon}
               alt="Sponsor banner" // ✅ TalkBack will announce this
            
            sx={{
              width: "90%",
              maxWidth: { xs: "100%", sm: "60%" },
              borderRadius: 2,
              mt: 3,
              display: "block",
            }}
          /> */}
          <MobileAppButtons>
  <a href={process.env.REACT_APP_PLAYSTORE_URL} target="_blank" rel="noopener noreferrer">
    <Box component="img" src={playStore} alt="Download on Play Store" sx={{ height: 50, cursor: "pointer" }} />
  </a>
  <a href={process.env.REACT_APP_APPSTORE_URL} target="_blank" rel="noopener noreferrer">
    <Box component="img" src={appStore} alt="Download on App Store" sx={{ height: 50, cursor: "pointer" }} />
  </a>
</MobileAppButtons>
        </Content>

      <QRWrapper>
      {open && (
        <a
          href={process.env.REACT_APP_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <QRContainer>
            <QRText>Download Empower App now!</QRText>
            <QRCode
              size={90}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={process.env.REACT_APP_APP_URL}
              viewBox="0 0 256 256"
            />
          </QRContainer>
        </a>
      )}

      {/* Toggle Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          background: "#041a32",
          borderRadius: "50%",
          padding: "6px",
          color: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        {open ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
      </div>
    </QRWrapper>
          {/* <div
  style={{
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "6px",
    width: "100%",
    background: "rgba(255,255,255,0.2)",
  }}
>
  <div
    style={{
      height: "100%",
      width: `${progress}%`,
      background: "#C69300",
      transition: "width 0.15s linear",
    }}
  />
</div> */}
{/* <ProgressBarWrapper>
  <ProgressBar progress={progress} />
</ProgressBarWrapper> */}
{/* <DotsWrapper>
  <Dot
    active={currentIndex === -1}
    onClick={() => {
      setCurrentIndex(-1);
      setCurrentBg(bgImage);
    }}
  />
  {carousel.map((img, idx) => (
    <Dot
      key={idx}
      active={currentIndex === idx}
      onClick={() => {
        setCurrentIndex(idx);
        setCurrentBg(
          `https://maps.iwayplus.in/uploads/${encodeURIComponent(img.image_url)}`
        );
      }}
    />
  ))}
</DotsWrapper> */}


      </Container>
    

    </Component>
  );
};

export default Cover;
