import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: null,
        exhibitorProfile: null
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload
        },
        setExhibitorProfile: (state, action) => {
            state.exhibitorProfile = action.payload
        }
    }
})

export const { setProfile, setExhibitorProfile } = userSlice.actions
export default userSlice.reducer