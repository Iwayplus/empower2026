import { useEffect, useRef, useState } from "react"
import { getPaymentDetails, getProfile, handleSendInvoiceThroughMail } from "../services/api"
import { Backdrop, CircularProgress, styled } from "@mui/material"

import checkGreen from '../assets/checkGreen.svg'
import downloadIcon from '../assets/download.svg'
import empowerLogoWhite from '../assets/data.png'
import { useDispatch, useSelector } from "react-redux"
import { registrationCharges } from "../components/attend/data"
import { useNavigate } from "react-router-dom"
import { setProfile } from "../redux/userSlice"
const TIMESTAMP_OPTIONS = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
};

const Component = styled('div')(({ theme }) => ({
    fontFamily: 'Poppins',
    width: '50vw',
    margin: '0 auto',
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        padding: "0 10px",
        boxSizing: "border-box"
    }
}))

const Toast = styled('p')(({ theme }) => ({
    padding: "10px 12px",
    background: '#E6F4EA',
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "150%",
    '&>p': {
        margin: 0,
        color: "#4A4A4A",
        '&>span': {
            color: "#000"
        }
    }
}))

const Container = styled('div')(({ theme }) => ({
    borderRadius: 12,
    border: "1px solid var(--Color-Neutral-400, #D1D5DB)",
    background: "#FFF",
    display: 'flex',
    flexDirection: "column",
    gap: 32,
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        boxSizing: 'border-box',
    }
}))

const GreenTick = styled('div')({
    background: "rgba(35, 162, 109, 0.12)",
    width: 91,
    height: 91,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    marginBottom: 8
})

const Success = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 8,
    '&>h2': {
        color: "#1C1C1C",
        fontSize: 24,
        lineHeight: "120%",
        fontWeight: 600,
        margin: 0
    },
    'p': {
        color: '#7D8592',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: '150%',
        margin: 0,
        '&>span': {
            fontSize: 18,
            fontWeight: 500,
            lineHeight: '120%',
            color: '#1c1c1c'
        }
    }
})

const Details = styled('div')({
    '&>h3': {
        color: "#1C1C1C",
        fontSize: 20,
        lineHeight: "120%",
        fontWeight: 600,
        margin: 0
    }
})

const Table = styled('div')({
    marginTop: 16,
    borderTop: "1px solid #EFF1F3",
    borderBottom: "1px solid #EFF1F3",
    padding: "12px 0",
    display: 'flex',
    flexDirection: 'column',
    gap: 12
})

const Row = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    '& > span:nth-of-type(1)': {
        margin: 0,
        color: "#7D8592",
        fontSize: 16,
        lineHeight: '150%',
        fontWeight: 400,
    },
    '& > span:nth-of-type(2)': {
        color: "#1C1C1C",
        fontSize: 18,
        fontWeight: 500,
        lineHeight: '120%',
    },
})

const BottomCont = styled('div')({
    marginTop: -12
})

const RowTotal = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: "1px solid #EFF1F3",
    borderBottom: "1px solid #EFF1F3",
    padding: "12px 0",
    '&>span': {
        margin: 0,
        color: "#1c1c1c",
        fontSize: 20,
        lineHeight: '150%',
        fontWeight: 600
    }
})

const Buttons = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 16
})

const Button = styled('button')({
    padding: "14px 16px",
    borderRadius: 4,
    background: '#2180E4',
    color: "#fff",
    fontSize: 16,
    lineHeight: "120%",
    fontWeight: 500,
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
    '&:hover': {
        opacity: 0.7
    }
})

const Help = styled('p')({
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '150%',
    textAlign: 'center',
    'a': {
        color: "#2180E4",
        textDecoration: "none"
    }
})

const DetailsCont = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: "column",
    gap: 32,
    padding: 32,
    [theme.breakpoints.down("sm")]: {
        boxSizing: 'border-box',
        padding: 5
    }
}))

const PaymentReceipt = ({ setFormState, setSearchParams }) => {
    const user = useSelector(store => store.userSlice)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [index, setIndex] = useState()
    const [receipt, setReceipt] = useState()
    const [loading, setLoading] = useState(false)
    const reportTemplateRef = useRef(null)


    //   let registrationFee = registrationCharges?.find(elm => elm?.registrationTypes?.includes(user?.profile?.registrationType))?.earlyBird
    //   let accompanyPersonFee = registrationCharges?.find(elm => elm?.registrationTypes?.includes("Accompanying Person"))?.earlyBird

    let category = user?.profile?.registrationCategory === "Full Conference" ? "standard" : "standardOneDay"

    let registrationFee = registrationCharges?.filter(elm => elm?.registrationTypes?.includes(user?.profile?.registrationType))[0]?.[category]
    let accompanyPersonFee = registrationCharges?.filter(elm => elm?.registrationTypes?.includes("Accompanying Person"))[0]?.[category]



    if (category === "standardOneDay") {
        registrationFee = registrationFee * user?.profile?.daySelects?.length
        accompanyPersonFee = user?.profile?.accompanyPerson ? accompanyPersonFee * user?.profile?.daySelects?.length : 0
    }

    let totalFee
    if (user?.profile?.accompanyPerson) totalFee = registrationFee + accompanyPersonFee
    else totalFee = registrationFee

    const fetchData = async () => {
        setLoading(true)
        const response = await getPaymentDetails(setFormState, setSearchParams)
        setLoading(false)
        if (response.status === 200) {
            setReceipt(response.data.data)
        }
    }


    const handleInvoice = async (action) => {
        const docDefinition = {
            content: [
                {
                    text: 'Empower 2026 Registration Fee Receipt',
                    style: 'header'
                },
                {
                    table: {
                        widths: ['*', '*'],
                        body: [
                            ['Registration ID', `empower25/${index + 1000}` || ""],
                            ['Payment ID', receipt?.id || "N/A"],
                            ['Name', `${user?.profile?.firstName} ${user?.profile?.lastName}` || "N/A"],
                            ['Mode of Payment', `${!receipt ? "N/A" : receipt?.method === "card" ? `${receipt?.card?.type} ${receipt?.card?.entity}` : receipt?.method.toUpperCase()}`],
                            ['Date & Time', receipt?.created_at ? new Date(receipt?.created_at * 1000).toLocaleString('en-US', TIMESTAMP_OPTIONS) : new Date(user?.profile?.paymentDetails?.updatedAt).toLocaleString('en-US', TIMESTAMP_OPTIONS) || "N.A"]
                        ]
                    },
                    layout: 'lightHorizontalLines',
                    margin: [0, 10, 0, 10]
                },
                {
                    text: 'Payment Breakup',
                    style: 'subheader',
                    margin: [0, 10, 0, 5]
                },
                {
                    table: {
                        widths: ['*', 'auto', 'auto'],
                        body: [
                            [user?.profile?.registrationCategory || "", user?.profile?.daySelects?.length === 0 ? "Fee For full conference" : "Fee for " + user?.profile?.daySelects?.join(", "), 'Fee (Incl. GST)'],
                            [user?.profile?.registrationType || "N/A", registrationFee || 0, registrationFee || 0],
                            ["Accompany Person Fee", user?.profile?.accompanyPerson ? accompanyPersonFee : 0, user?.profile?.accompanyPerson ? accompanyPersonFee : 0],
                            ["Total", totalFee || 0, totalFee || 0],
                            ["Discount",
                                `- ${user?.profile?.paymentDetails?.coupon?.price > totalFee ? totalFee : user?.profile?.paymentDetails?.coupon?.price || 0}`,
                                `- ${user?.profile?.paymentDetails?.coupon?.price > totalFee ? totalFee : user?.profile?.paymentDetails?.coupon?.price || 0}`]
                        ]
                    },
                    layout: 'lightHorizontalLines'
                },
                {
                    text: '*This receipt is including GST',
                    italics: true,
                    fontSize: 10,
                    margin: [0, 5, 0, 5]
                },
                {
                    table: {
                        widths: ['*', 'auto'],
                        body: [
                            [{ text: 'Total Amount Paid', bold: true }, { text: `₹${Math.round(receipt?.amount / 100) || 0}` || "", bold: true }]
                        ]
                    },
                    layout: 'lightHorizontalLines',
                    margin: [0, 10, 0, 0]
                },
                {
                    text: '\nThank you for registering for the Empower Conference!',
                    style: 'footer'
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                },
                subheader: {
                    fontSize: 14,
                    bold: true
                },
                footer: {
                    alignment: 'center',
                    margin: [0, 20, 0, 0]
                }
            }
        };

        if (action === "download") {
            window.pdfMake.createPdf(docDefinition).download('Empower_Registration_Receipt.pdf');
        }
        else if (action === "mail" && receipt?.id && user?.profile?.firstName) {
            window.pdfMake.createPdf(docDefinition).getBlob(async (blob) => {
                // 2. Append the Blob to FormData
                const formData = new FormData();
                formData.append('file', blob, 'Empower2025_Receipt.pdf');

                // 3. Send it to your backend
                await handleSendInvoiceThroughMail(formData);

                // Optional: also download for user
                // window.pdfMake.createPdf(docDefinition).download('Empower_Registration_Receipt.pdf');
            });
        };
    }



    const handleGoToAccount = () => {
        let accessToken = localStorage.getItem("accessToken")
        window.location.href = `empower://auth?access_token=${accessToken}`
        navigate("/")
    }

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getProfile(navigate)
            dispatch(setProfile(res.data.data))
            setIndex(res?.data?.index)
            if (res?.data?.data?.paymentDetails?.receipt !== "free") fetchData()
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const performAction = async () => {
            await handleInvoice("mail")
        }
        if (user?.profile?.paymentDetails?.receipt !== "free" && index) {
            performAction()
        }
        else if (user?.profile?.paymentDetails?.receipt === "free" && index && !receipt) {
            performAction()
        }

    }, [receipt, user])
    // console.log(totalFee)

    if (loading) return <Backdrop open={loading}><CircularProgress /></Backdrop>

    return (
        <Component id="receipt-content">
            <Toast>
                <p>A copy of the confirmation has been sent to your email <span>{receipt?.email || user?.profile?.email || user?.profile?.secondaryMail}</span></p>
            </Toast>
            <Container>
                <DetailsCont ref={reportTemplateRef}>
                    <Success>
                        <GreenTick><img alt="" width={52} src={checkGreen} /></GreenTick>
                        <img style={{ marginBottom: 3, width: 250 }} src={empowerLogoWhite} alt="Empower Logo" />
                        <h2>Payment Receipt</h2>
                        <p>
                            Your registration for Empower 2026 is completed
                            <br />
                            Registration ID: <span>empower26/{index + 1000}</span>
                        </p>

                    </Success>

                    <Details>
                        <h3>Participant Details</h3>
                        <Table>
                            <Row
                                role="text"
                                aria-label={`Participant ${user?.profile?.firstName} ${user?.profile?.lastName}`}
                            >
                                <span className="label">Participant</span>
                                <span className="value">
                                    {user?.profile?.firstName + " " + user?.profile?.lastName}
                                </span>
                            </Row>
                            <Row
                                role="text"
                                aria-label={`Registration Category ${user?.profile?.registrationType}`}
                            >
                                <span className="label">Registration Category</span>
                                <span className="value">{user?.profile?.registrationType}</span>
                            </Row>
                            <Row
                                role="text"
                                aria-label={`Registration Type ${user?.profile?.registrationCategory} ${user?.profile?.daySelects?.join(", ")}`}
                            >
                                <span className="label">Registration Type</span>
                                <span className="value">
                                    {user?.profile?.registrationCategory} {user?.profile?.daySelects?.join(", ")}
                                </span>
                            </Row>
                            {user?.profile?.accompanyPerson && <Row
                                role="text"
                                aria-label={`Accompanying Person ${user?.profile?.accompanyPerson?.firstName || ""} ${user?.profile?.accompanyPerson?.lastName || ""}`}
                            >
                                <span className="label">Accompanying Person</span>
                                <span className="value">
                                    {user?.profile?.accompanyPerson?.firstName} {user?.profile?.accompanyPerson?.lastName}
                                </span>
                            </Row>}

                        </Table>
                    </Details>

                    <Details>
                        <h3>Payment Details</h3>
                        <Table>
                            <Row
                                role="text"
                                aria-label={`Payment ID ${receipt?.id || "N/A"}`}
                            >
                                <span className="label">Payment ID</span>
                                <span className="value">{receipt?.id || "N/A"}</span>
                            </Row>

                            {user?.profile?.paymentDetails?.receipt !== "free" && <Row
                                role="text"
                                aria-label={`Payment Method ${receipt?.method === "card"
                                    ? `${receipt?.card?.type} ${receipt?.card?.entity}`
                                    : receipt?.method || "N/A"
                                    }`}
                            >
                                <span className="label">Payment Method</span>
                                <span className="value" style={{ textTransform: "uppercase" }}>
                                    {receipt?.method === "card"
                                        ? `${receipt?.card?.type} ${receipt?.card?.entity}`
                                        : receipt?.method || "N/A"}
                                </span>
                            </Row>
                            }
                            <Row
                                role="text"
                                aria-label={`Date & Time ${receipt?.created_at
                                    ? new Date(receipt?.created_at * 1000).toLocaleString("en-US", TIMESTAMP_OPTIONS)
                                    : new Date(user?.profile?.paymentDetails?.updatedAt).toLocaleString("en-US", TIMESTAMP_OPTIONS)
                                    }`}
                            >
                                <span className="label">Date & Time</span>
                                <span className="value">
                                    {receipt?.created_at
                                        ? new Date(receipt?.created_at * 1000).toLocaleString("en-US", TIMESTAMP_OPTIONS)
                                        : new Date(user?.profile?.paymentDetails?.updatedAt).toLocaleString("en-US", TIMESTAMP_OPTIONS)}
                                </span>
                            </Row>

                        </Table>
                    </Details>

                    <Details>
                        <h3>Payment Breakup</h3>
                        <Table style={{ borderBottom: 'unset' }}>
                            <Row
                                role="text"
                                aria-label={`Registration Fee ₹ ${registrationFee}`}
                            >
                                <span className="label">Registration Fee</span>
                                <span className="value">₹ {registrationFee}</span>
                            </Row>

                            {user?.profile?.accompanyPerson && <Row
                                role="text"
                                aria-label={`Accompanying Person Fee ₹ ${accompanyPersonFee}`}
                            >
                                <span className="label">Accompanying Person Fee</span>
                                <span className="value">₹ {accompanyPersonFee}</span>
                            </Row>}

                            {user?.profile?.accompanyPerson && <Row
                                role="text"
                                aria-label={`Total ₹ ${totalFee}`}
                            >
                                <span className="label">Total</span>
                                <span className="value">₹ {totalFee}</span>
                            </Row>
                            }
                            {user?.profile?.paymentDetails?.coupon && <Row
                                role="text"
                                aria-label={`Discount - ₹ ${user?.profile?.paymentDetails?.coupon?.price > totalFee
                                    ? totalFee
                                    : user?.profile?.paymentDetails?.coupon?.price
                                    }`}
                            >
                                <span className="label">Discount</span>
                                <span
                                    className="value"
                                    style={{ color: "#28A745" }}
                                >
                                    - ₹ {user?.profile?.paymentDetails?.coupon?.price > totalFee ? totalFee : user?.profile?.paymentDetails?.coupon?.price}
                                </span>
                            </Row>
                            }
                        </Table>
                    </Details>

                    <BottomCont>
                        <RowTotal
                            role="text"
                            aria-label={`Total Paid ₹ ${Math.round(receipt?.amount / 100) || 0}`}
                        >
                            <span className="label">Total Paid</span>
                            <span className="value">₹ {Math.round(receipt?.amount / 100) || 0}</span>
                        </RowTotal>

                    </BottomCont>
                </DetailsCont>

                <DetailsCont>
                    <Buttons>
                        <Button onClick={handleGoToAccount}>Go to Account</Button>
                        <Button onClick={() => handleInvoice("download")} style={{ background: '#fff', border: "1px solid #D1D5DB", color: "#2180E4" }}>
                            <img alt="" src={downloadIcon} />Download Receipt
                        </Button>
                    </Buttons>
                    <Help
                        role="text"
                        aria-label="Need help? Contact info@empowerconference.in"
                    >
                        Need help? Contact <a href="mailto:info@empowerconference.in">info@empowerconference.in</a>
                    </Help>

                </DetailsCont>
            </Container>
        </Component>
    )
}

export default PaymentReceipt;
