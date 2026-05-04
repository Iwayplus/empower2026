import { useEffect, useRef, useState } from "react"
import { getExhibitorProfile, getPaymentDetailsExhibitor, handleSendExhibitorReceipt } from "../services/api"
import { Backdrop, CircularProgress, styled } from "@mui/material"

import checkGreen from '../assets/checkGreen.svg'
import downloadIcon from '../assets/download.svg'
import empowerLogoWhite from '../assets/data.png'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setExhibitorProfile } from "../redux/userSlice"
import { exhibitPlans } from "../components/exhibit/data"
import tag from '../assets/tag.svg'


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
    '&>p': {
        margin: 0,
        color: "#7D8592",
        fontSize: 16,
        lineHeight: '150%',
        fontWeight: 400
    },
    '&>span': {
        color: "#1C1C1C",
        fontSize: 18,
        fontWeight: 500,
        lineHeight: '120%'
    }
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
    '&>p': {
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

const CouponBx = styled('div')({
    margin: "20px 32px",
    padding: 16,
    borderRadius: 4,
    border: '1px dashed #000',
    background: '#F3FDF6',
    fontFamily: 'Poppins',
    '&>p': {
        // textTransform: 'uppercase',
        color: 'var(--Color-Black, #000)',

        /* Label/M */

        fontSize: 16,
        fontWeight: 500,
        lineHeight: '120%'
    },
    '&>div': {
        display: "flex",
        gap: 12,
        
        '&>p': {
            textTransform: 'uppercase',
            background: "#fff",
        }
    }
})

const CouponCode = styled('div')({
    display: 'flex',
    padding: 8,
    gap: 10,
    textTransform: 'uppercase',
    background: '#fff',
    fontFamily: 'poppins',
    '&>p': {
        margin: 0
    }
})

const ExhibitorPaymentReceipt = ({ setFormState, setSearchParams }) => {
    const user = useSelector(store => store.userSlice)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [index, setIndex] = useState()
    const [receipt, setReceipt] = useState()
    const [loading, setLoading] = useState(false)
    const reportTemplateRef = useRef(null)


    //   let registrationFee = registrationCharges?.find(elm => elm?.registrationTypes?.includes(user?.profile?.registrationType))?.earlyBird
    //   let accompanyPersonFee = registrationCharges?.find(elm => elm?.registrationTypes?.includes("Accompanying Person"))?.earlyBird

    let selectedStall = exhibitPlans?.filter(elm => elm.stallType === user?.exhibitorProfile?.boothType)[0]

    const fetchData = async () => {
        setLoading(true)
        const response = await getPaymentDetailsExhibitor(setFormState, setSearchParams)
        setLoading(false)
        if (response.status === 200) {
            setReceipt(response.data.data)
        }
    }





    const handleInvoice = async (action) => {

        let totalFee = selectedStall?.earlyBirdRegistrationPrice
        if(user?.exhibitorProfile?.paymentDetails?.coupon?.price) totalFee = totalFee - user?.exhibitorProfile?.paymentDetails?.coupon?.price
        let discount = 0
        if(user?.exhibitorProfile?.paymentDetails?.coupon?.price >= selectedStall?.earlyBirdRegistrationPrice) discount = selectedStall?.earlyBirdRegistrationPrice
        else if(user?.exhibitorProfile?.paymentDetails?.coupon?.price < selectedStall?.earlyBirdRegistrationPrice) discount = user?.exhibitorProfile?.paymentDetails?.coupon?.price

        const docDefinition = {
            content: [
                {
                    text: 'Empower 2026 Exhibitor Registration Fee Receipt',
                    style: 'header'
                },
                {
                    table: {
                        widths: ['*', '*'],
                        body: [
                            ['Registration ID', `empower25-exhibitor/${index + 1000}` || ""],
                            ['Payment ID', receipt?.id || "N/A"],
                            ['Name', `${user?.exhibitorProfile?.primaryContactDetails?.fullName}` || "N/A"],
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
                            ["Booth Type", user?.exhibitorProfile?.boothType || "N/A", 'Fee (Incl. GST)'],
                            ["Registration Fee" || "N/A", selectedStall?.earlyBirdRegistrationPrice || 0, selectedStall?.earlyBirdRegistrationPrice || 0],
                            ["Discount", `- ${discount}`, `- ${discount}`],

                            ["Total" || "N/A", totalFee|| 0, totalFee || 0],

                            // ["Accompany Person Fee", accompanyPersonFee || 0, accompanyPersonFee || 0],
                            // ["Total", totalFee || 0, totalFee || 0],
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
                    table: {
                        widths: ['*', 'auto'],
                        body: [
                            ...user?.exhibitorProfile?.complimentaryRegistrationCoupons?.map((elm, inx) => [
                                {
                                    text: `Coupon ${inx+1}`,
                                    bold: true
                                },
                                {
                                    text: elm?.code?.toUpperCase(),
                                    bold: true
                                }
                            ]) || []
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
            window.pdfMake.createPdf(docDefinition).download('Empower_Exhibitor_Registration_Receipt.pdf');
        }
        else if (action === "mail") {
            window.pdfMake.createPdf(docDefinition).getBlob(async (blob) => {
                // 2. Append the Blob to FormData
                const formData = new FormData();
                formData.append('file', blob, 'Empower2025_Exhibitor_Receipt.pdf');

                // 3. Send it to your backend
                await handleSendExhibitorReceipt(formData);

                // Optional: also download for user
                // window.pdfMake.createPdf(docDefinition).download('Empower_Registration_Receipt.pdf');
            });
        };
    }



    const handleGoToAccount = () => {
        // let accessToken = localStorage.getItem("accessToken")
        // window.location.href = `empower://auth?access_token=${accessToken}`
        navigate("/exhibit")
    }

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getExhibitorProfile(navigate)
            dispatch(setExhibitorProfile(res.data.data))
            setIndex(res?.data?.index)
            if (res?.data?.data?.paymentDetails?.receipt !== "free") fetchData()
        }
        fetchUser()
    }, [])

    useEffect(() => {

       
        const performAction = async () => {
            await handleInvoice("mail")
        }
        if (receipt?.id && user?.exhibitorProfile?.paymentDetails?.receipt !== "free" && index?.toString() ) {
            performAction()
        }
        else if (user?.exhibitorProfile?.paymentDetails?.receipt === "free" && index?.toString() && !receipt) {
            performAction()
        }
    }, [user, receipt])

    if (loading) return <Backdrop open={loading}><CircularProgress /></Backdrop>

    return (
        <Component id="receipt-content">
            <Toast>
                <p>A copy of the confirmation has been sent to your email <span>{receipt?.email || user?.exhibitorProfile?.primaryContactDetails?.email || user?.profile?.secondaryMail}</span></p>
            </Toast>
            <Container>
                <DetailsCont ref={reportTemplateRef}>
                    <Success>
                        <GreenTick><img alt="" width={52} src={checkGreen} /></GreenTick>
                        <img style={{ marginBottom: 3, width: 250 }} src={empowerLogoWhite} alt="Empower Logo" />
                        <h2>Payment Receipt</h2>
                        <p>Your Exhibitor registration for Empower 2026 is completed</p>
                        <p>Exhibitor ID: <span>empower26/{index + 1000}</span></p>
                    </Success>

                    <Details>
                        <h3>Organization Details</h3>
                        <Table>
                            <Row><p>Organization Name</p><span>{user?.exhibitorProfile?.organizationDetails?.organizationName}</span></Row>
                            <Row><p>Booth Type</p><span>{user?.exhibitorProfile?.boothType} ({selectedStall?.stallSize})</span></Row>
                            <Row><p>Exhibit Type</p><span>{user?.exhibitorProfile?.organizationDetails?.exhibitType} {user?.profile?.daySelects?.join(", ")}</span></Row>
                            {user?.profile?.accompanyPerson && <Row><p>Accompanying Person</p><span>{user?.profile?.accompanyPerson?.firstName} {user?.profile?.accompanyPerson?.lastName}</span></Row>}
                        </Table>
                    </Details>

                    <Details>
                        <h3>Payment Details</h3>
                        <Table>
                            <Row><p>Payment ID</p><span>{receipt?.id || "N/A"}</span></Row>
                            {user?.exhibitorProfile?.paymentDetails?.receipt !== "free" && <Row><p>Payment Method</p><span style={{ textTransform: 'uppercase' }}>{receipt?.method === "card" ? `${receipt?.card?.type} ${receipt?.card?.entity}` : receipt?.method}</span></Row>}
                            <Row><p>Date & Time</p><span>{receipt?.created_at ? new Date(receipt?.created_at * 1000).toLocaleString('en-US', TIMESTAMP_OPTIONS) : new Date(user?.profile?.paymentDetails?.updatedAt).toLocaleString('en-US', TIMESTAMP_OPTIONS)}</span></Row>
                        </Table>
                    </Details>

                   {user?.exhibitorProfile?.paymentDetails?.coupon &&  <Details>
                        <h3>Payment Breakup</h3>
                        <Table style={{ borderBottom: 'unset' }}>
                            <Row><p>Registration Fee</p><span>{"₹ " + selectedStall?.earlyBirdRegistrationPrice}</span></Row>
                            <Row><p>Discount</p><span style={{ color: "#28A745" }}>- ₹ {user?.exhibitorProfile?.paymentDetails?.coupon?.price > receipt?.amount ? receipt?.amount : user?.exhibitorProfile?.paymentDetails?.coupon?.price}</span></Row>
                        </Table>
                    </Details>}

                    <BottomCont>
                        <RowTotal>
                            <p>Total Paid</p>
                            <p>₹ { !receipt ? 0 : Math.round(receipt?.amount / 100)?.toLocaleString() || 0}</p>
                        </RowTotal>
                    </BottomCont>
                </DetailsCont>

                <CouponBx>
                    <p>COUPON CODE</p>
                    <div>
                        {
                            user?.exhibitorProfile?.complimentaryRegistrationCoupons?.map(elm => (
                                <CouponCode><img src={tag} alt="tag" /><p>{elm.code}</p></CouponCode>
                            ))
                        }
                    </div>
                    <p>Use this coupon code for complimentary registration.</p>

                </CouponBx>



                <DetailsCont>
                    <Buttons>
                        <Button onClick={handleGoToAccount}>Go to Account</Button>
                        <Button onClick={() => handleInvoice("download")} style={{ background: '#fff', border: "1px solid #D1D5DB", color: "#2180E4" }}>
                            <img alt="" src={downloadIcon} />Download Receipt
                        </Button>
                    </Buttons>
                    <Help>Need help? Contact <a href="mailto:info@empowerconference.in">info@empowerconference.in</a></Help>
                </DetailsCont>
            </Container>
        </Component>
    )
}

export default ExhibitorPaymentReceipt;
