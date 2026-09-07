import { lazy, Suspense } from "react"
import Cover from "./Cover"
import Highlights from "./Highlights"

const Max = lazy(() => import("./max"))
const Part = lazy(() => import("./Partner"))
const Exhibit = lazy(() => import("./Exhibitor"))
const Spon = lazy(() => import("./Sponsor"))

const SectionFallback = ({ height }) => (
    <div aria-hidden="true" style={{ minHeight: height }} />
)

const Main = () => {
    return (
        <main id="main-content">
            {/* <Notice/> */}
            <Cover />
            <Highlights />
            <Suspense fallback={<SectionFallback height={420} />}><Max /></Suspense>
            <Suspense fallback={<SectionFallback height={360} />}><Part /></Suspense>
            <Suspense fallback={<SectionFallback height={520} />}><Exhibit /></Suspense>
            <Suspense fallback={<SectionFallback height={420} />}><Spon /></Suspense>
        </main>
    )
   
}

export default Main
