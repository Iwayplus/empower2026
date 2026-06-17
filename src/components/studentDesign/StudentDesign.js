import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, styled } from "@mui/material"


import callForStudent from '../../assets/callForStudent.svg'
import { deadlines, problemset } from "./data"
import redirect from '../../assets/redirect.svg'
import { useState, useEffect } from "react"
import downArrow from '../../assets/downArrow.svg'
import { fetchPublicDynamicSections } from "../../services/api"
import DynamicSectionRenderer from "../dynamic/SectionRenderer"

const Component = styled("section")({
    fontFamily: 'Poppins'
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
const Section = styled("div")(({ theme }) => ({
    margin: "56px 70px 0 70px",
    display: 'flex',
    flexDirection: "column",
    gap: 16,
    fontFamily: "Poppins",
    [theme.breakpoints.down("sm")]: {
        margin: "16px 5px 0 16px",
    },
    'h2': {
        color: 'var(--Color-Heading, #1C1C1C)',
        fontSize: 32,
        fontWeight: 600,
        lineHight: "130%",
        margin: 0
    },
    'p': {
        color: "var(--Color-Body-text, #4A4A4A)",
        fontSize: 18,
        fontWeight: 400,
        lineHeight: '160%',
        margin: 0,
        'span': {
            color: "#1C1C1C",
            fontSize: 20,
            fontWeight: 500,
            lineHeight: '120%'
        }
    },
    'h3': {
        color: "var(--Color-Heading, #1C1C1C)",
        fontSize: 24,
        fontWeight: 600,
        lineHeight: '120%',
        margin: 0
    },
    'div': {
        margin: 0,


    }
}))

const OpenFormBtn = styled('a')({
    padding: "10px 16px",
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    color: "#000",
    marginTop: 8,
    background: '#fff',
    width: "fit-content"

})

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
        maxWidth: '70vw',
        borderCollapse: "collapse",
        marginTop: 16,
        [theme.breakpoints.down("sm")]: {
            maxWidth: '100vw',
        },
        '&>tr': {
            '&>th': {
                fontFamily: 'Inter',
                fontSize: 14,
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: "18px",
                textAlign: "left",
                height: 40,
                border: "1px solid #828282",
                paddingLeft: 17,
                paddingRight: 17
            },
            '&>td': {
                fontFamily: 'Poppins',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: "150%",
                textAlign: "left",
                height: 40,
                border: "1px solid #828282",
                paddingLeft: 17
            }

        }
    }
}))



const StudentDesign = () => {
    const [dynamicSections, setDynamicSections] = useState([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const fetchSDCData = async () => {
            try {
                const sections = await fetchPublicDynamicSections(process.env.REACT_APP_PROJECT_ID, 'Published');
                setDynamicSections(sections.filter(sec => sec.section_type === 'student-design'));
            } catch (err) {
                console.error("Error fetching dynamic sections for SDC", err);
            }
        };
        fetchSDCData();
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Component>
            <Theme>
                <img alt="theme" src={callForStudent} />
            </Theme>
            <Section>
                <h2>Call for Participation in Student Design Challenge</h2>
                <p>The Student Design Challenge (SDC) track at the EMPOWER conference was introduced to encourage a greater participation of students and early-stage innovators to contribute to the growing assistive technology sector in India and the Global South. As India’s premier conference on assistive technology, EMPOWER 2026 will bring together a diverse range of stakeholders from the country and abroad, and will provide a very effective platform for engaging in early-stage technology design discussions.</p>
                <p>For this year’s SDC, teams could pick from the 13 problem statements given below. Every team will be expected to work on developing a working/design prototype to address the specific problem they choose. A team of mentors will be available to provide guidance to the teams at identified stages during the solution conceptualization/design process. Winning teams will receive cash awards and an opportunity to attend EMPOWER 2026 at the Indian Institute of Technology Delhi and present their ideas to a distinguished panel of experts in the assistive technology space.</p>
            </Section>
            <Section>
                <h3>Problem Statements</h3>
                <div style={{
                    // marginTop: 24
                }}>
                    {
                        problemset?.map((elm, inx) => (
                            <div style={{
                                padding: "16px 0",
                                borderTop: "1px solid var(--Color-Neutral-400, #D1D5DB)"
                            }}>
                                <h4 style={{
                                    margin: 0
                                }}>{inx + 1}. {elm.heading}</h4>
                                {
                                    elm.paragraphs?.map(para => (
                                        <>
                                            <p style={{
                                                margin: "12px 0 0 0"
                                            }} >{para}</p>
                                        </>
                                    ))
                                }
                                {
                                    elm.bullets?.length > 0 &&
                                    <>
                                        <p style={{ margin: "12px 0 0 0" }}>Some requirements are:</p>
                                        <ul>
                                            {
                                                elm.bullets?.map(bullet => (
                                                    <li>{bullet}</li>
                                                ))
                                            }
                                        </ul></>
                                }
                            </div>
                        ))
                    }
                </div>
            </Section>
            {
                <Section style={{
                    background: "#A83D1B",
                    padding: 24
                }}>
                    <h3 style={{
                        fontSize: 20,
                        color: "#fff"
                    }}>Eligibility and Expression of Interest</h3>
                    <p style={{
                        fontSize: 16,
                        color: '#fff'
                    }}>Teams of up to 4 students are eligible. Multidisciplinary and inclusive teams are strongly encouraged to apply. Submit your interest for taking part in the challenge before <span style={{
                        fontWeight: 600,
                        color: "#fff",
                    }}>30th June 2026.</span></p>
                    <OpenFormBtn target="_blank" href="https://forms.gle/ZUba2ciVMYxXJqVu5" >
                        Registration Form
                        <img src={redirect} alt="" />
                    </OpenFormBtn>
                </Section>
            }
            <Section>
                <h3>Note:</h3>
                <p>Problem statements will be allotted on a first-come, first-served basis. In case multiple teams opt for the same problem statement, priority will be given to the team that registers first. Other teams will be required to select an alternative problem statement based on their preferences and availability.</p>
            </Section>
            <Section>
                <h3>Important Dates</h3>
                <TableBx>
                    <table>
                        <tr>
                            <th style={{
                                background: "#F6DBDB"
                            }}>Milestone - event</th>
                            <th style={{
                                background: "#D9D9D9"
                            }}>Date</th>
                        </tr>
                        {
                            deadlines?.map(elm => (
                                <tr>
                                    <td style={{
                                        width: 739
                                    }}>{elm?.activity}</td>
                                    <td style={{
                                        width: 272
                                    }}>{elm?.date}</td>
                                </tr>
                            ))
                        }
                    </table>
                </TableBx>
            </Section>
            <Section>
                <h3>Prizes</h3>
                <p>The winning team will receive a cash prize of <span>INR 50,000/-</span> and two runner-up teams will receive a prize of <span>INR 25,000/-</span> each. In addition to the prize money, incubation support may also be provided to promising teams to further productize the solutions at research labs and innovation facilities attached to IIT Delhi, IIT Madras, IIIT Bangalore, Artilab Foundation (subject to fulfilling any additional specific eligibility criteria of these facilities).</p>
                <p>A waiver of registration charges and travel grants to attend the conference will be provided to all the teams shortlisted for final presentations at EMPOWER 2026. </p>
            </Section>
            <Section>
                <h3>Expected output and Judging criteria</h3>
                <p>For the final submission, every shortlisted team will be expected to come up with a working prototype (or, a design prototype) as per the problem statement selected. Before the final shortlisting and after the second review by mentors, the teams will be asked to submit a one-page poster and a 3-5 minute video of their work/prototype. Shortlisted teams will be invited to present their prototype during the conference. More details on the criteria to be adopted for judging will be provided during the briefing and mentoring sessions.</p>
            </Section>
            <Section style={{
                background: "#A83D1B",
                padding: 24,
                marginBottom: 100
            }}>
                <h3 style={{
                    fontSize: 20,
                    color: "#fff"
                }}>Still have questions?</h3>
                <p style={{
                    fontSize: 16,
                    color: '#fff',
                    marginTop: -11
                }}>We're here to help! Reach out to us at <a style={{
                    color: "#fff",
                    fontWeight: 500
                }} href="mailto:info@empowerconference.in"> info@empowerconference.in</a></p>

            </Section>

            {/* Dynamic CMS Sections */}
            {dynamicSections.map((section) => (
                <DynamicSectionRenderer key={section._id || section.id} section={section} />
            ))}
        </Component>
    )
}

export default StudentDesign