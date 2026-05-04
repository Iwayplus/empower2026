import React, { useState } from "react";
import useDriveImages from "../hooks/useDriveImages";
import { Typography } from "@mui/material"; // ✅ import MUI Typography

const MasonryGrid = ({ images, onOpenAt }) => (
  <div style={{ columnCount: 3, columnGap: "12px" }}>
    {images.map((src, i) => (
      <FadeImage key={i} src={src} onClick={() => onOpenAt(i)} />
    ))}
  </div>
);

const FadeImage = ({ src, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ marginBottom: "12px", breakInside: "avoid", cursor: "pointer" }}>
      <img
        src={src}
        onLoad={() => setLoaded(true)}
        onClick={onClick}
        style={{
          width: "100%",
          borderRadius: "12px",
          transition: "opacity .6s ease, transform .4s ease",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "scale(1)" : "scale(1.05)",
          boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
        }}
      />
    </div>
  );
};

const ImageModal = ({ images, startIndex, onClose }) => {
  const [index, setIndex] = useState(startIndex);

  return (
    <div style={modal}>
      <img src={images[index]} style={modalImg} />

      <button style={closeBtn} onClick={onClose}>✕</button>
      <button style={leftBtn} onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}>‹</button>
      <button style={rightBtn} onClick={() => setIndex((i) => (i + 1) % images.length)}>›</button>
    </div>
  );
};

const modal = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.85)",
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99999,
};

const modalImg = {
  maxHeight: "85vh",
  maxWidth: "92vw",
  borderRadius: "16px",
  objectFit: "contain",
  boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
};

const btnBase = {
  position: "absolute",
  border: "none",
  fontSize: "36px",
  cursor: "pointer",
  padding: "10px 18px",
  borderRadius: "50%",
  background: "rgba(255,255,255,.25)",
  color: "#fff",
  backdropFilter: "blur(8px)",
};

const leftBtn = { ...btnBase, left: "22px" };
const rightBtn = { ...btnBase, right: "22px" };
const closeBtn = { ...btnBase, top: "20px", right: "20px" };

const Gallery = () => {
  const images = useDriveImages();
  const [modal, setModal] = useState({ open: false, index: 0 });

  if (!images.length) return <p style={{ textAlign: "center" }}>Loading gallery...</p>;

  return (
    <div style={{ display: "grid", gap: "20px", padding: "0px 20px" }}>
<Typography
  variant="h4"
  component="h2"
  sx={{
    fontWeight: 600,
    color: "#000",
    lineHeight: "130%",
    fontFamily: "Poppins",
    mb: 4,
    textAlign: "left",
    px: { xs: 2, sm: 4, md: 8 }, 
    mt: { xs: 4, md: 6 }
  }}
>
  EMPOWER 2025 Highlights
</Typography>



      <MasonryGrid
        images={images}
        onOpenAt={(i) => setModal({ open: true, index: i })}
      />

      {modal.open && (
        <ImageModal
          images={images}
          startIndex={modal.index}
          onClose={() => setModal({ open: false })}
        />
      )}
    </div>
  );
};

export default Gallery;
