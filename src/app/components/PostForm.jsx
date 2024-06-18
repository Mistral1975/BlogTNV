"use client"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addPost } from "../store/postSlice"
import styles from "../list.module.css"

export const PostForm = (props) => {
    const [input, setInput] = useState({
        title: props.data?.name || "",
        description: props.data?.description || "",
        dueDate: props.data?.dueDate ? formatDate(props.data.dueDate) : "",
        id: props.data?._id || "",
        hashtags: props.data?.tags || ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(
            prevValue => {
                return {
                    ...prevValue,
                    [name]: value
                }
            }
        )
    }

    return (
        <>
            <form className={styles.form}>
                <input className={styles.input} type={'text'} name={'title'} placeholder={"titolo"} value={input.title} onChange={(e) => handleChange(e)} />
                <input className={styles.input} type={'text'} name={'description'} placeholder={"descrzione"} value={input.description} onChange={(e) => handleChange(e)} />
                <input className={styles.input} type={'date'} name={'dueDate'} placeholder={"Data creazione"} value={input.dueDate} onChange={(e) => handleChange(e)} />
                <input className={styles.input} type={'text'} name={'tags'} placeholder={"Hashtags"} value={input.tags} onChange={(e) => handleChange(e)} />
            </form>
            <button className={styles.button} onClick={() => props.submitHandler(input)}> Post </button>
        </>
    )
}