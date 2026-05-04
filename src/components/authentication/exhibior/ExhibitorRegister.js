import { Backdrop, CircularProgress, Divider, styled } from "@mui/material"
import { useEffect, useRef, useState } from "react"

import uploadPhoto from "../../../assets/uploadPhoto.png"
import progressLine from '../../../assets/progressLine.svg'
import progressLineFilled from '../../../assets/progressLineFilled.svg'
import activityDone from '../../../assets/activityDone.svg'
import { useNavigate, useSearchParams } from "react-router-dom"
import uploadIcon from "../../../assets/uploadIcon.svg"
import { exhibitTypes } from "./../utils/utils"
import { fetchCouponExhibitor, getExhibitorProfile, saveExhibitorData, uploadFile, handleZeroPaymentExhibitor } from "../../../services/api"
import { useDispatch } from "react-redux"
import { setExhibitorProfile } from "../../../redux/userSlice"
import { handlePaymentExhibitor } from "../../../razorpay/razorpay"
import PaymentLoading from "../../../razorpay/PaymentLoading"
import { exhibitPlans } from "../../exhibit/data"
import '../dob.css'
import ExhibitorPaymentReceipt from "../../../razorpay/ExhibitorPaymentReceipt"
import leftIcon from '../../../assets/leftBack.svg'
import closeIcon from '../../../assets/close.svg'


const baseUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_REMOTE_URL


const isLinkedInUrl = (url) => {
    return /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_%]+\/?$/.test(url)
}

const formStates = [
    {
        type: "Account",
        index: 1
    },
    {
        type: "Organization",
        index: 2
    },
    {
        type: "Participant",
        index: 3
    },
    {
        type: "Review",
        index: 4
    },
    {
        type: "Payment",
        index: 5
    }
]

const Component = styled("div")({
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
    color: 'var(--Color-Body-text, #4A4A4A)',
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
    color: 'var(--Color-Body-text, #4A4A4A)',
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "120%",
    margin: 0
})

const PersonalInfo = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 24,
    width: 400,
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        padding: 10,
        boxSizing: 'border-box'
    }
}))

const ParticipationDetails = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    minWidth: 400,
    gap: 24,
    [theme.breakpoints.down("sm")]: {
        padding: 10,
        boxSizing: 'border-box'
    }
}))

const BillingDetails = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    minWidth: 400,
    gap: 24,
    [theme.breakpoints.down("sm")]: {
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    gap: 80,
    [theme.breakpoints.down("sm")]: {
        flexDirection: 'column',
        gap: 24
    }
}))

const StallDetails = styled('div')(({ theme }) => ({
    background: "#F2F7FF",
    borderRadius: 8,
    padding: 16,
    boxSizing: 'border-box',
    marginTop: 34,
    fontFamily: 'Poppins',
    '&>h3': {
        color: '#000',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: '120%'
    },
    '&>p': {
        color: '#000',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '150%'
    }
}))

const BackBtn = styled('button')({
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    padding: "4px 8px",
    marginBottom: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: '120%',
    background: 'none',
    border: 'none',
    '&>img': {
        '&:hover': {
            fill: "#1970CD"
        }
    },
    '&:hover': {
        color: "#1970CD",
        cursor: "pointer"
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
    width: 200,
    wordWrap: 'break-word',
    lineHeight: '120%', /* 19.2px */
    "&>span": {
        color: "#E60D0D"
    }
})

const PhotoLimit = styled('p')({
    margin: 0,
    color: "var(--Color-Body-text, #4A4A4A)",
    fontFamily: "Poppins",
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '120%' /* 14.4px */
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
    '&>p': {
        color: "var(--Color-Black, #000)",
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


const AccompanyPerson = styled('div')({
    display: 'flex',
    alignItems: 'center',
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
    'label': {
        color: "var(--Color-Heading, #1C1C1C)",
        fontFamily: "Poppins",
        margin: 0,
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "120%" /* 19.2px */
    },
    '&>p': {
        color: "var(--Color-Body-text, #4A4A4A)",
        fontFamily: "Poppins",
        fontSize: 12,
        margin: 0,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "120%"
    }
})

const DisabilityCertificate = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    '&>p': {
        color: "var(--Color-Heading, #1C1C1C)",
        fontFamily: "Poppins",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "120%",
        margin: 0,
        "&>span": {
            color: "#E60D0D"
        }
    },
    '&>label': {
        color: "var(--Color-Body-text, #4A4A4A)",
        fontFamily: "Poppins",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "120%",
        marginTop: 4
    }
})

const FileChoose = styled('div')({
    marginTop: 8,
    borderRadius: 4,
    border: "1px solid var(--Color-Neutral-400, #D1D5DB)",
    background: "var(--Color-White, #FFF)",
    display: 'flex',
    gap: 8,
    padding: "8px 16px",
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    '&>label': {
        display: "flex",
        height: 32,
        padding: "4px 12px",
        boxSizing: 'border-box',
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 4,
        background: "var(--Color-Primary-500, #2180E4)",
        color: "var(--Color-White, #FFF)",
        fontFamily: "Poppins",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "120%",
        border: 'none',
        cursor: 'pointer'
    }
})



const Row = styled("div")({
    display: 'flex',
    gap: 24
})




const Review = styled('div')({

})

const Payment = styled('div')({

})

const initialValues = {
    boothType: "",
    organizationDetails: {
        organizationName: "",
        exhibitType: "",
        website: "",
        description: ""
    },
    primaryContactDetails: {
        fullName: "",
        designation: "",
        email: "",
        mobile: "",
        linkedInUrl: ""
    },
    brandingDetails: {
        companyLogo: uploadPhoto,
        promotionalMaterial: "",
        socialMedia: ""
    },
    specialRequests: {
        accessibilityNeeds: "",
        exhibitorShowcasePresentationRequest: false
    },
    billingDetails: {
        doorNo: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        gstNo: "",
        pincode: "",
        requireInvoice: false
    }
}





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
    width: '100%',
    boxSizing: 'border-box',
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        padding: 10,

    }

}))

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
    width: '100%',
    '&:hover': {
        opacity: 0.6
    }
})

const TextArea = styled("textarea")(({ theme }) => ({
    width: '100%',
    padding: '12px 16px',
    boxSizing: 'border-box',
    borderRadius: 4,
    border: "1px solid var(--Color-Neutral-500, #D1D5DB)",
    background: "#FFF",
    marginTop: 8,
    fontSize: 16,
    height: 100,
    resize: 'none',
    '&:hover': {
        border: "1px solid var(--Color-Primary-400, #4996E9)",
        boxShadow: "0px 0px 4px 0px rgba(58, 105, 163, 0.25)"
    },
    [theme.breakpoints.down("sm")]: {

    }
}))

const CharacterLimitBx = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: '150%'
})

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



const CloseBtn = styled("button")({
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer'
})




const TextAreaField = ({
    label,
    bottmText,
    placeholder,
    mandadory,
    name,
    value,
    handleChange,
    disabled,
    error,
    errorTxt,
    showInputError,
    type,
    max
}) => {
    return (
        <InputBx>
            <Label aria-hidden="true">{label}<span style={{
                color: "#DC3545",
                visibility: mandadory ? "visible" : "hidden"
            }}> *</span></Label>
            <TextArea style={{
                color: disabled ? "#ababab" : null,
                border: error && showInputError ? "1px solid #E76363" : "1px solid var(--Color-Neutral-500, #D1D5DB)"
            }}
                maxLength={max}

                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => handleChange(e)}
                disabled={disabled}
                type={type}


            />
            {
                max && <CharacterLimitBx>
                    <span>{`Maximum ${max} characters`}</span>
                    <span>{`${value?.length || 0} out of ${max}`}</span>

                </CharacterLimitBx>
            }
            <BottomTxt style={{
                color: error ? "#DC3545" : null
            }}>{(error && showInputError) ? errorTxt : ""} <span style={{
                color: '#000'
            }}>{bottmText}</span></BottomTxt>
        </InputBx>
    )
}

const InputField = ({
    label,
    bottmText,
    placeholder,
    mandadory,
    name,
    value,
    handleChange,
    disabled,
    error,
    errorTxt,
    showInputError,
    type,
    max
}) => {
    return (
        <InputBx>
            <Label aria-hidden="true">{label}<span style={{
                color: "#DC3545",
                visibility: mandadory ? "visible" : "hidden"
            }}> *</span></Label>
            <Input style={{
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
    selectedStall,
    coupon
}) => {


    let total = selectedStall?.earlyBirdRegistrationPrice
    if (coupon?.price) total = selectedStall?.earlyBirdRegistrationPrice - coupon?.price


    return (
        <PriceCont>
            <div>
                <p>Booth Price</p>
                <label><span>₹</span> {selectedStall?.earlyBirdRegistrationPrice}</label>
            </div>
            {coupon && <div>
                <p>Coupon Discount</p>
                <label style={{
                    color: "#28A745"
                }}>-<span>₹</span> {coupon?.price}</label>
            </div>}
            <div>
                <p>Booth Type</p>
                <label>{selectedStall?.stallType} ({selectedStall?.stallSize})</label>
            </div>

            <label>Payment includes up to {selectedStall?.complimentaryRegistration} participants</label>
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
            <label>Inclusive of GST and all applicable taxes</label>

        </PriceCont>
    )
}





const isValidEmail = (input) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

const isValidPhone = (input) => {
    return /^(\+91)?\d{10}$/.test(input)
}

const ExhibitorRegister = () => {
    const [searchParams, setSearchParams] = useSearchParams()



    const [user, setUser] = useState(initialValues)
    const [fileSizeErr, setFileSizeErr] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [photoName, setPhotoName] = useState("Company Logo")
    const [disabilityCertificateSizeErr, setDisabilityCertificateSizeErr] = useState(null)
    const [showInputError, setShowInputError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [paymentLoader, setPaymentLoader] = useState(false)

    const formStateNum = searchParams.get("formState")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [coupon, setCoupon] = useState(null)
    const [couponError, setCouponError] = useState(null)
    const couponRef = useRef()

    const [formState, setFormState] = useState(parseInt(formStateNum) || 1)



    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    const handleOrganizationChange = (e) => {
        if (e.target.value.startsWith(" ")) return
        setUser({
            ...user,
            organizationDetails: {
                ...user.organizationDetails,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleApplyCoupon = async () => {
        let code = couponRef?.current?.value?.toLowerCase()
        let response = await fetchCouponExhibitor(code)
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

    const handleBrandingDetailsChange = (e) => {
        if (e.target.value.startsWith(" ")) return
        setUser({
            ...user,
            brandingDetails: {
                ...user.brandingDetails,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSpecialRequestChange = (e) => {
        if (e.target.value.startsWith(" ")) return
        setUser({
            ...user,
            specialRequests: {
                ...user.specialRequests,
                [e.target.name]: e.target.value
            }
        })
    }

    const handlePrimaryContactDetailsChange = (e) => {
        if (e.target.value.startsWith(" ")) return
        if (e.target.name === "fullName") {
            if (e.nativeEvent.data && e.nativeEvent.data >= '0' && e.nativeEvent.data <= '9') {
                return
            }
        }
        setUser({
            ...user,
            primaryContactDetails: {
                ...user.primaryContactDetails,
                [e.target.name]: e.target.value
            }
        })

    }

    const handleChangeBilling = (e) => {
        if (e.target.value.startsWith(" ")) return
        setUser({
            ...user,
            billingDetails: {
                ...user.billingDetails,
                [e.target.name]: e.target.value
            }
        })
    }



    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setPhotoName(file.name)
        if (file?.size > 2 * 1024 * 1024) {
            setFileSizeErr(true)
            setUser({
                ...user, brandingDetails: {
                    ...user.brandingDetails,
                    companyLogo: null
                }
            })
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
            setUser({
                ...user, brandingDetails: {
                    ...user.brandingDetails,
                    [event.target.name]: `${baseUrl}/uploads/${fileName}`
                }
            });
        }

    }





    const handleSave = async () => {
        const { boothType, organizationDetails, primaryContactDetails, brandingDetails, billingDetails, specialRequests } = user




        if (formState === 1) {
            // const { organizationName, exhibitType, website, description } = organizationDetails
            // const { fullName, designation, mobile, email, linkedInUrl } = primaryContactDetails
            // if (!boothType || !organizationName || !exhibitType || !website || !description || !fullName || !designation || !mobile || !email || !linkedInUrl) {
            //     // console.log(user)
            //     alert("please fill all the details")
            //     setShowInputError(true)
            //     return
            // }
            setLoading(true)
            let response = await saveExhibitorData({
                boothType,
                organizationDetails,
                primaryContactDetails: {
                    ...primaryContactDetails,
                    mobile: primaryContactDetails?.mobile?.startsWith("+91") ? primaryContactDetails?.mobile : "+91" + primaryContactDetails?.mobile
                }
            })
            setLoading(false)
            if (response.status === 200) {
                dispatch(setExhibitorProfile(response.data.data))
                setUser(response.data.data)
                navigate("/exhibit")
            }
        }
        else if (formState === 2) {
            // console.log(user)
            // const { promotionalMaterial } = brandingDetails
            // const { doorNo, addressLine1, city, state, pincode, gstNo } = billingDetails

            // if (!promotionalMaterial || !doorNo || !addressLine1 || !city || !state || !pincode || !gstNo) {
            //     // console.log(user)
            //     setShowInputError(true)
            //     alert("please fill all the details")
            //     return
            // }
            setLoading(true)
            let response = await saveExhibitorData({
                brandingDetails,
                specialRequests,
                billingDetails
            })
            setLoading(false)
            if (response.status === 200) {
                dispatch(setExhibitorProfile(response.data.data))
                setUser(response.data.data)
                navigate("/exhibit")
            }
        }
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






    const payNow = async (selectedStall, coupon) => {

        setPaymentLoader(true)
        let total = selectedStall?.earlyBirdRegistrationPrice
        if (coupon?.price) total = total - coupon?.price

        if(total <= 0) {
            let response = await handleZeroPaymentExhibitor({
                couponCode: coupon?.code
            })
            if (response.status === 200) {
                handleNext()
            }
        }
        else {
            await handlePaymentExhibitor({
                amount: total,
                email: user?.primaryContactDetails?.email,
                mobile: user?.primaryContactDetails?.mobile,
                fullName: user?.primaryContactDetails?.fullName,
                coupon
            },
                setPaymentLoader,
                setFormState,
                setSearchParams,
                navigate
            )
        }

        setPaymentLoader(false)

    }

    const handleEditProfile = () => {
        setFormState(1)
        setSearchParams(params => {
            params.set("formState", 1)

            return params
        })
    }

    const handleChangeAddress = () => {
        setFormState(2)
        setSearchParams(params => {
            params.set("formState", 2)

            return params
        })
    }

    const handleContinueToPayment = async () => {


        const { boothType, organizationDetails, primaryContactDetails, brandingDetails, billingDetails, specialRequests } = user




        if (formState === 1) {
            const { organizationName, exhibitType, website, description } = organizationDetails
            const { fullName, designation, mobile, email } = primaryContactDetails
            if (!boothType || !organizationName || !exhibitType || !website || !description || !fullName || !designation || !mobile || !email) {
                // console.log(user)
                alert("please fill all the details")
                // console.log(user)
                setShowInputError(true)
                return
            }
            setLoading(true)
            let response = await saveExhibitorData({
                boothType,
                organizationDetails,
                primaryContactDetails: {
                    ...primaryContactDetails,
                    mobile: primaryContactDetails?.mobile?.startsWith("+91") ? primaryContactDetails?.mobile : "+91" + primaryContactDetails?.mobile
                }
            })
            setLoading(false)
            if (response.status === 200) {
                dispatch(setExhibitorProfile(response.data.data))
                setUser(response.data.data)
                handleNext()
                window.scrollTo(0, 0)
            }
        }
        else if (formState === 2) {
            // console.log(user)
            const { companyLogo } = brandingDetails
            const { doorNo, addressLine1, city, state, pincode } = billingDetails

            if (!companyLogo || !doorNo || !addressLine1 || !city || !state || !pincode) {
                // console.log(user)
                setShowInputError(true)
                alert("please fill all the details")
                return
            }

            if (pincode?.length !== 6) {
                alert("please enter a valid pincode")
                return
            }


            setLoading(true)
            let response = await saveExhibitorData({
                brandingDetails,
                specialRequests,
                billingDetails
            })
            setLoading(false)
            if (response.status === 200) {
                dispatch(setExhibitorProfile(response.data.data))
                setUser(response.data.data)
                handleNext()
                window.scrollTo(0, 0)
            }
        }

    }

    useEffect(() => {

        const fetchUser = async () => {
            let response = await getExhibitorProfile(navigate)
            if (response.status === 200) {
                const { paymentStatus } = response.data.data
                setUser(response.data.data)
                dispatch(setExhibitorProfile(response.data.data))
                if (paymentStatus) {
                    setFormState(4)
                    setSearchParams(params => {
                        params.set("formState", 4)

                        return params
                    })
                    setShowInputError(true)
                    return
                }
            }
        }

        fetchUser()

    }, [])

    const handleBack = () => {
        setFormState(1)
        setSearchParams(params => {
            params.set("formState", 1)
        })
    }

    let selectedStall = exhibitPlans?.filter(elm => elm.stallType === user?.boothType)[0]




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
                                        <StateBx>
                                            {formState > inx ? <img alt="" src={activityDone} /> : <Circle style={{
                                                background: inx === formState ? "#2180E4" : "#fff",
                                                border: inx === formState ? "2px solid #2180E4" : "2px solid #9CA3AF",
                                                color: inx === formState ? "#fff" : "#9CA3AF"
                                            }}>
                                                {elm.index}
                                            </Circle>}
                                            <StatusTxt style={{
                                                color: formState > inx ? "#4A4A4A" : formState === inx ? "#000" : "#9CA3AF"
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

                                                <ParticipationTypeBx>
                                                    <H2>Booth Option</H2>
                                                    <div className="main">
                                                        <label className="dob-label" aria-hidden="true" id="boothGroupLabel">Booth Type <span>*</span></label>
                                                        <div className="dob-row" role="group" aria-labelledby="boothGroupLabel">
                                                            <select
                                                                className="select"
                                                                value={user?.boothType}
                                                                onChange={handleChange}
                                                                name="boothType"
                                                            >
                                                                <option value="">Booth Option</option>
                                                                {
                                                                    exhibitPlans?.map(elm => (
                                                                        <option onChange={handleChange} key={elm} value={elm.stallType}>{elm.stallType}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <BottomTxt style={{
                                                            color: !user?.boothType ? "#DC3545" : null,
                                                            fontSize: 12,
                                                            fontWeight: 400
                                                        }}>{(!user?.boothType && showInputError) ? "Booth type is mandatory" : ""} <span style={{
                                                            color: '#000'
                                                        }}></span></BottomTxt>
                                                    </div>


                                                </ParticipationTypeBx>
                                                <H2>Organization Details</H2>

                                                <InputField
                                                    label="Organization or Company Name"
                                                    placeholder="Enter organization or company name"
                                                    mandadory
                                                    name="organizationName"
                                                    value={user?.organizationDetails?.organizationName}
                                                    handleChange={handleOrganizationChange}
                                                    error={!user?.organizationDetails?.organizationName || user?.organizationDetails?.organizationName?.length === 0}
                                                    errorTxt="Organization or company cannot be empty"
                                                    showInputError={showInputError}
                                                />

                                                <ParticipationTypeBx>
                                                    <div className="main">
                                                        <label className="dob-label" aria-hidden="true" id="boothGroupLabel">Exhibit Type <span>*</span></label>
                                                        <div className="dob-row" role="group" aria-labelledby="boothGroupLabel">
                                                            <select
                                                                className="select"
                                                                value={user?.organizationDetails?.exhibitType}
                                                                onChange={handleOrganizationChange}
                                                                name="exhibitType"
                                                            >
                                                                <option value="">Exhibit Type</option>
                                                                {
                                                                    exhibitTypes?.map(elm => (
                                                                        <option onChange={handleChange} key={elm} value={elm}>{elm}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <BottomTxt style={{
                                                            color: !user?.organizationDetails?.exhibitType ? "#DC3545" : null,
                                                            fontSize: 12,
                                                            fontWeight: 400
                                                        }}>{(!user?.organizationDetails?.exhibitType && showInputError) ? "Exhibit type is mandatory" : ""} <span style={{
                                                            color: '#000'
                                                        }}></span></BottomTxt>
                                                    </div>

                                                </ParticipationTypeBx>

                                                <InputField
                                                    label="Website"
                                                    placeholder="Enter Website URL"
                                                    mandadory
                                                    name="website"
                                                    value={user?.organizationDetails?.website}
                                                    handleChange={handleOrganizationChange}
                                                    error={!user?.organizationDetails?.website || user?.organizationDetails?.website?.length === 0}
                                                    errorTxt="Website cannot be empty"
                                                    showInputError={showInputError}
                                                />
                                                <TextAreaField
                                                    label="Description"
                                                    mandadory
                                                    name="description"
                                                    placeholder="Write something about your organization or company"
                                                    value={user?.organizationDetails?.description}
                                                    handleChange={handleOrganizationChange}
                                                    error={!user?.organizationDetails?.description || user?.organizationDetails?.description?.length === 0}
                                                    errorTxt="Description cannot be empty"
                                                    showInputError={showInputError}
                                                    max={"1500"}
                                                />

                                            </PersonalInfo>

                                            <ParticipationDetails>
                                                <H2>Primary Contact Details</H2>
                                                <InputField
                                                    label="Full Name"
                                                    placeholder="Enter Full Name"
                                                    mandadory
                                                    name="fullName"
                                                    value={user?.primaryContactDetails?.fullName}
                                                    handleChange={handlePrimaryContactDetailsChange}
                                                    error={!user?.primaryContactDetails?.fullName || user?.primaryContactDetails?.fullName?.length === 0}
                                                    errorTxt="Full name cannot be empty"
                                                    showInputError={showInputError}
                                                />
                                                <InputField
                                                    label="Designation"
                                                    placeholder="Enter Your Designation"
                                                    mandadory
                                                    name="designation"
                                                    value={user?.primaryContactDetails?.designation}
                                                    handleChange={handlePrimaryContactDetailsChange}
                                                    error={!user?.primaryContactDetails?.designation || user?.primaryContactDetails?.designation?.length === 0}
                                                    errorTxt="Designation cannot be empty"
                                                    showInputError={showInputError}
                                                />
                                                <InputField
                                                    label="Email"
                                                    placeholder="Enter Your Email"
                                                    mandadory
                                                    disabled={user?.primaryContactDetails?.emailVerified}
                                                    name="email"
                                                    value={user?.primaryContactDetails?.email}
                                                    handleChange={handlePrimaryContactDetailsChange}
                                                    error={user?.primaryContactDetails?.email?.length === 0 || !isValidEmail(user?.primaryContactDetails?.email)}
                                                    errorTxt="Please enter a valid email"
                                                    showInputError={showInputError}
                                                />
                                                <InputField
                                                    label="Mobile"
                                                    placeholder="Enter Your Mobile"
                                                    mandadory
                                                    name="mobile"
                                                    disabled={user?.primaryContactDetails?.mobileVerified}
                                                    value={user?.primaryContactDetails?.mobile}
                                                    handleChange={handlePrimaryContactDetailsChange}
                                                    error={user?.primaryContactDetails?.mobile?.length === 0 || !isValidPhone(user?.primaryContactDetails?.mobile)}
                                                    errorTxt="Please enter a valid indian mobile number"
                                                    showInputError={showInputError}
                                                />
                                                <InputField
                                                    label="LinkedIn"
                                                    placeholder="LinkedIn profile URL"
                                                    name="linkedInUrl"
                                                    value={user?.primaryContactDetails?.linkedInUrl}
                                                    handleChange={handlePrimaryContactDetailsChange}
                                                    error={user?.primaryContactDetails?.linkedInUrl && !isLinkedInUrl(user?.primaryContactDetails?.linkedInUrl)}
                                                    errorTxt="Invalid linkedIn url"
                                                    showInputError={showInputError}
                                                />
                                            </ParticipationDetails>
                                        </TopCont>
                                        <StallDetails>
                                            <h3>Stall Details:</h3>
                                            {
                                                exhibitPlans?.map(elm => (
                                                    <p>{elm?.stallType}: {elm?.stallSize}, ₹{elm?.earlyBirdRegistrationPrice.toLocaleString()} Early / ₹{elm?.standardRegistrationPrice.toLocaleString()} Standard, {elm?.complimentaryRegistration} complimentary registration, {elm?.advertisements && "Ad Slide + "} {elm?.conferenceBooklet && "Kit insert"} </p>
                                                ))
                                            }
                                        </StallDetails>
                                        <BottomCont>
                                            <button title="save and pay later" onClick={() => handleSave()}>Save & Pay later</button>
                                            <button title="continue" onClick={() => handleContinueToPayment()}>Continue</button>
                                        </BottomCont>

                                    </Form> :
                                    formState === 2 ?
                                        <Form>
                                            <BackBtn onClick={() => handleBack()} >
                                                <img src={leftIcon} alt="" />
                                                Back
                                            </BackBtn>
                                            <TopCont>
                                                <PersonalInfo>
                                                    <H2>Branding Details</H2>

                                                    <UploadPhotoBx>
                                                        {
                                                            uploading ?
                                                                <CircularProgress /> :
                                                                <UploadImg aria-hidden="true" src={user?.brandingDetails?.companyLogo || uploadPhoto} alt="upload_photo" />

                                                        }
                                                        <DetailsBx>
                                                            <div style={{
                                                                display: 'flex',
                                                            }}>
                                                                <PhotoName>{user?.brandingDetails?.companyLogo?.split(")-")[1] || "Company Logo"} <span>*</span></PhotoName>
                                                                {user?.brandingDetails?.companyLogo && <CloseBtn title="remove photo" onClick={() => {
                                                                    setUser({
                                                                        ...user,
                                                                        brandingDetails: {
                                                                            ...user.brandingDetails,
                                                                            companyLogo: null
                                                                        },
                                                                    })
                                                                    setPhotoName("No photo choosen")
                                                                }}><img alt="" src={closeIcon} /></CloseBtn>}
                                                            </div>

                                                            <PhotoLimit style={{
                                                                color: fileSizeErr ? "#DC3545" : "#4A4A4A"
                                                            }}>
                                                                {
                                                                    fileSizeErr ?
                                                                        "File size exceeded | Max size: 2MB" :
                                                                        "File acceptence: JPG, PNG | Max size: 2MB"
                                                                }

                                                            </PhotoLimit>
                                                            <BottomTxt style={{
                                                                color: !user?.brandingDetails?.companyLogo ? "#DC3545" : null,
                                                                fontSize: 12,
                                                                fontWeight: 400
                                                            }}>{(!user?.brandingDetails?.companyLogo && showInputError) ? "Company Logo is mandatory" : ""} <span style={{
                                                                color: '#000'
                                                            }}></span></BottomTxt>

                                                            <ChoosePhotoBtn role="button" htmlFor="upload-photo">
                                                                <img src={uploadIcon} alt="" />
                                                                Upload photo
                                                            </ChoosePhotoBtn>

                                                        </DetailsBx>
                                                        <input
                                                            style={{ display: 'none' }}
                                                            id="upload-photo"
                                                            type="file"
                                                            name="companyLogo"
                                                            onChange={handleFileChange}
                                                            accept=".jpg,.png,.jpeg"
                                                        />

                                                    </UploadPhotoBx>


                                                    <DisabilityCertificate>
                                                        <p>Promotional Material</p>
                                                        <FileChoose>
                                                            {uploading ?
                                                                <CircularProgress /> :
                                                                <label role="button" htmlFor="disability_cert">Choose file</label>
                                                            }
                                                            <PhotoName>{user?.brandingDetails?.promotionalMaterial?.split(")-")[1]}</PhotoName>
                                                            {user?.brandingDetails?.promotionalMaterial && <CloseBtn title="remove photo" onClick={() => {
                                                                setUser({
                                                                    ...user,
                                                                    brandingDetails: {
                                                                        ...user.brandingDetails,
                                                                        promotionalMaterial: null
                                                                    },
                                                                })
                                                                setPhotoName("No photo choosen")
                                                            }}><img alt="" src={closeIcon} /></CloseBtn>}
                                                        </FileChoose>
                                                        <label style={{
                                                            color: disabilityCertificateSizeErr ? "#E60D0D" : "#4A4A4A"
                                                        }}>
                                                            {
                                                                disabilityCertificateSizeErr ? "File size exceeded | Max size: 10MB" :
                                                                    "Eg. (flyers, brochures, videos) .pdf, .png, .jpg, .jpeg, .docx .MP4"
                                                            }
                                                        </label>
                                                        <input
                                                            style={{
                                                                display: 'none'
                                                            }}
                                                            type="file"
                                                            id="disability_cert"
                                                            accept=".pdf,.jpg,.png,.jpeg,.docx,.mp4"
                                                            name="promotionalMaterial"
                                                            onChange={(e) => handleFileChange(e)}
                                                        />
                                                    </DisabilityCertificate>


                                                    <InputField
                                                        label="Social Media (Optional)"
                                                        placeholder="Enter Social Media URL"
                                                        name="socialMedia"
                                                        bottmText="Eg. Facebook, Linkedin, Instagram, Others...."
                                                        value={user?.brandingDetails?.socialMedia}
                                                        handleChange={handleBrandingDetailsChange}

                                                    />

                                                    <H2>Special Requests</H2>
                                                    <AccompanyPerson>
                                                        <TextAreaField
                                                            label="Accessibility Needs"
                                                            name="accessibilityNeeds"
                                                            placeholder="Write whether you need any accessibility assistance"
                                                            value={user?.specialRequests?.accessibilityNeeds}
                                                            handleChange={handleSpecialRequestChange}
                                                            max={"1500"}
                                                        />
                                                    </AccompanyPerson>
                                                    <AccompanyPerson>
                                                        <input
                                                            type="checkbox"
                                                            checked={user?.specialRequests?.exhibitorShowcasePresentationRequest}
                                                            name="exhibitorShowcasePresentationRequest"
                                                            aria-label="exhibitor Showcase Presentation Request"
                                                            onClick={() => {
                                                                setUser({
                                                                    ...user,
                                                                    specialRequests: {
                                                                        ...user?.specialRequests,
                                                                        exhibitorShowcasePresentationRequest: !user?.specialRequests?.exhibitorShowcasePresentationRequest
                                                                    }
                                                                })
                                                            }}
                                                        />
                                                        <TermBx aria-hidden="true">
                                                            <label aria-hidden="true" htmlFor={"exhibitor Showcase Presentation Request"}>Exhibitor showcase presentation request</label>
                                                        </TermBx>
                                                    </AccompanyPerson>

                                                </PersonalInfo>

                                                <BillingDetails>
                                                    <H2>Billing Details</H2>
                                                    <InputField
                                                        label="Door No. / Building No. / Cabin No."
                                                        mandadory
                                                        name="doorNo"
                                                        placeholder="Enter Door Number"
                                                        value={user?.billingDetails?.doorNo}
                                                        handleChange={handleChangeBilling}
                                                        error={user?.billingDetails?.doorNo?.length === 0 || !user?.billingDetails?.doorNo}
                                                        errorTxt="Door Number cannot be empty"
                                                        showInputError={showInputError}
                                                    />
                                                    <InputField
                                                        label="Address Line 1"
                                                        mandadory
                                                        placeholder="Enter Address Line 1"
                                                        name="addressLine1"
                                                        value={user?.billingDetails?.addressLine1}
                                                        handleChange={handleChangeBilling}
                                                        error={user?.billingDetails?.addressLine1?.length === 0 || !user?.billingDetails?.addressLine1}
                                                        errorTxt="Address cannot be empty"
                                                        showInputError={showInputError}
                                                    />
                                                    <InputField
                                                        label="Address Line 2 (Optional)"
                                                        name="addressLine2"
                                                        placeholder="Enter Address Line 2"
                                                        value={user?.billingDetails?.addressLine2}
                                                        handleChange={handleChangeBilling}
                                                        showInputError={showInputError}
                                                    />
                                                    <Row>
                                                        <InputField
                                                            label="City"
                                                            mandadory
                                                            name="city"
                                                            placeholder="Enter City"
                                                            value={user?.billingDetails?.city}
                                                            handleChange={handleChangeBilling}
                                                            error={user?.billingDetails?.city?.length === 0 || !user?.billingDetails?.city}
                                                            errorTxt="City cannot be empty"
                                                            showInputError={showInputError}
                                                        />
                                                        <InputField
                                                            label="State"
                                                            mandadory
                                                            name="state"
                                                            placeholder="Enter State"
                                                            value={user?.billingDetails?.state}
                                                            handleChange={handleChangeBilling}
                                                            error={user?.billingDetails?.state?.length === 0 || !user?.billingDetails?.state}
                                                            showInputError={showInputError}
                                                            errorTxt="State cannot be empty"
                                                        />

                                                    </Row>
                                                    <InputField
                                                        label="Pincode"
                                                        mandadory
                                                        name="pincode"
                                                        placeholder="Enter Pincode"
                                                        value={user?.billingDetails?.pincode}
                                                        handleChange={handleChangeBilling}
                                                        error={user?.billingDetails?.pincode?.length !== 6}
                                                        errorTxt={user?.billingDetails?.pincode?.length === 0 ? "Pincode cannot be empty" : "Invalid Pincode"}
                                                        showInputError={showInputError}
                                                    />
                                                    <InputField
                                                        label="GST Number (for tax invoicing)"
                                                        name="gstNo"
                                                        value={user?.billingDetails?.gstNo}
                                                        placeholder="Enter GST Number"
                                                        handleChange={handleChangeBilling}
                                                    // error={user?.billingDetails?.gstNo?.length !== 15}
                                                    // errorTxt={user?.billingDetails?.gstNo?.length === 0 ? "GST number cannot be empty" : "Invalid GST Number"}
                                                    // showInputError={showInputError}
                                                    />
                                                    <AccompanyPerson>
                                                        <input
                                                            type="checkbox"
                                                            name="requireInvoice"
                                                            aria-label="Invoice copy request"
                                                            checked={user?.billingDetails?.requireInvoice}
                                                            onChange={() => setUser({
                                                                ...user,
                                                                billingDetails: {
                                                                    ...user?.billingDetails,
                                                                    requireInvoice: !user?.billingDetails?.requireInvoice
                                                                }
                                                            })}
                                                        />
                                                        <TermBx>
                                                            <label aria-hidden="true" htmlFor={"Invoice copy request"}>Invoice copy request</label>

                                                        </TermBx>
                                                    </AccompanyPerson>
                                                </BillingDetails>
                                            </TopCont>
                                            <BottomCont>
                                                <button title="save and pay later" onClick={() => handleSave()}>Save & Pay later</button>
                                                <button title="continue" onClick={() => handleContinueToPayment()}>{formState === 2 ? "Preview" : "Continue"}</button>
                                            </BottomCont>
                                        </Form> :
                                        formState === 3 ?
                                            <Review>
                                                <TopCont>
                                                    <PersonalInfo>
                                                        <ReviewHead>
                                                            <H1>Review Your Details</H1>
                                                            <button title="edit profile" onClick={() => handleEditProfile()}>Edit</button>
                                                        </ReviewHead>
                                                        <ReviewBx>
                                                            <H2>Organization Details</H2>
                                                            <div>
                                                                <Attr>Organization Name</Attr>
                                                                <Value>{user?.organizationDetails?.organizationName}</Value>
                                                            </div>
                                                            <div>
                                                                <Attr>Exhibit Type</Attr>
                                                                <Value>{user?.organizationDetails?.exhibitType}</Value>
                                                            </div>
                                                            <div>
                                                                <Attr>Website</Attr>
                                                                <Value>{user?.organizationDetails?.website}</Value>
                                                            </div>
                                                            <div>
                                                                <Attr>Description</Attr>
                                                                <Value>{user?.organizationDetails?.description}</Value>
                                                            </div>
                                                            <div>
                                                                <Attr>Company Logo</Attr>
                                                                <img width={100} src={user?.brandingDetails?.companyLogo} />
                                                            </div>

                                                            <H2>Contact Details</H2>
                                                            <div>
                                                                <Attr>Full Name</Attr>
                                                                <Value>{user?.primaryContactDetails?.fullName}</Value>
                                                            </div>
                                                            <div>
                                                                <Attr>Designation</Attr>
                                                                <Value>{user?.primaryContactDetails?.designation}</Value>
                                                            </div>
                                                            <div>
                                                                <Attr>Email</Attr>
                                                                <Value>{user?.primaryContactDetails?.email}</Value>
                                                            </div>
                                                            <div>
                                                                <Attr>Mobile</Attr>
                                                                <Value>{user?.primaryContactDetails?.mobile}</Value>
                                                            </div>
                                                        </ReviewBx>
                                                    </PersonalInfo>
                                                    <ParticipationDetails>
                                                        <PersonalInfo style={{
                                                            width: '100%'
                                                        }}>
                                                            <ReviewHead>
                                                                <H1>Booth Details</H1>
                                                                <button title="edit profile" onClick={() => handleEditProfile()} >Change</button>
                                                            </ReviewHead>
                                                            <ReviewBx>
                                                                <H2>{user?.boothType} ({selectedStall?.stallSize})</H2>
                                                                <div>
                                                                    <Value style={{
                                                                        fontSize: 14,
                                                                        color: '#1c1c1c'
                                                                    }}>₹ {selectedStall?.earlyBirdRegistrationPrice}</Value>
                                                                    <Attr style={{
                                                                        color: "#3B3535"
                                                                    }}>{`Payment includes up to ${selectedStall?.complimentaryRegistration} participants`}</Attr>
                                                                </div>
                                                            </ReviewBx>
                                                        </PersonalInfo>

                                                        <PersonalInfo style={{
                                                            width: '100%'
                                                        }}>
                                                            <ReviewHead>
                                                                <H1>Billing Address</H1>
                                                                <button onClick={() => handleChangeAddress()} title="edit profile" >Change</button>
                                                            </ReviewHead>
                                                            <ReviewBx style={{
                                                                fontSize: 16,
                                                                color: "#1c1c1c",
                                                                lineHeight: '150%',
                                                                fontWeight: 400,
                                                                fontFamily: 'poppins'
                                                            }}>
                                                                {user?.billingDetails?.doorNo}
                                                                <br />
                                                                {user?.billingDetails?.addressLine1}
                                                                <br />
                                                                {user?.billingDetails?.addressLine2}
                                                                <br />
                                                                {`${user?.billingDetails?.city}, ${user?.billingDetails?.state}, ${user?.billingDetails?.city}, ${user?.billingDetails?.pincode}`}
                                                                <br />
                                                                GST Number: {user?.billingDetails?.gstNo}
                                                            </ReviewBx>
                                                        </PersonalInfo>

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

                                                        <CouponBx style={{
                                                            width: '100%'
                                                        }}>
                                                            <H2>Price Summary</H2>
                                                            <PriceBx selectedStall={selectedStall} coupon={coupon} />
                                                        </CouponBx>
                                                        <PayBtn onClick={() => payNow(selectedStall, coupon)} >Pay Now</PayBtn>
                                                    </ParticipationDetails>
                                                </TopCont>
                                            </Review> :
                                            <Payment>
                                                <ExhibitorPaymentReceipt
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



export default ExhibitorRegister


