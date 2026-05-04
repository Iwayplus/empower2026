import { styled } from "@mui/material"
import callForPaper from '../../assets/callForPaper.jpeg'
import { assistiveTechTopics, conferenceTimeline } from "./data"
import bulletPt from '../../assets/bulletPt.svg'
import redirect from '../../assets/redirect.svg'

import { motion } from "framer-motion"

const Component = styled("div")({

})

const Quote = styled('div')(({ theme }) => ({
    margin: "99px 70px",
    fontFamily: 'Poppins',
    color: 'var(--Color-Body-text, #fff)',
    '&>h2': {
        fontSize: 32,
        fontWeight: 600,
        lineHeight: '130%',
        margin: 0,
    },
    '&>p': {
        fontSize: 18,
        fontWeight: 400,
        lineHeight: '160%',
        margin: "8px 0 0 0",
        '&>span': {
            fontWeight: 700
        }
    },
    maxWidth: '100%',
    position: 'relative',
    [theme.breakpoints.down("sm")]: {
        margin: "auto 0",
        maxWidth: '100%',
        '&>h2': {
            fontSize: 32
        }
    }
}))


const Cont1 = styled('div')(({ theme }) => ({
    margin: "56px 70px 0 70px",
    fontFamily: 'Poppins',
    '&>h3': {
        color: '#000',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '120%',
        margin: 0
    },
    '&>p': {
        marginTop: 16,
        fontSize: 18,
        lineHeight: '160%',
        color: "#4a4a4a"
    },
    [theme.breakpoints.down("sm")]: {
        margin: 5,
        paddingTop: 30,

    }
}))

const Includes = styled('div')(({ theme }) => ({
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    '&>div': {
        display: 'flex',
        alignItems: "center",
        gridColumn: 'span 6',
        [theme.breakpoints.down("sm")]: {
            alignItems: "flex-start",
        },
        '&>img': {
            width: 24
        },
        '&>p': {
            color: 'var(--Color-Body-text, #494949)',
            fontFamily: 'Poppins',
            fontSize: 20,
            fontWeight: 400,
            lineHeight: '150%',
            margin: 0,
            [theme.breakpoints.down("sm")]: {
                fontSize: 14
            }
        }
    },
    [theme.breakpoints.down("sm")]: {
        gap: 2
    }
}))

const Cont2 = styled('div')(({ theme }) => ({
    padding: "0 120px",
    display: 'flex',
    gap: 70,
    [theme.breakpoints.down("sm")]: {
        padding: 5,
        flexDirection: 'column',
        gap: 0
    }
}))

const LeftCont = styled('div')(({ theme }) => ({
    maxWidth: 749,

    '&>h2': {
        color: '#1C1C1C',
        fontFamily: 'Poppins',
        fontSize: 32,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '130%',
        margin: 0
    },
    '&>h3': {
        color: 'var(--Color-Heading, #1C1C1C)',
        fontFamily: 'Poppins',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '120%',
        margin: "40px 0 0 0",
        [theme.breakpoints.down("sm")]: {
            margin: "20px 0 0 0",
        }
    },
    '&>p': {
        color: 'var(--Color-Body-text, #4A4A4A)',
        fontFamily: 'Poppins',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%',
        [theme.breakpoints.down("sm")]: {
            fontSize: 16
        }
    }
}))



const RightCont = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: "column",
    '&>h3': {
        color: "#000",
        fontFamily: 'Poppins',
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: 600,
        margin: 0,
        lineHeight: '120%' /* 28.8px */

    },
    [theme.breakpoints.down("sm")]: {
        marginTop: 25
    },
    '&>p': {
        color: "var(--Color-Body-text, #4A4A4A)",
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        margin: 0,
        marginTop: 20,
        fontWeight: 400,
        maxWidth: '100%',
        lineHeight: "150%" /* 24px */
    }
}))

const Table = styled('table')(({ theme }) => ({
    borderCollapse: "collapse",
    marginTop: 20,
    width: '60%',
    [theme.breakpoints.down("sm")]: {
        width: '100%',
    },
    '&>tr': {
        '&>th': {
            border: "1px solid #D1D5DB",
            textAlign: "left",
            paddingLeft: 20,
            paddingTop: 12,
            paddingBottom: 12,
            fontFamily: 'Poppins',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: "120%",
            background: 'var(--Color-Black, #E5E5E5)',
            color: '#1c1c1c',
            textTransform: "uppercase"
        },
        '&>th:nth-of-type(2)': {
            paddingTop: 10,
            paddingLeft: 10,
            paddingBottom: 10,
            paddingRight: 10,
        },
        '&>td': {
            border: "1px solid #D1D5DB",
            paddingTop: 12,
            paddingLeft: 20,
            paddingBottom: 12,
            paddingRight: 20,
            fontFamily: 'Poppins',
            fontSize: 18,
            fontWeight: 400,
            lineHeight: "150%"
        },
        '&>td:nth-of-type(2)': {
            color: '#4A4A4A',
            fontSize: 16,
            paddingTop: 10,
            paddingLeft: 10,
            paddingBottom: 10,
            paddingRight: 10,
        }
    }
}))



const SubmitBtn = styled('button')({
    marginTop: 24,
    padding: '8px 16px',
    borderRadius: 4,
    // background: '#2180E4',
    color: '#fff',
    textAlign: 'center',
    // fontFamily: "DM Sans",
    fontSize: 16,
    // font-style: normal;
    fontWeight: 500,
    opacity: 1,
    lineHeight: "20px", /* 111.111% */
    border: 'none',
    // cursor: 'pointer',
    // '&:hover': {
    //     opacity: 0.7
    // }
})

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: '80px 70px',
    width: '100%',
    minHeight: 555,
    gap: 10,
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(${callForPaper}) lightgray 0px -202.559px / 100% 240.029% no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxSizing: 'border-box',
    [theme.breakpoints.down("md")]: {
        height: '100%',
        flexDirection: "column",
        padding: 16,
        justifyContent: 'flex-start',
    }
}))







export const CallForPaper = () => {

    const handleSubmitPaper = () => {
        window.open("https://easychair.org/conferences/?conf=empower25", "_blank")
    }
    return (
        <Component>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Container>
                    {/* <Img src={callForPaper} /> */}
                    {/* <SubmitBtn>Make a Paper Submission</SubmitBtn> */}
                    <Quote>
                        <h2>Call for Papers</h2>
                        <p>EMPOWER 2026 invites contributions on all aspects related to <span>technology and disability</span> ranging from Research and Development, Manufacturing, Dissemination, Service Delivery, Training and Education, Usability and Impact.</p>
                        <SubmitBtn disabled title="make a paper submission" onClick={handleSubmitPaper}>Call Opening on 1st June 2026</SubmitBtn>
                    </Quote>
                </Container>
            </motion.div>


            <Cont1>
                <h3>Schedule and Timeline</h3>
                <Table>
                    <tr>
                        <th>Activity</th>
                        <th>Date</th>
                    </tr>
                    {conferenceTimeline?.map((elm) => {
                        // Parse the date string like "1st June 2025" -> remove st/nd/rd/th
                        const cleanedDateStr = elm.date.replace(/(\d+)(st|nd|rd|th)/, "$1");
                        const activityDate = new Date(cleanedDateStr);
                        const today = new Date();
                        const isPast = today > activityDate; // check if past

                        return (
                            <tr key={elm.activity}>
                                <td style={{ textDecoration: isPast ? "line-through" : "none", color: isPast ? "gray" : "inherit" }}>
                                    {elm.activity}
                                </td>
                                <td style={{ textDecoration: isPast ? "line-through" : "none", color: isPast ? "gray" : "inherit" }}>
                                    {elm.date}
                                </td>
                            </tr>
                        );
                    })}
                </Table>
            </Cont1>

            {/* <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >

            <Cont2>
                <LeftCont>
                    <h2>Submission Categories</h2>
                    <h3>Research Track</h3>
                    <p>The Research Track calls for groundbreaking contributions that present innovative ideas, novel methodologies, or transformative breakthroughs. Submissions should demonstrate a strong potential for real-world applications and significant contributions to the advancement of the field. We seek rigorously conducted research supported by robust experimentation, comprehensive data analysis, and evidence-based conclusions.</p>
                </LeftCont>
                <RightCont>
                    <h3>Schedule and Timeline</h3>
                    <Table>
                        <tr>
                            <th>Activity</th>
                            <th>Date</th>
                        </tr>
                        {
                            conferenceTimeline?.map(elm => (
                                <tr>
                                    <td>{elm?.activity}</td>
                                    <td>{elm?.date}</td>
                                </tr>
                            ))
                        }
                    </Table>
                </RightCont>
            </Cont2>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >

            <Cont2 style={{
                paddingBottom: 80,
                paddingTop: 80
            }}>
                <LeftCont>
                    <h3>Inclusion Track</h3>
                    <p>The Inclusion Track seeks groundbreaking concepts and initiatives across the assistive technology (AT) spectrum, including hardware and software products, innovative solutions and services, training programs, research findings, and best practices.</p>
                    <InclutionDiv>
                    {
                        inclusions?.map((elm, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >

                            <Inclution>
                                <h3>{elm.title}</h3>
                                <p>{elm.detail}</p>
                            </Inclution>
                            </motion.div>
                        ))
                    }
                </InclutionDiv>
                </LeftCont>
                <RightCont>
                    <h3>Submission Deadlines</h3>
                    <Table>
                    <tr>
                        <th>Activity</th>
                        <th>Date</th>
                    </tr>
                    
                    {
                        suibmissionGuidelines?.map(elm => (
                            <tr>
                                <td>{elm.activity}</td>
                                <td>{elm.date}</td>
                            </tr>
                        ))
                    }
                </Table>
                <p>Presenters must provide all relevant details to help attendees learn more about the proposed presentation.</p>

                </RightCont>
            </Cont2>
            </motion.div> */}
            <Cont1>
                <h3>Guidelines and Submission Procedure</h3>
                <p>EMPOWER 2026 calls for groundbreaking contributions that present innovative ideas, novel methodologies, or transformative breakthroughs. Submissions should demonstrate a strong potential for real-world applications and significant contributions to the advancement of the field. We seek rigorously conducted research supported by robust experimentation, comprehensive data analysis, and evidence-based conclusions.</p>
                <p>Please ensure that the extended abstract is submitted in an accessible format. All authors must be listed on the extended abstract document as well as final camera ready paper (subject to acceptance) and must be disclosed before the review. Do designate one author as the contact author along with the email id and contact number for all related communication. At least one author must register and present at the conference for each selected paper.</p>
            </Cont1>
            <Cont1 style={{
                padding: 24,
                background: "#A83D1B",
                marginBottom: 96
            }}>
                <h3 style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: '120%'
                }}>You can use the following template for finalizing your extended abstract submissions.</h3>
                <a style={{
                    background: '#fff',
                    margin: "16px 0 0 0",
                    padding: "10px 16px",
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    maxWidth: "max-content",
                    color: "#000"
                }} href="https://docs.google.com/document/d/1-NscsaY14cU02nAgLZO0AA_rUivUTguS/edit?tab=t.0" target="blank">
                    Empower26- Template for Extended Abstract
                    <img src={redirect} alt="" />
                </a>
                <p style={{
                    marginTop: 8,
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: '150%',
                    color: "#fff"
                }}>Note: Template will open in Google Docs. Go to File and Download as Microsoft word.docx and start editing.</p>
                <p style={{
                    margin: "32px 0 0 0",
                    fontSize: 20,
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "120%",
                    color: "#fff"
                }}>Still have questions?</p>
                <p style={{
                    margin: "4px 0 0 0",
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: "#fff"
                }}>We're here to help! Reach out to us at <a style={{
                    color: "#fff"
                }} href="mailto:info@empowerconference.in">info@empowerconference.in</a></p>
            </Cont1>
        </Component>
    )
}

export default CallForPaper