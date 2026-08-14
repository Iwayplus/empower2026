import { styled, Typography } from "@mui/material"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { exhibitPlans, exhibitionDetails, notes, rowLabels, leftBenefits, rightBenefits } from "./data"
import { exhibitTypography } from "./typography"
import check from "../../assets/check.svg"
import exhibitCover from '../../assets/exhibitCover.svg'
import checkGreen from '../../assets/checkGreen.svg'
import emailIcon from "../../assets/mail.svg";
import websiteIcon from "../../assets/po.jpg";
import linkedInIcon from "../../assets/link.png";
import { baseUrl, projectId } from "../../services/api";
const Component = styled('section')({})

const Cont1 = styled('div')(({ theme }) => ({
  fontFamily: 'Poppins',
  textAlign: 'left',
  margin: "56px 70px",
  [theme.breakpoints.down("sm")]: {
    margin: "20px 12px",
  },
  '&>h1': {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: '130%',
    color: '#000',
    margin: 0
  },
  '&>p': {
    color: '#494949',
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '150%',
    margin: "16px 0 0 0"
  },
  '&>h2': {
    margin: 0,
    fontSize: 24,
    fontWeight: 600,
    lineHeight: '120%'
  }
}))

const Cont3 = styled("div")({
  marginTop: 124,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '&>h3': {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 36,
    fontWeight: 700,
    lineHeight: '120%'
  },
  '&>div': {
    color: '#787878',
    fontWeight: 700,
    fontSize: 20
  }
})

const Cont4 = styled('div')(({ theme }) => ({
  background: "#F8F8F8",
  display: 'flex',
  padding: "80px 70px",
  gap: 35,
  flex: "3 0 0",
  flexWrap: 'wrap',
  [theme.breakpoints.down("sm")]: {
    padding: "20px 12px", // ✅ smaller padding        marginTop: 10
  },
  '&>div': {
    maxWidth: '30%',
    padding: 24,
    boxSizing: 'border-box',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    [theme.breakpoints.down("md")]: {
      maxWidth: '100%'
    },
    '&>h3': {
      color: 'var(--Color-Black, #000)',
      fontFamily: 'Poppins',
      fontSize: 24,
      fontWeight: 600,
      lineHeight: '120%',
      margin: 0
    },
    '&>p': {
      color: 'var(--Color-Body-text, #494949)',
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: 400,
      lineHeight: '150%',
      margin: 0
    },
    '&>img': {
      maxWidth: 80
    }
  }
}))

const BenefitsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 32,
  alignSelf: 'stretch',
  margin: "40px 70px",
  [theme.breakpoints.down("sm")]: {
    margin: "20px 16px",
  }
}));

const LeftRightWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 40,
  alignSelf: 'stretch',
  flexWrap: 'wrap',
}));

const BenefitColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 16,
  flex: '1 0 0',
});

const BenefitItem = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12
});
const SubHeading = styled('h4')({
  color: '#1C1C1C',
  fontFeatureSettings: "'liga' off, 'clig' off",
  fontFamily: 'Poppins',
  fontSize: 20,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '120%',
  margin: 0
});

export const ExhibitorsWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  overflowX: "hidden",
  padding: "0 40px",
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    padding: "0 24px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0 12px",
  },
}));

// Grid container
// Grid container
export const ExhibitorsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", // flexible grid
  gap: "24px",
  margin: "40px auto",
  width: "100%",
  boxSizing: "border-box",
  justifyItems: "center",
  [theme.breakpoints.down("md")]: {
    gap: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", // ✅ allow 2 per row if space
    gap: "16px",
  },
}));


// Card for each exhibitor
// Card for each exhibitor
export const ExhibitorCard = styled("div")(({ theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  width: "100%",
  maxWidth: 260, // ✅ prevent card from becoming too wide
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
  },
  [theme.breakpoints.down("md")]: {
    padding: "14px",
    maxWidth: 220,
  },
  [theme.breakpoints.down("sm")]: {
    padding: "12px",
    maxWidth: 180, // ✅ smaller card on mobile
  },
}));


// Logo inside card
export const Logo = styled("img")(({ theme }) => ({
  width: "100%",
  maxWidth: 140,
  height: "auto",
  aspectRatio: "4 / 3",
  objectFit: "contain",
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #eee",
  background: "#fff",
  [theme.breakpoints.down("md")]: {
    maxWidth: 120,
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: 100,
  },
}));

// Company Name
export const CompanyName = styled("p")(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  fontFamily: "Poppins",
  color: "#333",
  textAlign: "center",
  lineHeight: "20px",
  minHeight: "40px",
  margin: 0,
  [theme.breakpoints.down("md")]: {
    fontSize: 15,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    minHeight: "36px",
  },
}));

// Booth type badge
export const BoothType = styled("p")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: "#2180E4",
  background: "rgba(33,128,228,0.1)",
  padding: "4px 12px",
  borderRadius: 12,
  textAlign: "center",
  margin: "8px 0",
  fontFamily: "Poppins",
  [theme.breakpoints.down("md")]: {
    fontSize: 13,
    padding: "3px 10px",
    margin: "6px 0",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
    padding: "2px 8px",
    margin: "4px 0",
  },
}));

// Email text
export const Email = styled("p")(({ theme }) => ({
  fontSize: 14,
  color: "#555",
  fontFamily: "Poppins",
  textAlign: "center",
  margin: "4px 0",
  wordBreak: "break-word",
  [theme.breakpoints.down("md")]: {
    fontSize: 13,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
  },
}));

// Link icon
export const LinkIcon = styled("img")(({ theme }) => ({
  width: 24,
  height: 24,
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    width: 20,
    height: 20,
  },
}));

const Theme = styled("div")(({ theme }) => ({
  width: '100vw',
  position: 'relative',
  height: "45vh",
  [theme.breakpoints.down("sm")]: {
    height: "25vh",      // smaller height, not hidden
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

const LinksContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column', // <-- make it vertical
  gap: 16,                 // spacing between rows
  marginTop: 8,
});

const TableBx = styled('div')(({ theme }) => ({
  '&>h3': {
    color: '#CD7F00',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: "120%",
    margin: 0
  },
  '&>table': {
    width: '80%',
    borderCollapse: "collapse",
    marginTop: 16,
    '& th, & td': {
      border: '1px solid #D1D5DB',
    },
    '&>tr': {
      '&>th': {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: "120%",
        textAlign: "center",
        height: 40,
        border: "1px solid #D1D5DB",
        paddingLeft: 17,
        paddingRight: 17
      },
      '&>td': {
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: "150%",
        textAlign: "center",
        height: 40,
        border: "1px solid #D1D5DB",
        paddingLeft: 17,
      }
    }
  },

  // ✅ Hide table on small screens
  [theme.breakpoints.down("sm")]: {
    '&>table': {
      display: "none",
    }
  }
}));

const SkeletonCard = styled('div')({
  height: 220,
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)',
  backgroundSize: '400% 100%',
  animation: 'shimmer 1.4s ease infinite',
  borderRadius: 12,
  marginBottom: 16,
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '-400% 0' },
    '100%': { backgroundPosition: '400% 0' },
  }
});
const Exhibit = () => {

  const navigate = useNavigate()

  const userData = useSelector(store => store.userSlice.profile)
  const exhibitorData = useSelector(store => store.userSlice.exhibitorProfile)

  const [exhibitors, setExhibitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dynamicSection, setDynamicSection] = useState(null);

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/secured/event/all-exhibitor/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
        );

        if (!res.ok) throw new Error("Failed to fetch exhibitors");

        const data = await res.json();
        console.log("📦 Exhibitors API response:", data);

        const exhibitorsArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.exhibitors)
              ? data.exhibitors
              : [];

        setExhibitors(exhibitorsArray);

        // Fetch Exhibit Dynamic Section Layout
        const dynRes = await fetch(
          `${baseUrl}/secured/cms/exhibit/all/${projectId}?api_key=${process.env.REACT_APP_IWAY_API_KEY}`
        );
        if (dynRes.ok) {
          const dynData = await dynRes.json();
          if (dynData.status && Array.isArray(dynData.data) && dynData.data.length > 0) {
            const published = dynData.data.find(sec => sec.status === "Published") || dynData.data[0];
            setDynamicSection(published);
          }
        }
      } catch (err) {
        console.error("❌ Error fetching exhibitors/dynamic layout:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitors();
  }, []);




  const GmailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* your SVG paths here */}
    </svg>
  );

  const WebsiteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* your SVG paths here */}
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* your SVG paths here */}
    </svg>
  );

  return (
    <Component>
      {/* <Theme>
                <img alt="" src={exhibitCover} />
            </Theme> */}
      {/* Safely render loading or empty states here without blocking the rest of the page */}
      {loading ? (
        <ExhibitorsGrid>
          {Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)}
        </ExhibitorsGrid>
      ) : !exhibitors.length ? (
        <ExhibitorsGrid><p style={{ gridColumn: "1 / -1", textAlign: "center", margin: "20px 0" }}>No exhibitors available.</p></ExhibitorsGrid>
      ) : null} 
      {!loading && exhibitors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: { xs: 36, sm: 36 }, // smaller font on mobile
              margin: { xs: '20px 0 20px 16px', sm: '40px 0 32px 50px' },
              textAlign: 'left',
            }}
          >
            Our Exhibitors
          </Typography>
          <ExhibitorsWrapper>
            <ExhibitorsGrid>
              {exhibitors.map((ex) => (
                <ExhibitorCard
                  key={ex._id}
                  onClick={() => {
                    const website = ex.organizationDetails?.website;
                    if (website) {
                      // Ensure the URL has a protocol
                      const url = website.startsWith("http") ? website : `https://${website}`;
                      window.open(url, "_blank");
                    }
                  }}

                  style={{ cursor: "pointer" }}
                >
                  <Logo src={ex.brandingDetails?.companyLogo ? (ex.brandingDetails.companyLogo.startsWith('http') ? ex.brandingDetails.companyLogo : `${baseUrl}/uploads/${encodeURIComponent(ex.brandingDetails.companyLogo)}`) : ""} alt="logo" />
                  <CompanyName>{ex.organizationDetails?.organizationName}</CompanyName>
                  <BoothType>{ex.boothType}</BoothType>
                  <LinksContainer
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    {ex.primaryContactDetails?.email && (
                      <img
                        src={emailIcon}
                        alt="Email"
                        style={{
                          width: 28,
                          height: 28,
                          aspectRatio: "1/1",
                          cursor: "pointer",
                          objectFit: "contain",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${ex.primaryContactDetails.email}`;
                        }}
                      />
                    )}

                    {ex.organizationDetails?.website && (
                      <img
                        src={websiteIcon}
                        alt="Website"
                        style={{
                          width: 38,
                          height: 38,
                          aspectRatio: "1/1",
                          cursor: "pointer",
                          objectFit: "contain",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = ex.organizationDetails.website.startsWith("http")
                            ? ex.organizationDetails.website
                            : `https://${ex.organizationDetails.website}`;
                          window.open(url, "_blank");
                        }}
                      />
                    )}

                    {ex.primaryContactDetails?.linkedInUrl && (
                      <img
                        src={linkedInIcon}
                        alt="LinkedIn"
                        style={{
                          width: 24,
                          height: 24,
                          aspectRatio: "1/1",
                          cursor: "pointer",
                          objectFit: "contain",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(ex.primaryContactDetails.linkedInUrl, "_blank");
                        }}
                      />
                    )}
                  </LinksContainer>




                </ExhibitorCard>
              ))}
            </ExhibitorsGrid>
          </ExhibitorsWrapper>





        </motion.div>
      )}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
        <Cont1>
          <h1>{dynamicSection?.content?.title || exhibitTypography.title["en-us"]}</h1>
          <p>{dynamicSection?.content?.para1 || exhibitTypography.para1["en-us"]}</p>
        </Cont1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
        <BenefitsContainer>
          <h2 style={{ fontSize: 24, fontWeight: 600, lineHeight: '130%', margin: 0, fontFamily: 'Poppins' }}>{exhibitTypography.heading2['en-us']}</h2>
          <LeftRightWrapper>
            <BenefitColumn>
              <SubHeading>{leftBenefits.heading}</SubHeading>
              {leftBenefits.items.map((benefit, idx) => (
                <BenefitItem key={idx}>
                  <img src={benefit.icon} alt="" width={24} />
                  <p style={{ fontSize: 18, margin: 0, fontFamily: 'Poppins' }}>{benefit.text}</p>
                </BenefitItem>
              ))}
            </BenefitColumn>

            <BenefitColumn>
              <SubHeading>{rightBenefits.heading}</SubHeading>
              {rightBenefits.items.map((benefit, idx) => (
                <BenefitItem key={idx}>
                  <img src={benefit.icon} alt="" width={24} />
                  <p style={{ fontSize: 18, margin: 0, fontFamily: 'Poppins' }}>{benefit.text}</p>
                </BenefitItem>
              ))}
            </BenefitColumn>
          </LeftRightWrapper>
        </BenefitsContainer>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Cont1>
          <h2>Exhibition Stall Packages</h2>
          <TableBx>
            <table border={1} cellPadding={8} cellSpacing={0}>
              <thead>
                <tr>
                  <th style={{ background: "#E5E5E5" }}>Stall Type</th>
                  {(dynamicSection?.content?.exhibitPlans || exhibitPlans).map((plan, idx) => (
                    <th key={plan.stallType || idx} style={{ background: "#E5E5E5", textAlign: 'center' }}>
                      {plan.stallType}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dynamicSection?.content?.exhibitPlans ? (
                  <>
                    <tr>
                      <td>Area</td>
                      {dynamicSection.content.exhibitPlans.map((plan, idx) => (
                        <td key={idx} style={{ textAlign: 'center' }}>{plan.area}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Early Bird Price (inclusive of tax)</td>
                      {dynamicSection.content.exhibitPlans.map((plan, idx) => (
                        <td key={idx} style={{ textAlign: 'center', fontWeight: 600, fontSize: 18 }}>
                          ₹ {Number(plan.earlyBirdRegistrationPrice || 0).toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Standard Price (inclusive of tax)</td>
                      {dynamicSection.content.exhibitPlans.map((plan, idx) => (
                        <td key={idx} style={{ textAlign: 'center' }}>
                          ₹ {Number(plan.standardRegistrationPrice || 0).toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  </>
                ) : (
                  rowLabels.map(row => (
                    <tr key={row.key}>
                      <td>{row.label}</td>
                      {exhibitPlans.map(plan => (
                        <td key={plan.stallType + row.key} style={{ textAlign: 'center' }}>
                          {
                            row.isCurrency
                              ? <><span style={{
                                fontFamily: "Port Lligat Sans",
                                fontSize: row?.key === "earlyBirdRegistrationPrice" ? 20 : 16,
                                fontWeight: row?.key === "earlyBirdRegistrationPrice" ? 600 : 400
                              }} >₹ </span><span style={{
                                fontSize: row?.key === "earlyBirdRegistrationPrice" ? 20 : 16,
                                fontWeight: row?.key === "earlyBirdRegistrationPrice" ? 600 : 400
                              }}>{plan[row.key].toLocaleString()}</span></>
                              : row.isYesNo
                                ? plan[row.key] ? <img src={checkGreen} alt="" /> : "-"
                                : plan[row.key]
                          }
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TableBx>
        </Cont1>
      </motion.div>


      <h2 style={{
        fontFamily: 'Poppins',
        fontSize: 32,
        fontWeight: 600,
        margin: '40px 70px 20px 70px',
        textAlign: 'left'
      }}>
        Terms and Conditions
      </h2>
      <Cont4>
        {(dynamicSection?.content?.exhibitionDetails || exhibitionDetails)?.map((elm, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: idx * 0.2, duration: 0.6 }}>
            <div>
              <img alt="" src={elm.logo || exhibitionDetails[idx]?.logo || exhibitionDetails[0]?.logo} />
              <h3>{elm.title}</h3>
              <p>{elm.text}</p>
            </div>
          </motion.div>
        ))}
      </Cont4>

      {/* <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <Cont3>
                    <h2>Exhibition Schedule</h2>
                    <div>
                        <p>Coming soon...</p>
                    </div>
                </Cont3>
            </motion.div> */}

    </Component>
  )
}

export default Exhibit
