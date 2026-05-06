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

const Summary = () => {
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
const nonExpandableTypes = ["tea", "lunch", "dinner", "registration"];


  const getDay = (dateStr) => {
    if (!dateStr) return "";
    const day = new Date(dateStr).getUTCDate();
    if (day === 2) return "day1";
    if (day === 3) return "day2";
    if (day === 4) return "day3";
    return "";
  };

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
        const res = await fetch(
          `https://maps.iwayplus.in/secured/event/all-session/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
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
        const res = await fetch(
          `https://maps.iwayplus.in/secured/event/all-subEvent/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
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
  }, [dayFilter, searchQuery, sessions]);

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
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '90%', mx: "auto" }}>
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
    {[
      { key: "all", label: "All Days" },
      { key: "day1", label: "Oct 2 - Day 1" },
      { key: "day2", label: "Oct 3 - Day 2" },
      { key: "day3", label: "Oct 4 - Day 3" },
    ].map((chip) => (
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


{Object.entries(filteredData).map(([timeKey, sessions]) => {
  const first = sessions[0];
  
  const groupStartTime = first.start_time;
  const groupEndTime = sessions[sessions.length - 1].end_time || first.end_time;

  return (
    <Stack
      key={timeKey}
      direction={{ xs: "column", md: "row" }}
      spacing={4}
      mb={6}
      alignItems={{ xs: "flex-start", md: "flex-start" }}
      sx={{ width: "100%" }}
      role="group"
      aria-label={`Time slot ${formatTime(first.date, groupStartTime)} to ${formatTime(first.date, groupEndTime)}, ${sessions.length} sessions`}
    >
      <Box
        sx={{
          width: { xs: "100%", md: 160 },
          textAlign: { xs: "center", md: "right" },
          mt: { xs: 0, md: 1 },
          mb: { xs: 2, md: 0 },
          flexShrink: 0,
        }}
      >
        <Typography
          variant="body1"
          id={`time-label-${timeKey}`}
          sx={{ fontWeight: 600, fontFamily: "Poppins" }}
        >
          {formatTime(first.date, groupStartTime)} - {formatTime(first.date, groupEndTime)}
        </Typography>
      </Box>

      <Stack
        direction="column"
        spacing={4}
        flex={1}
        sx={{ width: "100%" }}
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
                {session.location_name && (
                  <Typography variant="body2" color="text.secondary">
                    📍 {session.location_name}
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
    sx={{ width: "100%" }} 
  >
    <Divider />
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fafafa",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      {subEventsForCard.length > 0 ? (
        subEventsForCard.map((se) => (
          <Box key={se._id} sx={{ mb: 2, width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, wordBreak: "break-word" }}
            >
              {se.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ whiteSpace: "pre-line", mb: 1, wordBreak: "break-word", width: "100%" }}
            >
              {se.description}
            </Typography>
            {se.speakers?.length > 0 && (
              <Box sx={{ width: "100%" }}>
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
      </Stack>
    </Stack>
  );
})}
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
  <Box key={dayKey} sx={{ mb: 6 }}>
    {/* 🔹 Day Header */}
  {/* 🔹 Day Header - show only if All Days is selected */}
{dayFilter === "all" && (
  <Typography
    variant="h5"
    sx={{ fontWeight: 500, mb: 3, fontFamily: "Poppins" }}
  >
    {dayKey === "day1" && "Day 1 - Oct 2"}
    {dayKey === "day2" && "Day 2 - Oct 3"}
    {dayKey === "day3" && "Day 3 - Oct 4"}
  </Typography>
)}


    {/* 🔹 Loop over time slots for this day */}
    {daySessions.map(([timeKey, sessions]) => {
      const first = sessions[0];
      const groupStartTime = first.start_time;
      const groupEndTime = sessions[sessions.length - 1].end_time || first.end_time;

      return (
        <Stack
          key={timeKey}
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          mb={6}
          alignItems={{ xs: "flex-start", md: "flex-start" }}
          sx={{ width: "100%" }}
          role="group"
          aria-label={`Time slot ${formatTime(first.date, groupStartTime)} to ${formatTime(first.date, groupEndTime)}, ${sessions.length} sessions`}
        >
          {/* Time Column */}
          <Box
            sx={{
              width: { xs: "100%", md: 160 },
              textAlign: { xs: "center", md: "right" },
              mt: { xs: 0, md: 1 },
              mb: { xs: 2, md: 0 },
              flexShrink: 0,
            }}
          >
            <Typography
              variant="body1"
              id={`time-label-${timeKey}`}
              sx={{ fontWeight: 600, fontFamily: "Poppins" }}
            >
              {formatTime(first.date, groupStartTime)} - {formatTime(first.date, groupEndTime)}
            </Typography>
          </Box>

          {/* Session Cards */}
          <Stack
            direction="column"
            spacing={4}
            flex={1}
            sx={{ width: "100%" }}
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
          </Stack>
        </Stack>
      );
    })}
  </Box>
))}


    </Box>
  );
};

export default Summary;
