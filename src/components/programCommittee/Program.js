import React, { useState, useEffect, useMemo } from "react";
import "./Program.css";
import { useNavigate } from "react-router-dom";
import def from "../../assets/default.png";
import { baseUrl } from "../../services/api";

const Program = () => {
  const [selectedAffiliation, setSelectedAffiliation] = useState("All");
  const [activePage, setActivePage] = useState("Program");
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

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
        const committeeUrl = `${baseUrl}/secured/event/all-committee/${process.env.REACT_APP_PROJECT_ID}?api_key=${apiKey}`;
        console.log("Fetching program committee from:", committeeUrl);
        const res = await fetch(committeeUrl);
        const data = await res.json();
        console.log("Committee response data:", data);

        let hasMembers = false;
        if (data?.status && Array.isArray(data.data)) {
          const programCommittee = data.data.find(c => c.type === 'Program');
          if (programCommittee && Array.isArray(programCommittee.members) && programCommittee.members.length > 0) {
            const totalMembers = programCommittee.members.reduce((acc, g) => acc + (g.members?.length || 0), 0);
            if (totalMembers > 0) {
              hasMembers = true;
              const roleGroupsMap = {};
              programCommittee.members.forEach((group) => {
                const role = group.role || "Member";
                const groupMembers = [];

                if (Array.isArray(group.members)) {
                  group.members.forEach((member) => {
                    let name = "";
                    let affiliation = "";
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
                      affiliation = user.affiliation || user.designation || "";
                    } else if (member.label) {
                      name = member.label.split(',')[0].trim();
                      const parts = member.label.split(',');
                      if (parts.length > 1) {
                        affiliation = parts.slice(1).join(',').trim();
                      }
                    } else if (member.full_name) {
                      name = `${member.title ? member.title + " " : ""}${member.full_name}`.trim();
                      affiliation = member.affiliation || member.role || "";
                    }

                    if (name) {
                      groupMembers.push({
                        name,
                        affiliation,
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
              console.log("Setting formatted program groups from committee:", formattedGroups);
              setGroups(formattedGroups);
            }
          }
        }

        if (!hasMembers) {
          const speakersUrl = `${baseUrl}/secured/event/all-speaker/${process.env.REACT_APP_PROJECT_ID}?api_key=${apiKey}`;
          console.log("No committee members found in committee API. Falling back to speakers from:", speakersUrl);
          const speakerRes = await fetch(speakersUrl);
          const speakerData = await speakerRes.json();
          console.log("Speaker response data:", speakerData);

          if (speakerData?.status && Array.isArray(speakerData.data)) {
            const matchingSpeakers = speakerData.data.filter(s => 
              Array.isArray(s.type) && s.type.some(t => typeof t === 'string' && t.toLowerCase() === "program committee member")
            );
            console.log("Matching program speakers:", matchingSpeakers);

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
                image: image
              });
            });

            const formattedGroups = Object.keys(speakerGroups).map(role => ({
              role: role,
              members: speakerGroups[role]
            }));

            // Sort to make sure General Chair, Program Chair, etc. come first, and "Members" comes last
            formattedGroups.sort((a, b) => {
              if (a.role === "Members") return 1;
              if (b.role === "Members") return -1;
              return 0;
            });

            console.log("Setting formatted program groups from speakers:", formattedGroups);
            setGroups(formattedGroups);
          }
        }
      } catch (err) {
        console.error("Error fetching program committee/speakers:", err);
      }
    };

    fetchCommittee();
  }, [apiKey]);

  // Flatten members to compute unique affiliations
  const allMembers = useMemo(() => {
    const list = [];
    groups.forEach(g => {
      if (Array.isArray(g.members)) {
        g.members.forEach(m => list.push(m));
      }
    });
    return list;
  }, [groups]);

  const uniqueAffiliations = useMemo(() => {
    const affs = allMembers.map(m => typeof m.affiliation === 'string' ? m.affiliation.trim() : "").filter(Boolean);
    return ["All", ...Array.from(new Set(affs))];
  }, [allMembers]);

  // Filter members inside each group
  const filteredGroups = useMemo(() => {
    return groups.map(group => {
      const filteredMembers = selectedAffiliation === "All"
        ? group.members
        : group.members.filter(m => typeof m.affiliation === 'string' && m.affiliation.trim().toLowerCase() === selectedAffiliation.trim().toLowerCase());
      return {
        ...group,
        members: filteredMembers
      };
    }).filter(group => group.members.length > 0);
  }, [groups, selectedAffiliation]);

  return (
    <div className="program-container">
      <div className="page-toggle-container">
        <button
          className={`toggle-btn ${activePage === "Program" ? "active-btn" : ""}`}
          onClick={() => setActivePage("Program")}
        >
          Program
        </button>
        <button
          className={`toggle-btn ${activePage === "Organizer" ? "active-btn" : ""}`}
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

      {/* Affiliation Filter Chips */}
      {uniqueAffiliations.length > 1 && (
        <div className="program-chips">
          {uniqueAffiliations.map((aff) => (
            <button
              key={aff}
              className={`chip ${selectedAffiliation === aff ? "active-chip" : ""}`}
              onClick={() => setSelectedAffiliation(aff)}
            >
              {aff}
            </button>
          ))}
        </div>
      )}

      {/* Grouped by Role sections */}
      {filteredGroups.map((group, groupIdx) => (
        <div key={groupIdx} className="role-section">
          <h3 className="role-heading">{group.role}</h3>
          <div className="program-card-container">
            {group.members.map((person, index) => (
              <div className="person-card" key={index}>
                <img src={person.image} alt={person.name} className="person-img" />
                <p className="person-name">{person.name}</p>
                <p className="person-affiliation">{person.affiliation}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filteredGroups.length === 0 && (
        <div className="no-members-message" style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
          No committee members found.
        </div>
      )}
    </div>
  );
};

export default Program;
