import React, { useState, useEffect } from "react";
import "./Organizer.css";
import { useNavigate, useLocation } from "react-router-dom";
import def from "../../assets/default.png";

const Organizer = () => {
  const [selectedAffiliation, setSelectedAffiliation] = useState("All");
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname === "/program-committee" ? "Program" : "Organizer";


  useEffect(() => {
  const fetchOrganisers = async () => {
   

    try {
      const res = await fetch(
        `https://maps.iwayplus.in/secured/event/all-speaker/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`,
    
      );

      const data = await res.json();
      if (data?.status && Array.isArray(data.data)) {
        const organisers = data.data
          .filter((p) => p.type?.includes("organising committee member"))
          .map((p) => ({
            name: `${p.title ? p.title + " " : ""}${p.full_name}`,
            designation: p.designation || "",
            image: p.photo_url
              ? `https://maps.iwayplus.in/uploads/${p.photo_url}`
              : def,
            // Convert to number, use Infinity if null/invalid to push to end
            special_requirements:
              p.special_requirements && !isNaN(Number(p.special_requirements))
                ? Number(p.special_requirements)
                : Infinity,
          }))
          // Sort numerically, null/invalid goes to the end
          .sort((a, b) => a.special_requirements - b.special_requirements);

        setPeople(organisers);
      }
    } catch (err) {
      console.error("Error fetching organisers:", err);
    }
  };

  fetchOrganisers();
}, []);


  // Extract unique designations for chips (if needed)
  const uniqueDesignations = [
    "All",
    ...Array.from(new Set(people.map((p) => p.designation.trim()))),
  ];

  // Filter people based on selected designation
  const filteredPeople =
    selectedAffiliation === "All"
      ? people
      : people.filter(
          (person) =>
            person.designation.trim().toLowerCase() ===
            selectedAffiliation.trim().toLowerCase()
        );

  return (
    <div className="program-container">
      <div className="page-toggle-container">
        <button
          className={`toggle-btn ${activePage === "Program" ? "active-btn" : ""}`}
          onClick={() => navigate("/program-committee")}
        >
          Program
        </button>
        <button
          className={`toggle-btn ${activePage === "Organizer" ? "active-btn" : ""}`}
        >
          Organizer
        </button>
      </div>

      <div className="program-heading-container">
        <div className="program-upper">
          <h2>Organizing Committee</h2>
        </div>
      </div>

      {/* Filtered cards */}
      <div className="program-card-container">
        {filteredPeople.map((person, index) => (
          <div className="person-card" key={index}>
            <img src={person.image} alt={person.name} className="person-img" />
            <p className="person-name">{person.name}</p>
            <p className="person-affiliation">{person.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizer;
