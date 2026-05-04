import { styled,Typography } from "@mui/material";
import { highlights } from "./assets/data";
import { deadlines } from "./assets/data";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { highlightsTypography } from "./assets/typography";
import rightArrow from "../../assets/rightArrow.svg";
import { useEffect, useRef, useState } from "react";
import { keyframes } from "styled-components";

const Component = styled("section")(({ theme }) => ({
  margin: "40px 67px 0 67px",
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    margin: "20px 16px",
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
  marginTop: 40, // more space from top
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
    gap: 16, // spacing between title and button in mobile
    marginTop: 24, // slightly smaller space for mobile
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
     marginTop:10,
  },
}));

/* -------- Important Dates -------- */
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
    flex: 1,  // <-- add this
});

/* Upper container: heading */
const UpdatesHeaderContainer = styled("div")({
  color: "var(--Color-Heading, #1C1C1C)",
  fontFamily: "Poppins",
  fontSize: 24,
  fontWeight: 600,
  fontStyle: "normal",
  lineHeight: "120%", // 24px
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
});

/* Right: text content */
const UpdateRightContent = styled("a")({
  color: "var(--Color-Body-text, #4A4A4A)",
  fontFamily: "Poppins",
  fontSize: 16,
  fontWeight: 500,
  fontStyle: "normal",
  lineHeight: "150%",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textDecoration: "none",
  cursor: "pointer",
  transition: "color 0.3s, transform 0.2s",

  "&:hover": {
    color: "#2180E4",
    transform: "translateX(4px)",
  },
});




/* -------- Carousel -------- */
const Cont2 = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  overflowX: "auto",
  overflowY: "hidden",
  marginTop: 80,
  height: 550,
  boxSizing: "border-box",
  position: "relative",
    paddingBottom: 24,  // 👈 pushes cards up from the scrollbar
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
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", // responsive grid
  gap: 8,
  justifyItems: "center", // centers logos inside each cell
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

const NewsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <mask id="mask0" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0)">
      <path d="M9.575 12L5 7.4L6.4 6L12.4 12L6.4 18L5 16.6L9.575 12ZM16.175 12L11.6 7.4L13 6L19 12L13 18L11.6 16.6L16.175 12Z" fill="#BE8305"/>
    </g>
  </svg>
);

/* ================== COMPONENT ================== */
const Highlights = () => {
  const navigate = useNavigate();
  const scrollRef = useRef();
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
 const [announcements, setAnnouncements] = useState([]);
   const [sponsors, setSponsors] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
 
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setIsScrolledToEnd(isAtEnd);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);


  const fetchAnnouncements = async () => {
  try {
    const res = await fetch(
      `https://maps.iwayplus.in/secured/event/all-announcement/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const data = await res.json();
    setAnnouncements(data.data || []);
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch(
          `https://maps.iwayplus.in/secured/event/all-sponsors/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`);

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
  
  return (
    <Component id="highlights">
      {/* <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {highlightsTypography.title["en-us"]}
      </motion.h2> */}

      {/* ---------- Paragraphs ---------- */}
{/* ---------- Sponsors Section ---------- */}
{/* ---------- Sponsors Section ---------- */}
{/* ---------- Sponsors Section ---------- */}
{/* <h2 style={{ marginTop: 40 }}>Sponsors</h2>

<LogoWrapper>
  {sponsors.map((sponsor) => {
    const handleClick = () => {
      if (sponsor.website) {
        const url = sponsor.website.startsWith("http")
          ? sponsor.website
          : `https://${sponsor.website}`;
        window.open(url, "_blank");
      }
    };

    return (
      <div
        key={sponsor._id}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Logo
          src={sponsor.logo_url}
          alt={sponsor.name}
          onClick={handleClick}
        />
        <span
          style={{
            marginTop: 6,
            fontFamily: "Poppins",
            fontSize: 14,
            fontWeight: 500,
            color: "#4A4A4A",
            textAlign: "center",
          }}
        >
          {sponsor.sponsorship_tier}
        </span>
      </div>
    );
  })}
</LogoWrapper> */}




    <RowWrapper>
  {/* Paragraphs */}
  <TextBx style={{ flex: 1, minWidth: 300 }}>
    <p>{highlightsTypography.para1["en-us"]}</p>
    {/* <p>{highlightsTypography.para2["en-us"]}</p> */}
  </TextBx>

  {/* Latest Updates */}
  <LatestUpdatesWrapper style={{ flex: 1, minWidth: 300 }}>
    {/* Upper heading */}
    <UpdatesHeaderContainer>Latest Updates</UpdatesHeaderContainer>

    {/* Lower container: list of updates */}
    <UpdatesListContainer>
      {announcements.map((item) => (
        <UpdateRow key={item._id}>
          <UpdateLeftIcon>
            <NewsIcon />
          </UpdateLeftIcon>
          <UpdateRightContent
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </UpdateRightContent>
        </UpdateRow>
      ))}
    </UpdatesListContainer>
  </LatestUpdatesWrapper>
</RowWrapper>






        {/* Important Dates */}
        {/* <TableBx>
          <h3>{highlightsTypography.tableName["en-us"]}</h3>
          <table>
            <tr>
              <th style={{ background: "#E5E5E5" }}>
                {highlightsTypography.col1["en-us"]}
              </th>
              <th style={{ background: "#E5E5E5" }}>
                {highlightsTypography.col2["en-us"]}
              </th>
            </tr>
            {deadlines?.map((elm) => {
              const cleanedDateStr = elm.date.replace(
                /(\d+)(st|nd|rd|th)/,
                "$1"
              );
              const deadlineDate = new Date(cleanedDateStr);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              deadlineDate.setHours(0, 0, 0, 0);
              const isPast = deadlineDate < today;

              return (
                <tr key={elm.activity}>
                  <td
                    style={{
                      width: 400,
                      color: isPast ? "#888" : "inherit",
                      textDecoration: isPast ? "line-through" : "none",
                    }}
                  >
                    {elm.link ? (
                      <Link
                        to={elm.link}
                        style={{
                          color: isPast ? "#888" : "#2180E4",
                          textDecoration: "none",
                          pointerEvents: isPast ? "none" : "auto",
                          cursor: isPast ? "default" : "pointer",
                        }}
                      >
                        {elm.activity}
                      </Link>
                    ) : (
                      <span>{elm.activity}</span>
                    )}
                  </td>
                  <td
                    style={{ width: 138, color: isPast ? "#888" : "inherit" }}
                  >
                    <span
                      style={{
                        textDecoration: isPast ? "line-through" : "none",
                      }}
                    >
                      {elm.date}
                    </span>
                    {isPast && (
                      <span style={{ color: "red", marginLeft: 6 }}>
                        (Closed)
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </table>
        </TableBx> */}

      {/* ---------- Carousel ---------- */}
      {/* <Cont2 ref={scrollRef}>
        {highlights?.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ContDiv>
              <img alt="" src={item.img} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.link && (
                <ReadMore onClick={() => navigate(item.link)}>
                  {highlightsTypography.cardButton["en-us"]}
                </ReadMore>
              )}
            </ContDiv>
          </motion.div>
        ))}
        {!isScrolledToEnd && (
          <button
            onClick={() =>
              scrollRef?.current?.scrollBy({ left: 1000, behavior: "smooth" })
            }
            style={{
              position: "absolute",
              background: "none",
              border: "none",
              top: "50%",
              transform: "translateY(-50%)",
              right: -10,
              cursor: "pointer",
            }}
          >
            <img src={rightArrow} alt="" />
          </button>
        )}
      </Cont2> */}
{/* <Header>
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
    Conference Agenda
  </Typography>

  <button
              onClick={() => {
                const isLocal = window.location.hostname === "localhost";
                const targetUrl = isLocal
                  ? "http://localhost:3000/empower-schedule"
                  : "https://empowerconference.in/empower-schedule";
                window.location.href = targetUrl;
              }}
            >
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
              >
                <path
                  d="M8 6l6 6-6 6"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
</Header> */}
    </Component>
  );
};

export default Highlights;
