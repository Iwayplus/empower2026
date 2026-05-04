import React, { useState, useEffect } from "react";
import "./Program.css";
import { useNavigate } from "react-router-dom";
import def from "../../assets/default.png";
const Program = () => {
  const [selectedAffiliation, setSelectedAffiliation] = useState("All");
  const [activePage, setActivePage] = useState("Program");
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(null);



useEffect(() => {
  const fetchSpeakers = async () => {


    try {
      const res = await fetch(
        `https://maps.iwayplus.in/secured/event/all-speaker/${process.env.REACT_APP_PROJECT_ID}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`,
     
      );

      const data = await res.json();

   if (data?.status && Array.isArray(data.data)) {
const programCommittee = data.data
  .filter((person) => person.type?.includes("program committee member"))
  .map((p) => ({
    name: `${p.title ? p.title + " " : ""}${p.full_name}`,
    affiliation: p.organization || "",
    image: p.photo_url
      ? `https://maps.iwayplus.in/uploads/${p.photo_url}`
      : def,
    special_requirements: p.special_requirements && !isNaN(Number(p.special_requirements))
      ? Number(p.special_requirements)
      : Infinity,
  }))
  .sort((a, b) => a.special_requirements - b.special_requirements);

setPeople(programCommittee);

}

    } catch (err) {
      console.error("Error fetching speakers:", err);
    }
  };

  fetchSpeakers();
}, []);



  // Extract unique affiliations
  const uniqueAffiliations = [
    "All",
    ...Array.from(new Set(people.map((p) => p.affiliation.trim()))),
  ];

  // Filter people based on selected affiliation
  const filteredPeople =
    selectedAffiliation === "All"
      ? people
      : people.filter(
          (person) =>
            person.affiliation.trim().toLowerCase() ===
            selectedAffiliation.trim().toLowerCase()
        );

  return (
    <div className="program-container">
      <div className="page-toggle-container">
        <button
          className={`toggle-btn ${
            activePage === "Program" ? "active-btn" : ""
          }`}
          onClick={() => setActivePage("Program")}
        >
          Program
        </button>
        <button
          className={`toggle-btn ${
            activePage === "Organizer" ? "active-btn" : ""
          }`}
          onClick={() => {
            setActivePage("Organizer");
            navigate("/organizer-committee");
          }}
        >
          Organizer
        </button>
      </div>

      <div className="program-heading-container">
        <div className="program-upper">
          <h2>Program Committee</h2>
        </div>
      </div>

      {/* Filtered cards */}
      <div className="program-card-container">
        {filteredPeople.map((person, index) => (
          <div className="person-card" key={index}>
            <img src={person.image} alt={person.name} className="person-img" />
            <p className="person-name">{person.name}</p>
            <p className="person-affiliation">{person.affiliation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Program;
