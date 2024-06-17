import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    postList: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setList: (state, action) => {
            console.log("sto caricando la postList su redux")
            state.postList = action.payload
        },
        addToDo: (state, action) => {
            console.log("sto aggiungendo un post su redux");
            state.postList.push(action.payload)
        },
        updatePost: (state, action) => {
            console.log("sto modificando un post su redux")
            const index = state.todoList.findIndex(item => item._id === action.payload._id);
            if (index !== -1) {
                state.postList[index] = action.payload;
            }
        },
        deletePost: (state, action) => {
            console.log("sto eliminando un post su redux")
            state.postList = state.postList.filter(item => item._id !== action.payload);
        }
    }
})

// La creazione di una Slice richiede un nome (stringa) per identificare la Slice,
// un valore di stato iniziale
// e una o più reducer functions per definire come lo stato può essere aggiornato
export const { updatePost, addPost, setList, deletePost } = postSlice.actions;
export default postSlice.reducer
