import Agenda from "./Agenda"

import Cover from "./Cover"
import Faqs from "./Faqs"
import Highlights from "./Highlights"
import Work from "./Work"
import Info from "./Info"
import Exhibit from "./Exhibitor"
import Spon from "./Sponsor"
import Part from "./Partner"
import Keynote from "./Key"
import Session from "../../components/EmpowerSchedule/Session"
import Notice from "./Notice"
import Max from "./max"
import Invite from "./Invite"
import Gallery from "./Gallery"
const Main = () => {
    return (
        <main id="main-content">
            {/* <Notice/> */}
            <Cover />
            <Highlights />
            <Max/>
            {/* <Session/> */}
            {/* <Keynote/> */}
            {/* <Invite/> */}
            {/* <Work/> */}
            {/* <Spon/> */}
                         <Part/>
            {/* <Info/> */}
            <Exhibit/>
            {/* <Gallery/> */}
            {/* <Part/> */}
            <Spon/>
            {/* <Agenda /> */}
            {/* <Faqs /> */}
        </main>
    )
   
}

export default Main