import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Auth from "../components/authentication/Auth";
import StudentDesign from "../components/studentDesign/StudentDesign";
import FailedPayment from "../razorpay/FailedPayment";
import ExhibitorRegister from "../components/authentication/exhibior/ExhibitorRegister";
import CancellationRefundPolicy from "../components/policies/CancellationRefundPolicy";
import PrivacyPolicy from "../components/policies/PrivacyPolicy";
import TermsAndConditions from "../components/policies/TermsConditions";
import PaymentReceipt from "../razorpay/PaymentReceipt";

const Home = lazy(() => import("../components/home/Home"));
const Main = lazy(() => import("../components/main/Main"));
const Exhibit = lazy(() => import("../components/exhibit/Exhibit"));
const Sponsor = lazy(() => import("../components/sponsors/Sponsor"));
const Attend = lazy(() => import("../components/attend/Attend"));
const CallForPaper = lazy(() => import("../components/paper/CallForPaper"));
const Program = lazy(() => import("../components/programCommittee/Program"));
const Organizer = lazy (() => import ("../components/organizerCommittee/Organizer"));
const Signin = lazy(() => import("../components/authentication/Signin"));
const Register = lazy(() => import("../components/authentication/Register"))
const ExhibitorSignin = lazy(() => import("../components/authentication/exhibior/ExhibitorSignin"))
const OrganizationRegistration = lazy(() => import("../components/authentication/organization/OrganizationRegistration"));
const Speakers = lazy (() =>import ("../components/speaker/Speaker"));
const KeynoteSpeaker = lazy (() => import ("../components/keynotespeaker/Keynotespeaker"));
const Workshops = lazy (() => import("../components/workshop/Workshop"));
const EmpowerSchedule = lazy(() => import("../components/EmpowerSchedule/EmpowerSchedule"));
const Summary = lazy (() => import ("../components/summary/Summary"));
const Accommodations = lazy (() => import ("../components/accommodation/Accommodation"));
const Travel = lazy (() => import ("../components/travel/Travel"));
const Invite = lazy (() => ( import ("../components/invitedspeaker/Invitedspeaker")));

const withSuspense = (Component) => (
  <Suspense fallback={<h1> </h1>}>
    <Component />
  </Suspense>
);

const baseRoutes = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(Home),
    children: [
      {
        path: "/",
        element: withSuspense(Main),
      },
      {
        path: "/exhibit",
        element: withSuspense(Exhibit),
      },
      {
        path: "/sponsor",
        element: withSuspense(Sponsor),
      },
      {
        path: "/attend",
        element: withSuspense(Attend),
      },
      {
        path: "/CFP",
        element: withSuspense(CallForPaper),
      },
      {
        path: "/SDC",
        element: withSuspense(StudentDesign)
      },
      {
        path: "/cancellation-refund-policy",
        element: <CancellationRefundPolicy />
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />
      },
      {
        path: "/terms-condition",
        element: <TermsAndConditions />
      },
      {
        path:"/program-committee",
        element: withSuspense(Program),
      },
       {
        path:"/organizer-committee",
        element: withSuspense(Organizer),
      },
          {
        path:"/speakers",
        element: withSuspense(Speakers),
      },
                {
        path:"/keynote-speakers",
        element: withSuspense(KeynoteSpeaker),
      },
                {
        path:"/workshops",
        element: withSuspense(Workshops),
      },
//            {
//   path: "/empower-schedule",
//   element: withSuspense(EmpowerSchedule),
// },
         {
  path: "/accommodation",
  element: withSuspense(Accommodations),
},
     {
  path: "/travel",
  element: withSuspense(Travel),
},
     {
  path: "/empower-schedule",
  element: withSuspense(Summary),
},
     {
  path: "/invited",
  element: withSuspense(Invite),
},
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: "/auth/signin",
        element: withSuspense(Signin)
      },
      {
        path: "/auth/register",
        element: withSuspense(Register)
      },
      {
        path: "/auth/payment-failed",
        element: withSuspense(FailedPayment)
      },
      // {
      //   path: "/auth/exhibitor/register",
      //   element: withSuspense(ExhibitorRegister)
      // },
      // {
      //   path: "/auth/exhibitor/signin",
      //   element: withSuspense(ExhibitorSignin)
      // },
      {
        path: "/auth/organization-registrations",
        element: withSuspense(OrganizationRegistration)
      },
 
    ]
  },
  {
    path: "/payment-receipt",
    element: withSuspense(PaymentReceipt)
  }
 
]);

export default baseRoutes;
