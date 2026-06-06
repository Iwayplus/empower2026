import { styled } from "@mui/material"
import Header from "../header/Header"
import { Outlet } from "react-router-dom"
import Footer from "../footer/Footer"
import { useEffect } from "react"
import { getExhibitorProfile, getProfile } from "../../services/api"
import { useDispatch } from "react-redux"
import { setExhibitorProfile, setProfile } from "../../redux/userSlice"


const Component = styled('div')({

})

const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            let response = await getProfile()
            if (response && response.status === 200) {
                dispatch(setProfile(response.data.data))
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            let response = await getExhibitorProfile()
            if (response && response.status === 200) {
                dispatch(setExhibitorProfile(response.data.data))
            }
        }
        fetchData()
    }, [])





    return (
        <Component>
            <Header />
            <Outlet />
            <Footer />
        </Component>
    )
}

export default Home