import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"

const initialState = {
    name: null,
    email: null,
    accessToken: null,
    refreshToken: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.name = action.payload.displayName;
        },
        logout: (state, action) => {
            console.log("pippo");
            state = initialState;
            return state;
        },
        register: () => {

        }
    }
})
// La creazione di una Slice richiede un nome (stringa) per identificare la Slice,
// un valore di stato iniziale
// e una o più reducer functions per definire come lo stato può essere aggiornato

export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer

