
import session from '../../../assets/session.svg'
import exhibition from '../../../assets/Exhibition.svg'
import tracedImage from '../../../assets/Traced Image.svg'
import callForPaperImage from '../../../assets/callForPaper.svg'
import studentChallenge from '../../../assets/studentChallange.svg'

export const agendaData = [
    {
        day: 1,
        date: "October 3, 2025",
        dayInWeek: "Friday",
        schedule: [
            { event: "Conference Check-In", startTime: "09:00 AM", endTime: "04:30 PM" },
            { event: "Pre-conference Workshops", startTime: "10:00 AM", endTime: "05:00 PM" },
            { event: "Welcome Reception", startTime: "05:30 PM", endTime: "07:30 PM" },
            { event: "Exhibition", startTime: "10:00 AM", endTime: "05:00 PM" }
        ]
    },
    {
        day: 2,
        date: "October 4, 2025",
        dayInWeek: "Saturday",
        schedule: [
            { event: "Conference Check-In", startTime: "08:30 AM", endTime: "10:30 AM" },
            { event: "Keynote Address", startTime: "10:20 AM", endTime: "11:30 AM" },
            { event: "Tea Break", startTime: "11:30 AM", endTime: "12:00 PM" },
            { event: "Conference Sessions", startTime: "12:00 PM", endTime: "01:30 PM" },
            { event: "Lunch", startTime: "01:30 PM", endTime: "02:30 PM" },
            { event: "Conference Sessions", startTime: "02:30 PM", endTime: "04:30 PM" },
            { event: "Tea Break", startTime: "04:30 PM", endTime: "05:00 PM" },
            { event: "Networking and Meetup", startTime: "05:00 PM", endTime: "06:00 PM" },
            { event: "Exhibition", startTime: "10:00 AM", endTime: "05:00 PM" }
        ]
    },
    {
        day: 3,
        date: "October 5, 2025",
        dayInWeek: "Sunday",
        schedule: [
            { event: "Conference Check-In", startTime: "08:30 AM", endTime: "10:30 AM" },
            { event: "Keynote Address", startTime: "10:20 AM", endTime: "11:30 AM" },
            { event: "Tea Break", startTime: "11:30 AM", endTime: "12:00 PM" },
            { event: "Conference Sessions", startTime: "12:00 PM", endTime: "01:30 PM" },
            { event: "Lunch", startTime: "01:30 PM", endTime: "02:30 PM" },
            { event: "Closing Ceremony", startTime: "02:30 PM", endTime: "04:30 PM" },
            { event: "High Tea", startTime: "04:30 PM", endTime: "05:00 PM" }
        ]
    }
];


export const deadlines = [
    {
        activity: "Student design contest registration",
        date: "30th June 2025",
        link: "/SDC"
    
    },
    {
        activity: "Research track - Extended Abstract submission",
        date: "10th Aug 2025",
        link: "/CFP"
    },
    // {
    //     activity: "Final full length paper submission",
    //     date: "15th Sep 2025",
    //     link: "/CFP"
    // },
    {
        activity: "Tutorial proposal submission",
        date: "15th Aug 2025"
    },
    {
        activity: "Exhibition participation",
        date: "25th Sep 2025",
        link: "/exhibit"
    },
    {
        activity: "Early bird conference registration",
        date: "25th Sep 2025"
    }
]

export const highlights = [
      {
        img: tracedImage,
        title: "Workshops & Presentations",
        text: "Participate in interactive workshops and learn about the latest research and developments in assistive technology.",
        link: '/workshops'
    }, 
      
    {
        img: exhibition,
        title: "Exhibit",
        text: "Discover and explore latest assistive technology solutions and products at the exhibition.",
        link: '/exhibit'
    },
       {
        img: session,
        title: "Keynote Sessions",
        text: "Gain insights from industry experts and thought leaders through engaging keynote sessions.",
        link: null
    }, 
    {
    img: callForPaperImage,
    title: "Call for Papers",
    text: "We invite contributions on all aspects related to technology and disability ranging from Research and Development, Manufacturing, Dissemination, Service Delivery, Training and Education, Usability and Impact.",
    link: '/CFP'
    },
    {
        img: studentChallenge,
        title: "Call for Student Design Challenge",
        text: "We invite participation of students and early-stage innovators in developing a working/design prototypes to address the unaddressed needs of the user community",
        link: '/SDC'
    },
 

]

