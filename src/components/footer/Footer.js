import { styled } from "@mui/material"
import logo from '../../assets/data.png'
import mail from '../../assets/mail.svg'
import call from '../../assets/call.svg'
import calander from '../../assets/calander.svg'
import map from '../../assets/map.svg'
import timing from '../../assets/timing.svg'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import download from "../../assets/app.png"
import { FaLinkedin, FaInstagram } from "react-icons/fa";
const Component = styled('section')({

})

const Container = styled("div")(({ theme }) => ({
    marginTop: 30,
    padding: 40,
    background: '#041A32',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        gap: 40,
        padding: "40px 16px",
    }
}))

const LogoBx = styled('div')(({ theme }) => ({
    maxWidth: 462,
    '&>img': {
        height: 35,
        width: 150
    },
    [theme.breakpoints.down("md")]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'
    }
}))

const DetailsBx = styled('div')(({ theme }) => ({
    width: '21vw',
    [theme.breakpoints.down("md")]: {
        width: '100%'
    }
}))

const DirectionBx = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 16
})

const Text = styled('h2')(({ theme }) => ({
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: '1.125em',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '150%', /* 27px */
    margin: 0,
    textAlign: 'left',
    [theme.breakpoints.down("md")]: {
        marginTop: 16
    }
}))
const Title = styled('h3')({
    fontFamily: 'Inter',
    fontSize: '1.125em',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '150%',
    margin: 0,
    color: '#fff'
})
const ContactBx = styled('div')({
    marginTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
})

const Elm = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    '&>img': {
        width: 24,
        height: 24
    },
    '&>p, a': {
        color: "#fff",
        fontFamily: 'Inter',
        fontSize: '1em',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%',
        margin: 0
    },
    'div': {
        display: 'flex',
        flexDirection: 'column'
    }
})

const DirectionBtn = styled('button')({
    borderRadius: 100,
    border: '1px solid #C4BABA',
    padding: "18px 40px",
    color: '#4A3AFF',
    textAlign: 'center',
    // fontFamily: "DM Sans"
    fontSize: '1.125em',
    fontWeight: 700,
    lineHeight: '20px',
    background: 'none',
    cursor: 'pointer'
})

const CopyrightBx = styled('div')(({ theme }) => ({
    background: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '27px 0',
    '&>p': {
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '150%',
        margin: 0,
        textAlign: 'center'
    },
    [theme.breakpoints.down("md")]: {
        padding: '15px 0',
        '&>p': {
            fontSize: '0.7em',
        }
    }
}))

const PrevLinks = styled('div')({
    '&>div': {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 16,
        gap: 16,
        '&>a': {
            color: 'var(--Color-White, #FFF)',
            fontFamily: 'Poppins',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%'
        }
    }
})

const Footer = () => {


    // const handleClickDirection = () => {
    //     window.open('https://maps.app.goo.gl/nLTpbYeQSyVGrPjz8', '_blank');
    // }






    return (
        <Component id="footer" >
            <Container>
                <LogoBx>
                    <img src={logo} alt="" />
                    <Text>Empower 2026 is a global conference dedicated to accessibility in design, tech, and innovation. Learn from industry leaders and participate in hands-on workshops</Text>
                    {/* <img src={logo} alt="" /> */}
                    <h3 style={{ marginTop: "20px", marginBottom: "8px", fontSize: "20px", fontWeight: "600", color: "#fff" }}>
                        Connect with us
                    </h3>

                    <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                        <a
                            href="https://www.linkedin.com/company/empower-assisitive-technology-conference/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow us on LinkedIn"
                        >
                            <FaLinkedin size={28} color="#0a66c2" />
                        </a>
                        <a
                            href="https://www.instagram.com/empower.conf?igsh=MTRobWRwOGF3YXZvaQ=="
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow us on Instagram"
                        >
                            <FaInstagram size={28} color="#E1306C" />
                        </a>
                    </div>
                </LogoBx>

                <DetailsBx>
                    <Title>Contact Us</Title>
                    <ContactBx>
                        {/* <Elm>
                            <img src={calander} alt="" />
                            <p>3rd, 4th & 5th October 2026</p>
                        </Elm> */}
                        <Elm>
                            <img src={timing} alt="" />
                            <p>10 am - 5 pm (Monday to Friday)</p>
                        </Elm>
                        <Elm>
                            <img src={call} alt="" />
                            <div>
                                <a href={`tel:+919871093651`}>+919871093651</a>
                                {/* <a href="tel:+911126591285">+91-11-26591285</a> */}
                            </div>

                        </Elm>
                        <Elm>
                            <img src={mail} alt="" />
                            <a href="mailto:info@empowerconference.in">info@empowerconference.in</a>
                        </Elm>
                        <Elm>
                            <img src={map} alt="" />
                            <p>Assistech Lab, Indian Institute of Technology Delhi, New Delhi, India</p>
                        </Elm>



                    </ContactBx>
                </DetailsBx>
                <PrevLinks>
                    <Title>Past Conferences</Title>
                    <div>
                        <a target="_blank" rel="noreferrer" href="https://empowerconferences.in/">Empower 2018 - 2024</a>
                        <a target="_blank" rel="noreferrer" href="https://empowerconferences.in/2025">Empower 2025</a>

                        {/* <a target="_blank"  rel="noreferrer" href="https://empower23.respark.iitm.ac.in/">Empower 2023</a>
                        <a target="_blank"  rel="noreferrer" href="https://empower2022.in/">Empower 2022</a>
                        <a target="_blank"  rel="noreferrer" href="https://empower2021.iiitb.ac.in/">Empower 2021</a>
                        <a target="_blank"  rel="noreferrer" href="https://empower2020.iiitb.ac.in/">Empower 2020</a>
                        <a target="_blank"  rel="noreferrer" href="https://assistech.iitd.ac.in/empower2019/">Empower 2019</a>
                        <a target="_blank"  rel="noreferrer" href="https://assistech.iitd.ac.in/empower2018/">Empower 2018</a> */}
                    </div>
                </PrevLinks>
                <DirectionBx>
                    <Title>Venue Directions</Title>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4153.583722712865!2d77.18925209468964!3d28.543941178796093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d9a6426d987%3A0x48afdc51e54c8134!2sResearch%20and%20Innovation%20Park%20(RNI)%20-%20IIT%20DELHI!5e0!3m2!1sen!2sin!4v1741772416957!5m2!1sen!2sin" width="269" height="227" style={{ border: 0, borderRadius: 8 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    {/* <DirectionBtn title="direction" onClick={() => handleClickDirection()}>Direction</DirectionBtn> */}
                </DirectionBx>


            </Container>

            <CopyrightBx>

                <p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '1.125em', marginBottom: '8px' }}>
                        <Link style={{ color: '#fff', whiteSpace: 'nowrap' }} to="/cancellation-refund-policy">
                            Cancellation and Refund Policy
                        </Link>
                        <Link style={{ color: '#fff', whiteSpace: 'nowrap' }} to="/privacy-policy">
                            Privacy Policy
                        </Link>
                        <Link style={{ color: '#fff', whiteSpace: 'nowrap' }} to="/terms-condition">
                            Terms and Conditions
                        </Link>
                    </div>
                    Copyright - All rights reserved with Empower 2026,&nbsp;
                    <a
                        href="https://assistech.iitd.ac.in/"
                        target="_blank"
                        rel="noreferrer"
                        className="assistech-link"
                        style={{ color: '#fff' }}
                    >
                        Assistech Lab, IIT Delhi
                    </a>
                </p>
            </CopyrightBx>

        </Component>
    )
}

export default Footer