import axiosInstance from "./axiosInstance";

const authService = {
    refreshToken: async () => {
        try {
            const oldRefreshToken = localStorage.getItem("refreshToken")
            let response
            if(oldRefreshToken) response = await axiosInstance.post('/api/refreshToken', { refreshToken: oldRefreshToken })
            const { accessToken, refreshToken } = response.data

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)

            return true
        } catch(error) {
            // console.error("Error refreshing token: ", error)
            // localStorage.clear()
            // window.location.reload()
            // console.error("Error refreshing token: ", error)
            // let params = window.location.href.split('/')
            // console.log("something happednded")
            // console.log(params)

            
            console.error("Error refreshing token 22: ", error)



            if(window.location.href.includes("/auth/register")) window.location.href = `/auth/signin`
            return false
        }
    }
}

export default authService