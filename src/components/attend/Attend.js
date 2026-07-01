import { styled } from "@mui/material"
import { registrationCharges, notes } from "./data"
import checkBlue from '../../assets/checkBlue.svg'
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

import red from "../../assets/rad.png";
import to from "../../assets/try.png";

import metro from "../../assets/fill.png";
import np from "../../assets/drop.png";
import attendImg from '../../assets/attendCover.svg'
import { Typography } from "@mui/material";
import { baseUrl, projectId } from "../../services/api";
import { useState, useEffect } from "react";

const Component = styled('div')({

  overflowX: "hidden",
})

const Cont1 = styled('section')(({ theme }) => ({
  padding: "80px 70px",
  background: "#F9F9F3",
  [theme.breakpoints.down("sm")]: {
    padding: 8
  }

}))

const Table = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: 32,

  '& th, & td': {
    border: '1px solid #ccc',
    padding: '12px',
    textAlign: 'left',
  },


  [theme.breakpoints.down('sm')]: {
    display: 'block',

    '& thead': {
      display: 'none',
    },

    '& tr': {
      display: 'block',
      marginBottom: 16,
      border: '1px solid #ccc',
      borderRadius: 8,
      padding: 16,
      background: '#f9f9f9'
    },


    '& td': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      border: 'none',
      borderBottom: '1px solid #eee',
      fontSize: 14,
      '&::before': {
        content: 'attr(data-label)',
        fontWeight: 600,
        color: '#555',
      }
    }
  }
}))


const Cont2 = styled('div')(({ theme }) => ({
  background: '#fff',
  padding: '40px 70px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  [theme.breakpoints.down("sm")]: {
    padding: 5
  },
  '&>h3': {
    color: 'var(--Color-Heading, #1C1C1C)',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '120%',
    margin: 0
  }
}))

const Note = styled('p')({
  /* Body/L */
  fontFamily: 'Poppins',
  fontSize: 20,
  fontStyle: 'normal',
  fontWeight: 400,
  margin: 0,
  lineHeight: '150%' /* 30px */
})

const Notes = styled('ol')({
  display: 'flex',
  flexDirection: 'column',
  gap: 16
})
const SubNotes = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  gap: 16
})

const SubNote = styled('div')({

  display: 'flex',
  alignItems: 'center',
  gap: 4,
  '&>p': {
    color: 'var(--Color-Body-text, #494949)',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '150%',
    margin: 0,
  }
})

const Theme = styled("div")(({ theme }) => ({
  width: '100vw',
  position: 'relative',
  height: "45vh",
  [theme.breakpoints.down("sm")]: {
    display: 'none'
  },
  'img': {
    position: "absolute",
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    objectFit: 'cover',

  }
}))
const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "80px 70px",
  background: "#F9F9F3",
  gap: 40,
  [theme.breakpoints.down("md")]: {
    padding: "40px 24px",
    gap: 24,
  },
  [theme.breakpoints.down("sm")]: {
    padding: "24px 16px",
    gap: 20,
  },
}));

const Header = styled("div")(({ theme }) => ({
  "& h2": {
    color: "#1C1C1C",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: 36,
    lineHeight: "120%",
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
  },
}));

const Grid = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: 24,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: 20,
  },
}));

const Card = styled("article")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: 12,
  border: "1px solid #d1d5db",
  background: "#fff",
  overflow: "hidden",
  flex: 1,
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  },
}));

const ImageWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  height: 280,
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  [theme.breakpoints.down("md")]: {
    height: 220,
  },
  [theme.breakpoints.down("sm")]: {
    height: 180,
  },
}));

const Content = styled("div")(({ theme }) => ({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  "& h3": {
    fontFamily: "Poppins, sans-serif",
    fontSize: 22,
    fontWeight: 700,
    margin: 0,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
  },
  "& p": {
    fontFamily: "Poppins, sans-serif",
    fontSize: 15,
    fontWeight: 500,
    color: "#444",
    lineHeight: 1.6,
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
    },
  },
}));

const Actions = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "0 20px 20px 20px",
  "& button": {
    background: "transparent",
    border: "none",
    fontFamily: "Poppins, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    padding: 0,
    color: "#1C1C1C",
    display: "flex",
    alignItems: "center",
    gap: 4,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Attend = () => {
  const [dynamicSection, setDynamicSection] = useState(null);

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/secured/cms/registration/all/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.status && Array.isArray(data.data) && data.data.length > 0) {
            const published = data.data.find(sec => sec.status === "Published") || data.data[0];
            setDynamicSection(published);
          }
        }
      } catch (error) {
        console.error("Error fetching dynamic registration:", error);
      }
    };
    fetchRegistration();
  }, []);

  const renderCharge = (val) => {
    if (!val) return "";
    const str = String(val).trim();
    return str.includes("₹") ? str : `₹ ${str}`;
  };

  const showCharges = dynamicSection?.content?.charges && dynamicSection.content.charges.length > 0;

  return (
    <Component>
      {/* <Theme>
                <img alt="" src={attendImg} />
            </Theme> */}
      {showCharges ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Cont1>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: '#000',
                  lineHeight: '130%',
                  fontFamily: 'Poppins',
                  margin: 0
                }}
              >
                Conference Registration Charges
              </Typography>

              <Table>
                <thead>
                  <tr>
                    <th>Delegate Type</th>
                    <th>Early Bird Registration</th>
                    <th>Standard Registration</th>
                    <th>Early One Day Registration *</th>
                    <th>Standard One Day Registration *</th>
                  </tr>
                </thead>
                <tbody>
                  {(dynamicSection?.content?.charges || registrationCharges)?.map((elm, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                    >
                      <td data-label="Delegate Type">{elm.delegateType}</td>
                      <td data-label="Early Bird Registration">{renderCharge(elm.earlyBird)}</td>
                      <td data-label="Standard Registration">{renderCharge(elm.standard)}</td>
                      <td data-label="Early One Day Registration">{renderCharge(elm.earlyOneDay)}</td>
                      <td data-label="Standard One Day Registration">{renderCharge(elm.standardOneDay)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </Table>
            </Cont1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Cont2>
              <h3>Please Note:</h3>
              <Notes>
                {(dynamicSection?.content?.notes || notes)?.map((elm, inx) => (
                  <li key={inx}>
                    <Note>{elm.note}</Note>
                    <SubNotes style={{
                      marginTop: (elm.subNotes && elm.subNotes.length > 0) ? 16 : 0
                    }}>
                      {
                        elm?.subNotes?.map((subNote, idx) => (
                          <SubNote key={idx}>
                            <img alt="" src={checkBlue} />
                            <p>{subNote}</p>
                          </SubNote>
                        ))
                      }
                    </SubNotes>
                  </li>
                ))}
              </Notes>
            </Cont2>
          </motion.div>
        </>
      ) : (
        <h2
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "2rem",
            margin: "40px 0",
          }}
        >
          Stay Tuned, Registration Opening Soon!!
        </h2>
      )}

      <Container>
        <Header>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: "#000",
              fontFamily: "Poppins, sans-serif",
              lineHeight: "130%",
            }}
          >
            Accommodation & Travel
          </Typography>
        </Header>

        <Grid>
          {/* Accommodation */}
          <Link
            to="/accommodation"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <ImageWrapper>
                  <img src={to} alt="Accommodation illustration" />
                </ImageWrapper>
                <Content>
                  <h3>{dynamicSection?.content?.accommodation_title || "Accommodation"}</h3>
                  <p>
                    Discover curated hotels, accessible stays, and
                    budget-friendly hostels near IIT Delhi for a safe and
                    comfortable Empower 2026 visit.
                  </p>
                </Content>
                <Actions>
                  <button>Read more →</button>
                </Actions>
              </Card>
            </motion.div>
          </Link>

          {/* Travel */}
          <Link
            to="/travel"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <ImageWrapper>
                  <img src={np} alt="Travel plan illustration" />
                </ImageWrapper>
                <Content>
                  <h3>{dynamicSection?.content?.travel_title || "Travel Plan"}</h3>
                  <p>
                    Get step-by-step guidance on reaching IIT Delhi by air,
                    train, bus, or metro, along with parking and entry details.
                  </p>
                </Content>
                <Actions>
                  <button>Read more →</button>
                </Actions>
              </Card>
            </motion.div>
          </Link>
        </Grid>
      </Container>
    </Component>
  )
}

export default Attend