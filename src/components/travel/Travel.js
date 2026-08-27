import  React, { useState, useEffect } from "react";
import "./travel.css";
import qr1 from "../../assets/qr1.jpg";
import gplay from "../../assets/gplay.png";
import org from "../../assets/orgqr.jpg";
import apple from "../../assets/apple.png";
import hi from "../../assets/hi.png";
import li from "../../assets/lhc new.jpg";
import { getNearbyServices, getVenueServices } from "../../services/api";

const Travel = () => {
   const [mode, setMode] = useState("flight");
   const [nearbyServices, setNearbyServices] = useState([]);
   const [venueServices, setVenueServices] = useState([]);

   useEffect(() => {
     const fetchTravelData = async () => {
       try {
         const ns = await getNearbyServices();
         if (ns && ns.status) {
           setNearbyServices(ns.data || []);
         }
         const vs = await getVenueServices();
         if (vs && vs.status) {
           setVenueServices(vs.data || []);
         }
       } catch (error) {
         console.error("Error fetching travel dynamic data:", error);
       }
     };
     fetchTravelData();
   }, []);
  return (
    <div className="travel-container">
      <div className="container-1">
 <h2 className="c1-a">Travel Information</h2>


        <div className="c1-b">
          {process.env.REACT_APP_APP_NAME} stands as India’s premier conference focused on advancing
          Assistive Technologies and promoting inclusive innovation. Whether you
          are arriving by air, rail, road, or metro, reaching IIT Delhi is
          convenient and well-supported by the capital’s extensive
          transportation network. Centrally located in New Delhi, the IIT Delhi
          campus is easily accessible from IGI Airport, New Delhi Railway
          Station, and ISBT bus terminals, with smooth connectivity via the
          Delhi Metro.
        </div>
        <div className="c1-c">
          Centrally located in New Delhi, the IIT Delhi campus is easily
          accessible from major transit points such as the Indira Gandhi
          International (IGI) Airport), New Delhi Railway Station, and key
          Inter-State Bus Terminals (ISBTs). The campus is also well-connected
          via the Delhi Metro, ensuring a smooth and efficient journey for all
          participants.
        </div>
      </div>

      <div className="container-2">
        <div className="c2-a">Getting to the Venue</div>
        <div className="c2-b">
          {/* i */}
          <div className="c2-b-i">
            <div className="c2-b-i-left">
              <div className="venue-image">
<iframe
  title="IIT Delhi Map"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8002643863597!2d77.19019297374842!3d28.545722688020703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1df6b9055fb5%3A0x81c10b266b1ea3c0!2sIndian%20Institute%20Of%20Technology%20Delhi%20(IIT%20Delhi)!5e0!3m2!1sen!2sus!4v1757196736880!5m2!1sen!2sus"
  width="447"
  height="249"
  style={{ border: 0, borderRadius: "4px" }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  aria-hidden="true" 
/>

              </div>
              <div className="venue-text">
                <h3>Lecture Hall Complex</h3>
                <p>IIT Delhi, Hauz Khas, New Delhi – 110016</p>
                <p>Nearby Location: Central Workshop</p>
              </div>
<button
  className="direction-btn"
  onClick={() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position;
          const origin = `${latitude},${longitude}`; // user's current location
          const destination = encodeURIComponent(
            "Indian Institute of Technology Delhi, Hauz Khas, New Delhi, Delhi 110016, India"
          );
          const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
          window.open(url, "_blank");
        },
        (error) => {
          alert("Unable to fetch your current location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <mask id="mask0_3156_251" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_3156_251)">
      <path d="M8 15H10V12H13.5V14.5L17 11L13.5 7.5V10H9C8.71667 10 8.47917 10.0958 8.2875 10.2875C8.09583 10.4792 8 10.7167 8 11V15ZM12 22C11.75 22 11.5042 21.95 11.2625 21.85C11.0208 21.75 10.8 21.6 10.6 21.4L2.6 13.4C2.4 13.2 2.25 12.9792 2.15 12.7375C2.05 12.4958 2 12.25 2 12C2 11.75 2.05 11.5042 2.15 11.2625C2.25 11.0208 2.4 10.8 2.6 10.6L10.6 2.6C10.8 2.4 11.0208 2.25 11.2625 2.15C11.5042 2.05 11.75 2 12 2C12.25 2 12.4958 2.05 12.7375 2.15C12.9792 2.25 13.2 2.4 13.4 2.6L21.4 10.6C21.6 10.8 21.75 11.0208 21.85 11.2625C21.95 11.5042 22 11.75 22 12C22 12.25 21.95 12.4958 21.85 12.7375C21.75 12.9792 21.6 13.2 21.4 13.4L13.4 21.4C13.2 21.6 12.9792 21.75 12.7375 21.85C12.4958 21.95 12.25 22 12 22ZM12 20L20 12L12 4L4 12L12 20Z" fill="#2180E4"/>
    </g>
  </svg>
  Directions
</button>



            </div>
            <div className="c2-b-i-right">
              <img
                src={li}
                alt="Venue Main"
                className="venue-main-img"
              />
            
            </div>
          </div>

          {/* j */}
          <div className="c2-b-j">
           <strong> Note:</strong> <span className="c2-b-ja">Day 1 Inauguration – Seminar Hall, Main Building (near Canara
            Bank & Central Library)</span>
          </div>
        </div>
      </div>

      {/* ================== CONTAINER 3 ================== */}
      <div className="container-3">
        {/* Upper */}
        <div className="c3-upper">
          <div className="c3-a">
            <div className="c3-a-i">Reaching to the Campus</div>
         <div className="c3-a-j">
  <button
    className={`chip ${mode === "flight" ? "active" : ""}`}
    onClick={() => setMode("flight")}
    aria-pressed={mode === "flight"}
    aria-label="Select Flight mode"
  >
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.74389 5.17821C6.80813 5.52124 5.99911 5.84116 5.94614 5.88911C5.71092 6.10197 5.64563 6.51232 5.80528 6.77416C5.85759 6.8599 6.5842 7.41293 7.65291 8.18041C8.62162 8.87608 9.40017 9.45761 9.38292 9.47266C9.36567 9.48771 8.31797 9.87546 7.05469 10.3343C5.79141 10.7931 4.73433 11.1774 4.70559 11.1884C4.67686 11.1993 4.25311 10.8824 3.76392 10.4842C2.81208 9.70943 2.661 9.60935 2.44289 9.60935C2.24691 9.60935 0.375703 10.3003 0.240047 10.4227C0.10875 10.5413 0 10.777 0 10.9431C0 11.0907 1.13302 14.2196 1.32473 14.6015C1.73048 15.4096 2.37211 16.0425 3.15891 16.4107C3.88627 16.7511 4.81111 16.8692 5.56041 16.7173C5.7668 16.6755 6.92316 16.2817 8.13005 15.8422C9.33698 15.4028 10.335 15.0538 10.348 15.0668C10.361 15.0798 10.1685 15.8891 9.9202 16.8653C9.67191 17.8415 9.46884 18.7124 9.46894 18.8006C9.46931 19.1337 9.79645 19.4526 10.1381 19.4529C10.317 19.4531 13.6027 18.2897 13.8188 18.1497C13.9636 18.0558 13.9329 18.1205 15.1446 15.3595C15.731 14.0232 16.2207 12.9199 16.2329 12.9077C16.2451 12.8955 17.676 12.3689 19.4127 11.7374C21.1494 11.1059 22.7026 10.5279 22.8644 10.4528C23.039 10.3718 23.2591 10.2156 23.4062 10.0683C24.3775 9.09579 24.096 7.48376 22.8446 6.85202C21.8739 6.36204 20.4956 6.10915 19.251 6.19263C18.4767 6.24461 17.8426 6.40465 16.5703 6.86922C15.9516 7.09516 15.4242 7.27957 15.3984 7.279C15.3727 7.27844 14.1083 6.66349 12.5887 5.91241C10.2823 4.77241 9.79444 4.5475 9.63558 4.55069C9.51548 4.55313 8.81789 4.78455 7.74389 5.17821ZM8.77491 6.30147C8.32884 6.46488 7.95389 6.6086 7.94166 6.62079C7.92305 6.6394 10.6455 8.62193 10.9521 8.81308C11.042 8.8691 11.1744 8.83165 12.1943 8.46194C12.8222 8.23432 13.3887 8.02825 13.4531 8.00397C13.557 7.96483 13.345 7.84882 11.5822 6.9799C10.4888 6.44093 9.59236 6.00096 9.59006 6.00218C9.58781 6.00335 9.22097 6.13807 8.77491 6.30147ZM19.2656 7.5993C19.0207 7.61932 18.6199 7.68757 18.375 7.75094C18.1301 7.81432 15.082 8.90411 11.6016 10.1727C8.12109 11.4413 5.11411 12.5327 4.91934 12.5981C4.37653 12.7803 4.36631 12.7759 3.25622 11.881L2.3018 11.1115L1.95234 11.2346L1.60289 11.3578L1.66378 11.5265C2.5958 14.1097 2.64825 14.2259 3.07697 14.6559C3.58252 15.163 4.23567 15.405 4.98633 15.3634C5.40295 15.3403 5.48953 15.3122 8.32369 14.2792C10.2737 13.5685 11.2941 13.2188 11.4174 13.2189C11.7638 13.2192 12.0932 13.535 12.0936 13.8669C12.0937 13.9527 11.8899 14.8228 11.6407 15.8006C11.3916 16.7784 11.1986 17.5893 11.212 17.6026C11.2392 17.6298 12.7971 17.0736 12.8615 17.0138C12.8841 16.9927 13.3959 15.8508 13.9988 14.4763C14.732 12.8046 15.1377 11.9344 15.2241 11.848C15.3256 11.7464 16.0844 11.4527 18.7676 10.4763C20.6455 9.79286 22.2426 9.19788 22.3168 9.15405C22.3909 9.11022 22.4836 9.00701 22.5227 8.92465C22.6955 8.56052 22.5505 8.26263 22.1017 8.0591C21.282 7.68747 20.2444 7.51924 19.2656 7.5993Z" fill="white"/> </svg>
    Flight
  </button>

  <button
    className={`chip ${mode === "train" ? "active" : ""}`}
    onClick={() => setMode("train")}
    aria-pressed={mode === "train"}
    aria-label="Select Train mode"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none"> <path d="M2 19V18L3.5 17C2.51667 17 1.6875 16.6625 1.0125 15.9875C0.3375 15.3125 0 14.4833 0 13.5V4C0 2.61667 0.641667 1.60417 1.925 0.9625C3.20833 0.320833 5.23333 0 8 0C10.8667 0 12.9167 0.308333 14.15 0.925C15.3833 1.54167 16 2.56667 16 4V13.5C16 14.4833 15.6625 15.3125 14.9875 15.9875C14.3125 16.6625 13.4833 17 12.5 17L14 18V19H2ZM2 8H7V5H2V8ZM9 8H14V5H9V8ZM4.5 14C4.91667 14 5.27083 13.8542 5.5625 13.5625C5.85417 13.2708 6 12.9167 6 12.5C6 12.0833 5.85417 11.7292 5.5625 11.4375C5.27083 11.1458 4.91667 11 4.5 11C4.08333 11 3.72917 11.1458 3.4375 11.4375C3.14583 11.7292 3 12.0833 3 12.5C3 12.9167 3.14583 13.2708 3.4375 13.5625C3.72917 13.8542 4.08333 14 4.5 14ZM11.5 14C11.9167 14 12.2708 13.8542 12.5625 13.5625C12.8542 13.2708 13 12.9167 13 12.5C13 12.0833 12.8542 11.7292 12.5625 11.4375C12.2708 11.1458 11.9167 11 11.5 11C11.0833 11 10.7292 11.1458 10.4375 11.4375C10.1458 11.7292 10 12.0833 10 12.5C10 12.9167 10.1458 13.2708 10.4375 13.5625C10.7292 13.8542 11.0833 14 11.5 14ZM3.5 15H12.5C12.9333 15 13.2917 14.8583 13.575 14.575C13.8583 14.2917 14 13.9333 14 13.5V10H2V13.5C2 13.9333 2.14167 14.2917 2.425 14.575C2.70833 14.8583 3.06667 15 3.5 15ZM8 2C6.56667 2 5.37917 2.08333 4.4375 2.25C3.49583 2.41667 2.83333 2.66667 2.45 3H13.65C13.35 2.66667 12.7292 2.41667 11.7875 2.25C10.8458 2.08333 9.58333 2 8 2Z" fill="#1C1B1F"/> </svg>
    Train
  </button>

  <button
    className={`chip ${mode === "bus" ? "active" : ""}`}
    onClick={() => setMode("bus")}
    aria-pressed={mode === "bus"}
    aria-label="Select Bus mode"
  >
 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 22 14" fill="none"> <path d="M5 14C4.16667 14 3.45833 13.7083 2.875 13.125C2.29167 12.5417 2 11.8333 2 11H0V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16L22 6V11H20C20 11.8333 19.7083 12.5417 19.125 13.125C18.5417 13.7083 17.8333 14 17 14C16.1667 14 15.4583 13.7083 14.875 13.125C14.2917 12.5417 14 11.8333 14 11H8C8 11.8333 7.70833 12.5417 7.125 13.125C6.54167 13.7083 5.83333 14 5 14ZM14 5H18L15 2H14V5ZM8 5H12V2H8V5ZM2 5H6V2H2V5ZM5 12.25C5.35 12.25 5.64583 12.1292 5.8875 11.8875C6.12917 11.6458 6.25 11.35 6.25 11C6.25 10.65 6.12917 10.3542 5.8875 10.1125C5.64583 9.87083 5.35 9.75 5 9.75C4.65 9.75 4.35417 9.87083 4.1125 10.1125C3.87083 10.3542 3.75 10.65 3.75 11C3.75 11.35 3.87083 11.6458 4.1125 11.8875C4.35417 12.1292 4.65 12.25 5 12.25ZM17 12.25C17.35 12.25 17.6458 12.1292 17.8875 11.8875C18.1292 11.6458 18.25 11.35 18.25 11C18.25 10.65 18.1292 10.3542 17.8875 10.1125C17.6458 9.87083 17.35 9.75 17 9.75C16.65 9.75 16.3542 9.87083 16.1125 10.1125C15.8708 10.3542 15.75 10.65 15.75 11C15.75 11.35 15.8708 11.6458 16.1125 11.8875C16.3542 12.1292 16.65 12.25 17 12.25ZM2 9H2.8C3.08333 8.7 3.40833 8.45833 3.775 8.275C4.14167 8.09167 4.55 8 5 8C5.45 8 5.85833 8.09167 6.225 8.275C6.59167 8.45833 6.91667 8.7 7.2 9H14.8C15.0833 8.7 15.4083 8.45833 15.775 8.275C16.1417 8.09167 16.55 8 17 8C17.45 8 17.8583 8.09167 18.225 8.275C18.5917 8.45833 18.9167 8.7 19.2 9H20V7H2V9Z" fill="#1C1B1F"/> </svg>
    Bus
  </button>
</div>

          </div>

   <div className="c3-b">
  {/* Flight */}
  {mode === "flight" && (
    <>
      <div className="c3-b-m">
        Indira Gandhi International Airport (IGI), New Delhi, India
      </div>
      <div className="c3-b-n">
        <div className="c3-b-n-x">
          <h4>Terminals</h4>
          <p>
          ⦁	  Terminal 3 (T3): International and some domestic flights
          </p>
          <p>
           ⦁	 Terminal 2 (T2) & Terminal 1 (T1): Domestic low-cost carriers
            (e.g., IndiGo, SpiceJet, Go First)
          </p>
        </div>
        <div className="c3-b-n-y">
          <h4>Reaching IIT Delhi:</h4>
          <p>
            ⦁	From Terminal 1, you have direct access to the Delhi Metro Magenta Line, which takes you to IIT Delhi Metro Station, just a few minutes’ walk from the campus main gate.
          </p>
          <p>
            ⦁	At Delhi Airport, a complimentary shuttle service connects Terminals 1, 2, and 3. Arriving every 20 minutes, the bus ensures a seamless experience for passengers. The shuttles are air-conditioned and free for passengers with a connecting flight. Others can use the service for a small fee (INR 25). These shuttles connect passengers to Terminal 1, from where you can easily board the Magenta Line metro to reach IIT Delhi.
          </p>
        </div>
      </div>
    </>
  )}

  {/* Train */}
  {mode === "train" && (
    <>
      <div className="c3-b-m">
    Delhi is served by several major railway stations, all well-connected to IIT Delhi via metro and cab services.

      </div>
      <div className="c3-b-n">
        <div className="c3-b-n-x">
          <h4>Nearby Stations</h4>
          <p>
            ⦁	 New Delhi Railway Station (NDLS)
          
          </p>
          <p>
            ⦁	 Hazrat Nizamuddin Railway Station (NZM)
          </p>
         <p>⦁ Anand Vihar Terminal (ANVT):</p>
        </div>
        <div className="c3-b-n-y">
          <h4>Reaching IIT Delhi:</h4>
          <p>
            ⦁	 From NDLS: The most centrally located and convenient station. From here, take the Yellow Line Metro from New Delhi Metro Station directly to Hauz Khas Metro Station. From Hauz Khas, IIT Delhi is just a short 10-minute auto-rickshaw or cab ride away.
          </p>
          <p>
 ⦁ From NZM: Located in South Delhi, about 12 km from IIT Delhi. From NZM, you can take a cab directly to the campus (approx. 25–30 minutes), or head to Lajpat Nagar Metro Station, board the Pink Line, change at INA Station to the Yellow Line, and get off at Hauz Khas Metro Station.
          </p>
          <p>
         ⦁ From ANVT: Situated in East Delhi, around 20 km from IIT Delhi. From Anand Vihar Metro Station, board the Blue Line, transfer at Rajiv Chowk to the Yellow Line, and continue to Hauz Khas Metro Station. From there, take a cab or auto-rickshaw to reach the campus.
          </p>
        </div>
      </div>
    </>
  )}

  {/* Bus */}
  {mode === "bus" && (
    <>
      <div className="c3-b-m">
        Inter-State Bus Terminals (ISBT), New Delhi, India
      </div>
      <div className="c3-b-n">
        <div className="c3-b-n-x">
          <h4>Main Terminals</h4>
          <p>
            ⦁	Kashmere Gate ISBT: Main terminal for North and Central India, and international buses.
          </p>
         
          <p>
           ⦁	Anand Vihar ISBT: Serving buses from Eastern and Northern India.
          </p>
        </div>
        <div className="c3-b-n-y">
          <h4>Reaching IIT Delhi:</h4>
          <p>
           ⦁ From Kashmere Gate ISBT: Board the Yellow Line Metro from Kashmere Gate Metro Station and travel directly to Hauz Khas Metro Station. From there, it’s just a short auto-rickshaw or cab ride to the IIT Delhi campus. This route is convenient for travelers coming from North Delhi or inter-state buses arriving at Kashmere Gate ISBT.
            
          </p>
          <p>
      ⦁ From Anand Vihar ISBT: Board the Blue Line Metro from Anand Vihar Metro Station, transfer at Rajiv Chowk to the Yellow Line, and proceed to Hauz Khas Metro Station. From there, take a short auto-rickshaw or cab ride to reach the IIT Delhi campus. This route is convenient for travelers arriving from East Delhi or inter-state buses at Anand Vihar ISBT, offering a comfortable and air-conditioned journey.
          </p>
        </div>
      </div>
    </>
  )}
</div>
</div>

        {/* Lower */}
      {/* Lower */}
<div className="c3-lower">
  {/* Flight */}
  {mode === "flight" && (
    <>
      <div className="c3-lower-left">
        <iframe
          title="Route Map T3 to IIT Delhi"
          src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3504.688894141049!2d77.09568841502282!3d28.545555282455857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1sIGI%20Airport%20Terminal%203!2sIGI%20Airport%20Terminal%203!3m2!1d28.5562!2d77.1003!4m5!1sIIT%20Delhi!2sIndian%20Institute%20of%20Technology%20Delhi!3m2!1d28.5456!2d77.1926!5e0!3m2!1sen!2sin!4v1694018527412"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-hidden="true" 
        />
        <div className="road-info">
          <p>By Road: IGI Terminal 3 to IIT Delhi Campus</p>
          <button className="direction-btn"
             onClick={() => {
    const source = encodeURIComponent("IGI Airport Terminal 3, Delhi");
    const destination = encodeURIComponent("IIT Delhi, Hauz Khas, Delhi");
    const url = `https://www.google.com/maps/dir/?api=1&origin=${source}&destination=${destination}&travelmode=driving`;
    window.open(url, "_blank"); 
  }}
>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <mask id="mask0_2989_420" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
    <rect y="0.899292" width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_2989_420)">
    <path d="M8 15.8993H10V12.8993H13.5V15.3993L17 11.8993L13.5 8.39929V10.8993H9C8.71667 10.8993 8.47917 10.9951 8.2875 11.1868C8.09583 11.3785 8 11.616 8 11.8993V15.8993ZM12 22.8993C11.75 22.8993 11.5042 22.8493 11.2625 22.7493C11.0208 22.6493 10.8 22.4993 10.6 22.2993L2.6 14.2993C2.4 14.0993 2.25 13.8785 2.15 13.6368C2.05 13.3951 2 13.1493 2 12.8993C2 12.6493 2.05 12.4035 2.15 12.1618C2.25 11.9201 2.4 11.6993 2.6 11.4993L10.6 3.49929C10.8 3.29929 11.0208 3.14929 11.2625 3.04929C11.5042 2.94929 11.75 2.89929 12 2.89929C12.25 2.89929 12.4958 2.94929 12.7375 3.04929C12.9792 3.14929 13.2 3.29929 13.4 3.49929L21.4 11.4993C21.6 11.6993 21.75 11.9201 21.85 12.1618C21.95 12.4035 22 12.6493 22 12.8993C22 13.1493 21.95 13.3951 21.85 13.6368C21.75 13.8785 21.6 14.0993 21.4 14.2993L13.4 22.2993C13.2 22.4993 12.9792 22.6493 12.7375 22.7493C12.4958 22.8493 12.25 22.8993 12 22.8993ZM12 20.8993L20 12.8993L12 4.89929L4 12.8993L12 20.8993Z" fill="#2180E4"/>
  </g>
</svg>Directions</button>
        </div>
      </div>

      <div className="c3-lower-right">
        <iframe
          title="Route Map T1 to IIT Delhi"
          src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3504.995758374858!2d77.09215291502278!3d28.5439345824572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1sIGI%20Airport%20Terminal%201!2sIGI%20Airport%20Terminal%201!3m2!1d28.5565!2d77.099!4m5!1sIIT%20Delhi!2sIndian%20Institute%20of%20Technology%20Delhi!3m2!1d28.5456!2d77.1926!5e0!3m2!1sen!2sin!4v1694028527412"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-hidden="true" 
        />
        <div className="road-info">
          <p>By Road: IGI Terminal 1 to IIT Delhi Campus</p>
          <button className="direction-btn"
           onClick={() => {
    const source = encodeURIComponent("IGI Airport Terminal 1, Delhi");
    const destination = encodeURIComponent("IIT Delhi, Hauz Khas, Delhi");
    const url = `https://www.google.com/maps/dir/?api=1&origin=${source}&destination=${destination}&travelmode=driving`;
    window.open(url, "_blank"); // Opens in a new tab
  }}
>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <mask id="mask0_2989_420" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
    <rect y="0.899292" width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_2989_420)">
    <path d="M8 15.8993H10V12.8993H13.5V15.3993L17 11.8993L13.5 8.39929V10.8993H9C8.71667 10.8993 8.47917 10.9951 8.2875 11.1868C8.09583 11.3785 8 11.616 8 11.8993V15.8993ZM12 22.8993C11.75 22.8993 11.5042 22.8493 11.2625 22.7493C11.0208 22.6493 10.8 22.4993 10.6 22.2993L2.6 14.2993C2.4 14.0993 2.25 13.8785 2.15 13.6368C2.05 13.3951 2 13.1493 2 12.8993C2 12.6493 2.05 12.4035 2.15 12.1618C2.25 11.9201 2.4 11.6993 2.6 11.4993L10.6 3.49929C10.8 3.29929 11.0208 3.14929 11.2625 3.04929C11.5042 2.94929 11.75 2.89929 12 2.89929C12.25 2.89929 12.4958 2.94929 12.7375 3.04929C12.9792 3.14929 13.2 3.29929 13.4 3.49929L21.4 11.4993C21.6 11.6993 21.75 11.9201 21.85 12.1618C21.95 12.4035 22 12.6493 22 12.8993C22 13.1493 21.95 13.3951 21.85 13.6368C21.75 13.8785 21.6 14.0993 21.4 14.2993L13.4 22.2993C13.2 22.4993 12.9792 22.6493 12.7375 22.7493C12.4958 22.8493 12.25 22.8993 12 22.8993ZM12 20.8993L20 12.8993L12 4.89929L4 12.8993L12 20.8993Z" fill="#2180E4"/>
  </g>
</svg>Directions</button>
        </div>
      </div>
    </>
  )}

  {/* Train */}
  {mode === "train" && (
    <>
      <div className="c3-lower-left">
       <iframe
  title="New Delhi Railway Station to IIT Delhi"
  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3503.854715888986!2d77.20902141502287!3d28.64423398246016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1sNew+Delhi+Railway+Station!2sNew+Delhi+Railway+Station,+Ajmeri+Gate,+New+Delhi,+Delhi+110006!3m2!1d28.644287!2d77.219662!4m5!1sIIT+Delhi!2sIndian+Institute+of+Technology+Delhi,+Hauz+Khas,+New+Delhi,+Delhi+110016!3m2!1d28.5456!2d77.1926!5e0!3m2!1sen!2sin!4v1694032000000"
  width="100%"
  height="350"
  style={{ border: 0, borderRadius: "12px" }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  aria-hidden="true" 
/>

        <div className="road-info">
          <p>By Road: NDLS to IIT Delhi</p>
          <button className="direction-btn"
           onClick={() => {
    const source = encodeURIComponent("New Delhi Railway Station, Delhi");
    const destination = encodeURIComponent("IIT Delhi, Hauz Khas, Delhi");
    const url = `https://www.google.com/maps/dir/?api=1&origin=${source}&destination=${destination}&travelmode=driving`;
    window.open(url, "_blank"); // Opens in a new tab
  }}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <mask id="mask0_2989_420" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
    <rect y="0.899292" width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_2989_420)">
    <path d="M8 15.8993H10V12.8993H13.5V15.3993L17 11.8993L13.5 8.39929V10.8993H9C8.71667 10.8993 8.47917 10.9951 8.2875 11.1868C8.09583 11.3785 8 11.616 8 11.8993V15.8993ZM12 22.8993C11.75 22.8993 11.5042 22.8493 11.2625 22.7493C11.0208 22.6493 10.8 22.4993 10.6 22.2993L2.6 14.2993C2.4 14.0993 2.25 13.8785 2.15 13.6368C2.05 13.3951 2 13.1493 2 12.8993C2 12.6493 2.05 12.4035 2.15 12.1618C2.25 11.9201 2.4 11.6993 2.6 11.4993L10.6 3.49929C10.8 3.29929 11.0208 3.14929 11.2625 3.04929C11.5042 2.94929 11.75 2.89929 12 2.89929C12.25 2.89929 12.4958 2.94929 12.7375 3.04929C12.9792 3.14929 13.2 3.29929 13.4 3.49929L21.4 11.4993C21.6 11.6993 21.75 11.9201 21.85 12.1618C21.95 12.4035 22 12.6493 22 12.8993C22 13.1493 21.95 13.3951 21.85 13.6368C21.75 13.8785 21.6 14.0993 21.4 14.2993L13.4 22.2993C13.2 22.4993 12.9792 22.6493 12.7375 22.7493C12.4958 22.8493 12.25 22.8993 12 22.8993ZM12 20.8993L20 12.8993L12 4.89929L4 12.8993L12 20.8993Z" fill="#2180E4"/>
  </g>
</svg>Directions</button>
        </div>
      </div>

      <div className="c3-lower-right">
        <iframe
          title="NZM to IIT Delhi"
          src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3504.220!2d77.243!3d28.592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1sHazrat%20Nizamuddin%20Railway%20Station!2sNZM!3m2!1d28.590!2d77.250!4m5!1sIIT%20Delhi!2sIndian%20Institute%20of%20Technology%20Delhi!3m2!1d28.5456!2d77.1926!5e0!3m2!1sen!2sin!4v1694029050000"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
          aria-hidden="true" 
        />
        <div className="road-info">
          <p>By Road: NZM to IIT Delhi</p>
          <button className="direction-btn"
           onClick={() => {
    const source = encodeURIComponent("Nizamuddin Railway Station, Delhi");
    const destination = encodeURIComponent("IIT Delhi, Hauz Khas, Delhi");
    const url = `https://www.google.com/maps/dir/?api=1&origin=${source}&destination=${destination}&travelmode=driving`;
    window.open(url, "_blank"); // Opens in a new tab
  }}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <mask id="mask0_2989_420" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
    <rect y="0.899292" width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_2989_420)">
    <path d="M8 15.8993H10V12.8993H13.5V15.3993L17 11.8993L13.5 8.39929V10.8993H9C8.71667 10.8993 8.47917 10.9951 8.2875 11.1868C8.09583 11.3785 8 11.616 8 11.8993V15.8993ZM12 22.8993C11.75 22.8993 11.5042 22.8493 11.2625 22.7493C11.0208 22.6493 10.8 22.4993 10.6 22.2993L2.6 14.2993C2.4 14.0993 2.25 13.8785 2.15 13.6368C2.05 13.3951 2 13.1493 2 12.8993C2 12.6493 2.05 12.4035 2.15 12.1618C2.25 11.9201 2.4 11.6993 2.6 11.4993L10.6 3.49929C10.8 3.29929 11.0208 3.14929 11.2625 3.04929C11.5042 2.94929 11.75 2.89929 12 2.89929C12.25 2.89929 12.4958 2.94929 12.7375 3.04929C12.9792 3.14929 13.2 3.29929 13.4 3.49929L21.4 11.4993C21.6 11.6993 21.75 11.9201 21.85 12.1618C21.95 12.4035 22 12.6493 22 12.8993C22 13.1493 21.95 13.3951 21.85 13.6368C21.75 13.8785 21.6 14.0993 21.4 14.2993L13.4 22.2993C13.2 22.4993 12.9792 22.6493 12.7375 22.7493C12.4958 22.8493 12.25 22.8993 12 22.8993ZM12 20.8993L20 12.8993L12 4.89929L4 12.8993L12 20.8993Z" fill="#2180E4"/>
  </g>
</svg>Directions</button>
        </div>
      </div>
    </>
  )}

  {/* Bus */}
  {mode === "bus" && (
    <>
      <div className="c3-lower-left">
        <iframe
          title="Kashmere Gate ISBT to IIT Delhi"
          src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3503.220!2d77.228!3d28.667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1sKashmere%20Gate%20ISBT!2sKashmere%20Gate%20ISBT!3m2!1d28.667!2d77.227!4m5!1sIIT%20Delhi!2sIndian%20Institute%20of%20Technology%20Delhi!3m2!1d28.5456!2d77.1926!5e0!3m2!1sen!2sin!4v1694029100000"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
          aria-hidden="true" 
        />
        <div className="road-info">
          <p>By Road: Kashmere Gate ISBT to IIT Delhi</p>
          <button className="direction-btn"
            onClick={() => {
    const source = encodeURIComponent("Kashmere Gate, Delhi");
    const destination = encodeURIComponent("IIT Delhi, Hauz Khas, Delhi");
    const url = `https://www.google.com/maps/dir/?api=1&origin=${source}&destination=${destination}&travelmode=driving`;
    window.open(url, "_blank"); // Opens in a new tab
  }}
>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <mask id="mask0_2989_420" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
    <rect y="0.899292" width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_2989_420)">
    <path d="M8 15.8993H10V12.8993H13.5V15.3993L17 11.8993L13.5 8.39929V10.8993H9C8.71667 10.8993 8.47917 10.9951 8.2875 11.1868C8.09583 11.3785 8 11.616 8 11.8993V15.8993ZM12 22.8993C11.75 22.8993 11.5042 22.8493 11.2625 22.7493C11.0208 22.6493 10.8 22.4993 10.6 22.2993L2.6 14.2993C2.4 14.0993 2.25 13.8785 2.15 13.6368C2.05 13.3951 2 13.1493 2 12.8993C2 12.6493 2.05 12.4035 2.15 12.1618C2.25 11.9201 2.4 11.6993 2.6 11.4993L10.6 3.49929C10.8 3.29929 11.0208 3.14929 11.2625 3.04929C11.5042 2.94929 11.75 2.89929 12 2.89929C12.25 2.89929 12.4958 2.94929 12.7375 3.04929C12.9792 3.14929 13.2 3.29929 13.4 3.49929L21.4 11.4993C21.6 11.6993 21.75 11.9201 21.85 12.1618C21.95 12.4035 22 12.6493 22 12.8993C22 13.1493 21.95 13.3951 21.85 13.6368C21.75 13.8785 21.6 14.0993 21.4 14.2993L13.4 22.2993C13.2 22.4993 12.9792 22.6493 12.7375 22.7493C12.4958 22.8493 12.25 22.8993 12 22.8993ZM12 20.8993L20 12.8993L12 4.89929L4 12.8993L12 20.8993Z" fill="#2180E4"/>
  </g>
</svg>
Directions</button>
        </div>
      </div>

      <div className="c3-lower-right">
      <iframe
  title="Anand Vihar ISBT to IIT Delhi"
  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3504.110!2d77.242!3d28.590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1sAnand%20Vihar%20ISBT%2C%20Delhi!2sAnand%20Vihar%20Interstate%20Bus%20Terminal!3m2!1d28.6415!2d77.3156!4m5!1sIIT%20Delhi!2sIndian%20Institute%20of%20Technology%20Delhi!3m2!1d28.5456!2d77.1926!5e0!3m2!1sen!2sin!4v1694033000000"
  width="100%"
  height="350"
  style={{ border: 0, borderRadius: "12px" }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  aria-hidden="true" 
/>

        <div className="road-info">
          <p>By Road: Anand Vihar ISBT to IIT Delhi</p>
          <button className="direction-btn"
           onClick={() => {
    const source = encodeURIComponent("Anand Vihar ISBT, Delhi");
    const destination = encodeURIComponent("IIT Delhi, Hauz Khas, Delhi");
    const url = `https://www.google.com/maps/dir/?api=1&origin=${source}&destination=${destination}&travelmode=driving`;
    window.open(url, "_blank"); // Opens in a new tab
  }}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <mask id="mask0_2989_420" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
    <rect y="0.899292" width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_2989_420)">
    <path d="M8 15.8993H10V12.8993H13.5V15.3993L17 11.8993L13.5 8.39929V10.8993H9C8.71667 10.8993 8.47917 10.9951 8.2875 11.1868C8.09583 11.3785 8 11.616 8 11.8993V15.8993ZM12 22.8993C11.75 22.8993 11.5042 22.8493 11.2625 22.7493C11.0208 22.6493 10.8 22.4993 10.6 22.2993L2.6 14.2993C2.4 14.0993 2.25 13.8785 2.15 13.6368C2.05 13.3951 2 13.1493 2 12.8993C2 12.6493 2.05 12.4035 2.15 12.1618C2.25 11.9201 2.4 11.6993 2.6 11.4993L10.6 3.49929C10.8 3.29929 11.0208 3.14929 11.2625 3.04929C11.5042 2.94929 11.75 2.89929 12 2.89929C12.25 2.89929 12.4958 2.94929 12.7375 3.04929C12.9792 3.14929 13.2 3.29929 13.4 3.49929L21.4 11.4993C21.6 11.6993 21.75 11.9201 21.85 12.1618C21.95 12.4035 22 12.6493 22 12.8993C22 13.1493 21.95 13.3951 21.85 13.6368C21.75 13.8785 21.6 14.0993 21.4 14.2993L13.4 22.2993C13.2 22.4993 12.9792 22.6493 12.7375 22.7493C12.4958 22.8493 12.25 22.8993 12 22.8993ZM12 20.8993L20 12.8993L12 4.89929L4 12.8993L12 20.8993Z" fill="#2180E4"/>
  </g>
</svg>Directions</button>
        </div>
      </div>
    </>
  )}
</div>
</div>

      {/* ================== CONTAINER 4 ================== */}
      {/* <div className="container-4">
        <div className="c4-alpha">
          <div className="c4-i">Delhi Metro Connectivity</div>
          <div className="c4-j">
            Delhi Metro offers one of the most efficient, safe, and accessible
            public transport systems in India, seamlessly connecting all major
            railway stations, bus terminals, and airports. To make commuting
            even easier, the Delhi Metro Rail Corporation (DMRC) provides a
            dedicated mobile application – "DMRC Travel" – available on both
            Android and iOS platforms.
          </div>
          <div className="c4-k">
            Magenta Line → IIT Delhi Metro Station (near Main Gate) <br />
            Yellow Line → Hauz Khas Metro Station (10 min from campus)
          </div>
        </div>

        <div className="c4-beta">
          <div className="c4-x">
            <div className="c4-x-up">
              To Download the App Momentum2.0 Delhi Sarthi:
            </div>
            <div className="c4-x-low">
              You can scan the QR codes below to download the DMRC Travel App
              instantly.
            </div>
          </div>
          <div className="c4-y">
            <div className="qr-left">
              <div className="qr-img">
                 <img 
    src={org}   // 🔹 replace with your image path
    alt="QR Code" 
    className="qr-code-img" 
  />
              </div>
              <div className="google-btn">
                          <img 
    src={gplay}   
    alt="QR Code" 
    className="qr-code-img" 
  />
              </div>
            </div>
            <div className="qr-right">
              <div className="qr-img">
                      <img 
    src={qr1}   // 🔹 replace with your image path
    alt="QR Code" 
    className="qr-code-img" 
  />
              </div>
              <div className="google-btn">
                                     <img 
    src={apple}   
    alt="QR Code" 
    className="qr-code-img" 
  />
              </div>
            </div>
          </div>
      </div> */}

      {/* Dynamic Venue Services Section */}
      {venueServices.length > 0 && (
        <div className="dynamic-services-section">
          <h2 className="c2-a">Venue Convenience Services & Facilities</h2>
          <div className="services-grid">
            {venueServices.map((service) => (
              <div key={service._id} className="service-card">
                <span className="service-type">{service.type}</span>
                <h4>{service.name}</h4>
                {service.locationName && (
                  <p><strong>Location:</strong> {service.locationName}</p>
                )}
                {service.about && <p>{service.about}</p>}
                {service.accessibility && (
                  <div className="service-info-row">
                    <span>♿ Accessibility: {service.accessibility}</span>
                  </div>
                )}
                {service.startTime && service.endTime && (
                  <div className="service-info-row">
                    <span>⏰ Hours: {service.startTime} - {service.endTime}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Nearby Services Section */}
      {nearbyServices.length > 0 && (
        <div className="dynamic-services-section">
          <h2 className="c2-a">Nearby Services & POIs (Transit, Hospitals, Dining)</h2>
          <div className="services-grid">
            {nearbyServices.map((service) => (
              <div key={service._id} className="service-card">
                <span className="service-type">{service.type}</span>
                <h4>{service.name}</h4>
                {service.locationName && (
                  <p><strong>Location:</strong> {service.locationName}</p>
                )}
                {service.about && <p>{service.about}</p>}
                {service.contact && (
                  <p><strong>Contact:</strong> {service.contact}</p>
                )}
                {service.accessibility && (
                  <div className="service-info-row">
                    <span>♿ Accessibility: {service.accessibility}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Travel;
