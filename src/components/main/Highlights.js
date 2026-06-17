import { styled, Typography } from "@mui/material";
import { highlights } from "./assets/data";
import { deadlines } from "./assets/data";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { highlightsTypography } from "./assets/typography";
import rightArrow from "../../assets/rightArrow.svg";
import { useEffect, useRef, useState } from "react";
import { keyframes } from "styled-components";
import { baseUrl } from "../../services/api";

const Component = styled("section")(({ theme }) => ({
  margin: "40px 67px 60px 67px",
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    margin: "20px 16px 40px 16px",
  },
  "&>h2": {
    color: "var(--Color-Heading, #1C1C1C)",
    fontFamily: "Poppins",
    fontSize: 36,
    fontWeight: 600,
    margin: 20,
    lineHeight: "120%",
    [theme.breakpoints.down("md")]: {
      fontSize: 28,
    },
  },
  "&>p": {
    color: "var(--Color-Body-text, #1c1c1c)",
    fontFamily: "Poppins",
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: "120%",
    margin: "16px 0 40px 0",
    maxWidth: 900,
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
      margin: "16px 0 24px 0",
    },
  },
}));

const TextBx = styled("div")({
  "&>h3": {
    color: "var(--Color-Heading, #1C1C1C)",
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: 600,
    margin: "0 0 24px 0",
  },
  "&>p": {
    color: "var(--Color-Body-text, #494949)",
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "150%",
    marginBottom: 16,
  },
});

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: 40,
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

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    marginTop: 24,
  },
}));

/* ========== Updates + Dates wrapper (row) ========== */
const RowWrapper = styled("div")(({ theme }) => ({
  marginTop: 60,
  display: "flex",
  justifyContent: "space-between",
  gap: "64px",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
     marginTop: 10,
  },
}));

const TableBx = styled("div")({
  flex: 1,
  "&>h3": {
    color: "#1C1C1C",
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: 600,
    margin: 0,
  },
  "&>table": {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 16,
    "&>tr": {
      "&>th": {
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: 700,
        textAlign: "left",
        height: 40,
        border: "1px solid #828282",
        padding: "0 17px",
      },
      "&>td": {
        fontFamily: "Poppins",
        fontSize: 16,
        fontWeight: 400,
        textAlign: "left",
        height: 40,
        border: "1px solid #828282",
        paddingLeft: 17,
      },
    },
  },
});

/* ========== Latest Updates Container ========= */
const LatestUpdatesWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "24px",
  alignSelf: "stretch",
  flex: 1, 
});

/* Upper container: heading */
const UpdatesHeaderContainer = styled("div")({
  color: "var(--Color-Heading, #1C1C1C)",
  fontFamily: "Poppins",
  fontSize: 24,
  fontWeight: 600,
  fontStyle: "normal",
  lineHeight: "120%", 
  fontFeatureSettings: "'liga' off, 'clig' off",
});

/* Lower container: updates list */
const UpdatesListContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "16px",
});

/* Single news/update container */
const UpdateRow = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
});

/* Left: SVG icon */
const UpdateLeftIcon = styled("div")({
  flexShrink: 0,
  paddingTop: "2px", // aligns icon slightly better with text
});

/* Right: text content */
const UpdateRightContent = styled("a")({
  color: "var(--Color-Body-text, #4A4A4A)",
  fontFamily: "Poppins",
  fontSize: 16,
  fontWeight: 500,
  fontStyle: "normal",
  lineHeight: "150%",
  textDecoration: "none",
  cursor: "pointer",
  display: "inline-block", 
  transition: "color 0.3s ease, transform 0.3s ease", // Smooth animation for hover

  "&:hover": {
    color: "#2180E4", // Blue hover color shown in your image
    transform: "translateX(6px)", // Small offset to the right
  },
});

const Cont2 = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  overflowX: "auto",
  overflowY: "hidden",
  marginTop: 80,
  height: 550,
  boxSizing: "border-box",
  position: "relative",
  paddingBottom: 24, 
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: "fit-content",
    overflowX: "hidden",
  },
  gap: 24,
}));

const ContDiv = styled("div")(({ theme }) => ({
  minWidth: 309,
  padding: 20,
  marginTop: 3,
  marginLeft: 3,
  height: "99%",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
  "&>h3": {
    color: "var(--Color-Heading, #1C1C1C)",
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: 600,
    margin: "8px 0",
  },
  "&>p": {
    color: "var(--Color-Body-text, #494949)",
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: "150%",
    margin: 0,
    marginBottom: 20,
  },
  "&>img": {
    maxWidth: 100,
  },
}));

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ReadMore = styled("button")({
  marginTop: "auto",
  padding: "10px 16px",
  color: "#2180E4",
  fontFamily: "Poppins",
  fontSize: "18px",
  fontWeight: "500",
  borderRadius: 4,
  border: "1px solid #D9D9D9",
  background: "none",
  cursor: "pointer",
});

const LogoWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", 
  gap: 8,
  justifyItems: "center", 
  padding: 16,
});

const Logo = styled("img")({
  width: 160,
  height: 100,
  borderRadius: 6,
  objectFit: "contain",
  marginBottom: 6,
  background: "#fff",
});

// New Icon Matching image_fff029.png
const DoubleArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path 
      d="M13 17L18 12L13 7M6 17L11 12L6 7" 
      stroke="#D9A036" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

/* ================== COMPONENT ================== */
const Highlights = () => {
  const navigate = useNavigate();
  const scrollRef = useRef();
  const [announcements, setAnnouncements] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aboutData, setAboutData] = useState(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/secured/event/all-announcement/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
      );
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      setAnnouncements(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAbout = async () => {
    try {
      const res = await fetch(`${baseUrl}/secured/cms/about/all/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const json = await res.json();
      if (json.status && Array.isArray(json.data)) {
        const publishedAbout = json.data.find(sec => sec.status === "Published");
        if (publishedAbout) {
          setAboutData(publishedAbout.content);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    fetchAbout();
  }, []);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/secured/event/all-sponsors/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to fetch sponsors");

        const data = await response.json();
        const sponsorsArray = Array.isArray(data?.sponsors) ? data.sponsors : [];
        setSponsors(sponsorsArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const cmsUpdates = (aboutData?.latest_updates_items || []).map((item, idx) => ({
    _id: `cms-${idx}`,
    title: item.text || item,
    url: item.link || "#",
    isExternal: !!item.link
  }));

  const apiUpdates = announcements.map((item) => ({
    _id: `api-${item._id}`,
    title: item.title,
    url: item.url || "#",
    isExternal: true
  }));

  const displayUpdates = [...cmsUpdates, ...apiUpdates];
  
  return (
    <Component id="highlights" aria-labelledby="highlights-heading">
      <h2 id="highlights-heading" className="sr-only">Conference Highlights and About</h2>
      <RowWrapper>
        {/* Paragraphs */}
        <TextBx style={{ flex: 1, minWidth: 300 }}>
          <p>{aboutData?.description || highlightsTypography.para1["en-us"]}</p>
        </TextBx>

        {/* Latest Updates */}
        {((aboutData ? aboutData.show_latest_updates : true) || displayUpdates.length > 0) && (
          <LatestUpdatesWrapper style={{ flex: 1, minWidth: 300 }}>
            {/* Upper heading */}
            <UpdatesHeaderContainer>{aboutData?.latest_updates_title || 'Latest Updates'}</UpdatesHeaderContainer>

            {/* Lower container: list of updates */}
            <UpdatesListContainer>
              {displayUpdates.map((item) => (
                <UpdateRow key={item._id}>
                  <UpdateLeftIcon>
                    <DoubleArrowIcon />
                  </UpdateLeftIcon>
                  <UpdateRightContent
                    href={item.url} 
                    target={item.isExternal ? "_blank" : "_self"}
                    rel={item.isExternal ? "noopener noreferrer" : ""}
                  >
                    {item.title}
                  </UpdateRightContent>
                </UpdateRow>
              ))}
            </UpdatesListContainer>
          </LatestUpdatesWrapper>
        )}
      </RowWrapper>
    </Component>
  );
};

export default Highlights;