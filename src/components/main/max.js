import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import {
  FreeBreakfast as TeaIcon,
  Restaurant as DinnerIcon,
  LunchDining as LunchIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";

const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const formattedHours = ((hours + 11) % 12) + 1;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
};

const getIconForSession = (session) => {
  const title = session.title.toLowerCase();
  if (title.includes("tea"))
    return <TeaIcon sx={{ fontSize: 24, color: "goldenrod" }} />;
  if (title.includes("dinner"))
    return <DinnerIcon sx={{ fontSize: 24, color: "goldenrod" }} />;
  if (title.includes("lunch"))
    return <LunchIcon sx={{ fontSize: 24, color: "goldenrod" }} />;
  return <EventIcon sx={{ fontSize: 24, color: "goldenrod" }} />;
};

const getOrdinalDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-GB", { month: "short" });

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  return `${day}${suffix} ${month}`;
};

const Max = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("2026-10-02");
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(
          `https://maps.iwayplus.in/secured/event/all-session/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
        );
        const data = await res.json();
        if (data.status) setSessions(data.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);
  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress role="status" aria-label="Loading schedule" />
      </Box>
    );

  const sessionsByDate = sessions.reduce((acc, session) => {
    const date = session.date.split("T")[0];
    if (!acc[date]) acc[date] = {};
    const timeKey = `${session.start_time} - ${session.end_time}`;
    if (!acc[date][timeKey]) acc[date][timeKey] = [];
    acc[date][timeKey].push(session);
    return acc;
  }, {});

  Object.keys(sessionsByDate).forEach((date) => {
    const sorted = Object.entries(sessionsByDate[date]).sort(([a], [b]) =>
      a.localeCompare(b)
    );
    sessionsByDate[date] = Object.fromEntries(sorted);
  });

  const conferenceDays = ["2026-10-02", "2026-10-03", "2026-10-04"];

  return (
    <Box sx={{ px: 3, py: 5, backgroundColor: "#fafafa" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 4,
          ml: 2,
        }}
      >
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
          Schedule Summary
        </Typography>

        {/* Accessible Arrow Button */}
        <Box
          role="button"
          tabIndex={0}
          aria-label="View detailed agenda"
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
            const isMobile = /Mobi|Android/i.test(navigator.userAgent);

            if (isMobile) {
              const confirmRedirect = window.confirm(
                "Continue on app for detailed schedule?"
              );
              if (confirmRedirect) {
                window.open(process.env.REACT_APP_APP_URL, "_blank", "noopener,noreferrer");
              }
            } else {
              const isLocal = window.location.hostname === "localhost";
              const targetUrl = isLocal
                ? "http://localhost:3000/empower-schedule"
                : "https://empowerconference.in/empower-schedule";
              window.location.href = targetUrl;
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              const isMobile = /Mobi|Android/i.test(navigator.userAgent);

              if (isMobile) {
                const confirmRedirect = window.confirm(
                  "Continue on app for detailed schedule?"
                );
                if (confirmRedirect) {
                  window.open(process.env.REACT_APP_APP_URL, "_blank", "noopener,noreferrer");
                }
              } else {
                const isLocal = window.location.hostname === "localhost";
                const targetUrl = isLocal
                  ? "http://localhost:3000/empower-schedule"
                  : "https://empowerconference.in/empower-schedule";
                window.location.href = targetUrl;
              }
            }
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

      <Box
        role="tablist"
        aria-label="Conference days"
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          ml: 1.5,
          flexWrap: "wrap",
          rowGap: 1,
          overflowX: { xs: "auto", sm: "visible" },
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {conferenceDays.map((day) => {
          const isSelected = selectedDate === day;
          return (
            <Chip
              key={day}
              role="tab"
              aria-selected={isSelected}
              aria-label={`${getOrdinalDate(day)} ${isSelected ? ", selected" : ""
                }`}
              label={getOrdinalDate(day)}
              onClick={() => setSelectedDate(day)}
              sx={{
                fontFamily: "Poppins",
                fontWeight: 500,
                cursor: "pointer",
                borderRadius: 2,
                px: 2.5,
                py: 1,
                fontSize: 14,
                backgroundColor: isSelected
                  ? "#FFD700"
                  : "rgba(255,215,0,0.2)",
                color: isSelected ? "#000" : "#555",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "#FFC107",
                  color: "#000",
                },
              }}
            />
          );
        })}
      </Box>

      {/* Sessions */}
      <Box>
        {Object.entries(sessionsByDate[selectedDate] || {}).map(
          ([timeRange, timeSessions]) => {
            const [start, end] = timeRange.split(" - ");
            return (
              <Box
                key={timeRange}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: { xs: 1, sm: 2 },
                  mb: 5,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Box
                  sx={{
                    minWidth: { xs: "auto", sm: 120 },
                    textAlign: { xs: "left", sm: "right" },
                    mb: { xs: 1, sm: 0 },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontFamily: "Poppins",
                      color: "#333",
                      display: "flex",
                      flexDirection: "row",
                      gap: 0.5,
                    }}
                    aria-label={`From ${formatTime(start)} to ${formatTime(
                      end
                    )}`}
                  >
                    <span>{formatTime(start)}</span>-<span>{formatTime(end)}</span>
                  </Typography>
                </Box>


                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    flex: 1,
                  }}
                >
                  {timeSessions.map((session) => (
                    <Card
                      key={session._id}
                      role="article"
                      tabIndex={0}
                      // aria-labelledby={`session-title-${session._id}`}   // 🔹 Screen reader will only announce this
                      sx={{
                        flex: "1 1 280px",
                        borderRadius: 3,
                        overflow: "hidden",
                        position: "relative",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "translateY(-6px)" },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "5px",
                          height: "100%",
                          background: "linear-gradient(180deg, #FFD700, #FFC107)",
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(90deg, rgba(255,215,0,0.15), transparent)",
                          opacity: 0,
                          transition: "opacity 0.4s ease",
                        },
                        "&:hover::after": { opacity: 1 },
                      }}
                    >
                      <CardContent sx={{ p: 3 }} aria-label={
                        session.location_name 
                          ? `${session.title}, Location, ${session.location_name}`
                          : session.title
                      }>  {/* 🔹 Hide inner content */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                            aria-hidden="true"
                          >
                            {getIconForSession(session)}
                          </Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: "#222",
                              fontFamily: "Poppins",
                            }}
                            aria-hidden="true"
                          >
                            {session.title}
                          </Typography>
                        </Box>
                        {session.location_name &&
                          session.location_name.trim() !== "" && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                              aria-hidden="true"
                            >
                              <LocationIcon sx={{ fontSize: 18, color: "#555" }} />
                              <Typography
                                variant="body2"
                                sx={{ fontFamily: "Poppins", color: "#555" }}
                              >
                                {session.location_name}
                              </Typography>
                            </Box>
                          )}
                      </CardContent>
                    </Card>

                  ))}
                </Box>
              </Box>
            );
          }
        )}
      </Box>
    </Box>
  );
};

export default Max;
