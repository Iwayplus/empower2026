import React, { useState, useEffect, useRef } from "react";
import useDriveImages from "../hooks/useDriveImages";
import { Typography } from "@mui/material"; // ✅ import MUI Typography
import { fetchPublicDynamicSections, baseUrl, projectId } from "../../services/api";

const GalleryGrid = ({ images, onOpenAt }) => (
  <section aria-label="Photo gallery" className="gallery-grid">
    {images.map((src, i) => (
      <FadeImage key={i} src={src} index={i} total={images.length} onClick={() => onOpenAt(i)} />
    ))}
  </section>
);

const FadeImage = ({ src, onClick, index, total }) => {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Open gallery image ${index + 1} of ${total}`}
      style={{
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: "12px",
        aspectRatio: "4/3",
        boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
        backgroundColor: "#f5f5f5",
        position: "relative",
        padding: 0,
        border: "none",
        display: "block",
        width: "100%",
      }}
    >
      <img
        src={src}
        alt={`Gallery photo ${index + 1}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity .6s ease, transform .4s ease",
          opacity: loaded ? 1 : 0,
          transform: loaded ? (hovered ? "scale(1.06)" : "scale(1)") : "scale(1.05)",
        }}
      />
    </button>
  );
};

const ImageModal = ({ images, startIndex, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const closeRef = useRef(null);

  // Trap focus inside modal and close on Escape
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      // Focus trap: keep Tab within modal
      if (e.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) { e.preventDefault(); return; }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [images.length, onClose]);

  const modalRef = useRef(null);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer — photo ${index + 1} of ${images.length}`}
      style={modal}
    >
      <img
        src={images[index].replace("&sz=w600", "&sz=w1600")}
        alt={`Gallery photo ${index + 1} of ${images.length}`}
        decoding="async"
        style={modalImg}
      />

      <button ref={closeRef} style={closeBtn} aria-label="Close image viewer" onClick={onClose}>✕</button>
      <button style={leftBtn} aria-label="Previous image" onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}>‹</button>
      <button style={rightBtn} aria-label="Next image" onClick={() => setIndex((i) => (i + 1) % images.length)}>›</button>
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
  const [modal, setModal] = useState({ open: false, index: 0 });
  const [dynamicSection, setDynamicSection] = useState(null);
  const [dynamicSectionsLoaded, setDynamicSectionsLoaded] = useState(false);

  const cmsImages = dynamicSection?.content?.images?.length > 0
    ? dynamicSection.content.images.map(img => `${baseUrl}/uploads/${encodeURIComponent(img.url || img)}`)
    : [];
  const driveImages = useDriveImages(dynamicSectionsLoaded && cmsImages.length === 0);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const sections = await fetchPublicDynamicSections(projectId, 'Published');
        const gallerySection = sections.find(sec => sec.section_type === 'gallery');
        if (gallerySection) {
          setDynamicSection(gallerySection);
        }
      } catch (err) {
        console.error("Error fetching dynamic gallery section", err);
      } finally {
        setDynamicSectionsLoaded(true);
      }
    };
    fetchGalleryData();
  }, []);

  const displayImages = cmsImages.length > 0 ? cmsImages : driveImages;

  if (!displayImages.length) return <p style={{ textAlign: "center", padding: "40px" }}>Loading gallery...</p>;

  return (
    <section aria-labelledby="gallery-heading" style={{ display: "grid", gap: "20px", padding: "0px 20px" }}>
<Typography
  id="gallery-heading"
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
  {dynamicSection?.content?.title || dynamicSection?.content?.heading || `${process.env.REACT_APP_APP_NAME} Highlights`}
</Typography>

      {dynamicSection?.content?.description && (
        <Typography
          sx={{
            color: "#4A4A4A",
            fontFamily: "Poppins",
            px: { xs: 2, sm: 4, md: 8 },
            mt: -2,
            mb: 3
          }}
        >
          {dynamicSection.content.description}
        </Typography>
      )}


      <GalleryGrid
        images={displayImages}
        onOpenAt={(i) => setModal({ open: true, index: i })}
      />

      {modal.open && (
        <ImageModal
          images={displayImages}
          startIndex={modal.index}
          onClose={() => setModal({ open: false })}
        />
      )}
    </section>
  );
};

export default Gallery;
