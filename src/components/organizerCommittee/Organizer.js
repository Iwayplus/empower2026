import React, { useState, useEffect, useMemo } from "react";
import "./Organizer.css";
import { useNavigate, useLocation } from "react-router-dom";
import def from "../../assets/default.png";
import { baseUrl, projectId } from "../../services/api";

const Organizer = () => {

  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname === "/program-committee" ? "Program" : "Organizer";

  const apiKey = useMemo(() => {
    return (process.env.REACT_APP_IWAY_API_KEY || "").replace(/^"(.*)"$/, '$1');
  }, []);

  const resolvePhotoUrl = (photoPath, defaultImage) => {
    if (!photoPath) return defaultImage;
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

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const committeeUrl = `${baseUrl}/secured/event/all-committee/${projectId}?api_key=${apiKey}`;
        console.log("Fetching organizing committee from:", committeeUrl);
        const res = await fetch(committeeUrl);
        const data = await res.json();
        console.log("Committee response data:", data);

        let hasMembers = false;
        if (data?.status && Array.isArray(data.data)) {
          const orgCommittee = data.data.find(c => c.type === 'Organizing');
          if (orgCommittee && Array.isArray(orgCommittee.members) && orgCommittee.members.length > 0) {
            const totalMembers = orgCommittee.members.reduce((acc, g) => acc + (g.members?.length || 0), 0);
            if (totalMembers > 0) {
              hasMembers = true;
              const roleGroupsMap = {};
              orgCommittee.members.forEach((group) => {
                const role = group.role || "Member";
                const groupMembers = [];

                if (Array.isArray(group.members)) {
                  group.members.forEach((member) => {
                    let name = "";
                    let designation = "";
                    let image = def;

                    if (member.photo_url) {
                      image = resolvePhotoUrl(member.photo_url, def);
                    } else if (member.id && typeof member.id === 'object' && (member.id.photo_url || member.id.photoUrl)) {
                      image = resolvePhotoUrl(member.id.photo_url || member.id.photoUrl, def);
                    }

                    if (member.id && typeof member.id === 'object') {
                      const user = member.id;
                      const firstName = user.firstName || "";
                      const lastName = user.lastName || "";
                      name = `${firstName} ${lastName}`.trim();
                      if (!name && member.label) {
                        name = member.label.split(',')[0].trim();
                      }
                      designation = user.affiliation || user.designation || "";
                    } else if (member.label) {
                      name = member.label.split(',')[0].trim();
                      const parts = member.label.split(',');
                      if (parts.length > 1) {
                        designation = parts.slice(1).join(',').trim();
                      }
                    } else if (member.full_name) {
                      name = `${member.title ? member.title + " " : ""}${member.full_name}`.trim();
                      designation = member.affiliation || member.role || "";
                    }

                    if (name) {
                      groupMembers.push({
                        name,
                        designation: role,
                        image
                      });
                    }
                  });
                }

                if (groupMembers.length > 0) {
                  if (!roleGroupsMap[role]) {
                    roleGroupsMap[role] = [];
                  }
                  roleGroupsMap[role].push(...groupMembers);
                }
              });

              const formattedGroups = Object.entries(roleGroupsMap).map(([role, members]) => ({
                role,
                members
              }));
              console.log("Setting formatted organizing groups from committee:", formattedGroups);
              setGroups(formattedGroups);
            }
          }
        }

        if (!hasMembers) {
          const speakersUrl = `${baseUrl}/secured/event/all-speaker/${projectId}?api_key=${apiKey}`;
          console.log("No committee members found in committee API. Falling back to speakers from:", speakersUrl);
          const speakerRes = await fetch(speakersUrl);
          const speakerData = await speakerRes.json();
          console.log("Speaker response data:", speakerData);

          if (speakerData?.status && Array.isArray(speakerData.data)) {
            const matchingSpeakers = speakerData.data.filter(s => 
              Array.isArray(s.type) && s.type.some(t => typeof t === 'string' && (t.toLowerCase() === "organising committee member" || t.toLowerCase() === "organizing committee member"))
            );
            console.log("Matching organizing speakers:", matchingSpeakers);

            const speakerGroups = {};
            matchingSpeakers.forEach(s => {
              const role = s.designation || "Members";
              if (!speakerGroups[role]) {
                speakerGroups[role] = [];
              }

              const image = resolvePhotoUrl(s.photo_url, def);

              speakerGroups[role].push({
                name: `${s.title ? s.title + " " : ""}${s.full_name}`,
                affiliation: s.organization || "",
                image: image,
                designation: s.organization || ""
              });
            });

            const formattedGroups = Object.keys(speakerGroups).map(role => ({
              role: role,
              members: speakerGroups[role]
            }));

            // Sort to make sure General Chair, Organizing Chair, etc. come first, and "Members" comes last
            formattedGroups.sort((a, b) => {
              if (a.role === "Members") return 1;
              if (b.role === "Members") return -1;
              return 0;
            });

            console.log("Setting formatted organizing groups from speakers:", formattedGroups);
            setGroups(formattedGroups);
          }
        }
      } catch (err) {
        console.error("Error fetching organizing committee/speakers:", err);
      }
    };

    fetchCommittee();
  }, [apiKey]);

  // Flatten all members from all groups into a single list (role is used as designation)
  const allMembers = useMemo(() => {
    const list = [];
    groups.forEach(g => {
      if (Array.isArray(g.members)) {
        g.members.forEach(m => list.push(m));
      }
    });
    return list;
  }, [groups]);



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

      {/* All members flat — role shown as designation */}
      <div className="program-card-container">
        {allMembers.map((person, index) => (
          <div className="person-card" key={index}>
            <img src={person.image} alt={person.name} className="person-img" />
            <p className="person-name">{person.name}</p>
            <p className="person-affiliation">{person.designation}</p>
          </div>
        ))}
      </div>

      {allMembers.length === 0 && (
        <div className="no-members-message" style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
          No committee members found.
        </div>
      )}
    </div>
  );
};

export default Organizer;
