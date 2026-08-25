import { Autocomplete, Backdrop, Checkbox, CircularProgress, Divider, Radio, TextField, styled } from "@mui/material"
import { useEffect, useRef, useState } from "react"

import uploadPhoto from "../../assets/uploadPhoto.png"
import progressLine from '../../assets/progressLine.svg'
import progressLineFilled from '../../assets/progressLineFilled.svg'
import activityDone from '../../assets/activityDone.svg'
import { useNavigate, useSearchParams } from "react-router-dom"
import uploadIcon from "../../assets/uploadIcon.svg"
import { dissabilityList, genders, typeOfRegistrations, registrationCategories, daysAvailable } from "./utils/utils"
import circleCheckIcon from '../../assets/circleCheckIcon.svg'
import { fetchCoupon, getProfile, handleZeroPayment, saveUserDetails, uploadFile } from "../../services/api"
import plusIcon from '../../assets/plusIcon.svg'
import closeIcon from '../../assets/close.svg'
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'
import { registrationCharges } from "../attend/data"
import { useDispatch } from "react-redux"
import { setProfile } from "../../redux/userSlice"
import { handlePayment } from "../../razorpay/razorpay"
import PaymentLoading from "../../razorpay/PaymentLoading"
import PaymentReceipt from "../../razorpay/PaymentReceipt"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import './dob.css'


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const baseUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_REMOTE_URL
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);



const isLinkedInUrl = (url) => {
    const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;


    return linkedInRegex.test(url) || websiteRegex.test(url);

}

const formStates = [
    {
        type: "Account",
        index: 1
    },
    {
        type: "Profile",
        index: 2
    },
    {
        type: "Payment",
        index: 3
    },
    {
        type: "Summary",
        index: 4
    }
]

const Component = styled("span")({
    width: '100vw',
    background: '#F9FAFB',
    paddingBottom: 56
})

const Container = styled("div")({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
})

const ProgressBx = styled("div")(({ theme }) => ({
    display: 'flex',
    margin: '32px auto 0 auto',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
        display: 'none'
    }

}))

const StateBx = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
    width: 'max-content'
})
const Circle = styled('div')({
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: "2px solid #9CA3AF",
    boxSizing: 'border-box',
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 'normal'
})
const StatusTxt = styled("p")({
    color: 'var(--Color-Body-text, #4b5563)',
    textAlign: "center",
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '120%',
    margin: 0
})

const Content = styled("div")(({ theme }) => ({
    marginTop: 40,
    width: '100%',
    [theme.breakpoints.down("sm")]: {
        marginTop: 0
    }
}))

const InputBx = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
})
const Input = styled('input')(({ theme }) => ({
    width: '100%',
    height: 48,
    boxSizing: 'border-box',
    padding: '12px 16px',
    borderRadius: 4,
    border: "1px solid var(--Color-Neutral-500, #D1D5DB)",
    background: "#FFF",
    marginTop: 8,
    fontSize: 16,
    '&:hover': {
        border: "1px solid var(--Color-Primary-400, #4996E9)",
        boxShadow: "0px 0px 4px 0px rgba(58, 105, 163, 0.25)"
    },
    [theme.breakpoints.down("sm")]: {

    }

}))
const BottomTxt = styled('p')({
    marginTop: 4,
    color: "#000",
    fontFamily: "Poppins",
    fontSize: 12,
    margin: 0,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%" /* 18px */
})
const Label = styled('p')({
    color: 'var(--Color-Body-text, #4b5563)',
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "120%",
    margin: 0
})

const PersonalInfo = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    maxWidth: 400,
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        padding: 10,
        boxSizing: 'border-box'
    }
}))

const ParticipationDetails = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: 478,
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        padding: 10,
        boxSizing: 'border-box'
    }
}))

const H2 = styled('h2')({
    color: "#000",
    fontFamily: "Poppins",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: '120%',
    margin: 0
})

const H1 = styled('h1')({
    color: "#000",
    fontFamily: "Poppins",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: '120%',
    margin: 0
})

const Form = styled('div')({
    width: '100%'
})

const TopCont = styled("div")(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: 80,
    [theme.breakpoints.down("sm")]: {
        flexDirection: 'column',
        gap: 24
    }
}))
const DissabilityCheck = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
})


const DissabilityCheckTxt = styled('p')({
    color: "#000",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "120%",
    margin: 0,
    '&>span': {
        color: "var(--Color-Alert-Red, #DC3545)"
    }
})

const Rad = styled("div")({
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    '&>label': {
        margin: 0,
        color: "#000",
        /* Body/Body s */
        fontSize: 16,
        fontWeight: 400,
        lineHeight: "150%",
        cursor: 'pointer'
    }
})

const DetailsBx = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 10
})

const PhotoName = styled('p')({
    margin: 0,
    color: 'var(--Color-Black, #000)',
    fontFamily: "Poppins",
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 500,
    display: 'flex',
    alignItems: "center",
    lineHeight: '120%' /* 19.2px */
})

const PhotoLimit = styled('p')({
    margin: 0,
    color: "var(--Color-Body-text, #4b5563)",
    fontFamily: "Poppins",
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '120%' /* 14.4px */
})



const RadioBx = styled('div')({
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 20
})

const UploadPhotoBx = styled('div')({
    display: 'flex',
    gap: 16,
    justifyContent: 'flex-start'
})

const ChoosePhotoBtn = styled('label')({
    borderRadius: 4,
    border: "1px solid var(--Color-Primary-500, #2180E4)",
    padding: "4px 8px",
    color: "var(--Color-Primary-500, #2180E4)",
    /* Label/M */
    fontFamily: "Poppins",
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: "120%",
    background: 'none',
    gap: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: "fit-content",
    cursor: 'pointer'
})

const UploadImg = styled('img')({
    width: 80,
    height: 80
})

const ParticipationTypeBx = styled("div")(({ theme }) => ({
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    position: 'relative',
    '&>h4': {
        color: "var(--Color-Black, #4b5563)",
        fontFamily: "Poppins",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "120%",
        margin: 0,
        '&>span': {
            color: "var(--Color-Alert-Red, #DC3545)"

        }

    }
}))

const ParticipationSelect = styled("button")(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8,
    borderRadius: 4,
    border: "1px solid #D1D5DB",
    background: "var(--Color-White, #FFF)",
    padding: "10px 16px",
    boxSizing: 'border-box',
    cursor: 'pointer',
    '&>p': {
        margin: 0,
        color: "var(--Color-Body-text, #4b5563)",
        fontFamily: "Poppins",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: 'left',
        flex: '1 0 0',
        lineHeight: "150%" /* 24px */
    },
    '&:hover': {
        border: "1px solid var(--Color-Primary-400, #4996E9)",
        boxShadow: "0px 0px 4px 0px rgba(58, 105, 163, 0.25)"
    }

}))

const AccompanyPerson = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    '&>input': {
        height: 18,
        width: 18,
        border: "2px solid #000",
        cursor: "pointer"
    }
})

const TermBx = styled("div")({
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    '&>h3': {
        color: "var(--Color-Heading, #1C1C1C)",
        fontFamily: "Poppins",
        margin: 0,
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "120%" /* 19.2px */
    },
    '&>p': {
        color: "var(--Color-Body-text, #4b5563)",
        fontFamily: "Poppins",
        fontSize: 12,
        margin: 0,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "120%"
    },
    '&>button': {
        borderRadius: 4,
        border: "1px solid var(--Color-Neutral-400, #D1D5DB)",
        color: 'var(--Color-Primary-500, #2180E4)',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: '120%',
        padding: "12px 13px",
        background: '#fff',
        cursor: 'pointer',
        '&:hover': {
            background: '#efefef'
        }
    }
})

// const DisabilityCertificate = styled('div')({
//     display: 'flex',
//     flexDirection: 'column',
//     '&>p': {
//         color: "var(--Color-Heading, #1C1C1C)",
//         fontFamily: "Poppins",
//         fontSize: 16,
//         fontStyle: "normal",
//         fontWeight: 500,
//         lineHeight: "120%",
//         margin: 0,
//         "&>span": {
//             color: "#E60D0D"
//         }
//     },
//     '&>label': {
//         color: "var(--Color-Body-text, #4A4A4A)",
//         fontFamily: "Poppins",
//         fontSize: 12,
//         fontStyle: "normal",
//         fontWeight: 400,
//         lineHeight: "120%",
//         marginTop: 4
//     }
// })

// const FileChoose = styled('div')({
//     marginTop: 8,
//     borderRadius: 4,
//     border: "1px solid var(--Color-Neutral-400, #D1D5DB)",
//     background: "var(--Color-White, #FFF)",
//     display: 'flex',
//     gap: 8,
//     padding: "8px 16px",
//     alignItems: 'center',
//     '&>label': {
//         display: "flex",
//         height: 32,
//         padding: "4px 12px",
//         boxSizing: 'border-box',
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 10,
//         borderRadius: 4,
//         background: "var(--Color-Primary-500, #2180E4)",
//         color: "var(--Color-White, #FFF)",
//         fontFamily: "Poppins",
//         fontSize: 16,
//         fontStyle: "normal",
//         fontWeight: 500,
//         lineHeight: "120%",
//         border: 'none',
//         cursor: 'pointer'
//     }
// })

// const DissabilityList = styled('div')(({ theme }) => ({
//     display: "flex",
//     width: '100%',
//     flexDirection: "column",
//     alignItems: "flex-start",
//     boxSizing: 'border-box',
//     background: '#fff',
//     position: 'absolute',
//     top: "100%",
//     zIndex: 999,
//     [theme.breakpoints.down("sm")]: {
//         width: '100%',
//         padding: 5,
//     }
// }))

// const Dissability = styled('button')(({ theme }) => ({
//     padding: 8,
//     width: '100%',
//     cursor: 'pointer',
//     boxSizing: 'border-box',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderRight: "1px solid #D1D5DB",
//     borderBottom: "1px solid #D1D5DB",
//     borderLeft: "1px solid #D1D5DB",
//     background: 'none',
//     borderTop: 'none',
//     [theme.breakpoints.down("sm")]: {
//         gap: 50
//     },
//     '&:hover': {
//         background: '#efefef'
//     },
//     '&>p': {
//         margin: 0,
//         color: "var(--Color-Heading, #1C1C1C)",
//         fontFamily: "Poppins",
//         fontSize: 16,
//         fontStyle: "normal",
//         fontWeight: 400,
//         lineHeight: "150%",
//         [theme.breakpoints.down("sm")]: {
//             maxWidth: 200
//         }
//     }
// }))

const AccompanyForm = styled('div')(({ theme }) => ({
    borderRadius: 12,
    background: "#FFF",
    padding: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxShadow: "0px 0px 4px 0px rgba(58, 105, 163, 0.25)",
    width: '100%',
    boxSizing: 'border-box',
    [theme.breakpoints.down("sm")]: {
        padding: 5
    },
    '&>button': {
        borderRadius: '50%',
        width: 56,
        height: 56,
        border: 'none',
        background: '#fff',
        padding: 0,
        cursor: 'pointer',
        '&:hover': {
            background: '#dedede'
        },

    },
    '&>h2': {
        color: "#000",
        fontFamily: "Poppins",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "120%",
        margin: 0,
        [theme.breakpoints.down("sm")]: {
            fontSize: 20,
            textAlign: 'center'
        }
    },
    '&>p': {
        color: "var(--Color-Body-text, #4b5563)",
        textAlign: "center",
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "150%",
        margin: "4px 0 0 0",
        [theme.breakpoints.down("sm")]: {
            fontSize: 14
        }
    },
    '&>form': {
        marginTop: 24,
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        [theme.breakpoints.down("sm")]: {
            width: '100%'
        },
        '&>button': {
            padding: "14px 16px",
            display: 'flex',
            justifyContent: "center",
            alignItems: 'center',
            gap: 10,
            borderRadius: 4,
            background: "var(--Color-Primary-600, #1970CD)",
            border: 'none',
            color: '#fff',
            fontFamily: "Poppins",
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: "500",
            lineHeight: "120%",
            marginTop: 9,
            cursor: 'pointer'
        }
    }
}))

const FeeBx = styled('div')({
    padding: "8px 16px 12px 16px",
    maxWidth: 400,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    borderRadius: 4,
    border: "1px solid var(--Color-Neutral-500, #D1D5DB)",
    background: "#FFF",
    '&>h2': {
        fontFamily: "Poppins",
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: "150%",
        padding: "8px 0",
        margin: 0,
        borderBottom: "1px solid var(--Color-Neutral-400, #D1D5DB)"
    }
})

const Summery = styled('div')({
    marginTop: 8,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    '&>div': {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: "120%",
        '&>h3': {
            margin: 0,
            fontWeight: 500,
        },
        '&>p': {
            fontWeight: 400,
            lineHeight: '150%',
            margin: 0,
            '&>span': {
                fontFamily: "Port Lligat Sans"
            }
        },
        "&>label": {
            fontWeight: 400,
            lineHeight: '150%',
            fontStyle: 'italic',
            margin: 0
        }
    }
})

const Days = styled('div')({
    marginTop: 8,
    display: 'flex',
    gap: 12

})

const DayDiv = styled('button')({
    borderRadius: 4,
    border: '1px solid var(--Color-Neutral-400, #D1D5DB)',
    background: '#FFF',
    padding: "8px 12px",
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
})

const Day = styled('div')({
    fontFamily: 'Poppins',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    '&>p': {
        margin: 0,
        color: 'var(--Color-Body-Secondary, #3B3535)',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '150%'
    },
    '&>span': {
        margin: 0,
        color: '#000',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '100%'
    }
})



const Review = styled('div')({

})

const Payment = styled('div')({

})

const initialValues = {
    firstName: "",
    lastName: "",
    affiliation: "",
    isDissable: "",
    dissabilities: [],
    photoUrl: uploadPhoto,
    participationType: "Delegate",
    isAccompanyPerson: false,
    dissabilityCertificate: null,
    daySelects: [],
    designation: "",
    linkedIn: "",
    secondaryMail: "",
    secondaryMobile: "",
    gender: "",
    genderOther: "",
    registrationType: "",
    registrationCategory: "",
    accompanyPerson: {
        firstName: "",
        lastName: "",
        mobileOrEmail: ""
    }
}

const initialAccompanyPersonValues = {
    firstName: "",
    lastName: "",
    mobileOrEmail: ""
}

const AccompanyDetails = styled('div')({
    padding: '8px 12px',
    maxWidth: 400,
    boxSizing: "border-box",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: 4,
    border: "1px solid var(--Color-Neutral-400, #D1D5DB)",
    background: "#FFF"
})

const Details = styled("div")({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    '&>p': {
        color: "var(--Color-Heading, #1C1C1C)",
        fontFamily: "Poppins",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "150%",
        margin: 0,
        '&>label': {
            fontSize: 14,
            color: "#4b5563",
        }
    }
})

const Actions = styled("div")({
    display: 'flex',
    gap: 20,
    '&>button': {
        background: 'none',
        padding: 0,
        border: 'none',
        cursor: 'pointer'
    }
})

const BottomCont = styled('div')(({ theme }) => ({
    marginTop: 40,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    gap: 80,
    alignItems: 'center',
    [theme.breakpoints.down("sm")]: {
        flexDirection: 'column',
        gap: 24,
        padding: 10,
        boxSizing: 'border-box'
    },
    'button': {
        display: "flex",
        width: 400,
        height: 56,
        padding: "14px 16px",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        boxSizing: 'border-box',
        borderRadius: 4,
        border: "1px solid var(--Color-Neutral-400, #D1D5DB)",
        background: "#FFF",
        color: 'var(--Color-Primary-500, #2180E4)',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: "120%",
        cursor: 'pointer',
        '&:hover': {
            background: '#efefef'
        },
        [theme.breakpoints.down("sm")]: {
            width: '100%',
        },

    },
    'button:nth-of-type(2)': {
        background: "var(--Color-Primary-600, #1970CD)",
        color: '#fff',
        '&:hover': {
            background: "#4996E9"
        }
    }
}))

const ReviewBx = styled('div')({
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    borderRadius: 4,
    border: "1px solid var(--Color-Neutral-400, #D1D5DB)",
    background: "#FFF",
    '&>div': {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        fontFamily: 'Poppins',
        lineHeight: "120%",
        'img': {
            borderRadius: 2.8,
            border: "1.4px solid var(--Color-Neutral-400, #D1D5DB)"

        }

    }
})

const Attr = styled("label")({
    color: "var(--Color-Neutral-600, #9CA3AF)",
    fontSize: 12,
    fontWeight: 400,
    margin: 0
})

const Value = styled("p")({
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
})

const ReviewHead = styled("div")({
    display: 'flex',
    justifyContent: 'space-between',
    '&>button': {
        color: "var(--Color-Primary-500, #2180E4)",
        /* Body/Body s */
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: '150%',
        background: "none",
        border: 'none',
        cursor: 'pointer'
    }
})

const CouponBx = styled('div')(({ theme }) => ({
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    borderRadius: 4,
    border: "1px solid var(--Color-Neutral-400, #D1D5DB)",
    background: "#FFF",
    width: 478,
    boxSizing: 'border-box',
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        padding: 10,

    }

}))

const CouponInput = styled('div')({
    background: "#FFF",
    borderRadius: 4,
    border: "1px solid var(--Color-Primary-400, #4996E9)",
    /* Drop-Shadow */
    boxShadow: "0px 0px 4px 0px rgba(58, 105, 163, 0.25)",
    padding: "12px 16px",
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: "Poppins",
    fontWeight: 500,
    lineHeight: "120%",
    'input': {
        width: '100%',
        border: 'none',
        outline: 'none',
        color: "var(--Color-Heading, #1C1C1C)",
        fontSize: 20,
    },
    'button': {
        display: "flex",
        height: 32,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        color: "var(--Color-Primary-500, #2180E4)",
        /* Label/M */
        fontSize: 16,
        background: 'none',
        border: 'none',
        cursor: 'pointer'
    }
})
const Applied = styled("div")({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
})
const Validity = styled("div")({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 6,
    fontFamily: "Poppins",
    fontWeight: 500,
    lineHeight: "120%",
    'p': {
        margin: 0,
        color: 'var(--Color-Neutral-600, #9CA3AF)',
        fontSize: 14
    },
    'label': {
        fontSize: 14,
        color: "var(--Color-Body-text, #5cb85c)",
        'span': {
            fontFamily: "Pontano Sans"

        }

    }
})

const PriceCont = styled("div")({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontFamily: 'Poppins',
    '&>label': {
        color: 'var(--Color-Neutral-600, #9CA3AF)',
        fontSize: 12,
        fontStyle: 'italic',
        fontWeight: 400,
        lineHeight: '150%', /* 18px */
    },
    '&>div': {
        display: 'flex',
        justifyContent: 'space-between',
        color: "#000",
        /* Body/Body s */
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "150%",
        'p': {
            margin: 0,
        },
        '&>label': {
            '&>span': {
                fontFamily: "Pontano Sans"
            }
        }
    }
})

const PayBtn = styled('button')({
    padding: "14px 16px",
    color: 'var(--Color-White, #FFF)',
    fontFamily: "Poppins",
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: "120%",
    border: 'none',
    borderRadius: 4,
    background: 'var(--Color-Primary-500, #2180E4)',
    cursor: 'pointer',
    '&:hover': {
        opacity: 0.6
    }
})

// const DissElm = styled("div")({
//     padding: "4px 8px",
//     borderRadius: 4,
//     border: '1px solid var(--Color-Neutral-400, #D1D5DB)',
//     display: 'flex',
//     alignItems: 'center',
//     gap: 8,
//     '&>p': {
//         margin: 0,
//         color: 'var(--Color-Primary-500, #2180E4)',
//         fontFamily: 'Poppins',
//         fontSize: 16,
//         fontWeight: 400,
//         lineHeight: '150%'
//     },
//     '&>img': {
//         height: 24,
//         width: 24,
//         opacity: 0.6
//     },
//     '&>button': {
//         background: 'none',
//         border: 'none',
//         padding: 0
//     }
// })


const InputField = ({
    label,
    bottmText,
    placeholder,
    mandatory,
    name,
    value,
    handleChange,
    disabled,
    error,
    errorTxt,
    showInputError,
    type,
    max,
    prefix
}) => {

    if (name === "dob") console.log(error, showInputError, errorTxt)
    return (
        <InputBx>
            <Label aria-hidden={name === "dob" ? "false" : "true"}>{label}<span style={{
                color: "#DC3545",
                visibility: mandatory ? "visible" : "hidden"
            }}> *</span></Label>
            <Input prefix={prefix} style={{
                color: disabled ? "#ababab" : null,
                border: error && showInputError ? "1px solid #E76363" : "1px solid var(--Color-Neutral-500, #D1D5DB)"
            }}
                maxLength={150}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => handleChange(e)}
                disabled={disabled}
                type={type}
                max={max}

            />
            <BottomTxt style={{
                color: error ? "#DC3545" : null
            }}>{(error && showInputError) ? errorTxt : ""} <span style={{
                color: '#000'
            }}>{bottmText}</span></BottomTxt>
        </InputBx>
    )
}

const PriceBx = ({
    haveAccompanyPerson,
    user,
    coupon
}) => {

    let category = user.registrationCategory === "Full Conference" ? "earlyBird" : "earlyOneDay"

    let registrationFee = registrationCharges?.filter(elm => elm?.registrationTypes?.includes(user?.registrationType))[0]?.[category]
    let accompanyPersonFee = registrationCharges?.filter(elm => elm?.registrationTypes?.includes("Accompanying Person"))[0]?.[category]

    if (category === "earlyOneDay") {
        registrationFee = registrationFee * user.daySelects.length
        accompanyPersonFee = accompanyPersonFee * user.daySelects.length
    }



    let total = parseInt(registrationFee) + parseInt(haveAccompanyPerson ? accompanyPersonFee : 0) - parseInt(coupon?.price || 0)
    if (total <= 0) total = 0
    return (
        <PriceCont>
            <div>
                <p>Registration Fee</p>
                <label><span>₹</span> {registrationFee}</label>
            </div>
            {haveAccompanyPerson && <div>
                <p>Accompany Person Fee</p>
                <label><span>₹</span> {accompanyPersonFee}</label>
            </div>}
            {coupon && <div>
                <p>Coupon Discount</p>
                <label style={{
                    color: "#28A745"
                }}>-<span>₹</span> {coupon?.price}</label>
            </div>}
            <label>(Inclusive of GST and all applicable taxes)</label>
            <Divider orientation="horizontal" />
            <div>
                <p>Total</p>
                <label style={{
                    color: "var(--Color-Primary-500, #2180E4)",
                    /* Heading/Heading 4 */
                    fontFamily: "Poppins",
                    fontSize: 24,
                    fontWeight: 600,
                    lineHeight: '120%'
                }}><span>₹</span> {total}</label>
            </div>

        </PriceCont>
    )
}

const dayLimitsNorm = {
    "1": 31,
    "2": 28,
    "3": 31,
    "4": 30,
    "5": 31,
    "6": 30,
    "7": 31,
    "8": 31,
    "9": 30,
    "10": 31,
    "11": 30,
    "12": 31,
    "": 30
}

const dayLimitsLeap = {
    "1": 31,
    "2": 29,
    "3": 31,
    "4": 30,
    "5": 31,
    "6": 30,
    "7": 31,
    "8": 31,
    "9": 30,
    "10": 31,
    "11": 30,
    "12": 31,
    "": 30
}

function isLeapYear(year) {
    year = parseInt(year)
    if (year < 1900 || year > 2024) {
        return false
    }
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}


const Register = () => {
    const [searchParams, setSearchParams] = useSearchParams()



    const [user, setUser] = useState(initialValues)
    const [fileSizeErr, setFileSizeErr] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [photoName, setPhotoName] = useState("No photo choosen")
    // const [disabilityCertificate, setDisabilityCertificate] = useState("No file choosen")
    // const [disabilityCertificateSizeErr, setDisabilityCertificateSizeErr] = useState(null)
    // const [showParticipationList, setShowParticipationList] = useState(false)
    const [date, setDate] = useState({
        "dob-day": "",
        "dob-month": "",
        "dob-year": ""
    })
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [openAccompanyPerson, setOpenAccompanyPerson] = useState(false)
    const [haveAccompanyPerson, setHaveAccompanyPerson] = useState(false)
    const [accompanyUser, setAccompanyUser] = useState(initialAccompanyPersonValues)
    const [updateAccompanyPerson, setUpdateAccompanyPerson] = useState(false)
    const [showInputError, setShowInputError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [coupon, setCoupon] = useState(null)
    const [couponError, setCouponError] = useState(null)
    const [paymentLoader, setPaymentLoader] = useState(false)

    const formStateNum = searchParams.get("formState")
    const dispatch = useDispatch()
    const couponRef = useRef()
    const navigate = useNavigate()

    const [formState, setFormState] = useState(parseInt(formStateNum) || 1)

    useEffect(() => {
        const fetchData = async () => {
            let response = await getProfile(navigate)
            if (response.status === 200) {
                setUser({
                    ...user,
                    ...response.data.data
                })
                setDate({
                    "dob-day": response?.data?.data?.dob?.split("-")[2],
                    "dob-month": response?.data?.data?.dob?.split("-")[1],
                    "dob-year": response?.data?.data?.dob?.split("-")[0]
                })
                dispatch(setProfile(response.data.data))
                if (user?.accompanyPerson?.firstName) {
                    setHaveAccompanyPerson(true)
                    setAccompanyUser({
                        firstName: user?.accompanyPerson?.firstName,
                        lastName: user?.accompanyPerson?.lastName,
                        mobileOrEmail: user?.accompanyPerson?.email || user?.accompanyPerson?.mobile.split("+91")[1]
                    })
                }
                else setHaveAccompanyPerson(false)

                const { firstName, affiliation, designation, dissabilityCertificate, participationType, paymentStatus } = response?.data?.data
                if (!firstName || !affiliation || !designation || (participationType === "Person with Disability" && !dissabilityCertificate)) {
                    setFormState(1)
                    setSearchParams(params => {
                        params.set("formState", 1)

                        return params
                    })
                    // setShowInputError(true)
                    return
                }
                if (paymentStatus) {
                    setFormState(3)
                    setSearchParams(params => {
                        params.set("formState", 3)

                        return params
                    })
                    setShowInputError(true)
                    return
                }
            }
        }

        fetchData()
    }, [])

    const handleChangeDate = (e) => {
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })

    }

    const isValidPhone = (input) => {
        return /^\d{10}$/.test(input)
    }

    const isValidEmail = (input) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    }


    const handleChange = (e) => {
        if (e.target.name === "firstName" || e.target.name === "lastName") {
            if (e.nativeEvent.data && e.nativeEvent.data >= '0' && e.nativeEvent.data <= '9') {
                return
            }
        }


        if (e.target.name === "registrationType" && e.target.value === "Person with Disability") {
            setUser({
                ...user,
                isDissable: "yes",
                [e.target.name]: e.target.value
            })
        }
        else if (e.target.name === "registrationType" && e.target.value !== "Person with Disability") {
            setAccompanyUser(initialAccompanyPersonValues)
            setHaveAccompanyPerson(false)
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }
        else {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }

    }

    const handleChangeAccompany = (e) => {
        if (e.target.name === "firstName" || e.target.name === "lastName") {
            if (e.nativeEvent.data && e.nativeEvent.data >= '0' && e.nativeEvent.data <= '9') {
                return
            }
        }
        setAccompanyUser({
            ...accompanyUser,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setPhotoName(file.name)
        if (file?.size > 2 * 1024 * 1024) {
            setFileSizeErr(true)
            setUser({ ...user, photoUrl: uploadPhoto })
            return
        }
        else {
            setFileSizeErr(false)
        }
        const imageFormData = new FormData();
        imageFormData.append('image', file);
        setUploading(true);
        let response = await uploadFile(imageFormData);
        setUploading(false);
        if (response.data.status) {
            let fileName = response.data.filename;
            setUser({ ...user, photoUrl: `${baseUrl}/uploads/${fileName}` });
        }

    }

    // const handleChangeDissabilityCertificate = async (event) => {
    //     const file = event.target.files[0];
    //     setDisabilityCertificate(file.name)
    //     if(file?.size> 2*1024*1024) {
    //         setDisabilityCertificateSizeErr(true)
    //         setUser({ ...user, disabilityCertificate: null })
    //         return
    //     }
    //     else {
    //         setDisabilityCertificateSizeErr(false)
    //     }
    //     const imageFormData = new FormData();
    //     imageFormData.append('image', file);
    //     setUploading(true);
    //     let response = await uploadFile(imageFormData);
    //     setUploading(false);
    //     if (response.data.status) {
    //         let fileName = response.data.filename;
    //         setUser({ ...user, dissabilityCertificate: `${baseUrl}/uploads/${fileName}` });
    //     }
    // }

    const handleAddAccompanyPerson = (e) => {
        e.preventDefault()
        const { firstName, mobileOrEmail } = accompanyUser
        if (!firstName || !mobileOrEmail) {
            alert("please enter all the field")
            return
        }
        else if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mobileOrEmail))
            && !(/^[6-9]\d{9}$/.test(mobileOrEmail))) {
            alert("Please enter a valid email or a valid Indian mobile number")
            return
        }
        else if (user?.email === mobileOrEmail || user?.secondaryMail === mobileOrEmail || user?.mobile?.split("+91")[1] === mobileOrEmail) {
            alert("Email or Mobile cannot be same for Accompany Person and Registered User")
            return
        }
        else {
            setUser({
                ...user,
                accompanyPerson: accompanyUser
            })
            setUpdateAccompanyPerson(false)
            setHaveAccompanyPerson(true)
            setOpenAccompanyPerson(false)
        }
    }

    const handleSave = async () => {

        // console.log(user)
        setLoading(true)
        let response = await saveUserDetails(
            {
                ...user,
                dob: `${date["dob-year"]}-${date["dob-month"]}-${date["dob-day"]}`
            },
            setShowInputError
        )
        setLoading(false)
        if (response.status === 200) {
            dispatch(setProfile(response.data.data))
            setUser({
                ...user,
                ...response.data.data
            })
        }
        window.location.href = `empower://auth?access_token=${localStorage.getItem("accessToken")}`
        navigate("/")
    }


    const handleNext = () => {
        if (formState < 4) {
            setFormState(prevState => prevState + 1)
            setSearchParams(params => {
                params.set("formState", formState + 1)

                return params
            })
        }

    }


    const handleApplyCoupon = async () => {
        let code = couponRef?.current?.value?.toLowerCase()
        let response = await fetchCoupon(code)
        if (response.status === 200) {
            setCouponError(null)
            setCoupon({
                code: response?.data?.data?.code?.toUpperCase(),
                price: response?.data?.data?.price,
                validTill: new Date(response?.data?.data?.validity).toDateString()
            })
            couponRef.current.value = ""
        }
        else {
            setCouponError(response?.response?.data?.message)
        }

    }

    const removeCoupon = () => {
        setCoupon(null)
        couponRef.current.value = ""
    }

    const handlePushDays = (day) => {
        let daySelects = [...user.daySelects]; // copy array

        if (daySelects.includes(day)) {
            daySelects = daySelects.filter(d => d !== day);
        } else {
            daySelects.push(day);
        }

        if (daySelects.length === 3) {
            alert("Full Conference is selected as registration category as you have selected all three dates")
            setUser({
                ...user,
                registrationCategory: "Full Conference",
                daySelects: []
            })
        }
        else {
            setUser({
                ...user,
                daySelects
            });
        }


    };

    const payNow = async () => {
        let category = user.registrationCategory === "Full Conference" ? "earlyBird" : "earlyOneDay"

        let registrationFee = registrationCharges?.filter(elm => elm?.registrationTypes?.includes(user?.registrationType))[0]?.[category]
        let accompanyPersonFee = registrationCharges?.filter(elm => elm?.registrationTypes?.includes("Accompanying Person"))[0]?.[category]

        if (category === "earlyOneDay") {
            registrationFee = registrationFee * user.daySelects.length
            accompanyPersonFee = accompanyPersonFee * user.daySelects.length
        }



        let total = parseInt(registrationFee) + parseInt(user?.accompanyPerson?.firstName ? accompanyPersonFee : 0) - parseInt(coupon?.price || 0)

        console.log(total)
        if (total <= 0) total = 0
        if (total > 0) {
            setPaymentLoader(true)
            await handlePayment({
                amount: total,
                email: user?.email || user?.secondaryMail,
                mobile: user?.mobile,
                firstName: user?.firstName,
                lastName: user?.lastName,
                coupon
            },
                setPaymentLoader,
                setFormState,
                setSearchParams,
                navigate
            )
            setPaymentLoader(false)
        }
        else {
            let response = await handleZeroPayment({
                couponCode: coupon?.code
            })
            if (response.status === 200) {
                handleNext()
            }
        }

    }

    const handleEditProfile = () => {
        setFormState(1)
        setSearchParams(params => {
            params.set("formState", 1)
        })
    }

    const getPrice = () => {
        let category = user.registrationCategory === "Full Conference" ? "earlyBird" : "earlyOneDay"

        let registrationFee = registrationCharges?.filter(elm => elm?.registrationTypes?.includes(user?.registrationType))[0]?.[category]
        let accompanyPersonFee = registrationCharges?.filter(elm => elm?.registrationTypes?.includes("Accompanying Person"))[0]?.[category]


        if (category === "earlyOneDay") {
            registrationFee = registrationFee * user.daySelects.length
            accompanyPersonFee = accompanyPersonFee * user.daySelects.length
        }



        let total = parseInt(registrationFee) + parseInt(user?.accompanyPerson?.firstName ? accompanyPersonFee : 0) - parseInt(coupon?.price || 0)
        if (total <= 0) total = 0

        return `${total} ${user?.accompanyPerson?.firstName ? `(${parseInt(registrationFee)}+${accompanyPersonFee})` : ''}`

    }

    const handleContinueToPayment = async () => {
        const { email, secondaryMail } = user
        if (!email && !secondaryMail) {
            alert("Email is mandatory")
            window.scrollTo({ top: 0 })
            setShowInputError(true)
            return
        }
        const { firstName, affiliation, designation, gender, registrationType, registrationCategory, isDissable } = user
        if (!firstName ||
            !affiliation ||
            !gender ||
            !registrationType ||
            !registrationCategory ||
            !designation ||
            !date["dob-day"] ||
            !isDissable) {
            // console.log(user)
            alert("Please fill all the mandatory fields")
            window.scrollTo({ top: 0 })
            setShowInputError(true)
            return
        }

        if (user.registrationCategory === "One day Conference" && user.daySelects.length === 0) {
            alert("Please select atleast one date when selecting One day Conference")
            return
        }
        // console.log(user)
        setLoading(true)
        let response = await saveUserDetails({
            ...user,
            dob: `${date["dob-year"]}-${date["dob-month"]}-${date["dob-day"]}`,
            secondaryMobile: user?.secondaryMobile === "" ? "" : !user?.secondaryMobile?.startsWith("+91") ? "+91" + user?.secondaryMobile : user?.secondaryMobile
        }, setShowInputError)
        setLoading(false)
        if (response.status === 200) {
            dispatch(setProfile(response.data.data))
            setUser({
                ...user,
                ...response.data.data
            })
            handleNext()
        }
    }

    const CloseBtn = styled("button")({
        padding: 0,
        border: 'none',
        background: 'none',
        cursor: 'pointer'
    })

    return (
        <Component>
            <Backdrop open={loading}>
                <CircularProgress />
            </Backdrop>
            <Backdrop open={paymentLoader}>
                <PaymentLoading />
            </Backdrop>
            {
                formState === 0 ?
                    <div>
                        ALL THE LOGIC FOR NEW REGISTER
                    </div> :
                    <Container>
                        <ProgressBx>
                            {
                                formStates?.map((elm, inx) => (
                                    <>
                                        <StateBx aria-hidden="true">
                                            {formState > inx ? <img alt="" aria-hidden="true" src={activityDone} /> : <Circle aria-hidden="true" style={{
                                                background: inx === formState ? "#2180E4" : "#fff",
                                                border: inx === formState ? "2px solid #2180E4" : "2px solid #4b5563",
                                                color: inx === formState ? "#fff" : "#4b5563"
                                            }}>
                                                {elm.index}
                                            </Circle>}
                                            <StatusTxt aria-hidden="true" style={{
                                                color: formState > inx ? "#4b5563" : formState === inx ? "#000" : "#4b5563"
                                            }}>{elm.type}</StatusTxt>
                                        </StateBx>
                                        {
                                            inx !== formStates.length - 1 &&
                                            <div>
                                                <img alt="" src={formState > inx ? progressLineFilled : progressLine} />
                                            </div>

                                        }
                                    </>

                                ))
                            }
                        </ProgressBx>
                        <Content>
                            {
                                formState === 1 ?
                                    <Form>
                                        <TopCont>
                                            <PersonalInfo>
                                                <H2>Personal Info</H2>
                                                <InputField
                                                    label="First Name"
                                                    placeholder="Enter your first name"
                                                    mandatory
                                                    name="firstName"
                                                    value={user?.firstName}
                                                    handleChange={handleChange}
                                                    error={user?.firstName?.length === 0}
                                                    errorTxt="firstname cannot be empty"
                                                    showInputError={showInputError}
                                                />
                                                <InputField
                                                    label="Last Name"
                                                    placeholder="Enter your last name"
                                                    name="lastName"
                                                    value={user?.lastName}
                                                    handleChange={handleChange}
                                                />
                                                {user?.email &&
                                                    <>
                                                        <InputField
                                                            label="Email"
                                                            // placeholder="Enter affiliation type"
                                                            // bottmText="(e.g., company, university)"
                                                            mandatory
                                                            name="email"
                                                            value={user?.email}
                                                            handleChange={handleChange}
                                                            disabled={true}
                                                        />
                                                        <InputField
                                                            label="Mobile"
                                                            placeholder="Enter Mobile Number"
                                                            // bottmText="(e.g., company, university)"
                                                            // mandatory
                                                            prefix="+91"
                                                            name="secondaryMobile"
                                                            error={!user?.secondaryMobile && !isValidEmail(user?.secondaryMobile) && !user?.secondaryMobile}
                                                            value={user?.secondaryMobile}
                                                            handleChange={handleChange}
                                                            errorTxt="please enter a valid Mobile Number"
                                                            showInputError={showInputError}
                                                        />

                                                    </>}
                                                {user?.mobile &&
                                                    <>
                                                        <InputField
                                                            label="Mobile"
                                                            // placeholder="Enter affiliation type"
                                                            // bottmText="(e.g., company, university)"
                                                            mandatory
                                                            name="mobile"
                                                            value={user?.mobile}
                                                            handleChange={handleChange}
                                                            disabled={true}
                                                        />
                                                        <InputField
                                                            label="Email"
                                                            placeholder="Enter your Email"
                                                            // bottmText="(e.g., company, university)"
                                                            mandatory
                                                            name="secondaryMail"
                                                            value={user?.secondaryMail?.startsWith("+91") ? user?.secondaryMail?.split("+91")[1] : user?.secondaryMail}
                                                            handleChange={handleChange}
                                                            error={!user?.secondaryMail && !isValidEmail(user?.secondaryMail) && !user?.email}
                                                            errorTxt="please enter a valid email"
                                                            showInputError={showInputError}
                                                        />
                                                    </>

                                                }
                                                <InputField
                                                    label="Organization"
                                                    placeholder="Enter your Organization (example company, university)"
                                                    mandatory
                                                    name="affiliation"
                                                    value={user?.affiliation}
                                                    handleChange={handleChange}
                                                    error={user?.affiliation.length === 0}
                                                    errorTxt="Organization cannot be empty"
                                                    showInputError={showInputError}
                                                />
                                                <InputField
                                                    label="Designation"
                                                    placeholder="Enter your designation"
                                                    mandatory
                                                    name="designation"
                                                    value={user?.designation}
                                                    handleChange={handleChange}
                                                    error={user?.designation?.length === 0}
                                                    errorTxt="designation cannot be empty"
                                                    showInputError={showInputError}
                                                />
                                                <div className="main">
                                                    <label className="dob-label" aria-hidden="true" id="genderGroupLabel">Gender <span>*</span></label>
                                                    <div className="dob-row" role="group" aria-labelledby="genderGroupLabel">
                                                        <select
                                                            className="select"
                                                            value={user?.gender}
                                                            onChange={handleChange}
                                                            name="gender"
                                                        >
                                                            <option value="">Gender</option>
                                                            {
                                                                genders?.map(elm => (
                                                                    <option onChange={handleChange} key={elm} value={elm}>{elm}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <BottomTxt style={{
                                                        color: !user?.gender ? "#DC3545" : null,
                                                        fontSize: 12,
                                                        fontWeight: 400
                                                    }}>{(!user?.gender && showInputError) ? "Gender is mandatory" : ""} <span style={{
                                                        color: '#000'
                                                    }}></span></BottomTxt>
                                                </div>
                                                {
                                                    user?.gender === "Others" && <InputField
                                                        placeholder="Enter your gender identity"
                                                        value={user.genderOther}
                                                        label="Enter Gender Identity"
                                                        name="genderOther"
                                                        handleChange={handleChange}
                                                    />
                                                }
                                                {/* <InputField 
                                    label="Date of Birth (DOB)" 
                                    placeholder="Enter your designation"
                                    name="dob"
                                    value={user?.dob}
                                    mandatory={true}
                                    handleChange={handleChange}
                                    error={user?.dob?.length === 0}
                                    errorTxt="date of birth cannot be empty"
                                    type="date"
                                    showInputError={showInputError}
                                    max={new Date().toISOString().split('T')[0]}
                                /> */}
                                                <div className="main">
                                                    <label className="dob-label" id="dobGroupLabel" aria-label="Select Date of Birth. Year Month Day">Select Date of Birth <span>*</span></label>
                                                    <div className="dob-row" role="group" aria-labelledby="dobGroupLabel">

                                                        <div className="dob-group">
                                                            <label for="dob-year"></label>
                                                            <select id="dob-year" name="dob-year" value={date["dob-year"]} onChange={handleChangeDate}>
                                                                <option value="">Year</option>
                                                                {
                                                                    Array.from({ length: 2024 - 1900 + 1 }, (_, i) => 2024 - i).map((y) => (
                                                                        <option key={y} value={y}>{y}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>

                                                        <div className="dob-group">
                                                            <label for="dob-month"></label>
                                                            <select id="dob-month" name="dob-month" value={date["dob-month"]} onChange={handleChangeDate}>
                                                                <option value="">Month</option>
                                                                <option value="1">January</option>
                                                                <option value="2">February</option>
                                                                <option value="3">March</option>
                                                                <option value="4">April</option>
                                                                <option value="5">May</option>
                                                                <option value="6">June</option>
                                                                <option value="7">July</option>
                                                                <option value="8">August</option>
                                                                <option value="9">September</option>
                                                                <option value="10">October</option>
                                                                <option value="11">November</option>
                                                                <option value="12">December</option>
                                                            </select>
                                                        </div>

                                                        <div className="dob-group">
                                                            <label for="dob-day"></label>
                                                            <select id="dob-day" name="dob-day" value={date["dob-day"]} onChange={handleChangeDate}>
                                                                <option value="">Day</option>
                                                                {
                                                                    Array.from({ length: isLeapYear(date["dob-year"]) ? dayLimitsLeap[date["dob-month"]] : dayLimitsNorm[date["dob-month"]] }, (_, i) => i + 1).map((day) => (
                                                                        <option key={day} value={day}>{day}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>



                                                    </div>
                                                    <BottomTxt style={{
                                                        color: !date["dob-day"] ? "#DC3545" : null,
                                                        fontSize: 12,
                                                        fontWeight: 400
                                                    }}>{(!date["dob-day"] && showInputError) ? "Date of Birth is mandatory" : ""} <span style={{
                                                        color: '#000'
                                                    }}></span></BottomTxt>
                                                </div>



                                                <DissabilityCheck>
                                                    <DissabilityCheckTxt> Do you identify yourself as a person with disability? <span>*</span></DissabilityCheckTxt>
                                                    <RadioBx>
                                                        <Rad>
                                                            <Radio
                                                                id="disable-yes"
                                                                onClick={() => setUser({
                                                                    ...user,
                                                                    isDissable: "yes",
                                                                    registrationType: user?.registrationType === "Delegate" || user?.registrationType === "" ? "Person with Disability" : user?.registrationType
                                                                })}
                                                                name="isDissable"
                                                                value={"yes"}
                                                                checked={user?.isDissable === "yes"}
                                                            />
                                                            <label htmlFor="disable-yes">Yes</label>

                                                        </Rad>
                                                        <Rad>
                                                            <Radio
                                                                id="disable-no"
                                                                onClick={() => {
                                                                    setAccompanyUser(initialAccompanyPersonValues)
                                                                    setHaveAccompanyPerson(false)
                                                                    setUser({
                                                                        ...user,
                                                                        accompanyPerson: null,
                                                                        isDissable: "no",
                                                                        registrationType: user?.registrationType === "Person with Disability" ? "" : user?.registrationType
                                                                    })
                                                                }

                                                                }
                                                                name="isDissable"
                                                                value={"no"}
                                                                checked={user?.isDissable === "no"}
                                                            />
                                                            <label htmlFor="disable-no">No</label>
                                                        </Rad>
                                                        <Rad>
                                                            <Radio
                                                                id="disable-prefer-not-to-say"
                                                                onClick={() => setUser({
                                                                    ...user,
                                                                    isDissable: "prefer not to say",
                                                                    registrationType: user?.registrationType === "Person with Disability" ? "Delegate" : user?.registrationType
                                                                })}
                                                                name="isDissable"
                                                                value={"prefer not to say"}
                                                                checked={user?.isDissable === "prefer not to say"}
                                                            />
                                                            <label htmlFor="disable-prefer-not-to-say">Prefer not to say</label>
                                                        </Rad>
                                                    </RadioBx>
                                                    <BottomTxt style={{
                                                        color: !user?.isDissable ? "#DC3545" : null,
                                                        fontSize: 12,
                                                        marginTop: -4,
                                                        fontWeight: 400
                                                    }}>{(!user?.isDissable && showInputError) ? "Mandatory field" : ""} <span style={{
                                                        color: '#000'
                                                    }}></span></BottomTxt>
                                                </DissabilityCheck>

                                                {
                                                    user?.isDissable === "yes" &&
                                                    <div className="main">
                                                        <label className="dob-label" id="disabilitiesGroupLabel">
                                                            Please select type(s) of disabilities (check all that apply)
                                                        </label>
                                                        <div className="dob-row" role="group" aria-labelledby="disabilitiesGroupLabel">
                                                            {
                                                                isMobile ? (
                                                                    <select
                                                                        className="select"
                                                                        multiple
                                                                        value={user?.dissabilities || []}
                                                                        onChange={(e) => {
                                                                            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                                                            setUser((prev) => ({
                                                                                ...prev,
                                                                                dissabilities: selectedOptions
                                                                            }));
                                                                        }}
                                                                        name="dissabilities"
                                                                    >
                                                                        {
                                                                            dissabilityList?.map(elm => (
                                                                                <option key={elm} value={elm}>{elm}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                ) : (
                                                                    <Autocomplete
                                                                        multiple
                                                                        disableCloseOnSelect
                                                                        options={dissabilityList || []}
                                                                        value={user?.dissabilities || []}
                                                                        open={dropdownOpen}
                                                                        onFocus={() => setDropdownOpen(true)}
                                                                        onOpen={() => setDropdownOpen(true)}
                                                                        onClose={() => setDropdownOpen(false)}
                                                                        onChange={(event, newValue) => {
                                                                            setUser((prev) => ({
                                                                                ...prev,
                                                                                dissabilities: newValue,
                                                                            }));
                                                                        }}
                                                                        renderOption={(props, option, { selected }) => {
                                                                            const { key, ...optionProps } = props;
                                                                            return (
                                                                                <li key={key} {...optionProps}>
                                                                                    <Checkbox
                                                                                        icon={icon}
                                                                                        checkedIcon={checkedIcon}
                                                                                        style={{ marginRight: 8 }}
                                                                                        checked={selected}
                                                                                    />
                                                                                    {option}
                                                                                </li>
                                                                            );
                                                                        }}
                                                                        style={{
                                                                            width: '100%',
                                                                            background: '#fff',
                                                                        }}
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                label="Select Disabilities"
                                                                                inputProps={{
                                                                                    ...params.inputProps,
                                                                                    readOnly: true
                                                                                }}
                                                                                InputProps={{
                                                                                    ...params.InputProps,
                                                                                    endAdornment: null,
                                                                                }}
                                                                            />
                                                                        )}
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                }

                                            </PersonalInfo>

                                            <ParticipationDetails>
                                                <H2>Participation Details</H2>

                                                <div className="main">
                                                    <label className="dob-label" aria-hidden={!user?.registrationCategory ? "true":"false"} id="RegistrationCatGroupLabel">Registration Type <span>*</span></label>
                                                    <div className="dob-row" role="group" aria-labelledby="RegistrationCatGroupLabel">
                                                        <select
                                                            className="select"
                                                            value={user?.registrationCategory}
                                                            onChange={handleChange}
                                                            name="registrationCategory"
                                                        >
                                                            <option value="">Select Registration Type</option>
                                                            {
                                                                registrationCategories?.map(elm => (
                                                                    <option onChange={handleChange} key={elm} value={elm}>{elm}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <BottomTxt style={{
                                                        color: !user?.registrationCategory ? "#DC3545" : null,
                                                        fontSize: 12,
                                                        fontWeight: 400
                                                    }}>{(!user.registrationCategory && showInputError) ? "Registration type is mandatory" : ""} <span style={{
                                                        color: '#000'
                                                    }}></span></BottomTxt>
                                                </div>
                                                {user?.registrationCategory === "One day Conference" && <ParticipationTypeBx>
                                                    <h4>Select Days <span>*</span></h4>
                                                    <Days>
                                                        {
                                                            daysAvailable?.map((day, inx) => (
                                                                <div style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <Checkbox aria-label={day} id={day} name={day} onClick={() => {
                                                                        handlePushDays(day)
                                                                    }} defaultChecked={user.daySelects.includes(day) ? true : false} />
                                                                    {/* <Day aria-hidden="true">
                                                                        <span aria-hidden="true">Day {inx + 1}</span>
                                                                        <p aria-hidden="true">{day}</p>
                                                                    </Day> */}
                                                                    <label htmlFor={day}>{day} - Day {inx + 1}</label>
                                                                </div>
                                                            ))
                                                        }
                                                    </Days>


                                                </ParticipationTypeBx>}
                                                <div className="main">
                                                    <label className="dob-label" aria-hidden={!user?.registrationType ? "true":"false"} id="RegistrationTypeGroupLabel">Registration Category <span>*</span></label>
                                                    <div className="dob-row" role="group" aria-labelledby="RegistrationTypeGroupLabel">
                                                        <select
                                                            className="select"
                                                            value={user?.registrationType}
                                                            onChange={handleChange}
                                                            name="registrationType"
                                                        >
                                                            <option value="">Select Registration Category</option>
                                                            {
                                                                typeOfRegistrations?.map(elm => (
                                                                    <option onChange={handleChange} key={elm} value={elm}>{elm}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <BottomTxt style={{
                                                        color: !user?.registrationType ? "#DC3545" : null,
                                                        fontSize: 12,
                                                        fontWeight: 400
                                                    }}>{(!user.registrationType && showInputError) ? "Registration category is mandatory" : ""} <span style={{
                                                        color: '#000'
                                                    }}></span></BottomTxt>
                                                </div>
                                                {user?.isDissable === "yes" && <AccompanyPerson title="Accompany person details">
                                                    {user?.isDissable && !user?.accompanyPerson?.firstName && <TermBx>
                                                        <h3 aria-hidden="true">Caregiver/Assistant Accompaniment</h3>
                                                        {/* <p>Only if you're attending with a caregiver or assistant.</p> */}
                                                        {!openAccompanyPerson && <button onClick={() => setOpenAccompanyPerson(true)}>Add accompanying Person</button>}
                                                    </TermBx>}

                                                    {openAccompanyPerson && <AccompanyForm tabIndex={2}>
                                                        <form>
                                                            <InputField
                                                                label="Accompany Person First Name"
                                                                placeholder="Enter the first name of accompany person"
                                                                mandatory
                                                                name="firstName"
                                                                value={accompanyUser?.firstName}
                                                                handleChange={handleChangeAccompany}
                                                                error={accompanyUser?.firstName?.length === 0}
                                                                errorTxt="First name cannot be empty"
                                                            // onChange={(e) => handleChangeAccompany(e.target.name, e.target.value)}
                                                            />
                                                            <InputField
                                                                label="Accompany Person Last Name"
                                                                placeholder="Enter the last name of accompany person"
                                                                name="lastName"
                                                                value={accompanyUser?.lastName}
                                                                handleChange={handleChangeAccompany}
                                                            // onChange={(e) => handleChangeAccompany(e.target.name, e.target.value)}
                                                            />
                                                            <InputField
                                                                label="Accompany person Mobile or Email"
                                                                placeholder="Enter Mobile or Email ID of accompany person"
                                                                mandatory
                                                                name="mobileOrEmail"
                                                                value={accompanyUser?.mobileOrEmail}
                                                                handleChange={handleChangeAccompany}
                                                            // onChange={(e) => handleChangeAccompany(e.target.name, e.target.value)}
                                                            />
                                                            <button type="submit" title="Add person" onClick={(e) => handleAddAccompanyPerson(e)}>
                                                                {!updateAccompanyPerson && <img src={plusIcon} alt="" />}
                                                                <span>{updateAccompanyPerson ? "Update" : "Add"}</span>
                                                            </button>
                                                            <button style={{
                                                                marginTop: -10,
                                                                background: '#fff',
                                                                border: '2px solid #7f2b0a',
                                                                color: "#7f2b0a"
                                                            }} type="submit" title="Close accompany form" onClick={(e) => {
                                                                setOpenAccompanyPerson(false);
                                                                setAccompanyUser(user?.accompanyPerson)
                                                                setUpdateAccompanyPerson(false)
                                                            }}>
                                                                <span>Close</span>
                                                            </button>
                                                        </form>
                                                    </AccompanyForm>}
                                                </AccompanyPerson>}
                                                {user?.accompanyPerson?.firstName && <AccompanyDetails>
                                                    <Details>
                                                        <p>{user?.accompanyPerson?.firstName} {user?.accompanyPerson?.lastName}</p>
                                                        <p><label>{user?.accompanyPerson?.mobileOrEmail || user?.accompanyPerson?.mobile || user?.accompanyPerson?.email}</label></p>
                                                    </Details>
                                                    <Actions>
                                                        <button onClick={() => {
                                                            setOpenAccompanyPerson(true)
                                                            setUpdateAccompanyPerson(true)
                                                            setAccompanyUser({
                                                                firstName: user?.accompanyPerson?.firstName,
                                                                lastName: user?.accompanyPerson?.lastName,
                                                                mobileOrEmail: user?.accompanyPerson?.email || user?.accompanyPerson?.mobile?.split("+91")[1]
                                                            })
                                                        }}><img alt="edit accompany details" src={editIcon} /></button>
                                                        <button onClick={() => {
                                                            setAccompanyUser(initialAccompanyPersonValues)
                                                            setHaveAccompanyPerson(false)
                                                            setUser({
                                                                ...user,
                                                                accompanyPerson: null
                                                            })
                                                        }} ><img alt="delete accompany details" src={deleteIcon} /></button>
                                                    </Actions>
                                                </AccompanyDetails>}
                                                <UploadPhotoBx>
                                                    {
                                                        uploading ?
                                                            <CircularProgress /> :
                                                            <UploadImg aria-hidden="true" src={user?.photoUrl} alt="upload_photo" />

                                                    }
                                                    <DetailsBx>
                                                        <PhotoName>{user?.photoUrl?.split("-")[2] || photoName}
                                                            {user?.photoUrl !== uploadPhoto && <CloseBtn title="remove photo" onClick={() => {
                                                                setUser({
                                                                    ...user,
                                                                    photoUrl: uploadPhoto,
                                                                })
                                                                setPhotoName("No photo choosen")
                                                            }}><img alt="" src={closeIcon} /></CloseBtn>}
                                                        </PhotoName>
                                                        <PhotoLimit style={{
                                                            color: fileSizeErr ? "#DC3545" : "#4b5563"
                                                        }}>
                                                            {
                                                                fileSizeErr ?
                                                                    "File size exceeded | Max size: 2MB" :
                                                                    "File accepted: JPG, PNG | Max size: 2MB"
                                                            }

                                                        </PhotoLimit>

                                                        <ChoosePhotoBtn htmlFor="upload-photo" role="button" tabIndex="0">
                                                            <img aria-hidden="true" src={uploadIcon} alt="upload_icon" />
                                                            Choose photo
                                                        </ChoosePhotoBtn>

                                                    </DetailsBx>
                                                    <input
                                                        style={{ display: 'none' }}
                                                        id="upload-photo"
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        accept=".jpg,.png,.jpeg"
                                                    />
                                                </UploadPhotoBx>
                                                <InputField
                                                    label="LinkedIn / Website"
                                                    placeholder="Enter LinkedIn profile URL / Website"
                                                    name="linkedIn"
                                                    value={user?.linkedIn}
                                                    handleChange={handleChange}
                                                    error={user?.linkedIn && !isLinkedInUrl(user?.linkedIn)}
                                                    errorTxt="invalid linkedIn url or website"
                                                    showInputError={showInputError}
                                                />

                                                <label style={{
                                                    color: 'var(--Color-Heading, #1C1C1C)',
                                                    fontFamily: 'Poppins',
                                                    fontSize: 14,
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    lineHeight: '150%',
                                                    marginTop: -14
                                                }}>Share your LinkedIn or personal profile page to help others connect with you.</label>


                                                {user?.registrationType && <FeeBx>
                                                    <h2>Registration Fee Summary</h2>
                                                    <Summery>
                                                        <img aria-hidden="true" alt="circle_check" src={circleCheckIcon} />
                                                        <div>
                                                            <h3 style={{
                                                                lineHeight: '150%'
                                                            }}>{user?.registrationType}</h3>
                                                            <p style={{
                                                                fontWeight: 500,
                                                                lineHeight: '120%'
                                                            }}>Fee:  <span>₹ </span>{getPrice()}</p>
                                                            <p style={{
                                                                lineHeight: '150%',
                                                                fontWeight: 400
                                                            }} >{user?.registrationCategory}</p>
                                                            <label>Inclusive of GST and all applicable taxes</label>
                                                        </div>
                                                    </Summery>
                                                </FeeBx>}
                                                {/* {user?.isDissable==="yes" && <DisabilityCertificate>
                                    <p>Upload Disability Certificate</p>
                                    <FileChoose style={{
                                        border: showInputError&&user?.participationType==="Person with Disability"&&!user?.dissabilityCertificate ? "1px solid #E60D0D" : "1px solid var(--Color-Neutral-400, #D1D5DB)"
                                    }}>
                                        <label htmlFor="disability_cert">Choose file</label>
                                        <span>{user?.dissabilityCertificate?.split("-")[2] || disabilityCertificate}</span>
                                        {user?.dissabilityCertificate && <CloseBtn title="remove file" onClick={() => {
                                            setUser({
                                                ...user,
                                                dissabilityCertificate: null
                                            })
                                            setDisabilityCertificate("No file choosen")
                                        }}><img alt="" src={closeIcon} /></CloseBtn>}
                                    </FileChoose>
                                        {
                                            showInputError&&user?.participationType==="Person with Disability"&&!user?.dissabilityCertificate && <label style={{
                                                color: "#E60D0D"
                                            }}>dissability certificate is mandatory</label>
                                        }
                                    <label style={{
                                        color: disabilityCertificateSizeErr ? "#E60D0D" : "#4A4A4A"
                                    }}>
                                        
                                        {
                                            disabilityCertificateSizeErr ? "File size exceeded | Max size: 2MB" : 
                                            "File accepted: PDF, JPG, PNG | Max size: 2MB"
                                        }
                                    </label>
                                    <input 
                                        style={{
                                            display: 'none'
                                        }}
                                        type="file" 
                                        id="disability_cert" 
                                        accept=".pdf,.jpg,.png"
                                        onChange={(e) => handleChangeDissabilityCertificate(e)}
                                    />
                                </DisabilityCertificate>} */}

                                            </ParticipationDetails>
                                        </TopCont>
                                        <BottomCont>
                                            <button title="save and exit" onClick={() => handleSave()}>Save & Exit</button>
                                            <button title="continue" onClick={() => handleContinueToPayment()}>Continue</button>
                                        </BottomCont>
                                    </Form> :
                                    formState === 2 ?
                                        <Review>
                                            <TopCont>
                                                <PersonalInfo>
                                                    <ReviewHead>
                                                        <H1>Registration Details</H1>
                                                        <button title="edit profile" onClick={() => handleEditProfile()}>Edit</button>
                                                    </ReviewHead>
                                                    <ReviewBx>
                                                        <H2>Personal Info</H2>
                                                        <div>
                                                            <Attr>First Name</Attr>
                                                            <Value>{user?.firstName}</Value>
                                                        </div>
                                                        <div>
                                                            <Attr>Last Name</Attr>
                                                            <Value>{user?.lastName}</Value>
                                                        </div>
                                                        {(user?.email || user?.secondaryMail) && <div>
                                                            <Attr>Email</Attr>
                                                            <Value>{user?.email || user?.secondaryMail}</Value>
                                                        </div>}
                                                        {(user?.mobile || user?.secondaryMobile) && <div>
                                                            <Attr>Phone</Attr>
                                                            <Value>{user?.mobile || user?.secondaryMobile}</Value>
                                                        </div>}
                                                        {user?.affiliation && <div>
                                                            <Attr>Organization</Attr>
                                                            <Value>{user?.affiliation}</Value>
                                                        </div>}
                                                        <div>
                                                            <Value>Profile Photo</Value>
                                                            <img width={56} height={56} src={user?.photoUrl} alt="" />
                                                        </div>
                                                        <div>
                                                            <Attr>Designation</Attr>
                                                            <Value>{user?.designation}</Value>
                                                        </div>
                                                        {user?.gender && <div>
                                                            <Attr>Gender</Attr>
                                                            <Value>{user?.gender} {user?.gender === "Others" ? `(${user?.genderOther})` : ""}</Value>
                                                        </div>}
                                                        {user?.dob && <div>
                                                            <Attr>Date of Birth</Attr>
                                                            <Value>{user?.dob}</Value>
                                                        </div>}
                                                        <H2>Participation Details</H2>
                                                        {/* <div>
                                            <Attr>Participation Type</Attr>
                                            <Value>{user?.participationType}</Value>
                                        </div> */}
                                                        <div>
                                                            <Attr>Registration Category</Attr>
                                                            <Value>{user?.registrationType}</Value>
                                                        </div>
                                                        <div>
                                                            <Attr>Registration Type</Attr>
                                                            <Value>{user?.registrationCategory}</Value>
                                                        </div>
                                                        {user?.registrationCategory === "One day Conference" && <div>
                                                            <Attr>Days</Attr>
                                                            <Value>{user?.daySelects?.join(", ")}</Value>
                                                        </div>}
                                                        {user?.accompanyPerson?.firstName && <div>
                                                            <Attr>Accompany Person Name</Attr>
                                                            <Value>{user?.accompanyPerson?.firstName} {user?.accompanyPerson?.lastName}</Value>
                                                        </div>}
                                                        {(user?.accompanyPerson?.email || user?.accompanyPerson?.mobile) && <div>
                                                            <Attr>Accompany Person Contact Information</Attr>
                                                            <Value>{user?.accompanyPerson?.email || user?.accompanyPerson?.mobile}</Value>
                                                        </div>}
                                                        {user?.linkedIn && <div>
                                                            <Attr>LinkedIn / Website</Attr>
                                                            <Value>{user?.linkedIn}</Value>
                                                        </div>}
                                                    </ReviewBx>
                                                </PersonalInfo>
                                                <ParticipationDetails style={{
                                                    marginTop: 60
                                                }}>
                                                    <CouponBx>
                                                        <H2>Apply coupon</H2>
                                                        <CouponInput style={{
                                                            border: couponError ? "1px solid var(--Color-Alert-Red, #DC3545)" : "1px solid var(--Color-Primary-400, #4996E9)"
                                                        }}>
                                                            <input ref={couponRef} placeholder="Enter your coupon code" />
                                                            <button title="Apply coupon" onClick={handleApplyCoupon}>Apply</button>
                                                        </CouponInput>
                                                        <span style={{
                                                            color: "#DC3545",
                                                            marginTop: -8
                                                        }}>{couponError}</span>
                                                        {coupon && <CouponInput style={{
                                                            border: "1px solid var(--Color-Neutral-500, #D1D5DB)",
                                                            flexDirection: 'column'
                                                        }}>
                                                            <Applied>
                                                                <p> 🏷️  {coupon?.code}</p>
                                                                <button title="remove coupon" onClick={removeCoupon}>Remove</button>
                                                            </Applied>
                                                            <Divider
                                                                orientation="horizontal"
                                                                sx={{
                                                                    borderBottom: '1px dashed rgba(0, 0, 0, 0.12)', // customize the color if needed
                                                                }}
                                                            />
                                                            <Validity>
                                                                <p>Valid till: {coupon?.validTill}</p>
                                                                <label><span>₹</span>{coupon?.price} off on Registration</label>
                                                            </Validity>
                                                        </CouponInput>}
                                                    </CouponBx>
                                                    <CouponBx>
                                                        <H2>Price Summary</H2>
                                                        <PriceBx user={user} haveAccompanyPerson={user?.accompanyPerson?.firstName} coupon={coupon} />
                                                    </CouponBx>
                                                    <PayBtn onClick={payNow} >Pay Now</PayBtn>
                                                </ParticipationDetails>
                                            </TopCont>
                                        </Review> :
                                        <Payment>
                                            <PaymentReceipt
                                                setFormState={setFormState}
                                                setSearchParams={setSearchParams}

                                            />
                                        </Payment>
                            }
                        </Content>

                    </Container>
            }

        </Component>

    )


}



export default Register


