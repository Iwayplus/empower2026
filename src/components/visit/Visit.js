import { styled } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

import {
  heroContent,
  eventStrip,
  welcomeSection,
  exploreSection,
  doSection,
  photoGuide,
  planYourVisit,
  accessibilitySection,
  registrationSection,
  courtesySection,
  faqs,
  finalCta,
} from "./data";


const Component = styled("section")({});

const Hero = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 20,
  padding: "64px 70px 40px",
  fontFamily: "Poppins",

  [theme.breakpoints.down("sm")]: {
    padding: "32px 16px 24px",
  },

  "&>h1": {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: "130%",
    color: "#000000",
    margin: 0,

    [theme.breakpoints.down("sm")]: {
      fontSize: 28,
    },
  },

  "&>h2": {
    fontSize: 20,
    fontWeight: 500,
    color: "#041A32",
    margin: 0,
  },

  "&>p": {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: "150%",
    color: "#494949",
    // maxWidth: 720,
    margin: 0,
  },
}));

const ButtonRow = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 24,
  flexWrap: "wrap",
});

const PrimaryBtn = styled("a")(({ theme }) => ({
  padding: "12px 28px",
  borderRadius: 4,
  background: "#2180E4",
  color: "#fff",
  fontFamily: "Poppins",
  fontSize: 18,
  fontWeight: 500,
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": { background: "#4996E9" },
}));

const SecondaryLink = styled("a")({
  fontFamily: "Poppins",
  fontSize: 16,
  fontWeight: 500,
  color: "#041A32",
  textDecoration: "underline",
  cursor: "pointer",
});

const EventStrip = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: 60,
  flexWrap: "wrap",
  background: "#041A32",
  color: "#fff",
  padding: "24px 70px",
  fontFamily: "Poppins",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 16px",
    gap: 24,
  },
  "&>div": {
    textAlign: "center",
  },
  "&>div>span": {
    display: "block",
  },
  "&>div>span:first-of-type": {
    fontSize: 13,
    letterSpacing: 1,
    color: "#f1a726",
    fontWeight: 600,
  },
  "&>div>span:last-of-type": {
    fontSize: 18,
    fontWeight: 600,
    marginTop: 4,
  },
}));

const Section = styled("div")(({ theme }) => ({
  fontFamily: "Poppins",
  margin: "64px 70px",
  [theme.breakpoints.down("sm")]: {
    margin: "36px 16px",
  },
  "&>h2": {
    fontSize: 32,
    fontWeight: 600,
    color: "#000000",
    margin: "0 0 16px 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
  },
  "&>p": {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: "150%",
    color: "#494949",
    margin: "0 0 12px 0",
  },
}));

const SubHeading = styled("h3")({
  fontFamily: "Poppins",
  fontSize: 20,
  fontWeight: 600,
  color: "#1C1C1C",
  margin: "24px 0 12px 0",
});

const BulletGrid = styled("ul")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "8px 32px",
  margin: 0,
  padding: "0 0 0 20px",
  fontFamily: "Poppins",
  fontSize: 17,
  color: "#333",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
  "&>li": {
    lineHeight: "150%",
  },
}));

const PhotoGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 16,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "&>div": {
    aspectRatio: "4 / 3",
    borderRadius: 8,
    background: "#E5E5E5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    "&>img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
}));

const DetailsCard = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 48,
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: 24,
  },
  "&>div": {
    flex: 1,
    minWidth: 260,
  },
}));

const LinkList = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  "&>a": {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: 500,
    color: "#2180E4",
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },
});

const FaqItem = styled("div")({
  borderBottom: "1px solid #E5E5E5",
  padding: "16px 0",
  cursor: "pointer",
  "&>div:first-of-type": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: 600,
    color: "#041A32",
  },
  "&>p": {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#494949",
    marginTop: 12,
    lineHeight: "150%",
  },
});

const CtaBand = styled("div")(({ theme }) => ({
  background: "#041A32",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  gap: 32,
  flexWrap: "wrap",
  padding: "56px 70px",
  fontFamily: "Poppins",
  [theme.breakpoints.down("sm")]: {
    padding: "32px 16px",
  },
  "&>div": {
    flex: "1 1 320px",
  },
  "&>div>h3": {
    fontSize: 26,
    fontWeight: 600,
    margin: "0 0 8px 0",
  },
  "&>div>p": {
    fontSize: 16,
    color: "#D1D5DB",
    margin: "0 0 20px 0",
  },
}));

const CtaBtn = styled("a")(({ theme }) => ({
  padding: "10px 24px",
  borderRadius: 4,
  fontFamily: "Poppins",
  fontSize: 16,
  fontWeight: 500,
  textDecoration: "none",
  display: "inline-block",
  cursor: "pointer",
}));

const BannerTheme = styled("div")(({ theme }) => ({
  fontFamily: "Poppins",
  width: "100vw",
  position: "relative",
  height: "45vh",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  "img": {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    objectFit: "cover",
    objectPosition: "center 30%",
  },
}));

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

const Visit = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <Component>
      <BannerTheme>
        <img
          src={heroContent.heroImage.src}
          alt={heroContent.heroImage.alt}
        />
      </BannerTheme>


      <motion.div {...fadeUp}>
        <Hero>

          <h1>{heroContent.heading}</h1>

          <h2>{heroContent.tagline}</h2>

          <p>{heroContent.intro}</p>

          <p>{heroContent.freeAdmissionNote}</p>

          <ButtonRow>
            <PrimaryBtn
              href={heroContent.primaryButton.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {heroContent.primaryButton.label}
            </PrimaryBtn>

            <SecondaryLink href={heroContent.secondaryLink.link}>
              {heroContent.secondaryLink.label}
            </SecondaryLink>
          </ButtonRow>

        <p style={{ fontSize: 14, color: "#666", maxWidth: 720 }}>
          {heroContent.primaryButtonNote}
        </p>

        </Hero>
      </motion.div>

      <EventStrip>
        {eventStrip.map((item, idx) => (
          <div key={idx}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </EventStrip>

      <motion.div {...fadeUp}>
        <Section>
          <h2>{welcomeSection.heading}</h2>
          {welcomeSection.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
          <SubHeading>{welcomeSection.whoCanVisitHeading}</SubHeading>
          <BulletGrid>
            {welcomeSection.whoCanVisit.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </BulletGrid>
        </Section>
      </motion.div>

      <motion.div {...fadeUp}>
        <Section>
          <h2>{exploreSection.heading}</h2>
          <p>{exploreSection.intro}</p>
          <BulletGrid>
            {exploreSection.areas.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </BulletGrid>

          <SubHeading>{doSection.heading}</SubHeading>
          <BulletGrid style={{ gridTemplateColumns: "1fr" }}>
            {doSection.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </BulletGrid>
        </Section>
      </motion.div>

      <motion.div {...fadeUp}>
        <Section>
          <h2>Photo Guide</h2>
          <PhotoGrid>
            {photoGuide.map((img, idx) => (
              <div key={idx}>
                {img.src ? <img src={img.src} alt={img.alt} /> : null}
              </div>
            ))}
          </PhotoGrid>
        </Section>
      </motion.div>

      <motion.div {...fadeUp}>
        <Section>
          <h2>{planYourVisit.heading}</h2>
          <p>{planYourVisit.text}</p>
          <DetailsCard>
            <div>
              <SubHeading style={{ marginTop: 0 }}>{planYourVisit.visitDetailsHeading}</SubHeading>
              <BulletGrid style={{ gridTemplateColumns: "1fr" }}>
                {planYourVisit.visitDetails.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </BulletGrid>
            </div>
            <div>
              <SubHeading style={{ marginTop: 0 }}>{planYourVisit.usefulLinksHeading}</SubHeading>
              <LinkList>
                {planYourVisit.usefulLinks.map((link, idx) => (
                  <a key={idx} href={link.link} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
              </LinkList>
            </div>
          </DetailsCard>
        </Section>
      </motion.div>

      <motion.div {...fadeUp}>
        <Section>
          <h2>{accessibilitySection.heading}</h2>
          {accessibilitySection.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
          <p>
            Email:{" "}
            <a href={`mailto:${accessibilitySection.email}`} style={{ color: "#2180E4" }}>
              {accessibilitySection.email}
            </a>
          </p>
        </Section>
      </motion.div>

      <motion.div {...fadeUp}>
        <Section style={{ background: "#F8F8F8", borderRadius: 12, padding: "40px 70px" }}>
          <h2>{registrationSection.heading}</h2>
          <p>{registrationSection.text}</p>
          <p style={{ fontStyle: "italic" }}>{registrationSection.note}</p>
          <PrimaryBtn
            href={registrationSection.button.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {registrationSection.button.label}
          </PrimaryBtn>
          <p style={{ fontSize: 13, color: "#787878", marginTop: 12 }}>
            {registrationSection.buttonNote}
          </p>
        </Section>
      </motion.div>

      <motion.div {...fadeUp}>
        <Section>
          <h2>{courtesySection.heading}</h2>
          <BulletGrid style={{ gridTemplateColumns: "1fr" }}>
            {courtesySection.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </BulletGrid>
        </Section>
      </motion.div>

      <motion.div {...fadeUp}>
        <Section>
          <h2>Frequently Asked Questions</h2>
          <div>
            {faqs.map((item, idx) => (
              <FaqItem key={idx} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                <div>
                  <span>{item.q}</span>
                  <span>{openFaq === idx ? "\u2212" : "+"}</span>
                </div>
                {openFaq === idx && <p>{item.a}</p>}
              </FaqItem>
            ))}
          </div>
        </Section>
      </motion.div>

      <motion.div {...fadeUp}>
        <CtaBand>
          <div>
            <h3>{finalCta.visitorMessage.heading}</h3>
            <p>{finalCta.visitorMessage.text}</p>
            <CtaBtn
              style={{ background: "#2180E4", color: "#fff" }}
              href={finalCta.visitorMessage.button.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {finalCta.visitorMessage.button.label}
            </CtaBtn>
          </div>
          <div>
            <h3>{finalCta.exhibitorMessage.heading}</h3>
            <CtaBtn
              style={{ border: "1px solid #D1D5DB", color: "#fff" }}
              href={finalCta.exhibitorMessage.button.link}
            >
              {finalCta.exhibitorMessage.button.label}
            </CtaBtn>
          </div>
        </CtaBand>
      </motion.div>
    </Component>
  );
};

export default Visit;