import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Collapse,
  Divider,
} from "@mui/material";

import {
  FreeBreakfast as TeaIcon,
  Restaurant as DinnerIcon,
  LunchDining as LunchIcon,
  Event as EventIcon,
} from "@mui/icons-material";

const baseUrl = process.env.NODE_ENV === "development" ? (process.env.REACT_APP_LOCAL_URL || "http://localhost:8000") : (process.env.REACT_APP_REMOTE_URL || "https://maps.iwayplus.in");

const Summary = () => {
  console.log("MUI Imports:", {
    Box,
    Typography,
    TextField,
    Chip,
    Card,
    CardContent,
    CircularProgress,
    Stack,
    Collapse,
    Divider,
    TeaIcon,
    DinnerIcon,
    LunchIcon,
    EventIcon
  });
  const [sessions, setSessions] = useState([]);
  const [subEvents, setSubEvents] = useState([]);
  const [filteredData, setFilteredData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dayFilter, setDayFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const formatTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return "";
    const date = new Date(`${dateStr.split("T")[0]}T${timeStr}:00`);
    if (isNaN(date)) return "";
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = ((hours + 11) % 12) + 1;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
  };

  const resolvePhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    if (photoPath.startsWith('http')) return photoPath;
    
    let cleanPath = photoPath;
    if (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.slice(1);
    }
    if (cleanPath.startsWith('uploads/')) {
      cleanPath = cleanPath.substring(8);
    }
    
    return `${baseUrl}/uploads/${encodeURIComponent(cleanPath)}`;
  };

const nonExpandableTypes = ["tea", "lunch", "dinner", "registration"];

  // Get sorted unique dates from sessions
  const uniqueDates = Array.from(
    new Set(
      sessions
        .map((s) => s.date ? s.date.split("T")[0] : null)
        .filter(Boolean)
    )
  ).sort();

  const getDay = (dateStr) => {
    if (!dateStr) return "";
    const datePart = dateStr.split("T")[0];
    const index = uniqueDates.indexOf(datePart);
    if (index !== -1) {
      return `day${index + 1}`;
    }
    return "";
  };

  const getDayHeader = (dayKey) => {
    if (dayKey === "all") return "All Days";
    const dayIndex = parseInt(dayKey.replace("day", ""), 10) - 1;
    if (dayIndex >= 0 && dayIndex < uniqueDates.length) {
      const dateStr = uniqueDates[dayIndex];
      const dateObj = new Date(dateStr);
      const dayName = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
      return `Day ${dayIndex + 1} - ${dayName}`;
    }
    return "";
  };

  const dayChips = [
    { key: "all", label: "All Days" },
    ...uniqueDates.map((dateStr, index) => {
      const dateObj = new Date(dateStr);
      const dayName = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
      return {
        key: `day${index + 1}`,
        label: `${dayName} - Day ${index + 1}`,
      };
    })
  ];

  const getIconForSession = (type) => {
    if (!type) return <EventIcon />;
    const lower = type.toLowerCase();
    if (lower.includes("tea")) return <TeaIcon sx={{ color: "#8B4513" }} />;
    if (lower.includes("lunch")) return <LunchIcon sx={{ color: "#FF9800" }} />;
    if (lower.includes("dinner")) return <DinnerIcon sx={{ color: "#D32F2F" }} />;
    return <EventIcon sx={{ color: "#1976d2" }} />;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = (process.env.REACT_APP_IWAY_API_KEY || "").replace(/^"(.*)"$/, '$1');
        const res = await fetch(
          `${baseUrl}/secured/event/all-session/${process.env.REACT_APP_PROJECT_ID}?api_key=${apiKey}`
        );
        const data = await res.json();
        setSessions(data.data || []);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubEvents = async () => {
      try {
        const apiKey = (process.env.REACT_APP_IWAY_API_KEY || "").replace(/^"(.*)"$/, '$1');
        const res = await fetch(
          `${baseUrl}/secured/event/all-subEvent/${process.env.REACT_APP_PROJECT_ID}?api_key=${apiKey}`
        );
        const data = await res.json();
        setSubEvents(data.data || []);
      } catch (err) {
        console.error("Error fetching sub-events:", err);
      }
    };
    fetchSubEvents();
  }, []);

  useEffect(() => {
    let data = [...sessions];

    if (dayFilter !== "all") {
      data = data.filter((item) => getDay(item.date) === dayFilter);
    }

    if (searchQuery.trim() !== "") {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    data.sort((a, b) => {
      const dateA =
        a.date && a.start_time
          ? new Date(`${a.date.split("T")[0]}T${a.start_time}:00`)
          : new Date();
      const dateB =
        b.date && b.start_time
          ? new Date(`${b.date.split("T")[0]}T${b.start_time}:00`)
          : new Date();
      return dateA - dateB;
    });

    const grouped = {};
    data.forEach((session) => {
      const keyDate = session.date ? session.date.split("T")[0] : "no_date";
      const keyTime = session.start_time || session._id;
      const key = keyDate + "_" + keyTime;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(session);
    });

    setFilteredData(grouped);
  }, [dayFilter, searchQuery, sessions]); // uniqueDates is derived from sessions, no need to list separately

  const handleToggleExpand = (sessionId) => {
    setExpandedId((prev) => (prev === sessionId ? null : sessionId));
  };

  const handleKeyDown = (e, sessionId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleExpand(sessionId);
    }
  };

  const getSubEventsForSession = (session) => {
    return subEvents
      .filter(
        (se) =>
          se.sessionName?.toLowerCase().includes(session.title?.toLowerCase()) ||
          se.sessionId === session._id
      )
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", m: "auto", mt: 5 }} />;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: { xs: '100%', md: '90%' }, mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600,fontSize: 36, mb: 3, textAlign: "left", fontFamily: "Poppins" }}
      >
        Conference Agenda
      </Typography>

      {/* Filters */}
    <Stack
  direction={{ xs: "column", sm: "row" }} 
  spacing={2}
  justifyContent={{ xs: "flex-start", sm: "space-between" }} 
  mb={4}
>
  <Stack
    direction="row"
    spacing={1}
    flexWrap="wrap"
    sx={{ gap: 1 }} 
  >
    {dayChips.map((chip) => (
      <Chip
        key={chip.key}
        label={chip.label}
        clickable
        color={dayFilter === chip.key ? "primary" : "default"}
        onClick={() => setDayFilter(chip.key)}
        role="button"
        aria-pressed={dayFilter === chip.key}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDayFilter(chip.key);
          }
        }}
      />
    ))}
  </Stack>

  <TextField
    size="small"
    placeholder="Search sessions..."
    onChange={(e) => setSearchQuery(e.target.value)}
    sx={{ minWidth: { xs: "100%", sm: 240 }, mt: { xs: 1, sm: 0 } }}
    inputProps={{ "aria-label": "Search sessions" }}
  />
</Stack>


      {/* Session Cards */}
{Object.entries(
  // Group sessions by day first
  Object.entries(filteredData).reduce((acc, [timeKey, sessions]) => {
    const day = getDay(sessions[0]?.date); // "day1" | "day2" | "day3"
    if (!acc[day]) acc[day] = [];
    acc[day].push([timeKey, sessions]);
    return acc;
  }, {})
).map(([dayKey, daySessions]) => (
  <Box key={dayKey} sx={{ mb: 6, width: "100%" }}>
    {/* 🔹 Day Header */}
  {/* 🔹 Day Header - show only if All Days is selected */}
{dayFilter === "all" && (
  <Typography
    variant="h5"
    sx={{ fontWeight: 500, mb: 3, fontFamily: "Poppins" }}
  >
    {getDayHeader(dayKey)}
  </Typography>
)}


    {/* 🔹 Loop over time slots for this day */}
    {daySessions.map(([timeKey, sessions]) => {
      const first = sessions[0];
      const groupStartTime = first.start_time;
      const groupEndTime = sessions[sessions.length - 1].end_time || first.end_time;

      return (
        <Box
          key={timeKey}
          sx={{
            display: { xs: "block", md: "flex" },
            flexDirection: { md: "row" },
            alignItems: { md: "flex-start" },
            gap: { md: 4 },
            mb: 6,
            width: "100%",
          }}
          role="group"
          aria-label={`Time slot ${formatTime(first.date, groupStartTime)} to ${formatTime(first.date, groupEndTime)}, ${sessions.length} sessions`}
        >
          {/* Time Column */}
          <Box
            id={`time-label-${timeKey}`}
            sx={{
              width: { xs: "100%", md: 160 },
              flexShrink: 0,
              textAlign: { xs: "left", md: "right" },
              mb: { xs: 1, md: 0 },
              mt: { md: 1 },
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontFamily: "Poppins" }}
            >
              {formatTime(first.date, groupStartTime)} - {formatTime(first.date, groupEndTime)}
            </Typography>
          </Box>

          {/* Session Cards */}
          <Box
            sx={{ flex: 1, width: "100%", minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}
            aria-labelledby={`time-label-${timeKey}`}
          >
            {sessions.map((session) => {
              const expanded = expandedId === session._id;
              const subEventsForCard = getSubEventsForSession(session);
              const isExpandable = !nonExpandableTypes.some((type) =>
                session.session_type?.toLowerCase().includes(type)
              );

              return (
                <Card
                  key={session._id}
                  role={isExpandable ? "button" : "region"}
                  tabIndex={isExpandable ? 0 : -1}
                  aria-expanded={isExpandable ? expanded : undefined}
                  aria-controls={isExpandable ? `session-details-${session._id}` : undefined}
                  aria-label={`${session.title}, ${subEventsForCard.length} sub-events`}
                  onClick={isExpandable ? () => handleToggleExpand(session._id) : undefined}
                  onKeyDown={isExpandable ? (e) => handleKeyDown(e, session._id) : undefined}
                  sx={{
                    width: "100%",
                    boxSizing: "border-box",
                    minWidth: 0,
                    minHeight: 100,
                    borderRadius: 4,
                    boxShadow: 6,
                    transition: "0.3s",
                    cursor: isExpandable ? "pointer" : "default",
                    "&:hover": isExpandable ? { boxShadow: 10, transform: "translateY(-4px)" } : {},
                    borderLeft: "6px solid #FFD700",
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
                      {getIconForSession(session.session_type)}
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, fontFamily: "Poppins" }}>
                        {session.title}
                      </Typography>
                    </Stack>

                    {session.photo && (
                      <Box
                        component="img"
                        src={resolvePhotoUrl(session.photo)}
                        alt={session.title}
                        sx={{
                          width: "100%",
                          maxHeight: 180,
                          objectFit: "cover",
                          borderRadius: 2,
                          mb: 2,
                        }}
                      />
                    )}

                    {session.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1, whiteSpace: "pre-line" }}>
                        {session.description}
                      </Typography>
                    )}

                    {session.location_name && (
                      <Typography variant="body2" color="text.secondary">
                        📍 {session.location_name}
                      </Typography>
                    )}

                    {session.moderator?.length > 0 && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {session.moderator.map((m) => m.moderatorName).join(", ")}
                      </Typography>
                    )}

                    {session.sessionChair?.length > 0 && (
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        <strong>Session Chair:</strong>{" "}
                        {session.sessionChair.map((c) => c.sessionChairName).join(", ")}
                      </Typography>
                    )}
                  </CardContent>

                  {isExpandable && (
                    <Collapse
                      in={expanded}
                      timeout="auto"
                      unmountOnExit
                      id={`session-details-${session._id}`}
                      aria-live="polite"
                    >
                      <Divider />
                      <Box sx={{ p: 2, bgcolor: "#fafafa" }}>
                        {subEventsForCard.length > 0 ? (
                          subEventsForCard.map((se) => (
                            <Box key={se._id} sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {se.title}
                              </Typography>
                              <Typography variant="body2" sx={{ whiteSpace: "pre-line", mb: 1 }}>
                                {se.description}
                              </Typography>
                              {se.speakers?.length > 0 && (
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    Speakers:
                                  </Typography>
                                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                                    {se.speakers.map((s) => (
                                      <li key={s._id}>
                                        <Typography variant="body2">{s.speakerName}</Typography>
                                      </li>
                                    ))}
                                  </ul>
                                </Box>
                              )}
                              <Divider sx={{ mt: 1 }} />
                            </Box>
                          ))
                        ) : (
                          <Typography>No additional details available.</Typography>
                        )}
                      </Box>
                    </Collapse>
                  )}
                </Card>
              );
            })}
          </Box>
        </Box>
      );
    })}
  </Box>
))}


    </Box>
  );
};

export default Summary;
