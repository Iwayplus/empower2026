import { useNavigate } from "react-router-dom"


const FailedPayment = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/")
    }
    return (
        <div>
            payment failed back to home 
            <button style={{ cursor: 'pointer' }} onClick={() => handleClick()}> Go to Home Page</button>
        </div>
    )
}

export default FailedPayment