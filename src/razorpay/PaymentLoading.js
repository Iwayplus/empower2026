import payment from '../assets/payment.gif'
const PaymentLoading = () => {
    return (
        <div style={{
            padding: "49px 64px",
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            justifyContent: 'center',
            alignItems: 'center',
            background: '#fff'
        }}>
            <img style={{
                height: 100,
                width: 100
            }} alt="loading" src={payment}  />
            <p style={{
                textAlign: 'center',
                fontFamily: 'Poppins',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: "150%",
                maxWidth: 352
            }}>Please wait… We are securely redirecting you to the payment gateway.</p>
        </div>
    )
}

export default PaymentLoading