// src/components/InvitedSpeaker.js
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import defaultSpeaker from "../../assets/default.png";
import { Button, Typography } from "@mui/material";

import { baseUrl, projectId } from "../../services/api";

const API_URL = `${baseUrl}/secured/event/all-speaker/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`;

const tagmaps = {
  "panel": "Panelist",
  "workshop speaker": "Workshop Organizer",
  "invited speaker": "Invited speaker"
}
const InvitedSpeaker = () => {
  const [speakers, setSpeakers] = useState([]);
  const [selected, setSelected] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.status && Array.isArray(data.data)) {
          const filtered = data.data.filter((spk) =>
            spk.type?.includes("invited speaker") ||
            spk.type?.includes("workshop speaker") ||
            spk.type?.includes("panel")
          );
          setSpeakers(filtered);
          if (filtered.length > 0) setSelected(filtered[0]);
        }
      } catch (err) {
        console.error("Error fetching speakers:", err);
      }
    };
    fetchSpeakers();
  }, []);

  const getImageUrl = (photo) =>
    photo
      ? `url("${baseUrl}/uploads/${encodeURIComponent(photo)}") lightgray 50% / cover no-repeat`
      : `url("${defaultSpeaker}") lightgray 50% / cover no-repeat`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        minHeight: "100vh",
        background: "#F9FAFB",
        flexWrap: "wrap",
      }}
    >
      {/* ---------- SIDE PANEL (Desktop Only) ---------- */}
      <aside
        style={{
          display: window.innerWidth >= 768 ? "flex" : "none",
          flexDirection: "column",
          background: "#FFF",
          boxShadow: "0 12px 12px 0 rgba(0, 0, 0, 0.10)",
          borderRight: "1px solid #D1D5DB",
          flexShrink: 0,
          width: "320px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "24px 16px" }}>
          <h2
            style={{
              color: "#1C170D",
              fontFamily: "Poppins, sans-serif",
              fontSize: "18px",
              fontWeight: 500,
              margin: 0,
            }}
          >
            All Speakers
          </h2>
        </div>

        {speakers.map((spk) => (
          <motion.div
            key={spk._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              minHeight: "72px",
              padding: "12px 16px",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #D1D5DB",
              cursor: "pointer",
              background: selected?._id === spk._id ? "rgba(0,0,0,0.04)" : "transparent",
            }}
            onClick={() => {
              sectionRefs.current[spk._id]?.scrollIntoView({ behavior: "smooth", block: "start" });
              setSelected(spk);
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  border: "1px solid #D1D5DB",
                  background: getImageUrl(spk.photo_url),
                }}
              ></div>
              {/* SIDE PANEL name + designation + org */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "180px", overflow: "hidden" }}>
                <span
                  style={{
                    color: "#1C170D",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "17px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {spk.full_name}
                </span>

                {(spk.designation || spk.organization) && (
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {/* designation lighter */}
                    {spk.designation && (
                      <span style={{ color: "#4B5563", fontWeight: 400 }}>
                        {spk.designation}
                      </span>
                    )}
                    {spk.designation && spk.organization && ", "}
                    {/* organization darker */}
                    {spk.organization && (
                      <span style={{ color: "#1C170D", fontWeight: 500 }}>
                        {spk.organization}
                      </span>
                    )}
                  </span>
                )}
              </div>

            </div>
          </motion.div>
        ))}
      </aside>

      <main
        style={{
          flex: 1,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          overflowY: "auto",
          width: window.innerWidth < 768 ? "100%" : "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "400px" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "36px", fontWeight: 600, margin: 0 }}>
            Speakers
          </h2>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 400, margin: 0, color: "#4A4A4A" }}>
            Meet the experts joining Empower 2026.
          </p>
        </div>

        {speakers.map((spk, idx) => (
          <motion.div
            key={spk._id}
            ref={(el) => (sectionRefs.current[spk._id] = el)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              flexWrap: "wrap",
              borderBottom: "1px solid #D1D5DB",
              paddingBottom: "24px",
            }}
          >
            {/* Image */}
            <div
              style={{
                width: "180px",
                aspectRatio: "1/1",
                borderRadius: "20px",
                border: "1px solid #D1D5DB",
                background: getImageUrl(spk.photo_url),
                flexShrink: 0,
              }}
            ></div>

            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, minWidth: "250px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 600, color: "#1C170D" }}>
                  {spk.title ? `${spk.title} ${spk.full_name}` : spk.full_name}
                </h3>
                {(spk.designation || spk.organization) && (
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      lineHeight: "21px",
                    }}
                  >
                    {spk.designation && (
                      <span style={{ color: "#4B5563", fontWeight: 400 }}>
                        {spk.designation}
                      </span>
                    )}
                    {spk.designation && spk.organization && ", "}
                    {spk.organization && (
                      <span style={{ color: "#1C170D", fontWeight: 500 }}>
                        {spk.organization}
                      </span>
                    )}
                  </p>
                )}
                {
                  Object.keys(tagmaps).map(key => {
                    if (spk.type.includes(key)) return (
                      <Button
                        variant="outlined"
                        size="small" sx={{
                          mt: 1,
                          borderRadius: 3,
                          textTransform: "none",
                          fontSize: "13px",
                          width: 'max-content',
                          px: 2.5,
                          fontFamily: "Poppins",
                          borderColor: "#6366f1",
                          color: "#6366f1",
                          transition: "all 0.3s ease"
                        }}>
                        {tagmaps[key]}
                      </Button>
                    )
                  })
                }
                {spk.linkedin && (
                  <a href={spk.linkedin} target="_blank" rel="noreferrer" style={{ color: "#0A66C2", fontFamily: "Poppins, sans-serif", fontSize: "14px" }}>
                    LinkedIn
                  </a>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ color: "#000", fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 500 }}>About</span>
                <p style={{ margin: 0, color: "#4A4A4A", fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 400, lineHeight: "170%" }}>
                  {spk.short_bio || "No bio available."}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default InvitedSpeaker;
