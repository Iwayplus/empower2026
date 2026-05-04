import sp1 from '../../assets/sp1.svg'
import sp2 from '../../assets/sp2.svg'
import sp3 from '../../assets/sp3.svg'
import sp4 from '../../assets/sp4.svg'
import sp5 from '../../assets/sp5.svg'
import sp6 from '../../assets/sp6.svg'
import sp7 from '../../assets/sp7.svg'

export const sponsorshipPerks = [
    "Complementary conference registrations",
    "Branding opportunities",
    "Complementary advertising in the Conference Program",
    "Prominent display of your company logo on the conference website and printed materials",
    "Acknowledgement on signage at Conference"
]

export const sponsorshipPlans = [
    {
      category: "Platinum",
      amount: 1200000,
      conferenceRegistrations: 5,
      exhibitStall: "4 x 2 m",
      logoVisibility: true,
      thematicBackdropAcknowledgement: true,
      keynoteBackdropAcknowledgement: true,
      workshopSlot: true
    },
    {
      category: "Gold",
      amount: 750000,
      conferenceRegistrations: 4,
      exhibitStall: "3 x 2 m",
      logoVisibility: true,
      thematicBackdropAcknowledgement: true,
      keynoteBackdropAcknowledgement: true,
      workshopSlot: false
    },
    {
      category: "Silver",
      amount: 500000,
      conferenceRegistrations: 3,
      exhibitStall: "2 x 2 m",
      logoVisibility: true,
      thematicBackdropAcknowledgement: true,
      keynoteBackdropAcknowledgement: false,
      workshopSlot: false
    },
    {
      category: "Bronze",
      amount: 250000,
      conferenceRegistrations: 2,
      exhibitStall: "N.A.",
      logoVisibility: true,
      thematicBackdropAcknowledgement: true,
      keynoteBackdropAcknowledgement: false,
      workshopSlot: false
    }
  ];

  export const rowLabels = [
    { key: "amount", label: "Amount", isCurrency: true },
    { key: "conferenceRegistrations", label: "Conference Registrations" },
    { key: "exhibitStall", label: "Exhibit Stall" },
    { key: "logoVisibility", label: "Your company logo on the conference website, social media and printed materials", isYesNo: true },
    { key: "thematicBackdropAcknowledgement", label: "Acknowledgement on backdrops during thematic sessions", isYesNo: true },
    { key: "keynoteBackdropAcknowledgement", label: "Prominent acknowledgement on backdrops during Keynote sessions", isYesNo: true },
    { key: "workshopSlot", label: "Workshop slot", isYesNo: true }
  ];
  

export const formatIndianNumber = (num) => {
    if (num >= 10000000) {
        return (num / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
    } else if (num >= 100000) {
        return (num / 100000).toFixed(2).replace(/\.00$/, '') + ' Lakh';
    } else {
        return num.toLocaleString();
    }
}

export const sponsorshipBenefits = [
  {
    title: "High‑Visibility Brand Leadership",
    logo: sp1,
    benefits: [
      "Prominent logo placement across the website, social media, printed materials, and venue branding",
      "Recognition as a national leader in accessibility, innovation, and social impact",
      "Visibility before, during, and after the conference"
    ]
  },
  {
    title: "Strategic Networking & Partnerships",
    logo: sp2,
    benefits: [
      "Opportunities to participate in panels, thematic sessions, and roundtables",
      "Visibility in discussions shaping India’s AT standards, policies, and funding priorities",
      "Positioning as a knowledge partner in inclusive technology"
    ]
  },
  {
    title: "Thought Leadership & Influence",
    logo: sp3,
    benefits: [
      "Participate in panel discussions and thematic sessions to showcase expertise.",
      "Influence policy-making and funding discussions around accessibility initiatives."
    ]
  },
  {
    title: "Market Insights & Real-World Product Testing",
    logo: sp4,
    benefits: [
      "Direct feedback from persons with disabilities, caregivers, and practitioners",
      "Insights into emerging needs, usability challenges, and adoption barriers",
      "Support for fellowships, travel grants, and community participation"
    ]
  },
  {
    title: "CSR & Social Impact Alignment",
    logo: sp5,
    benefits: [
      "Strong alignment with CSR Schedule (education, disability inclusion, skill development, accessibility)",
      "Enhance community goodwill and build a reputation for social responsibility."
    ]
  },
  {
    title: "Exhibition & Demonstration Opportunities",
    logo: sp6,
    benefits: [
      "Dedicated user‑testing zones for hands‑on evaluation",
      "High‑traffic exhibition space integrated with conference flow"
    ]
  },
  // {
  //   title: "Exhibition Space",
  //   logo: sp7,
  //   benefits: [
  //     "Display your products and solutions to an engaged audience looking for cutting-edge assistive technology"
  //   ]
  // }
];

