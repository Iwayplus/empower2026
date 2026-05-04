// Notice.js
import React, { useEffect, useState, useRef } from "react";

const Notice = () => {
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setShow(true);
    // Close on ESC key
    const handleEsc = (e) => {
      if (e.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Close if clicked outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div
      onClick={handleClickOutside}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        ref={modalRef}
        style={{
          background: "#fff",
          padding: "28px 30px",
          borderRadius: "16px",
          boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
          textAlign: "center",
          position: "relative",
          width: "280px",
          maxWidth: "90%",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Close Icon */}
        <button
          onClick={() => setShow(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#444",
            transition: "color 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.color = "#000")}
          onMouseOut={(e) => (e.target.style.color = "#444")}
        >
          ✕
        </button>

    <h3
  style={{
    marginBottom: "20px",
    fontSize: "19px",
    color: "#041A32",
    fontWeight: "600",
  }}
>
  Continue to Empower App
</h3>


        {/* Link button using env variable */}
        <a
          href={process.env.REACT_APP_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "10px 22px",
            background: "#041A32", // Main color
            color: "#fff",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "500",
            textDecoration: "none",
            transition: "background 0.3s ease, transform 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#06294d"; // Lighter shade on hover
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#041A32";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Open App
        </a>
      </div>
    </div>
  );
};

export default Notice;
