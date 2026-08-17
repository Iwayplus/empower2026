import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { sendOtp, verifyOtp } from '../../services/api';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../redux/userSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QRCode from "react-qr-code"
import { Box } from '@mui/material';
const baseUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_REMOTE_URL






const LeftContainer = styled.div`
  display: flex;
  width: 50%; 
  height: 40%;
  flex-direction: column;
  align-items: flex-start;
  gap: 56px;

  /* For medium screens */
  @media (max-width: 1024px) {
    width: 60%; /* Adjust width for medium screens */
  }

  /* For small screens */
  @media (max-width: 768px) {
    display: none; /* Hide on smaller screens */
  }
  
  /* For very large screens (optional, for ultra-wide screens) */
  @media (min-width: 1440px) {
    width: 40%; /* Adjust width for very large screens */
  }
`;


const OtpContainer = ({ type, input, onChangeNumber }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const otpLength = 4;
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const [error, setError] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false, type: "success" });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const [isResending, setIsResending] = useState(false);

  const message = `Enter the 4-digit code sent to your ${type === "email" ? "email" : "mobile"}`;

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const onClick = async () => {
    setIsLoading(true);
    await handleVerifyOtp();
    setIsLoading(false);
  };
  const inputRefs = useRef([]);



  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }


    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const isComplete = otp.every((digit) => digit !== "");
    if (isComplete && !isLoading) {
      (async () => {
        setIsLoading(true);
        await handleVerifyOtp();
        setIsLoading(false);
      })();
    }
  }, [otp]);

  const showToast = (message, type = "success") => {
    setToast({ message, visible: true, type });
    setTimeout(() => {
      setToast({ message: "", visible: false, type: "success" });
    }, 3000);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };


  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    console.log(input, enteredOtp)
    let email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)
    let response = await verifyOtp({
      mobileOrEmail: email ? input : "+91" + input,
      otp: enteredOtp
    })
    if (response?.status === 200) {
      showToast("Mobile number verified successfully.", "success");
      setError(false);
      dispatch(setProfile(response.data.data))
      if (!response?.data?.data?.paymentStatus) navigate("/auth/register")
      else navigate("/")
    }
    else {
      setError(true);
      showToast("OTP is incorrect", "error");
    }
  };

  const handleResendOtp = async () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200); // animation lasts 200ms
    let email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)
    const response = await sendOtp({
      username: email ? input : "+91" + input,
      appName: process.env.REACT_APP_APP_NAME,
      digits: process.env.REACT_APP_OTP_DIGITS,
    });

    if (response.status === 200) {
      setTimeLeft(120);
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
      setError(false);
      showToast("OTP resent successfully");
    }
    else {
      setError(true);
      showToast("Something went wrong");
    }

  };

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    // Always overwrite the value at the current index
    const newOtp = [...otp];

    // Block skipping ahead
    if (index > 0 && otp[index - 1] === "") return;

    newOtp[index] = value;
    setOtp(newOtp);
    setError(false);

    // Move to next field if not the last
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };








  const handleKeyDown = (e, index) => {
    const focusAndSelect = (idx) => {
      const input = inputRefs.current[idx];
      if (input) {
        input.focus();
        input.setSelectionRange(0, 1);
      }
    };

    if (e.key === "Enter") {
      e.preventDefault();
      // Submit only if all digits are filled
      if (otp.every((digit) => digit !== "")) {
        onClick(); // your OTP submit function
      }
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        focusAndSelect(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusAndSelect(index - 1);
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      e.preventDefault();
      focusAndSelect(index + 1);
    }
  };




  const handleFocus = (e) => {
    e.target.setSelectionRange(0, 1);
  };


  useEffect(() => {
    if ("OTPCredential" in window) {
      const controller = new AbortController();
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: controller.signal,
        })
        .then((otpCredential) => {
          const code = otpCredential.code;
          if (code) {
            const digits = code.split("");
            setOtp(digits);
            inputRefs.current[digits.length - 1]?.focus();
          }
        })
        .catch((err) => {
          console.log("Auto-read OTP failed:", err);
        });


      return () => controller.abort();
    }
  }, []);

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otp.length);

    const newOtp = [...otp];
    for (let i = 0; i < otp.length; i++) {
      newOtp[i] = pasted[i] || "";
      if (pasted[i] && inputRefs.current[i + 1]) {
        setTimeout(() => inputRefs.current[i + 1].focus(), 0);
      }
    }

    setOtp(newOtp);
  };



  const Frapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
 
`;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: "16px",
        boxSizing: "border-box",
        overflow: "auto",

      }}
    >


      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 4px rgba(58, 105, 163, 0.25)",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          padding: "24px",
          boxSizing: "border-box",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >


        <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignSelf: "stretch", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignSelf: "stretch", justifyItems: 'center' }}>
            <p
              role="heading"
              aria-level="1"
              style={{ fontSize: "24px", fontWeight: 600, fontFamily: "Poppins", margin: 0 }}
            >
              {type === "email" ? "Verify Your Email" : "Verify Your Mobile Number"}
            </p>

            <span style={{ fontSize: "16px", fontWeight: 400, color: "#4A4A4A", fontFamily: "Poppins", margin: 0 }}>
              <span style={{ fontSize: "16px", fontWeight: 400, color: "#4A4A4A", fontFamily: "Poppins", margin: 0 }}>
                {message}
              </span>
              <br />
              <span
                style={{ fontWeight: 500 }}
                aria-label={type === "email" ? input : `+ nine one ${input.split("").join(" ")}`}
              >
                {type === "email" ? input : `+91 ${input}`}
              </span>

              <button
                onClick={onChangeNumber}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2180E4",
                  cursor: "pointer",
                  marginLeft: "4px",
                  padding: 0,
                  font: "inherit",

                }}
              >
                Edit
              </button>

            </span>
          </div>

          <div
            style={{ display: "flex", gap: "16px", }}
            role="group"
            aria-labelledby="otp-label"
          >


            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                aria-label={`Digit ${i + 1}`}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onFocus={handleFocus}
                onPaste={handlePaste}
                style={{
                  maxWidth: "56px",
                  minWidth: "56px",
                  height: "48px",
                  padding: "12px 0px",
                  alignItems: "flex-start",
                  textAlign: "center",
                  fontSize: "20px",
                  fontFamily: "Poppins",
                  color: "#000",
                  border: "none",
                  borderBottom: `2px solid ${digit ? "#2180E4" : "#D1D5DB"}`,
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
            ))}
          </div>




          {error && (
            <p
              role="alert"
              aria-live="assertive"
              style={{
                color: "#E11900",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 500,
                marginTop: "8px",
                marginBottom: 0,
              }}
            >
              OTP is incorrect
            </p>
          )}

        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: 'center',

          }}
        >
          <button
            onClick={onClick}
            disabled={isLoading}
            aria-disabled={isLoading}
            aria-busy={isLoading}
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "56px",
              background: isLoading ? "#1970CD" : "#2180E4",
              color: "#FFF",
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              border: "none",
              borderRadius: "4px",
              cursor: isLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.3s",
            }}
            onMouseDown={(e) => {
              if (!isLoading) e.currentTarget.style.background = "#176AC2";
            }}
            onMouseUp={(e) => {
              if (!isLoading) e.currentTarget.style.background = "#2180E4";
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.currentTarget.style.background = "#4795EB";
            }}
            onMouseLeave={(e) => {
              if (!isLoading) e.currentTarget.style.background = "#2180E4";
            }}
          >
            {isLoading ? (
              <>
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid #fff",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <span className="sr-only">Verifying...</span>
              </>
            ) : (
              "Verify OTP"
            )}
            <style>
              {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}
            </style>
          </button>

          <p style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 400, color: "#4A4A4A", margin: 0 }}>
            Didn't receive the code?{" "}
            {timeLeft > 0 ? (
              <span
                style={{ fontWeight: 500, color: "#2180E4" }}

              >
                {formatTime(timeLeft)}
              </span>
            ) : (
              <span
                onClick={handleResendOtp}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor: isResending ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#2180E4",
                  pointerEvents: isResending ? "none" : "auto",
                }}
              >
                {isResending && (
                  <div
                    role="status"
                    aria-label="Loading"
                    style={{
                      width: "14px",
                      height: "14px",
                      border: "2px solid #2180E4",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                )}
                Resend OTP
                <style>
                  {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
                </style>
              </span>
            )}

            {/* Screen reader announcement when timeLeft reaches 0 */}
            {timeLeft === 0 && (
              <div
                aria-live="assertive"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                Your OTP has expired. Please request a new one.
              </div>
            )}
            {timeLeft === 60 && (
              <div
                aria-live="assertive"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                Fill the OTP fast, time is slipping.
              </div>
            )}
          </p>



        </div>

      </div>

      {toast.visible && (
        <div style={{
          position: "fixed", bottom: "52px", left: "50%", transform: "translateX(-50%)",
          padding: "12px 16px", borderRadius: "4px", background: toast.type === "error" ? "#000000" : "#000000",
          color: "#FFFFFF", fontFamily: "Poppins", fontSize: "14px", fontWeight: 500,
          display: "flex", alignItems: "center", gap: "8px", zIndex: 1000
        }}>
          {toast.type === "success" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <mask id="mask0" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0)">
                <path d="M10.6 16.6L17.65 9.55L16.25 8.15L10.6 13.8L7.75 10.95L6.35 12.35L10.6 16.6ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z" fill="#28A745" />
              </g>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <mask id="mask0_1262_1403" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_1262_1403)">
                <path d="M12 17C12.2833 17 12.5208 16.9042 12.7125 16.7125C12.9042 16.5208 13 16.2833 13 16C13 15.7167 12.9042 15.4792 12.7125 15.2875C12.5208 15.0958 12.2833 15 12 15C11.7167 15 11.4792 15.0958 11.2875 15.2875C11.0958 15.4792 11 15.7167 11 16C11 16.2833 11.0958 16.5208 11.2875 16.7125C11.4792 16.9042 11.7167 17 12 17ZM11 13H13V7H11V13ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z" fill="#DC3545" />
              </g>
            </svg>
          )}
          {toast.message}
        </div>
      )}
      {/* // </Wrapper> */}
    </div>
  );
};


const Signin = () => {
  const navigate = useNavigate()

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [showOtpContainer, setShowOtpContainer] = useState(false);
  // const [otpSent, setOtpSent] = useState(false); 
  const [inputType, setInputType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false, type: "success" });
  const [searchParams, setSearchParams] = useSearchParams()


  const [isHovered, setIsHovered] = useState(false);

  const [hoveredFacebook, setHoveredFacebook] = useState(false);
  // const [showDialog, setShowDialog] = useState(false); 
  const errorRef = useRef(null);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ''); // remove all spaces
    setInput(e.target.value.split(" ").join("").toLowerCase());
    setError(false);
  };





  const showToast = (message, type = "success") => {
    setToast({ message, visible: true, type });
    setTimeout(() => {
      setToast({ message: "", visible: false, type: "success" });
    }, 3000);
  };

  const handleSubmit = async () => {
    const isPhone = /^\d{10}$/.test(input);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

    if (isEmail) {
      setError('');
      setInputType(isPhone ? 'phone' : 'email');

      try {
        const response = await sendOtp({
          username: isPhone ? '+91' + input : input,
          appName: process.env.REACT_APP_APP_NAME,
          digits: process.env.REACT_APP_OTP_DIGITS,
        });

        if (response.status === 200) {
          showToast('OTP sent successfully', 'success');
          setShowOtpContainer(true);
        } else {

          setError(response.data.message);
        }
      } catch (error) {
        setError('Something went wrong while sending OTP.');
      }

    } else {
      // if (/^\d+$/.test(input)) {
      //   setError('Please enter a valid 10-digit mobile number');
      // } else {
        setError('Invalid email format (eg: user@example.com).');
      // }
    }
  };

  const handleSigninWithGoogle = () => {
    window.open(
      `${baseUrl}/${process.env.REACT_APP_GOOGLE_LOGIN_URL}`,
      "_self"
    )
  }

  const handleSigninWithFacebook = () => {
    window.open(
      `${baseUrl}/${process.env.REACT_APP_FACEBOOK_LOGIN_URL}`,
      "_self"
    )
  }
  const onClick = async () => {
    setIsLoading(true);
    await handleSubmit();
    setIsLoading(false);
  };

  return (
    /*{ <div className="responsive-flex-row">
      <style jsx>{`
        .responsive-flex-row {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 20px;
           color: '#1C1C1C',
          width: 100%;
          flex-wrap: wrap;
          box-sizing: border-box;
          
          max-height: 100vh;  
          overflow: visible;  
        }
    
        @media (max-width: 768px) {
          .responsive-flex-row {
            flex-direction: column;
            gap: 16px;
            padding: 16px;
            max-height: auto;  
            overflow: visible;  
          }
        }
      `}</style>
        <div className="responsive-container">
        <style jsx>{`
        .responsive-container {
          margin: 0 auto; 
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        
          padding: 20px;
          box-sizing: border-box;
           width: 100%;
        max-width: 1600px;
    
        }
    
        @media (max-width: 600px) {
          .responsive-container {
            padding-top: 40px;
          }
        }
    
        @media (max-width: 480px) {
          .responsive-container {
            padding-top: 30px;
          }
        }
    
        @media (max-width: 360px) {
          .responsive-container {
            padding-top: 20px;
          }
        }
       `}</style> }*/
    <Wrapper>

      {showOtpContainer ? (
        <OtpContainer
          input={input}
          type={inputType}
          onChangeNumber={() => setShowOtpContainer(false)}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            paddingTop: '3%',


            '@media (max-width: 1024px)': {
              gap: '30px',
            },
            '@media (max-width: 768px)': {
              gap: '20px',

            },
            '@media (max-width: 480px)': {
              gap: '10px',

            },
          }}
        >
          {/* <LeftContainer>
          <div
  style={{
    display: 'flex',
    width: '90%',
    height: '40%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '56px',

    '@media (max-width: 1024px)': {
      width: '85%', 
      gap: '40px',  
    },

    '@media (max-width: 768px)': {
      width: '80%',  
      gap: '24px',  
    },

    '@media (max-width: 480px)': {
      width: '100%', 
      gap: '16px',   
    },
  }}
>
         <div
  style={{

    display: 'flex',
    
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px',
    alignSelf: 'stretch',

  
    '@media (max-width: 1024px)': {
      gap: '10px', 
    },
    '@media (max-width: 768px)': {
      gap: '8px',  
      alignItems: 'center', 
    },
    '@media (max-width: 480px)': {
      gap: '6px', 
      alignItems: 'center', 
    },
  }}
>

              <img
                src={headerIcon}
                alt="Assistive Tech Conference"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
          <h2
  style={{
    color: '#000',
    fontFeatureSettings: "'liga' off, 'clig' off",
    fontFamily: 'Poppins, sans-serif',
    fontSize: '32px', 
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '130%', 
    margin: 0,
    
   
    '@media (max-width: 1024px)': {
      fontSize: '28px', 
    },
    '@media (max-width: 768px)': {
      fontSize: '24px', 
      lineHeight: '120%', 
    },
    '@media (max-width: 480px)': {
      fontSize: '20px', 
    },
  }}
>
  Join Us at the 9th Empower Assistive Technology Conference.
</h2>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '20px',
              }}
            >
              <img
                src={Table}
                alt="Visual 1"
                style={{
                  width: '260px',
                  height: 'auto',
                  borderRadius: '8px',
                  marginRight: '-50px',
                  zIndex: 2,
                }}
              />
              <img
                src={Chair}
                alt="Visual 2"
                style={{
                  width: '260px',
                  height: 'auto',
                  borderRadius: '8px',
                  zIndex: 1,
                }}
              />
            </div>
          </div>
         </LeftContainer> */}
          <div className="responsive-box">
            <style jsx>{`
    .responsive-box {
      display: flex;
      width: 464px;
      padding: 32px;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      border-radius: 8px;
      border: 1px solid #D1D5DB;
      background: #FFF;
      box-shadow: 0px 0px 4px 0px rgba(58, 105, 163, 0.25);
      margin-bottom: 20px; /* Add margin-bottom to avoid touching footer */
    }

    @media (max-width: 1024px) {
      .responsive-box {
        width: 85%;
        padding: 24px;
      }
    }

    @media (max-width: 768px) {
      .responsive-box {
        width: 85%;
        padding: 16px;
      }
    }

    @media (max-width: 480px) {
      .responsive-box {
        width: 90%;
        padding: 20px;
      }
    }

    @media (max-width: 360px) {
      .responsive-box {
        width: 85%;
        padding: 20px;
      }
    }
        @media (max-width: 260px) {
      .responsive-box {
        width: 85%;
        padding: 40px;
      }
    }
  `}</style>

            <div className="responsive-heading" aria-label="New Registration page heading">
              Individual Registration / Login
              <style jsx>{`
    .responsive-heading {
      align-self: stretch;
      line-height: 120%;
      margin: 0;
      color: var(--Color-Heading, #1C1C1C);
      text-align: center;
      font-family: Poppins, sans-serif;
      font-size: 24px;
      font-style: normal;
      font-weight: 600; 
    }

    @media (max-width: 768px) {
      .responsive-heading {
        font-size: 20px;
      }
    }

    @media (max-width: 480px) {
      .responsive-heading {
        font-size: 18px;
      }
    }

    @media (max-width: 360px) {
      .responsive-heading {
        font-size: 16px;
      }
    }
  `}</style>
            </div>
            <p
              style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 500,
                color: '#4A4A4A',
                margin: 0,
                alignSelf: 'stretch',
              }}
            >
              Please provide an email address
            </p>

            {/* <div
  style={{
    display: 'flex',
    width: '90%',
    height: '25px',
    border: error ? '1px solid #E76363' : '1px solid #D1D5DB',
  
    background: '#FFF',
    padding: '16px 16px',
    // alignItems: 'center',
    gap: '8px',
    alignSelf: 'stretch',
  }}
> */}
            <div
              style={{
                position: 'relative',

                display: 'flex',
                width: '100%',
                minHeight: '56px',

                border: error
                  ? '1px solid #E76363'
                  : input
                    ? '1px solid var(--Color-Primary-400, #4996E9)'
                    : '1px solid var(--Color-Neutral-500, #D1D5DB)',
                background: '#FFF',
                padding: '12px 16px',
                alignItems: 'center',
                alignSelf: 'stretch',
                gap: '8px',
                boxSizing: 'border-box',
                borderRadius: '4px',
              }}
            >
              {/* {input && /^\d+$/.test(input) && (
                <div
                  style={{
                    padding: '0 8px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRight: '1px solid #D1D5DB',
                    backgroundColor: '#FFF',
                    height: '100%',
                    color: '#1C1C1C',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '1.5',
                    gap: '4px',
                    boxSizing: 'border-box',

                  }}
                >
                  <span>+91</span>
                </div>
              )} */}

              <input
                type="text"

                value={input}
                onChange={handleChange}
                onKeyDown={async (e) => {
                  if (e.key === ' ') {
                    e.preventDefault(); // prevent space
                  } else if (e.key === 'Enter') {
                    e.preventDefault();
                    await onClick(); // Trigger submit on Enter
                  }
                }}
                placeholder="Enter Your Email"
                className="responsive-placeholder"
                style={{
                  flex: 1,
                  height: '100%',
                  padding: '0 12px',
                  paddingRight: error ? '40px' : '12px',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--Color-Heading, #1C1C1C)',
                  background: '#FFF',
                  fontFamily: 'Poppins',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '150%',
                }}
              />

              <style>
                {`
  .responsive-placeholder {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .responsive-placeholder::placeholder {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    .responsive-placeholder::placeholder {
      font-size: 14px;
    }

    .responsive-placeholder {
      padding: 0 10px !important;
      font-size: 14px !important;
    }
  }

  @media (max-width: 360px) {
    .responsive-placeholder::placeholder {
      font-size: 12px;
    }

    .responsive-placeholder {
      padding: 0 8px !important;
      font-size: 12px !important;
    }
  }
`}
              </style>
              {error && (
                <button
                  onClick={() => {
                    setInput('');
                    setError(false);
                  }}
                  aria-label="Clear input"
                  style={{
                    position: 'absolute',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="img"
                    aria-hidden="false"
                  >
                    <path
                      d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                      fill="#1C1B1F"
                    />
                  </svg>
                </button>
              )}


            </div>
            <div
              style={{
                width: '100%',
                display: 'block', // ensures natural block flow
                marginTop: '4px',
              }}
            >
              {error && (
                <p
                  ref={errorRef}
                  role="alert"
                  tabIndex={-1}
                  style={{
                    color: '#E76363',
                    fontSize: '14px',
                    margin: 0,
                    fontFamily: 'Poppins',
                    textAlign: 'left',
                    outline: 'none',
                  }}
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClick}
              disabled={isLoading}
              aria-label={isLoading ? "Sending OTP..." : "Send OTP"}
              aria-busy={isLoading}
              style={{
                width: '100%',
                height: '56px',
                padding: '14px 16px',
                borderRadius: '4px',
                background: isLoading ? '#1970CD' : '#2180E4',
                color: '#fff',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.3s',
              }}
              onMouseDown={e => {
                if (!isLoading) e.currentTarget.style.background = '#176AC2';
              }}
              onMouseUp={e => {
                if (!isLoading) e.currentTarget.style.background = '#2180E4';
              }}
              onMouseEnter={e => {
                if (!isLoading) e.currentTarget.style.background = '#4795EB';
              }}
              onMouseLeave={e => {
                if (!isLoading) e.currentTarget.style.background = '#2180E4';
              }}
            >
              {isLoading ? (
                <div
                  role="status"
                  aria-label="Loading spinner"
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #fff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                />
              ) : (
                'Send OTP'
              )}

              <style>
                {`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
              </style>
            </button>

            {/* {showDialog && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.40)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ position: "relative" }}>
       
            <div
              onClick={() => setShowDialog(false)}
              style={{
                position: "absolute",
                top: "-60px", // more above the dialog box
                right: "-48px",
                cursor: "pointer",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
              >
                <rect width="56" height="56" rx="28" fill="white" />
                <path
                  d="M22.4 35L21 33.6L26.6 28L21 22.4L22.4 21L28 26.6L33.6 21L35 22.4L29.4 28L35 33.6L33.6 35L28 29.4L22.4 35Z"
                  fill="black"
                />
              </svg>
            </div>

       
            <div
              style={{
                display: "flex",
                width: "400px",
                padding: "32px 0px",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                borderRadius: "4px",
                border: "1px solid #D1D5DB",
                background: "#FFF",
                boxShadow: "0px 0px 4px rgba(58, 105, 163, 0.25)",
              }}
            >
              <h2 style={{ fontWeight: 600 }}>You're Already Registered</h2>
              <p>Download now to log in.</p>

              <div
                style={{
                  width: "150px",
                  height: "150px",
                  backgroundColor: "#eee",
                  aspectRatio: "1/1",
                }}
              >

                <img src={qr} alt='qr'></img>
              </div>

              
              <img
                src={play}
                alt="Google Play"
                style={{
                  width: "180px",
                  height: "24px",
                  aspectRatio: "15/2",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      )} */}
            <div

              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                color: '#888',
              }}
            >
              Or register with
            </div>


            <div className="responsive-row">
              <style jsx>{`
    .responsive-row {
      display: flex;
      width: 100%;
      align-items: flex-start;
      gap: 32px;
    }

    @media (max-width: 768px) {
      .responsive-row {
        width: 90%;
        gap: 20px;
        flex-wrap: wrap; /* Optional: allows items to wrap on small screens */
      }
    }

    @media (max-width: 480px) {
      .responsive-row {
        width: 100%;
        gap: 16px;
      }
    }
  `}</style>
              <button
                onClick={() => handleSigninWithGoogle()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  display: 'flex',
                  width: '192px',
                  padding: '12px 24px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  flex: '1 0 0',
                  alignSelf: 'stretch',
                  borderRadius: '4px',
                  border: '1px solid #D1D5DB',
                  color: '#000',
                  textAlign: 'center',
                  background: isHovered ? '#F3F4F6' : '#FFF', // Hover effect
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '150%',
                  cursor: 'pointer',
                }}
                aria-label="Sign in with Google"
              >
                {/* Google SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M31.36 16.3645C31.36 15.23 31.2582 14.1391 31.0691 13.0918H16V19.2809H24.6109C24.24 21.2809 23.1127 22.9754 21.4182 24.11V28.1245H26.5891C29.6146 25.3391 31.36 21.2373 31.36 16.3645Z" fill="#4285F4" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9998 31.9991C20.3199 31.9991 23.9417 30.5663 26.5889 28.1227L21.418 24.1082C19.9853 25.0682 18.1526 25.6354 15.9998 25.6354C11.8326 25.6354 8.3053 22.8209 7.04712 19.0391H1.70166V23.1845C4.33439 28.4136 9.7453 31.9991 15.9998 31.9991Z" fill="#34A853" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.04728 19.0399C6.72728 18.0799 6.54546 17.0545 6.54546 15.9999C6.54546 14.9454 6.72728 13.9199 7.04728 12.9599V8.81445H1.70182C0.618182 10.9745 0 13.4181 0 15.9999C0 18.5817 0.618182 21.0254 1.70182 23.1854L7.04728 19.0399Z" fill="#FBBC05" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9998 6.36364C18.3489 6.36364 20.458 7.17091 22.1162 8.75637L26.7053 4.16727C23.9344 1.58546 20.3126 0 15.9998 0C9.7453 0 4.33439 3.58546 1.70166 8.81455L7.04712 12.96C8.3053 9.17819 11.8326 6.36364 15.9998 6.36364Z" fill="#EA4335" />
                </svg>
                Google
              </button>

              <button
                onClick={() => handleSigninWithFacebook()}
                onMouseEnter={() => setHoveredFacebook(true)}
                onMouseLeave={() => setHoveredFacebook(false)}
                style={{
                  display: 'flex',
                  width: '192px',
                  padding: '12px 24px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  flex: '1 0 0',
                  alignSelf: 'stretch',
                  borderRadius: '4px',
                  border: '1px solid #D1D5DB',
                  background: hoveredFacebook ? '#F3F4F6' : '#FFF', // Hover background
                  color: '#4A4A4A',
                  textAlign: 'center',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '150%',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                aria-label="Sign in with Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                  <g clip-path="url(#clip0_1262_93)">
                    <path d="M18.4387 31.8844C26.3613 30.9253 32.5 24.1796 32.5 16C32.5 7.16356 25.3364 0 16.5 0C7.66356 0 0.5 7.16356 0.5 16C0.5 23.504 5.66533 29.8009 12.6351 31.5298L12.9444 30.2222H17.8333L18.4387 31.8844Z" fill="#0866FF" />
                    <path d="M12.6343 31.5302V20.8902H9.33203V16.0005H12.6343V13.8938C12.6343 8.44756 15.0983 5.92578 20.4423 5.92578C21.4538 5.92578 23.2005 6.124 23.9178 6.32223V10.7516C23.54 10.7133 22.8805 10.6938 22.068 10.6938C19.444 10.6938 18.4325 11.6858 18.4325 14.2716V16.0005H23.6618L22.7658 20.8893H18.4396V31.8849C16.4992 32.1186 14.5326 31.9984 12.6351 31.5302H12.6343Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1262_93">
                      <rect width="32" height="32" fill="white" transform="translate(0.5)" />
                    </clipPath>
                  </defs>
                </svg>
                Facebook
              </button>
            </div>
            <div className="responsive-column">
              <style jsx>{`
    .responsive-column {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 20px 0;
      border-radius: 4px;
      border: 1px solid #D1D5DB;
      background: #EFF1F3;
    }

    @media (max-width: 768px) {
      .responsive-column {
        padding: 16px 0;
        gap: 10px;
      }
    }

    @media (max-width: 480px) {
      .responsive-column {
        padding: 12px 0;
        gap: 8px;
      }
    }

    @media (max-width: 360px) {
      .responsive-column {
        padding: 10px 0;
        gap: 6px;
      }
    }
  `}</style>
              <p
                role="text"
                aria-label="Already Registered heading"
                tabIndex={0} // <-- This is crucial for TalkBack to focus and speak it
                style={{
                  margin: 0,
                  color: 'var(--Color-Heading, #1C1C1C)',
                  textAlign: 'center',
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '120%',
                }}
              >
                <span aria-hidden="true">Already Registered?</span>
              </p>

              <p
                style={{
                  margin: 0,
                  color: 'var(--Color-Body-text, #4A4A4A)',
                  textAlign: 'center',
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%', // 24px
                }}
                aria-label="Instruction to scan the QR code and download the app"
              >
                Click to download the app
              </p>


              <div>
                <a href={process.env.REACT_APP_APP_URL} target="_blank" rel="noopener noreferrer">
                  {/* <img src={code} alt="qr" className="qr-image" /> */}
                  <Box style={{
                    height: 180,
                    width: 180,
                    padding: 18,
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '4px solid #041a32',
                    borderRadius: 12,
                    margin: '10px auto'

                  }}>
                  <QRCode
                    size={100}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={process.env.REACT_APP_APP_URL}
                    viewBox={`0 0 256 256`}
                  />
                </Box>
              </a>
              <style jsx>{`
    .qr-container {
      width: 150px;
      height: 150px;
      border-radius: 4px;
      border: 2.2px solid #D1D5DB;
      background: url(<path-to-image>) lightgray center / cover no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .qr-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    @media (max-width: 600px) {
      .qr-container {
        width: 120px;
        height: 120px;
      }
    }

    @media (max-width: 400px) {
      .qr-container {
        width: 100px;
        height: 100px;
      }
    }
  `}</style>
            </div>




            {/* <div style={{
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%', 
  maxWidth: '180px', 
  height: 'auto', 
}}>
  <img src={play} alt="Play Store" style={{ height: '24px', width: 'auto' }} />
</div> */}

          </div>
        </div>
        </div>
  )
}


       </Wrapper >
    //   </div>
    // </div>
  );
showToast(
  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <mask id="mask0_2197_1081" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2197_1081)">
        <path d="M10.6 16.6L17.65 9.55L16.25 8.15L10.6 13.8L7.75 10.95L6.35 12.35L10.6 16.6ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z" fill="#28A745" />
      </g>
    </svg>
    OTP sent successfully
  </span>,
  'success'
);
  
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
  align-items:center;
  overflow-x: hidden;
background: #F9FAFB;
`;

export default Signin;


