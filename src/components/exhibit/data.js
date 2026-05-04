import platinumLogo from '../../assets/platinum.png'
import locationIcon from '../../assets/location.svg'
import cards from '../../assets/cards.svg'
import insurance from '../../assets/shield.svg'
import hammer from '../../assets/hammer.svg'
import restriction from '../../assets/restriction.svg'
import goldLogo from '../../assets/gold.png'
import silverLogo from '../../assets/silver.png'
import check from '../../assets/tick.svg'

export const exhibitPlans = [
    // {
    //     stallType: "Platinum Booth",
    //     stallSize: "4 x 2 m",
    //     complimentaryRegistration: 3,
    //     tablesChairsCount: true,
    //     powerConnection: true,
    //     conferenceBooklet: true,
    //     welcomeKit: true,
    //     advertisements: true,
    //     earlyBirdRegistrationPrice: 14000,
    //     standardRegistrationPrice: 17000,
    //     logo: platinumLogo
    // },
    // {
    //     stallType: "Gold Booth",
    //     stallSize: "3 x 2 m", //"6 x 6 ft",
    //     complimentaryRegistration: 2,
    //     tablesChairsCount: true,
    //     powerConnection: true,
    //     conferenceBooklet: true,
    //     welcomeKit: true,
    //     advertisements: false,
    //     earlyBirdRegistrationPrice: 10500,
    //     standardRegistrationPrice: 12500,
    //     logo: goldLogo
    // },
    // {
    //     stallType: "Silver Booth",
    //     stallSize:  "2 x 2 m",   //"6 x 3 ft",
    //     earlyBirdRegistrationPrice: 7000,
    //     standardRegistrationPrice: 8500,
    //     complimentaryRegistration: 1,
    //     tablesChairsCount: true,
    //     powerConnection: true,
    //     conferenceBooklet: true,
    //     welcomeKit: false,
    //     advertisements: false,
    //     logo: silverLogo
    // }
];

  
export const rowLabels = [
    // { key: "stallSize", label: "Stall Size" },
    // { key: "earlyBirdRegistrationPrice", label: "Early Bird Registration", isCurrency: true },
    // { key: "standardRegistrationPrice", label: "Standard Registration", isCurrency: true },
    // { key: "complimentaryRegistration", label: "Complimentary Registration" },
    // { key: "tablesChairsCount", label: "Tables and Chairs", isYesNo: true },
    // { key: "powerConnection", label: "Power Connection", isYesNo: true },
    // { key: "conferenceBooklet", label: "Listing in Conference Booklet", isYesNo: true },
    // { key: "welcomeKit", label: "Marketing Insert in the Welcome Kit", isYesNo: true },
    // { key: "advertisements", label: "Advertisement Slide between Sessions and Breaks", isYesNo: true },
];

export const notes = [
    // {
    //     normal: "LED screens will be available at the additional cost",
    //     bold: ""
    // },
    // {
    //     normal: "Last date of early bird registration is",
    //     bold: "25th September 2026"
    // },
    // {
    //     normal: "All charges are inclusive of",
    //     bold: "GST (18%)"
    // }
]


export const exhibitionDetails = [
    {
        title: "Booth Location",
        text: "Booth assignments will be on a first-come, first-served basis according to the date of receipt of a completed paid exhibitor registration.",
        logo: locationIcon
    },
    {
        title: "Payments",
        text: "The Payment details will be shared with the exhibitors after the participation registrations are complete.",
        logo: cards
    },
    {
        title: "Insurance",
        text: "The exhibitor understands that EMPOWER conference does not maintain insurance covering the exhibitor’s property and it is the sole responsibility of the exhibitor to obtain such insurance.",
        logo: insurance
    },
    {
        title: "Compliance with Laws",
        text: "Exhibitors shall bear responsibility for compliance with all local, city, state, and safety, fire, and health laws, ordinances, and regulations that are in force or applicable during the conference regarding the installation and operation of the exhibit.",
        logo: hammer
    },
    {
        title: "Restrictions",
        text: "Nothing shall be posted, nailed, screwed, or otherwise attached to columns, walls, floors, or other parts of the building or furniture. The subletting, assignment, or appointment of the whole or any part of the exhibitor’s space by an exhibitor is prohibited. Smoking and alcohol is not allowed inside the campus including accommodation areas.",
        logo: restriction
    },
]

export const leftBenefits = {
    heading: "For Startups, Manufacturers & Distributors",
    items: [
      { text: "Showcase cutting-edge  innovations and breakthrough technologies in Assistive Technology (AT).", icon: check },
      { text: "Connect with investors, business leaders, and industry experts to explore funding and collaboration opportunities.", icon: check },
      { text: "Gain access to a highly targeted audience including potential buyers, partners, and distributors.", icon: check },
      { text: "Receive real-time user feedback to refine and enhance products.", icon: check },
      { text: "Strengthen brand reputation as a leading AT innovator.", icon: check },
      { text: "Network with top players in the AT ecosystem to explore new markets and opportunities.", icon: check },
    ]
  };
  




  export const rightBenefits = {
    heading: "For Government and Non-Government Organizations",
    items: [
      { text: "Present impactful initiatives, policies, and programs supporting disability empowerment.", icon: check },
      { text: "Engage with policymakers, researchers, and experts to drive policy changes and best practices.", icon: check },
      { text: "Build partnerships with AT developers, educational institutions, and healthcare providers.", icon: check },
      { text: "Expand awareness by educating attendees on accessibility and inclusion efforts.", icon: check },
      { text: "Strengthen presence as a key advocate for disability rights and empowerment.", icon: check },
      { text: "Collaborate on research and innovation aimed at improving AT solutions.", icon: check },
    ]
  };
  
