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
import { baseUrl, getFooterData } from "../../services/api";
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
    '& > img': {
        width: 150,
        height: 'auto', 
        objectFit: 'contain'
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
    const [dynamicSection, setDynamicSection] = useState(null);

    useEffect(() => {
        const fetchFooter = async () => {
            const data = await getFooterData();
            if (data) {
                setDynamicSection(data);
            }
        };
        fetchFooter();
    }, []);

    const logoUrl = dynamicSection?.content?.logo
        ? (dynamicSection.content.logo.startsWith("http")
            ? dynamicSection.content.logo
            : `${baseUrl}/uploads/${encodeURIComponent(dynamicSection.content.logo)}`)
        : logo;

    const getEmbedMapUrl = (url) => {
        if (!url) return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4153.583722712865!2d77.18925209468964!3d28.543941178796093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d9a6426d987%3A0x48afdc51e54c8134!2sResearch%20and%20Innovation%20Park%20(RNI)%20-%20IIT%20DELHI!5e0!3m2!1sen!2sin!4v1741772416957!5m2!1sen!2sin";
        if (url.includes("/embed") || url.includes("embed?")) return url;
        if (url.includes("google.com/maps")) {
            return url.replace("/maps", "/maps/embed");
        }
        return url;
    };


    // const handleClickDirection = () => {
    //     window.open('https://maps.app.goo.gl/nLTpbYeQSyVGrPjz8', '_blank');
    // }






    return (
        <footer id="footer">
            <Container>
                <LogoBx>
                    <img src={logoUrl} alt={`${process.env.REACT_APP_APP_NAME} Conference Logo`} />
                    <Text>{dynamicSection?.content?.footer_desc || `${process.env.REACT_APP_APP_NAME} is a global conference dedicated to accessibility in design, tech, and innovation. Learn from industry leaders and participate in hands-on workshops`}</Text>
                    <h3 style={{ marginTop: "20px", marginBottom: "8px", fontSize: "20px", fontWeight: "600", color: "#fff" }}>
                        Connect with us
                    </h3>

                    <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                        <a
                            href={dynamicSection?.content?.linkedin_url || "https://www.linkedin.com/company/empower-assisitive-technology-conference/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow us on LinkedIn"
                        >
                            <FaLinkedin size={28} color="#0a66c2" />
                        </a>
                        <a
                            href={dynamicSection?.content?.instagram_url || "https://www.instagram.com/empower.conf?igsh=MTRobWRwOGF3YXZvaQ=="}
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
                        <Elm>
                            <img src={timing} alt="" aria-hidden="true" />
                            <p>{dynamicSection?.content?.contact_timing || "10 am - 5 pm (Monday to Friday)"}</p>
                        </Elm>
                        <Elm>
                            <img src={call} alt="" aria-hidden="true" />
                            <div>
                                <a href={`tel:${dynamicSection?.content?.contact_phone || "+918796897338"}`}>{dynamicSection?.content?.contact_phone || "+919717477964"}</a>
                            </div>
                        </Elm>
                        <Elm>
                            <img src={mail} alt="" aria-hidden="true" />
                            <a href={`mailto:${dynamicSection?.content?.contact_email || "info@empowerconference.in"}`}>{dynamicSection?.content?.contact_email || "info@empowerconference.in"}</a>
                        </Elm>
                        <Elm>
                            <img src={map} alt="" aria-hidden="true" />
                            <p>{dynamicSection?.content?.contact_address || "Assistech Lab, Indian Institute of Technology Delhi, New Delhi, India"}</p>
                        </Elm>
                    </ContactBx>
                </DetailsBx>
                <PrevLinks>
                    <Title>Past Conferences</Title>
                    <div>
                        {
                            dynamicSection?.content?.past_conferenes?.map((e, index) => {
                                return <a key={index} target="_blank" rel="noreferrer" href={e.url}>{e.text || "Empower 2018 - 2024"}</a>
                            })
                        }
                    </div>
                </PrevLinks>
                <DirectionBx>
                    <Title>Venue Directions</Title>
                    <iframe
                        title="Venue location map — IIT Delhi Research and Innovation Park"
                        src={getEmbedMapUrl(dynamicSection?.content?.maps_url)}
                        width="269"
                        height="227"
                        style={{ border: 0, borderRadius: 8 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </DirectionBx>

            </Container>

            <CopyrightBx>
                <div role="contentinfo" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '1.125em', marginBottom: '8px' }}>
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
                    {dynamicSection?.content?.copyright_text ? (
                        dynamicSection.content.copyright_text
                    ) : (
                        <>
                            Copyright - All rights reserved with {process.env.REACT_APP_APP_NAME},&nbsp;
                            <a
                                href="https://assistech.iitd.ac.in/"
                                target="_blank"
                                rel="noreferrer"
                                className="assistech-link"
                                style={{ color: '#fff' }}
                            >
                                Assistech Lab, IIT Delhi
                            </a>
                        </>
                    )}
            </CopyrightBx>

        </footer>
    )
}

export default Footer