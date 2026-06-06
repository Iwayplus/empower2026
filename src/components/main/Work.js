import React, { useEffect, useState } from "react";
import { styled, Typography,Box } from "@mui/material";
import { motion } from "framer-motion";
import { baseUrl } from "../../services/api";

const Component = styled("div")({});

  const Cont1 = styled("section")(({ theme }) => ({
    padding: "80px 70px",
    background: "#F9F9F3",
    display: "flex",
    flexDirection: "column",
    gap: 40,
    [theme.breakpoints.down("sm")]: {
      padding: 16,
      gap: 24,
    },
  }));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
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
}));

const Grid = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
  justifyContent: "center",
}));


const Card = styled("div")(({ theme }) => ({
  flex: "1 1 250px",
  maxWidth: 280,
  minHeight: 230, // ⬅️ reduced height
  display: "flex",
  flexDirection: "column",
  borderRadius: 12,
  border: "1px solid #d1d5db",
  background: "#fff",
  padding: 16,
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  },
}));

const CardContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 6, // ⬅️ small controlled spacing between speaker & organiser
});

const CardSpeaker = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontSize: 15,
  fontWeight: 500,
  color: "#BE8305",
  lineHeight: 1.3,
});

const CardOrganiser = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontSize: 14,
  color: "#555",
});

const CardTop = styled("div")({
  background: "#f3f4f6",
  padding: "4px 12px",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  color: "#444",
  alignSelf: "flex-start",
  marginBottom: 8,
});

const CardTitle = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontSize: 18,
  fontWeight: 600,
  margin: "0 0 8px 0",
  color: "#000",
  lineHeight: 1.4,

  display: "-webkit-box",
  WebkitLineClamp: 3,        // ⬅️ max 3 lines
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",

  minHeight: "4.2em",        // ⬅️ reserves 3 lines (3 × 1.4em line-height)
});




// ⬇️ Component Logic
const Work = () => {
  const [workshops, setWorkshops] = useState([]);
  const [error, setError] = useState(null);

// const getAccessTokenOnce = async (forceLogin = false) => {
//   const storedToken = localStorage.getItem("accessToken");
//   if (storedToken && !forceLogin) return storedToken;

//   try {
//     const loginRes = await fetch("https://maps.iwayplus.in/auth/signin2", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: "vyomm1102@gmail.com",
//         password: "vyom@1234",
//         appId: "com.iwayplus.aiimsjammukiosk",
//       }),
//     });

//     const loginJson = await loginRes.json();
//     const token = loginJson?.data?.accessToken || loginJson?.accessToken;
//     if (!token) throw new Error("No token returned from signin API");

//     localStorage.setItem("accessToken", token);
//     return token;
//   } catch (err) {
//     console.error("Login failed", err);
//     return null;
//   }
// };

useEffect(() => {
  const fetchWorkshops = async () => {
    try {

      const subEventRes = await fetch(
        `${baseUrl}/secured/event/all-subEvent/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
      );
      const subEventJson = await subEventRes.json();

      const sessionRes = await fetch(
        `${baseUrl}/secured/event/all-session/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`,
      );
      const sessionJson = await sessionRes.json();

 if (subEventJson.status && sessionJson.status) {
  let workshopsData = subEventJson.data
    .filter((sub) => sub.type === "Workshop")
    .map((sub) => {
      const session = sessionJson.data.find((s) => s._id === sub.sessionId);

      return {
        title: sub.title || "TBD",
        speaker:
          sub.speakers?.length > 0
            ? sub.speakers.map((s) => s.speakerName).join(", ")
            : "Speaker To Be Announced",
        organiser:
          sub.organisationName || session?.organisationName || null,
        start_time: sub.start_time || session?.start_time || null,
        end_time: sub.end_time || session?.end_time || null,
      };
    })
    // sort workshops by start time
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

  // ✅ reassign serial numbers after sorting
  workshopsData = workshopsData.map((w, idx) => ({
    ...w,
    id: idx + 1,
  }));

  setWorkshops(workshopsData);
}

    } catch (err) {
      setError(err.message);
    }
  };

  fetchWorkshops();
}, []);

// grouping function (for rendering, not state)
const groupWorkshops = (workshops) => {
  const grouped = {};

  workshops.forEach((ws) => {
    const datePart = new Date(ws.start_time).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const timePart = `${new Date(ws.start_time).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })} – ${new Date(ws.end_time).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;

    const dateTimeKey = `${datePart} – ${timePart}`;

    if (!grouped[dateTimeKey]) grouped[dateTimeKey] = [];
    grouped[dateTimeKey].push(ws);
  });

  return grouped;
};




  if (error) return <Cont1>❌ Error: {error}</Cont1>;
  if (workshops.length === 0) return <Cont1>Loading workshops...</Cont1>;

  const handleCardClick = (id) => {
    const isLocal = window.location.hostname === "localhost";
    const targetUrl = isLocal
      ? `http://localhost:3000/workshops#workshop-${id}`
      : `https://empowerconference.in/workshops#workshop-${id}`;
    window.location.href = targetUrl;
  };

  return (
    <Component>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Cont1>
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
      Workshops
    </Typography>

    {/* Yellow Diagonal Arrow */}
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        "& svg": {
          transition: "transform 0.3s ease",
        },
        "&:hover svg": {
          transform: "translateX(4px) translateY(-2px) scale(1.1)",
        },
      }}
      onClick={() => {
        const isLocal = window.location.hostname === "localhost";
        const targetUrl = isLocal
          ? "http://localhost:3000/workshops"
          : "https://empowerconference.in/workshops";
        window.location.href = targetUrl;
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
      >
        <line x1="5" y1="19" x2="19" y2="5" />
        <polyline points="7 5 19 5 19 17" />
      </svg>
    </Box>
  </Box>
</Header>


          <Grid>
            {workshops.map((w, idx) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card onClick={() => handleCardClick(w.id)}>
                  <CardTop>Workshop {w.id}</CardTop>
                  <CardTitle>{w.title}</CardTitle>

                  <CardContent>
                    <CardSpeaker>
                      {w.speaker || "Speaker To Be Announced"}
                    </CardSpeaker>
                    <CardOrganiser>
                      {w.organiser && (
  <CardOrganiser>
    Organiser: {w.organiser}
  </CardOrganiser>
)}
                    </CardOrganiser>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Cont1>
      </motion.div>
    </Component>
  );
};

export default Work;
