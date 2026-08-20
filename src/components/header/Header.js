import { Button, Divider, Drawer, styled, } from "@mui/material"
import headerIcon from '../../assets/data.png'
import email from '../../assets/email.svg'
import phone from '../../assets/phone.svg'
import hamburger from '../../assets/hamburger.svg'
import { useEffect, useState } from "react"
import close from '../../assets/close.svg'
import { Link, useLocation, useNavigate } from "react-router-dom"

import { logout, projectId, getFooterData } from "../../services/api"
import { useSelector } from "react-redux"
import { Dialog, DialogTitle, DialogContent, CircularProgress } from "@mui/material";
import QRCode from "react-qr-code"
import { Menu, MenuItem, Box, Typography, Card, CardContent } from "@mui/material";
import Grow from "@mui/material/Grow"; // for animation
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Event as EventIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const Component = styled('div')(({ theme }) => ({
  width: '100%',
  height: 82,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '19px 72px',
  boxSizing: 'border-box',
  background: '#041A32',

  [theme.breakpoints.down("md")]: {
    padding: 5,
    height: '6.5vh',
  }
}))

const Head = styled('section')({
  position: 'sticky',
  top: 0,
  zIndex: 999,
})

const Buttons = styled('div')(({ theme }) => ({
  display: 'flex',
  // display: 'none',
  gap: 24,
  [theme.breakpoints.down("md")]: {
    gap: 8
  }
}))



const ButtonRegister = styled('button')(({ theme }) => ({
  padding: '8px 16px',
  textAlign: 'center',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: "22px",
  borderRadius: 4,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: "Poppins",
  background: '#2180E4',
  color: '#fff',
  border: 'none',
  '&:hover': {
    background: "#4996E9"
  },
  [theme.breakpoints.down("md")]: {
    padding: "8px 10px",
    fontSize: '1em',
    borderRadius: 3,
  }
}))

const ButtonLogin = styled('button')(({ theme }) => ({
  padding: '8px 16px',
  textAlign: 'center',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: "22px",
  borderRadius: 4,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: "Poppins",
  border: '1px solid #D1D5DB',
  background: 'none',
  color: '#fff',
  gap: 8,
  '&:hover': {
    background: "rgba(255, 255, 255, 0.3)"
  },
  [theme.breakpoints.down("md")]: {
    padding: "8px 10px",
    fontSize: '1em',
    borderRadius: 3,
  }
}))

const Img = styled("img")(({ theme }) => ({
  height: 40,
  cursor: 'pointer',
  transition: 'transform 0.2s ease, opacity 0.2s ease',
  '&:hover': {
    opacity: 0.8,
    transform: 'scale(1.05)'
  },
  [theme.breakpoints.down("sm")]: {
    // width: '50%',
  }
}))

const ContactBx = styled('div')(({ theme }) => ({
  height: 36,
  width: '100%',
  background: '#A83D1B',
  '&>div': {
    display: 'flex',
    color: '#fff',
    alignItems: 'center',
    marginLeft: 70,
    height: '100%',
    gap: 16,
    [theme.breakpoints.down("md")]: {
      marginLeft: 'unset',
      justifyContent: 'center'
    },
    '&>div': {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      '&>a': {
        margin: 0,
        color: '#fbfbfb',
        fontFamily: 'Inter',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '100%', /* 10px */
        textDecoration: 'none',
        [theme.breakpoints.down("sm")]: {
          fontSize: 11
        }
      }
    },
  }
}))

const DividerStyle = styled(Divider)({
  background: '#fff',
  height: 11
})

const Navbar = styled('div')(({ theme }) => ({
  margin: '8px 0',
  display: 'flex',

  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
  [theme.breakpoints.down("md")]: {
    display: 'none'
  },
  '& a': {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '100%',
    padding: '13px 0',
    textDecoration: 'none',
    color: '#fff',
    position: 'relative',
    transition: 'color 0.3s ease',

    '&:hover': {
      color: "#D1D5DB"
    }
  },

  '& a.active': {
    color: "#FFFFFF",
    fontWeight: 600,

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '3px',
      backgroundColor: '#FBBC05',
    }
  }
}));

const Hamb = styled('img')(({ theme }) => ({
  background: 'none',
  maxHeight: 40,

}))

const SideNav = styled(Drawer)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down("md")]: {
    display: 'block',
    '&>div': {
      width: '80%',

    }
  }
}))

const HambBtn = styled('button')(({ theme }) => ({
  padding: 0,
  border: 'none',
  display: 'none',
  background: 'none',
  [theme.breakpoints.down("md")]: {
    display: 'block'
  }
}))

const TopBar = styled('div')({
  width: '100%',
  height: 56,
  padding: '4px 16px',
  boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  // background: '#dedede',

  '&>button': {
    padding: 0,
    border: 'none',
    display: 'flex',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    background: '#fff',
    '&>hover': {
      background: '#e6e6e6',
    },
    '&>active': {
      background: '#e6e6e6',
    }
  }
})



const DropdownWrapper = styled('div')({
  position: 'relative',
  display: 'inline-block',

  // Show dropdown on hover
  '&:hover > div': {
    display: 'flex',
    flexDirection: 'column',
  },
  zIndex: 10,
});

const DropdownMenu = styled('div')({
  display: 'none',
  position: 'absolute',
  top: '150%',
  left: 0,
  width: 220,
  padding: 16,
  background: '#fff',
  borderRadius: 4,
  boxShadow: '0 0 6px rgba(0,0,0,0.15)',
  zIndex: 1000,
  gap: 12,
});

const DropdownItem = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  textDecoration: 'none',
  color: '#111 !important',
  fontFamily: 'Poppins',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '120%',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    color: '#111 !important',
  },
});







const BottomNav = styled('div')({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  '&>a': {
    color: 'var(--Color-Heading, #1C1C1C)',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '100%',
    padding: '13px 0',
    textDecoration: 'none',
    '&:hover': {
      color: "#4996E9"
    },
    '&:active': {
      color: "#1970CD"
    }
  }
})

const ProfileBx = styled('div')({

  color: '#fff',
  height: 40,
  width: 40,
  borderRadius: '50%',
  position: 'relative',
  border: "1px solid var(--Color-Neutral-200, #EFF1F3)",
  '&>img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: "cover",
    borderRadius: '50%'
  }

})

const RightNav = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: 'none'
  }
}))
const QRWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  right: 50,
  top: 120,
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 12,

  [theme.breakpoints.down("md")]: {
    position: 'relative',
    top: 'auto',
    right: 'auto',
    transform: 'none',
    marginTop: 16,
    alignItems: 'flex-start',
    width: '100%',
    display: 'flex',        // ✅ show only on mobile
  }
}));

const QRContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  background: '#fff',
  borderRadius: 10,
  padding: '10px 14px',
  border: '2px solid #041a32',
  margin: '8px auto',
  width: 'fit-content',
  maxWidth: '140px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',

  [theme.breakpoints.down("sm")]: {
    padding: '8px 10px',
    maxWidth: '130px',
  }
}));

const QRText = styled('p')(({ theme }) => ({
  color: '#000',
  fontWeight: 600,
  textAlign: 'center',
  margin: 0,
  fontSize: 14,
  lineHeight: '18px',
  [theme.breakpoints.down("md")]: {
    fontSize: 13,
    lineHeight: '17px',
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
    lineHeight: '16px',
  }
}));

const Header = () => {

  const [sidenav, setSidenav] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation();

  const userData = useSelector(store => store.userSlice.profile)
  const exhibitorData = useSelector(store => store.userSlice.exhibitorProfile)
  const [hover, setHover] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);



  const handleRegister = () => {
    localStorage.clear()
    navigate("/auth/signin")
  }

  const handleRegisterExhibitor = () => {
    alert("Exhibitor registration is closed")
    return
    localStorage.clear()
    navigate("/auth/exhibitor/signin")
  }

  const handleCompleteRegisteration = () => {
    if (userData) navigate("/auth/register")
    else if (exhibitorData) navigate("/auth/exhibitor/register")
  }

  const handleRegisterWorkshop = () => {

    if (userData && !userData.paymentStatus) {

      handleCompleteRegisteration();
    } else if (exhibitorData && !exhibitorData.paymentStatus) {

      handleCompleteRegisteration();
    } else {

      handleRegister();
    }
  };
  // const handleRegisterWorkshop = () => {
  //   alert("Workshop registration coming soon!");
  // };

  const handleOpen = () => {
    setSidenav(true)
  }
  const handleMyBookings = async () => {
    handleCloseMenu();
    setOpenBookings(true);
    setLoading(true);

    try {
      // Try to get profile and token from localStorage
      const profileRaw = localStorage.getItem("userProfile");
      const token = localStorage.getItem("accessToken");

      console.log("handleMyBookings called");
      console.log("Raw profile from localStorage:", profileRaw);
      console.log("Token from localStorage:", token);

      let profile = null;

      if (profileRaw) {
        try {
          profile = JSON.parse(profileRaw);
        } catch (parseErr) {
          console.error("Failed to parse profile from localStorage:", parseErr);
        }
      }

      // Fallback: get profile from state if localStorage is empty
      if (!profile && userData) {
        console.log("Using profile from state");
        profile = { data: userData };
      }

      if (!profile?.data?._id || !token) {
        console.warn("User info missing, cannot fetch tickets");
        setTickets([]);
        return;
      }

      console.log("Fetching tickets for user:", profile.data._id);

      const response = await fetch(
        "https://maps.iwayplus.in/secured/cms/event/tickets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ id: profile.data._id }),
        }
      );

      const result = await response.json();

      console.log("Tickets API response:", result);

      if (!result.status) throw new Error("Failed to fetch tickets");

      setTickets(result.data || []);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      setTickets([]);
    } finally {
      setLoading(false);
      console.log("Loading finished");
    }
  };
  const fetchSubEvents = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await fetch(
        `https://maps.iwayplus.in/secured/event/all-subEvent/${projectId}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      const result = await response.json();
      if (!result.status) throw new Error("Failed to fetch sub-events");

      // Convert array to map for easy lookup
      const map = {};
      result.data.forEach((event) => {
        map[event._id] = event.title;
      });
      setSubEvents(map);
    } catch (err) {
      console.error("Failed to fetch sub-events:", err);
    }
  };

  // Call this when component mounts
  useEffect(() => {
    fetchSubEvents();
  }, []);



  const handleClose = () => {
    setSidenav(false)
    handleScrollUp()
  }

  const handleCloseFooter = () => {
    setSidenav(false)
  }

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    let type = userData ? "user" : "exhibitor"
    await logout(type)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //   useEffect(() => {
  //   const fetchTickets = async () => {
  //     try {
  //       setLoading(true);
  //       const userId = localStorage.getItem("userId"); 
  //       const data = await getUserTickets(userId);
  //       setTickets(data);
  //     } catch (error) {
  //       console.error("Failed to fetch tickets:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTickets();
  // }, []);
  const handleViewReceipt = async () => {
    if (userData?.paymentStatus) navigate("/auth/register?formState=3")
    else if (exhibitorData?.paymentStatus) navigate("/auth/exhibitor/register?formState=3")
  }
  const [attendOpen, setAttendOpen] = useState(false);
  const [programOpen, setprogramOpen] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subEvents, setSubEvents] = useState({}); // Map of eventId -> title
  const [footerContact, setFooterContact] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      const data = await getFooterData();
      if (data?.content) {
        setFooterContact(data.content);
      }
    };
    fetchFooter();
  }, []);

  const open = Boolean(anchorEl);

  return (
    <>
      <Head id="header">
        <ContactBx role="complementary" aria-label="Contact information">
          <div>
            <div>
              <img alt="Phone" aria-hidden="true" src={phone} />
              <a
                href={`tel:${footerContact?.contact_phone || "+919717477964"}`}
                aria-label={`Call us at ${footerContact?.contact_phone || "+919717477964"}`}
              >
                {footerContact?.contact_phone || "+919717477964"}
              </a>
            </div>
            <DividerStyle aria-hidden="true" orientation="vertical" />
            <div>
              <img alt="Email" aria-hidden="true" src={email} />
              <a
                href={`mailto:${footerContact?.contact_email || "info@empowerconference.in"}`}
                aria-label={`Email us at ${footerContact?.contact_email || "info@empowerconference.in"}`}
              >
                {footerContact?.contact_email || "info@empowerconference.in"}
              </a>
            </div>
          </div>
        </ContactBx>
        <Component>

          <Img
            src={headerIcon}
            alt="Empower 2026 — Home"
            onClick={() => navigate('/')}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/')}
          />


          <Navbar as="nav" aria-label="Main navigation">
            <Link to="/" onClick={handleScrollUp} className={pathname === "/" ? "active" : ""}>Home</Link>
            <DropdownWrapper>
              <Link
                to="/empower-schedule"
                onClick={handleScrollUp}
                className={pathname === "/program" ? "active" : ""}
              >
                Program
              </Link>
              <DropdownMenu>
                <DropdownItem to="/empower-schedule">Schedule</DropdownItem>

                {/* <DropdownItem to="/workshops">Workshops</DropdownItem> */}
                {/* <DropdownItem to="/keynote-speakers">Keynote Speakers</DropdownItem> */}
                {/* <DropdownItem to="/invited">Speakers</DropdownItem> */}
                <DropdownItem to="/CFP">Call for Paper</DropdownItem>

                <DropdownItem to="/SDC">Student Design Challenge</DropdownItem>

              </DropdownMenu>
            </DropdownWrapper>

            {/* <Link to="/workshops" className={pathname === "/workshops" ? "active" : ""}>
              Workshops

            </Link> */}


            <DropdownWrapper>
              <Link
                to="/attend"
                onClick={handleScrollUp}
              >
                Attend
              </Link>
              <DropdownMenu>
                <DropdownItem to="/attend">Register</DropdownItem>
                <DropdownItem to="/accommodation">Accommodation</DropdownItem>
                <DropdownItem to="/travel">Travel Information</DropdownItem>
              </DropdownMenu>
            </DropdownWrapper>
            <Link to="/exhibit" onClick={handleScrollUp} className={pathname === "/exhibit" ? "active" : ""}>Exhibit</Link>
            <Link to="/sponsor" onClick={handleScrollUp} className={pathname === "/sponsor" ? "active" : ""}>Sponsor</Link>
            <Link to="/program-committee" onClick={handleScrollUp} className={pathname === "/program-committee" ? "active" : ""}>Committees</Link>
            {/* <a href="#footer">Contact Us</a> */}

          </Navbar>


          <HambBtn
            aria-label="Open navigation menu"
            aria-expanded={sidenav}
            aria-controls="mobile-nav"
            onClick={() => handleOpen()}
          >
            <Hamb src={hamburger} aria-hidden="true" />
          </HambBtn>
          <RightNav>
            {
<<<<<<< HEAD
              userData?.paymentStatus ?
                <div style={{
                  display: 'flex',
                  gap: 15
                }}>
                  {/* <ProfileBx>
                    <img alt="" src={userData?.photoUrl} />
                  </ProfileBx> */}
                  {/* <Button style={{
                    background: "#CD191F",
                    color: "#fff",
                    fontWeight: 700
                  }} title="Logout" onClick={() => handleLogout()}>Logout</Button> */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    sx={{ textTransform: "none" }}
                  >
                    My Profile
                  </Button>

                  {/* Dropdown menu with animation + offset */}
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    TransitionComponent={Grow}   // 🔹 adds smooth grow animation
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    slotProps={{
                      paper: {
                        sx: {
                          mt: 1.5,              // 🔹 adds gap below button
                          borderRadius: "12px", // rounded corners
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)", // soft shadow
                          minWidth: 180,
                          animation: "fadeSlide 0.25s ease-in-out", // custom keyframe
                        },
                      },
                    }}
                  >
                    <MenuItem onClick={handleViewReceipt}>View Receipt</MenuItem>
                    <MenuItem onClick={handleMyBookings}>My Bookings</MenuItem>
                  </Menu>

                  {/* Custom animation */}
                  <style>
                    {`
  @keyframes fadeSlide {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}
                  </style>

                  {/* Dialog for My Bookings */}
                  <Dialog open={openBookings} onClose={() => setOpenBookings(false)} fullWidth maxWidth="sm">
                    <DialogTitle sx={{ fontWeight: "600", textAlign: "center", color: "#041a32" }}>
                      My Bookings
                    </DialogTitle>

                    <DialogContent dividers>
                      {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                          <CircularProgress />
                        </Box>
                      ) : tickets.length === 0 ? (
                        <Typography align="center" color="text.secondary" sx={{ py: 2 }}>
                          No bookings found.
                        </Typography>
                      ) : (
                        <Box display="flex" flexDirection="column" gap={2}>
                          {tickets.map((ticket) => (
                            <Card
                              key={ticket._id}
                              variant="outlined"
                              sx={{
                                borderRadius: 2,
                                boxShadow: 3,
                                transition: "0.3s",
                                "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                              }}
                            >
                              <CardContent>
                                {/* Event Title */}
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: 600, color: "#041a32", mb: 1 }}
                                >
                                  {subEvents[ticket.eventId] || `Event ID: ${ticket.eventId}`}
                                </Typography>

                                {/* Status */}
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 600,
                                    color: ticket.status === "Booked" ? "green" : "text.secondary",
                                    mb: 0.5,
                                  }}
                                >
                                  Status: {ticket.status}
                                </Typography>

                                {/* Booked On */}
                                <Box display="flex" alignItems="center" gap={1}>
                                  <CalendarTodayIcon fontSize="small" color="action" />
                                  <Typography variant="body2" color="text.secondary">
                                    Booked On:{" "}
                                    <strong>{new Date(ticket.createdAt).toLocaleDateString()}</strong>
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          ))}
                        </Box>

                      )}
                    </DialogContent>
                  </Dialog>

                  <Button style={{
                    background: "#CD191F",
                    color: "#fff",
                    fontWeight: 700
                  }} title="Logout" onClick={() => handleLogout()}>Logout</Button>
                </div> :
                (userData && !userData?.paymentStatus) ?
                  <Buttons>
                    <ButtonRegister title="complete your registration" onClick={() => handleCompleteRegisteration()}>Complete your Registration</ButtonRegister>
                    <Button style={{
                      background: "#CD191F",
                      color: "#fff",
                      fontWeight: 700
                    }} title="Logout" onClick={() => handleLogout()}>Logout</Button>
                  </Buttons>
                  :
                  exhibitorData?.paymentStatus ?
                    <div style={{
                      display: 'flex',
                      gap: 15
                    }}>
                      <ProfileBx>
                        <img alt="" src={userData?.photoUrl} />
                      </ProfileBx>
                      <Button style={{
                        background: "#CD191F",
                        color: "#fff",
                        fontWeight: 700
                      }} title="Logout" onClick={() => handleLogout()}>Logout</Button>
                      <ButtonRegister title="View Receipt" onClick={() => handleViewReceipt()}> Receipt</ButtonRegister>
                    </div>
                    :
                    (exhibitorData && !exhibitorData?.paymentStatus) ?
                      <Buttons>
                        <ButtonRegister title="complete your registration" onClick={() => handleCompleteRegisteration()}>Complete your Registration</ButtonRegister>
                        <Button style={{
                          background: "#CD191F",
                          color: "#fff",
                          fontWeight: 700
                        }} title="Logout" onClick={() => handleLogout()}>Logout</Button>
                      </Buttons>
                      :
                      <Buttons>
                        {window.location.href.includes("/exhibit") ? (
                          <ButtonRegister
                            title="register as exhibitor"
                            onClick={() => handleRegisterExhibitor()}
                          >
                            Register as Exhibitor
                          </ButtonRegister>
                        ) : window.location.href.includes("/workshops") ? (
                          <ButtonRegister
                            title="register for workshop"
                            onClick={() => handleRegisterWorkshop()}
                          >
                            Register for Workshop
                          </ButtonRegister>
                        ) : (
                          <ButtonRegister title="register" onClick={() => handleRegister()}>
                            Register Now
                          </ButtonRegister>
                        )}
                      </Buttons>
=======
              //               userData?.paymentStatus ?
              //                 <div style={{
              //                   display: 'flex',
              //                   gap: 15
              //                 }}>
              //                   {/* <ProfileBx>
              //                     <img alt="" src={userData?.photoUrl} />
              //                   </ProfileBx> */}
              //                   {/* <Button style={{
              //                     background: "#CD191F",
              //                     color: "#fff",
              //                     fontWeight: 700
              //                   }} title="Logout" onClick={() => handleLogout()}>Logout</Button> */}
              //                   <Button
              //                     variant="contained"
              //                     color="primary"
              //                     onClick={handleClick}
              //                     sx={{ textTransform: "none" }}
              //                   >
              //                     My Profile
              //                   </Button>

              //                   {/* Dropdown menu with animation + offset */}
              //                   <Menu
              //                     anchorEl={anchorEl}
              //                     open={open}
              //                     onClose={handleCloseMenu}
              //                     TransitionComponent={Grow}   // 🔹 adds smooth grow animation
              //                     anchorOrigin={{
              //                       vertical: "bottom",
              //                       horizontal: "right",
              //                     }}
              //                     transformOrigin={{
              //                       vertical: "top",
              //                       horizontal: "right",
              //                     }}
              //                     slotProps={{
              //                       paper: {
              //                         sx: {
              //                           mt: 1.5,              // 🔹 adds gap below button
              //                           borderRadius: "12px", // rounded corners
              //                           boxShadow: "0 4px 12px rgba(0,0,0,0.15)", // soft shadow
              //                           minWidth: 180,
              //                           animation: "fadeSlide 0.25s ease-in-out", // custom keyframe
              //                         },
              //                       },
              //                     }}
              //                   >
              //                     <MenuItem onClick={handleViewReceipt}>View Receipt</MenuItem>
              //                     <MenuItem onClick={handleMyBookings}>My Bookings</MenuItem>
              //                   </Menu>

              //                   {/* Custom animation */}
              //                   <style>
              //                     {`
              //   @keyframes fadeSlide {
              //     from {
              //       opacity: 0;
              //       transform: translateY(-8px);
              //     }
              //     to {
              //       opacity: 1;
              //       transform: translateY(0);
              //     }
              //   }
              // `}
              //                   </style>

              //                   {/* Dialog for My Bookings */}
              //                   <Dialog open={openBookings} onClose={() => setOpenBookings(false)} fullWidth maxWidth="sm">
              //                     <DialogTitle sx={{ fontWeight: "600", textAlign: "center", color: "#041a32" }}>
              //                       My Bookings
              //                     </DialogTitle>

              //                     <DialogContent dividers>
              //                       {loading ? (
              //                         <Box display="flex" justifyContent="center" alignItems="center" py={4}>
              //                           <CircularProgress />
              //                         </Box>
              //                       ) : tickets.length === 0 ? (
              //                         <Typography align="center" color="text.secondary" sx={{ py: 2 }}>
              //                           No bookings found.
              //                         </Typography>
              //                       ) : (
              //                         <Box display="flex" flexDirection="column" gap={2}>
              //                           {tickets.map((ticket) => (
              //                             <Card
              //                               key={ticket._id}
              //                               variant="outlined"
              //                               sx={{
              //                                 borderRadius: 2,
              //                                 boxShadow: 3,
              //                                 transition: "0.3s",
              //                                 "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
              //                               }}
              //                             >
              //                               <CardContent>
              //                                 {/* Event Title */}
              //                                 <Typography
              //                                   variant="h6"
              //                                   sx={{ fontWeight: 600, color: "#041a32", mb: 1 }}
              //                                 >
              //                                   {subEvents[ticket.eventId] || `Event ID: ${ticket.eventId}`}
              //                                 </Typography>

              //                                 {/* Status */}
              //                                 <Typography
              //                                   variant="body2"
              //                                   sx={{
              //                                     fontWeight: 600,
              //                                     color: ticket.status === "Booked" ? "green" : "text.secondary",
              //                                     mb: 0.5,
              //                                   }}
              //                                 >
              //                                   Status: {ticket.status}
              //                                 </Typography>

              //                                 {/* Booked On */}
              //                                 <Box display="flex" alignItems="center" gap={1}>
              //                                   <CalendarTodayIcon fontSize="small" color="action" />
              //                                   <Typography variant="body2" color="text.secondary">
              //                                     Booked On:{" "}
              //                                     <strong>{new Date(ticket.createdAt).toLocaleDateString()}</strong>
              //                                   </Typography>
              //                                 </Box>
              //                               </CardContent>
              //                             </Card>
              //                           ))}
              //                         </Box>

              //                       )}
              //                     </DialogContent>
              //                   </Dialog>

              //                   <Button style={{
              //                     background: "#CD191F",
              //                     color: "#fff",
              //                     fontWeight: 700
              //                   }} title="Logout" onClick={() => handleLogout()}>Logout</Button>
              //                 </div> :
              //                 (userData && !userData?.paymentStatus) ?
              //                   <Buttons>
              //                     <ButtonRegister title="complete your registration" onClick={() => handleCompleteRegisteration()}>Complete your Registration</ButtonRegister>
              //                     <Button style={{
              //                       background: "#CD191F",
              //                       color: "#fff",
              //                       fontWeight: 700
              //                     }} title="Logout" onClick={() => handleLogout()}>Logout</Button>
              //                   </Buttons>
              //                   :
              //                   exhibitorData?.paymentStatus ?
              //                     <div style={{
              //                       display: 'flex',
              //                       gap: 15
              //                     }}>
              //                       <ProfileBx>
              //                         <img alt="" src={userData?.photoUrl} />
              //                       </ProfileBx>
              //                       <Button style={{
              //                         background: "#CD191F",
              //                         color: "#fff",
              //                         fontWeight: 700
              //                       }} title="Logout" onClick={() => handleLogout()}>Logout</Button>
              //                       <ButtonRegister title="View Receipt" onClick={() => handleViewReceipt()}> Receipt</ButtonRegister>
              //                     </div>
              //                     :
              //                     (exhibitorData && !exhibitorData?.paymentStatus) ?
              //                       <Buttons>
              //                         <ButtonRegister title="complete your registration" onClick={() => handleCompleteRegisteration()}>Complete your Registration</ButtonRegister>
              //                         <Button style={{
              //                           background: "#CD191F",
              //                           color: "#fff",
              //                           fontWeight: 700
              //                         }} title="Logout" onClick={() => handleLogout()}>Logout</Button>
              //                       </Buttons>
              //                       :
              //                       <Buttons>
              //                         {window.location.href.includes("/exhibit") ? (
              //                           <ButtonRegister
              //                             title="register as exhibitor"
              //                             onClick={() => handleRegisterExhibitor()}
              //                           >
              //                             Register as Exhibitor
              //                           </ButtonRegister>
              //                         ) : window.location.href.includes("/workshops") ? (
              //                           <ButtonRegister
              //                             title="register for workshop"
              //                             onClick={() => handleRegisterWorkshop()}
              //                           >
              //                             Register for Workshop
              //                           </ButtonRegister>
              //                         ) : (
              //                           <ButtonRegister title="register" onClick={() => handleRegister()}>
              //                             Register Now
              //                           </ButtonRegister>
              //                         )}
              //                       </Buttons>
>>>>>>> 644b0db093ea191ef9129c643ede9c19c6507f5a

            }
          </RightNav>



        </Component>

      </Head>
      <SideNav
        id="mobile-nav"
        open={sidenav}
        anchor="right"
        disableEnforceFocus
        disableAutoFocus
        aria-label="Mobile navigation"
      >
        <div role="navigation" aria-label="Mobile menu">
          <TopBar>
            <button aria-label="Close navigation menu" onClick={handleClose}>
              <img alt="" aria-hidden="true" src={close} />
            </button>
          </TopBar>
          <BottomNav>
            {/* {!userData && !exhibitorData &&
              <>
                {window.location.href.includes("/exhibit") ? (
                  <ButtonRegister
                    title="register as exhibitor"
                    onClick={() => handleRegisterExhibitor()}
                  >
                    Register as Exhibitor
                  </ButtonRegister>
                ) : window.location.href.includes("/workshops") ? (
                  <ButtonRegister
                    title="register for workshop"
                    onClick={() => handleRegisterWorkshop()}
                  >
                    Register for Workshop
                  </ButtonRegister>
                ) : (
                  <ButtonRegister
                    title="register"
                    onClick={() => handleRegister()}
                  >
                    Register Now
                  </ButtonRegister>
                )}
              </>
            } */}

            {(userData || exhibitorData) && <Button style={{
              background: "#CD191F",
              color: "#fff",
              fontWeight: 700
            }} title="Logout" onClick={() => handleLogout()}>Logout</Button>}
            {userData && !userData?.paymentStatus && <ButtonRegister title="complete your registration" onClick={() => handleCompleteRegisteration()}>Complete your Registration</ButtonRegister>}
            {userData && userData.paymentStatus && (
              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    cursor: "pointer",
                    background: "#1976d2",
                    color: "#fff",
                    fontWeight: 600,
                    position: "relative",
                  }}
                >
                  {/* Centered Text */}
                  <span style={{ flexGrow: 1, textAlign: "center" }}>My Profile</span>

                  {/* Arrow on Right */}
                  <span style={{ fontSize: 12, position: "absolute", right: 16 }}>
                    {profileOpen ? "▲" : "▼"}
                  </span>
                </div>


                {/* Submenu */}
                {profileOpen && (
                  <Box
                    role="menu"
                    aria-label="Profile submenu"
                    sx={{
                      mt: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      background: "#f9f9f9",
                      borderRadius: 2,
                      p: 2,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* View Receipt */}
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ fontWeight: 600 }}
                      onClick={handleViewReceipt}
                    >
                      View Receipt
                    </Button>

                    {/* My Bookings */}
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ fontWeight: 600 }}
                      onClick={handleMyBookings}
                    >
                      My Bookings
                    </Button>
                  </Box>
                )}
              </div>
            )}

            {/* Bookings Dialog */}
            <Dialog
              open={openBookings}
              onClose={() => setOpenBookings(false)}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle sx={{ fontWeight: 600, textAlign: "center", color: "#041a32" }}>
                My Bookings
              </DialogTitle>

              <DialogContent dividers>
                {loading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                    <CircularProgress />
                  </Box>
                ) : tickets.length === 0 ? (
                  <Typography align="center" color="text.secondary" sx={{ py: 2 }}>
                    No bookings found.
                  </Typography>
                ) : (
                  <Box display="flex" flexDirection="column" gap={2}>
                    {tickets.map((ticket) => (
                      <Card
                        key={ticket._id}
                        variant="outlined"
                        sx={{ borderRadius: 2, boxShadow: 2 }}
                      >
                        <CardContent>
                          {/* Event Title with Icon */}
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <EventIcon sx={{ color: "#041a32" }} />
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 600, color: "#041a32" }}
                            >
                              {subEvents[ticket.eventId] || "Untitled Event"}
                            </Typography>
                          </Box>

                          {/* Status with Icon */}
                          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                            <CheckCircleIcon
                              sx={{
                                color: ticket.status === "Booked" ? "green" : "gray",
                                fontSize: 18,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color:
                                  ticket.status === "Booked" ? "green" : "text.secondary",
                                fontWeight: 500,
                              }}
                            >
                              Status: <strong>{ticket.status}</strong>
                            </Typography>
                          </Box>

                          {/* Booked On with Calendar Icon */}
                          <Box display="flex" alignItems="center" gap={1}>
                            <CalendarIcon sx={{ color: "#555", fontSize: 18 }} />
                            <Typography variant="body2" color="text.secondary">
                              Booked On:{" "}
                              <strong>
                                {new Date(ticket.createdAt).toLocaleDateString()}
                              </strong>
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                )}
              </DialogContent>
            </Dialog>
            {exhibitorData && !exhibitorData?.paymentStatus && <ButtonRegister title="complete your registration" onClick={() => handleCompleteRegisteration()}>Complete your Registration</ButtonRegister>}
            {exhibitorData && exhibitorData?.paymentStatus && <ButtonRegister title="View Receipt" onClick={() => handleViewReceipt()}>View Receipt</ButtonRegister>}



            <Link onClick={handleClose} to="/">Home</Link>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                onClick={() => setprogramOpen(!programOpen)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  cursor: "pointer",
                }}
              >
                {/* Attend label */}
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "var(--Color-Heading, #1C1C1C)",
                  }}
                >
                  Program
                </span>

                {/* Arrow */}
                <span style={{ fontSize: 12 }}>{programOpen ? "▲" : "▼"}</span>
              </div>

              {/* Submenu */}
              {programOpen && (
                <nav
                  role="menu"
                  aria-label="Program submenu"
                  style={{
                    marginTop: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    background: "#f9f9f9",
                    borderRadius: 6,
                    padding: "10px 12px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  <Link
                    role="menuitem"
                    tabIndex={0}
                    onClick={handleClose}
                    to="/workshops"
                    style={{
                      textDecoration: "none",
                      color: "var(--Color-Heading, #1C1C1C)",
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: "Poppins",
                    }}
                  >
                    Workshops
                  </Link>
                  <Link
                    role="menuitem"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault(); // prevent default link navigation
                      const confirmRedirect = window.confirm("Continue on app for detailed schedule");
                      if (confirmRedirect) {
                        window.open(process.env.REACT_APP_APP_URL, "_blank", "noopener,noreferrer");
                      }
                      handleClose(); // close menu after action
                    }}
                    to="#"
                    style={{
                      textDecoration: "none",
                      color: "var(--Color-Heading, #1C1C1C)",
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: "Poppins",
                    }}
                  >
                    Schedule
                  </Link>

                  {/* <Link
                    role="menuitem"
                    tabIndex={0}
                    onClick={handleClose}
                    to="/keynote-speakers"
                    style={{
                      textDecoration: "none",
                      color: "var(--Color-Heading, #1C1C1C)",
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: "Poppins",
                    }}
                  >
                    Keynote Speaker
                  </Link> */}

                  {/* <Link
                    role="menuitem"
                    tabIndex={0}
                    onClick={handleClose}
                    to="/invited"
                    style={{
                      textDecoration: "none",
                      color: "var(--Color-Heading, #1C1C1C)",
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: "Poppins",
                    }}
                  >
                    Speaker
                  </Link> */}
                  <Link
                    role="menuitem"
                    tabIndex={0}
                    onClick={handleClose}
                    to="/CFP"
                    style={{
                      textDecoration: "none",
                      color: "var(--Color-Heading, #1C1C1C)",
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: "Poppins",
                    }}
                  >
                    Call For Paper
                  </Link>
                  <Link
                    role="menuitem"
                    tabIndex={0}
                    onClick={handleClose}
                    to="/SDC"
                    style={{
                      textDecoration: "none",
                      color: "var(--Color-Heading, #1C1C1C)",
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: "Poppins",
                    }}
                  >
                    Student Design Challenge
                  </Link>
                </nav>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Attend row */}
              <div
                onClick={() => setAttendOpen(!attendOpen)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  cursor: "pointer",
                }}
              >
                {/* Attend label */}
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "var(--Color-Heading, #1C1C1C)",
                  }}
                >
                  Attend
                </span>

                {/* Arrow */}
                <span style={{ fontSize: 12 }}>{attendOpen ? "▲" : "▼"}</span>
              </div>

              {/* Submenu */}
              {attendOpen && (
                <nav
                  role="menu"
                  aria-label="Attend submenu"
                  style={{
                    marginTop: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    background: "#f9f9f9",
                    borderRadius: 6,
                    padding: "10px 12px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  <Link
                    role="menuitem"
                    tabIndex={0}
                    onClick={handleClose}
                    to="/attend"
                    style={{
                      textDecoration: "none",
                      color: "var(--Color-Heading, #1C1C1C)",
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: "Poppins",
                    }}
                  >
                    Register
                  </Link>
                  <Link
                    role="menuitem"
                    tabIndex={0}
                    onClick={handleClose}
                    to="/accommodation"
                    style={{
                      textDecoration: "none",
                      color: "var(--Color-Heading, #1C1C1C)",
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: "Poppins",
                    }}
                  >
                    Accommodation
                  </Link>
                  <Link
                    role="menuitem"
                    tabIndex={0}
                    onClick={handleClose}
                    to="/travel"
                    style={{
                      textDecoration: "none",
                      color: "var(--Color-Heading, #1C1C1C)",
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: "Poppins",
                    }}
                  >
                    Travel Information
                  </Link>
                </nav>
              )}
            </div>


            <Link onClick={handleClose} to="/exhibit">Exhibit</Link>
            <Link onClick={handleClose} to="/sponsor">Sponsor</Link>
            <Link onClick={handleClose} to="/program-committee">Committees</Link>
            {/* <a onClick={handleCloseFooter} href="#footer">Contact Us</a> */}
            <QRWrapper>
              <a href={process.env.REACT_APP_APP_URL} target="_blank" rel="noopener noreferrer">
                <QRContainer>
                  <QRText>Download Empower App now!</QRText>
                  <QRCode
                    size={90}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={process.env.REACT_APP_APP_URL}
                    viewBox="0 0 256 256"
                  />
                </QRContainer>
              </a>
            </QRWrapper>
          </BottomNav>

        </div>
      </SideNav>
    </>
  )
}

export default Header