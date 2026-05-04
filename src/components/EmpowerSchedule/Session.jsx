import React from "react";

const EmpowerSchedule = () => {
  return (
    <div
      style={{
        width: "90%",
        height: "100vh", // container takes most of the viewport
        overflow: "auto", // enable scroll
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
        padding: "30px", // more padding
        margin: "0 auto",
      }}
    >
      <iframe
        src="https://empowerschedule-18504.web.app/#/homepage"
        title="Empower Session"
        style={{
          width: "100%",
          minHeight: "1000px", // ensure iframe content fits
          border: "none",
        }}
      />
    </div>
  );
};

export default EmpowerSchedule;
