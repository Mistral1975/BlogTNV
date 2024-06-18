import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Button from "./Button"
import { PostForm } from "./PostForm";
import { addPost } from "../store/postSlice";

export const AddPost = () => {

    const user = useSelector(state => state.user);
    const [showForm, setShowForm] = useState(null);
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch()

    const submitHandler = (data) => {
        console.log("sto aggiungendo un post");
        fetch('http://localhost:8000/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${user.accessToken}`
            },
            body: JSON.stringify({
                name: data.title,
                description: data.description,
                dueDate: new Date(data.dueDate).getTime() / 1000,
            })
        }).then(async res => {
            console.log("post aggiunto");
            dispatch(addPost(await res.json()));
            setShowForm(true);
        }).catch(err => {
            console.log(err);
            setShowForm(false);
        })
    }

    return (
        <>
            {showForm && <PostForm submitHandler={submitHandler} />}
            <Button styles={styles} clickHandler={setShowForm} />
        </>
    )
}
const styles = {
    mainButton: {
        border: "0px",
        borderRadius: "50px",
        backgroundColor: "white",
        width: "100px",
        height: "100px",
    }
}