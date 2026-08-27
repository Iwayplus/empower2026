import React, { useEffect, useState } from "react";
import {
  styled, Typography, Skeleton, Box, Button, Modal,
  IconButton,
  Radio,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import redirectGif from "../../assets/pay.gif";
import { bookWorkshop , projectId } from "../../services/api";
import { useSelector } from "react-redux";
import { Dialog } from "@mui/material";

/* ================= Styled Components ================= */
const WorkshopMain = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  padding: "48px 50px",
  background: "#fbfbfb",
  [theme.breakpoints.down("sm")]: {
    padding: "24px 16px",
  },
}));
const RegisterButton = styled(Button)(({ theme }) => ({
  display: "flex",
  height: 48,
  padding: "12px 16px",
  alignItems: "center",
  gap: 8,
  borderRadius: 8,
  background: "#2180E4",
  color: "#fff",
  fontFamily: "Poppins",
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "120%",
  marginBottom: theme.spacing(2), // ✅ add margin bottom
  "&:hover": { background: "#1768c7" },

  // ✅ Responsive adjustments
  [theme.breakpoints.down("sm")]: {
    width: "100%",          // full-width on small screens
    fontSize: 14,           // slightly smaller text
    padding: "10px 12px",   // reduce padding
    height: 44,             // adjust height
    marginBottom: theme.spacing(3), // extra space at bottom for mobile
  },
}));

const ModalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 800,          // desktop width
  maxWidth: "95%",     // ensures it fits smaller screens
  padding: 24,
  gap: 24,
  borderRadius: 16,
  background: "#FFF",
  position: "relative",
  boxShadow: "0 0 4px 0 rgba(58, 105, 163, 0.25)",
  maxHeight: "90vh",
  overflow: "visible",  // no scroll for whole modal

  [theme.breakpoints.down("md")]: {  // ≤800px
    width: "90%",
    padding: 20,
  },

  [theme.breakpoints.down("sm")]: {  // ≤600px
    width: "95%",
    padding: 16,
    gap: 16,
    borderRadius: 12,
  },

  [`@media (max-width:368px)`]: {    // very small screens
    width: "98%",
    padding: 12,
    gap: 12,
    borderRadius: 10,
  },
}));




/* Upper container */
const ModalUpper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  textAlign: "center",
});

const ModalHeading = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 600,
  fontFamily: "Poppins",
  color: "#000",
  textAlign: "center",

  [theme.breakpoints.down("sm")]: { fontSize: 18 },
  [`@media (max-width:368px)`]: { fontSize: 16 },
}));

const ModalSubheading = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  fontFamily: "Poppins",
  color: "#666",
  textAlign: "center",

  [theme.breakpoints.down("sm")]: { fontSize: 13 },
  [`@media (max-width:368px)`]: { fontSize: 12 },
}));

const ModalMiddle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  alignSelf: "stretch",

  // Allow scrolling if workshops list is too long
  overflowY: "auto",
  width: "100%",
  maxHeight: "calc(90vh - 140px)", // subtract height of header + footer

  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(95vh - 120px)",
    gap: 12,
  },

  [`@media (max-width:368px)`]: {
    maxHeight: "calc(98vh - 100px)",
    gap: 8,
  },
}));


const DateText = styled(Typography)({
  color: "#BE8305",
  fontFamily: "SF Pro, sans-serif",
  fontSize: 14,
  fontWeight: 510,
  lineHeight: "130%",
});

/* Workshop cards inside modal */
const WorkshopOptionCard = styled(Box)({
  width: "100%",       // take full modal width
  boxSizing: "border-box",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
});

const WorkshopOptionRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",   // ✅ wrap on very small screens
  gap: 8,
});


const WorkshopLeft = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 4,
  flex: 1,
});

const WorkshopTitleText = styled(Typography)({
  fontSize: 16,
  fontWeight: 500,
  color: "#000",
  wordBreak: "break-word",   // ✅ wrap long titles
  flex: 1,
});

const WorkshopVenueText = styled(Typography)({
  fontSize: 14,
  color: "#666",
  wordBreak: "break-word",
});


/* Lower container */
const ModalLower = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});
const WorkshopUpper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  alignSelf: "stretch",
});

const WorkshopTitle = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontFamily: "Poppins, sans-serif",
  fontSize: 32,
  fontWeight: 600,
  lineHeight: "130%",
  marginBottom: 12,
  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
  },
}));

const WorkshopDescription = styled(Typography)(({ theme }) => ({
  color: "#373333",
  fontFamily: "Poppins, sans-serif",
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "160%",
  marginBottom: 24,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    lineHeight: "150%",
  },
}));

const WorkshopLower = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "stretch",
  gap: 32,
});

const WorkshopWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: 24,
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
  },
}));

const WorkshopSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: 12,
  fontSize: 20,
  fontWeight: 500,
  color: "#000",
  [theme.breakpoints.down("sm")]: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: 600,
  },
}));

const WorkshopCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  padding: 20,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  background: "#fff",
  gap: 8,
  [theme.breakpoints.down("sm")]: {
    padding: 16,
  },
}));

const WorkshopHeading = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  fontSize: 22,
  fontWeight: 600,
  lineHeight: "120%",
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
}));

const WorkshopSpeaker = styled(Typography)(({ theme }) => ({
  color: "#be8305",
  fontFamily: "Poppins, sans-serif",
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "120%",
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

const KnowledgeLabel = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontFamily: "Poppins, sans-serif",
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "120%",
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

const OverviewText = styled(Typography)(({ theme }) => ({
  color: "#373333",
  fontFamily: "Poppins, sans-serif",
  fontSize: 15,
  fontWeight: 400,
  lineHeight: "160%",
  [theme.breakpoints.down("sm")]: {
    fontSize: 13,
    lineHeight: "150%",
  },
}));

const OverviewTitle = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontFamily: "Poppins, sans-serif",
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "120%",
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

/* ================= Shimmer Skeleton ================= */
const ShimmerCard = () => (
  <WorkshopCard>
    <Skeleton variant="rectangular" height={25} width="60%" sx={{ mb: 1 }} />
    <Skeleton variant="rectangular" height={20} width="40%" sx={{ mb: 1 }} />
    <Skeleton variant="rectangular" height={20} width="50%" sx={{ mb: 1 }} />
    <Skeleton variant="rectangular" height={60} width="100%" />
  </WorkshopCard>
);

const baseUrl = process.env.NODE_ENV === "development" ? (process.env.REACT_APP_LOCAL_URL || "http://localhost:8000") : (process.env.REACT_APP_REMOTE_URL || "https://maps.iwayplus.in");

const Workshop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [redirectOpen, setRedirectOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [profile, setProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [bookedWorkshop, setBookedWorkshop] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedWorkshops, setSelectedWorkshops] = useState({
    morning: null,
    evening: null
  });


  const userData = useSelector(store => store.userSlice.profile)



  useEffect(() => {
    const fetchWorkshops = async () => {
      try {


        const subEventRes = await fetch(
          `${baseUrl}/secured/event/all-subEvent/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`,
        );
        const subEventJson = await subEventRes.json();

        const sessionRes = await fetch(
          `${baseUrl}/secured/event/all-session/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`,
        );
        const sessionJson = await sessionRes.json();

        if (subEventJson.status && sessionJson.status) {
          const workshopsData = subEventJson.data
            .filter((sub) => sub.type === "Workshop")
            .map((sub) => {
              // Find session that matches this workshop's sessionId
              const session = sessionJson.data.find(s => s._id === sub.sessionId);

              return {
                _id: sub._id,                 // subEvent/workshop id
                eventId: sub.eventId,         // parent event id
                sessionId: sub.sessionId,     // session id
                title: sub.title || "TBD",
                speaker:
                  sub.speakers?.length > 0
                    ? sub.speakers.map((s) => s.speakerName).join(", ")
                    : "Speaker To Be Announced",
                // moderator:
                //   session?.moderator?.length > 0
                //     ? session.moderator.map((m) => m.moderatorName).join(", ")
                //     : "Moderator To Be Announced",
                organiser: sub.organisationName || session?.organisationName || null,
                venue: session?.location_name || "To be announced", // 🔑 session-based venue only
                targetAudience: sub.targetAudience?.join(", ") || "TBD",
                description: sub.description || session?.description || "Overview to be announced.",
                start_time: sub.start_time || session?.start_time || null,
                end_time: sub.end_time || session?.end_time || null,
              };
            });

          setWorkshops(workshopsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const accessToken = localStorage.getItem("accessToken");
    fetchWorkshops(accessToken);
  }, []);

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,  // 🔥 ensures AM/PM format
    });
  };
  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time for slots
  // const formatTime = (isoString) => {
  //   if (!isoString) return "";
  //   return new Date(isoString).toLocaleTimeString([], {
  //     hour: "numeric",
  //     minute: "2-digit",
  //     hour12: true,
  //   });
  // };

  // Group workshops by date → then by time slot
  const groupWorkshops = (workshops) => {
    const grouped = {};

    workshops
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
      .forEach((ws) => {
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

  const groupWorkshopsByDate = (workshops) => {
    const grouped = {};

    workshops
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
      .forEach((ws) => {
        const dateKey = formatDate(ws.start_time);
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(ws);
      });

    return grouped;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const API_BASE_URL = `${baseUrl}/api/empower`;

      try {
        const res = await fetch(`${API_BASE_URL}/profile`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        // Merge top-level isCompleted into profile state
        setProfile({ ...data.data, isCompleted: data.isCompleted });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);


  const groupWorkshopsByDateAndTime = (workshops) => {
    const grouped = {};

    workshops
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
      .forEach((ws) => {
        const dateKey = `${formatDate(ws.start_time)} – ${formatTime(
          ws.start_time
        )} – ${formatTime(ws.end_time)}`;
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(ws);
      });

    return grouped;
  };

  //   const handleBookWorkshop = async () => {
  //     if (!selectedWorkshop) {
  //       alert("Please select a workshop first");
  //       return;
  //     }

  //     try {

  //       const workshop = workshops.find((w) => w._id === selectedWorkshop);

  //       if (!workshop) {
  //         alert("Workshop not found");
  //         return;
  //       }

  //       let data = await bookWorkshop({
  //         subEventId: workshop._id
  //       })





  //        if (data?.status === 200) {
  //     setBookedWorkshop(workshop);
  //     setOpen(false);
  //     setRedirectOpen(true);

  //     setTimeout(() => {
  //       setRedirectOpen(false);
  //       setSuccessOpen(true);
  //     }, 4000);
  //       } else {
  //     setOpen(false);
  //     setRedirectOpen(false);
  //     setSuccessOpen(false);
  //     setErrorMessage(data?.data?.message || "Failed to book workshop");
  //     setErrorOpen(true);
  //   }
  // } catch (err) {
  //   console.error(err);
  //   setOpen(false);
  //   setRedirectOpen(false);
  //   setSuccessOpen(false);
  //   setErrorMessage("Something went wrong while booking the workshop");
  //   setErrorOpen(true);
  // }
  //   };

  const handleBookWorkshop = async () => {
    if (!selectedWorkshops.morning && !selectedWorkshops.evening) {
      alert("Please select at least one workshop");
      return;
    }

    try {
      const bookings = [];

      for (const slot of ["morning", "evening"]) {
        if (selectedWorkshops[slot]) {
          const workshop = workshops.find(w => w._id === selectedWorkshops[slot]);
          if (!workshop) continue;

          const data = await bookWorkshop({ subEventId: workshop._id });
          if (data?.status === 200) {
            bookings.push(workshop);
          } else {
            setErrorMessage(data?.data?.message || `Failed to book ${slot} workshop`);
            setErrorOpen(true);
            return;
          }
        }
      }

      if (bookings.length > 0) {
        setBookedWorkshop(bookings);
        setOpen(false);
        setRedirectOpen(true);

        setTimeout(() => {
          setRedirectOpen(false);
          setSuccessOpen(true);
        }, 4000);
      }
    } catch (err) {
      console.error(err);
      setOpen(false);
      setRedirectOpen(false);
      setSuccessOpen(false);
      setErrorMessage("Something went wrong while booking the workshops");
      setErrorOpen(true);
    }
  };

  if (error) return <WorkshopMain>❌ Error: {error}</WorkshopMain>;

  return (
    <WorkshopMain>
      <WorkshopUpper>
        <WorkshopTitle>{process.env.REACT_APP_APP_NAME} Workshops</WorkshopTitle>
        {/* {profile?.isCompleted && (
  <RegisterButton onClick={() => setOpen(true)}>
    Register for Workshops
  </RegisterButton>
)} */}



        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="workshop-modal-title"
          aria-describedby="workshop-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              outline: "none",
            }}
          >
            <ModalBox
              role="dialog"
              aria-modal="true"
              aria-labelledby="workshop-modal-title"
              aria-describedby="workshop-modal-description"
              tabIndex={-1} // ✅ allows modal to receive initial focus
            >
              {/* Close Button */}
              <IconButton
                sx={{ position: "absolute", right: 16, top: 22, width: 56, height: 56 }}
                onClick={() => setOpen(false)}
                aria-label="Close modal"
              >
                <CloseIcon />
              </IconButton>

              {/* Upper */}
              <ModalUpper>
                <ModalHeading id="workshop-modal-title">
                  Register for Workshops
                </ModalHeading>
                <ModalSubheading id="workshop-modal-description">
                  Select the workshops you’d like to attend.
                </ModalSubheading>
              </ModalUpper>

              {/* Middle */}
              <ModalMiddle>
                {Object.entries(groupWorkshops(workshops)).map(([dateTime, wsGroup]) => (
                  <div key={dateTime} style={{ width: "100%", marginBottom: 24 }}>
                    {/* Date/Time Header */}
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "#BE8305",
                        fontFamily: "SF Pro",
                        fontSize: "14px",
                        fontWeight: 510,
                        lineHeight: "130%",
                        mb: 2,
                      }}
                    >
                      {dateTime}
                    </Typography>

                    {/* Radio group */}
                    <fieldset
                      style={{ border: "none", margin: 0, padding: 0 }}
                      aria-label={`Workshops on ${dateTime}`}
                    >
                      {wsGroup.map((ws) => (
                        <WorkshopOptionCard key={ws.id}>
                          <label
                            htmlFor={`workshop-${ws._id}`}
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            <WorkshopLeft>
                              <WorkshopTitleText>
                                Workshop {ws.id}: {ws.title}
                              </WorkshopTitleText>
                              <WorkshopVenueText>
                                Venue: {ws.venue}
                              </WorkshopVenueText>
                            </WorkshopLeft>

                            <Radio
                              id={`workshop-${ws._id}`}
                              name={`workshop-group-${dateTime}`} // grouping still per date-time
                              checked={
                                // determine slot based on start time
                                new Date(ws.start_time).getHours() >= 10 && new Date(ws.start_time).getHours() < 13
                                  ? selectedWorkshops.morning === ws._id
                                  : selectedWorkshops.evening === ws._id
                              }
                              onChange={() => {
                                const hour = new Date(ws.start_time).getHours();
                                if (hour >= 10 && hour < 13) {
                                  setSelectedWorkshops(prev => ({ ...prev, morning: ws._id }));
                                } else if (hour >= 14 && hour < 17) {
                                  setSelectedWorkshops(prev => ({ ...prev, evening: ws._id }));
                                }
                              }}
                              sx={{ width: 24, height: 24, flexShrink: 0 }}
                            />

                          </label>
                        </WorkshopOptionCard>
                      ))}
                    </fieldset>
                  </div>
                ))}
              </ModalMiddle>

              {/* Lower */}
              <ModalLower>
                <RegisterButton onClick={handleBookWorkshop}>
                  Book Workshop
                </RegisterButton>
              </ModalLower>
            </ModalBox>
          </Box>
        </Modal>




        <Modal open={successOpen} onClose={() => setSuccessOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              width: "90%", // ✅ default responsive width
              maxWidth: 425, // ✅ cap at desktop size
              padding: { xs: 2, sm: 3 }, // ✅ smaller padding on mobile
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              borderRadius: 2,
              background: "#FFF",
              boxShadow: "0 0 12px rgba(58, 105, 163, 0.25)",
            }}
          >
            {/* ✅ Close button top-right */}
            <IconButton
              onClick={() => setSuccessOpen(false)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* ✅ Container 1: Tick + text */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                width: "100%",
              }}
            >
              {/* Tick */}
              <Box
                component="span"
                sx={{
                  width: 52,
                  height: 52,
                }}
                dangerouslySetInnerHTML={{
                  __html: `
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
              <path d="M26 4C14.1 4 4 14.1 4 26C4 37.9 14.1 48 26 48C37.9 48 48 37.9 48 26C48 14.1 37.9 4 26 4ZM36.4 20.5L23.5 33.4C23.2 33.7 22.8 33.9 22.4 33.9C22 33.9 21.6 33.7 21.3 33.4L15.6 27.7C15 27.1 15 26.1 15.6 25.5C16.2 24.9 17.2 24.9 17.8 25.5L22.4 30.1L34.2 18.3C34.8 17.7 35.8 17.7 36.4 18.3C37 18.9 37 19.9 36.4 20.5Z" fill="#23A26D"/>
            </svg>
          `,
                }}
              />

              {/* Text */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: { xs: 14, sm: 16 } }}>
                  Registration successful.
                </Typography>
                {/* <Typography
          sx={{
            fontSize: { xs: 12, sm: 14 },
            color: "#555",
            textAlign: "center",
          }}
        >
          You’ve registered for the following workshops:
        </Typography> */}
              </Box>
            </Box>

            {/* <Box
      sx={{
        display: "flex",
        padding: { xs: 1.5, sm: 2 },
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 1,
        borderRadius: 2,
        border: "1px solid #D1D5DB",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ fontSize: { xs: 14, sm: 15 }, fontWeight: 600, color: "#111" }}>
        {bookedWorkshop?.title}
      </Typography>

      <Typography sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 600, color: "#333" }}>
        Venue:{" "}
        <span style={{ fontWeight: 400 }}>
          {bookedWorkshop?.venue || "To be announced"}
        </span>
      </Typography>

      <Typography sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 600, color: "#333" }}>
        Time:{" "}
        <span style={{ fontWeight: 400 }}>
          {formatTime(bookedWorkshop?.start_time)} - {formatTime(bookedWorkshop?.end_time)}
        </span>
      </Typography>
    </Box> */}
          </Box>
        </Modal>



        <Modal open={redirectOpen} onClose={() => setRedirectOpen(false)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh", // centers the modal vertically
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: 480,
                height: 249,
                padding: "49px 64px",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                borderRadius: "12px",
                background: "#fff", // only the modal has white bg
                boxShadow: "0 0 4px rgba(58, 105, 163, 0.25)",
              }}
            >
              {/* ✅ GIF container */}
              <Box
                component="img"
                src={redirectGif}
                alt="Redirecting..."
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                }}
              />

              {/* ✅ Text */}
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  textAlign: "center",
                  color: "#333",
                  mt: 2,
                }}
              >
                Please wait while we confirm your seat.
              </Typography>
            </Box>
          </Box>
        </Modal>


        <Modal open={errorOpen} onClose={() => setErrorOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "90%",
              maxWidth: 400,
              padding: 3,
              borderRadius: 2,
              background: "#FFF",
              boxShadow: "0 0 12px rgba(220, 38, 38, 0.25)", // red shadow
              textAlign: "center",
              gap: 2,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 16, color: "#DC2626" }}>
              Booking Failed
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#444" }}>
              {errorMessage}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setErrorOpen(false)}
              sx={{ background: "#DC2626", "&:hover": { background: "#B91C1C" } }}
            >
              Close
            </Button>
          </Box>
        </Modal>

        <WorkshopDescription>
          On 3rd October 2026, EMPOWER 2026 presents a thoughtfully curated workshop series that blends hands-on learning with collaborative problem-solving. Each session dives deep into emerging domains from clinical validation and universal design to inclusive STEM content and grassroots innovation. Designed to foster cross-sector dialogue and build practical skills, these workshops place the lived experiences of persons with disabilities at the center of every conversation. Whether you're a startup founder, special educator, policymaker, or program manager, you’re invited to engage, prototype, and lead with empathy and impact.
        </WorkshopDescription>
      </WorkshopUpper>
      {userData?.paymentStatus && (
        <RegisterButton onClick={() => setOpen(true)}>
          Register for Workshops
        </RegisterButton>
      )}

      <WorkshopLower>
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <WorkshopWrapper>
                <WorkshopSubtitle>Loading Workshop...</WorkshopSubtitle>
                <ShimmerCard />
              </WorkshopWrapper>
            </motion.div>
          ))
          : [...workshops] // copy array
            .sort((a, b) => a.id - b.id) // ✅ sort by id in ascending order
            .map((ws, idx) => (
              <motion.div
                key={ws.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <WorkshopWrapper>
                  <WorkshopSubtitle>Workshop {idx + 1}</WorkshopSubtitle>
                  <WorkshopCard>
                    <WorkshopHeading>{ws.title}</WorkshopHeading>
                    <WorkshopSpeaker>
                      Knowledge Contributor: {ws.speaker}
                    </WorkshopSpeaker>
                    {ws.moderator && (
                      <KnowledgeLabel>Moderator: {ws.moderator}</KnowledgeLabel>
                    )}
                    {ws.organiser && (
                      <KnowledgeLabel>Organiser: {ws.organiser}</KnowledgeLabel>
                    )}
                    {ws.venue && (
                      <KnowledgeLabel>Venue: {ws.venue}</KnowledgeLabel>
                    )}

                    {ws.start_time && ws.end_time && (
                      <KnowledgeLabel>
                        Timing: {formatTime(ws.start_time)} -{" "}
                        {formatTime(ws.end_time)}
                      </KnowledgeLabel>
                    )}

                    <OverviewTitle>Overview</OverviewTitle>
                    <OverviewText>{ws.description}</OverviewText>
                  </WorkshopCard>
                </WorkshopWrapper>
              </motion.div>
            ))}
      </WorkshopLower>

    </WorkshopMain>
  );
};

export default Workshop;
