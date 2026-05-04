import { Outlet } from "react-router-dom"
import AuthHeader from "./AuthHeader"
import AuthFooter from "./AuthFooter"

const Auth = () => {
    return (
        <div>
            <AuthHeader />
                <Outlet />
            <AuthFooter />
        </div>
    )
}

export default Auth