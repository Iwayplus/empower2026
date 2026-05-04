import axios from 'axios'
import authService from './authService'

const baseUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_REMOTE_URL

const axiosInstance = axios.create({
    baseURL: baseUrl
})

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken")

    if(accessToken) {
        config.headers['x-access-token'] = accessToken

    }
    return config
}, (error) => {
    return Promise.reject(error)
})

axiosInstance.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config
    if(error.response && error.response.status === 403 && 
       !originalRequest._retry ) {
        originalRequest._retry = true
        const isRefreshSuccessful = await authService.refreshToken()
        if(isRefreshSuccessful) {
            return axiosInstance(originalRequest)
        }
       }
       return Promise.reject(error)
})

export default axiosInstance