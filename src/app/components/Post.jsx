"use client";

import styles from "../list.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Post = ({ item, id }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [selected, setSelected] = useState(false);
    const [edit, setEdit] = useState(false);
    const submitHandler = (item) => {
        alert("Update completato");
        //console.log(item)
        fetch(`http://localhost:8000/${item.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${user.accessToken}`
            },
            body: JSON.stringify({
                title: item.title,
                description: item.description,
                createdAt: new Date(item.createdAt).getTime() / 1000,
            })
        }).then(async res => {
            const response = await res.json();
            setEdit(false);
            dispatch(updatePost(response));
        }).catch(err => {
            console.log(err);
        });
    };
    const handleDelete = () => { // const handleDelete = (item) => {
        fetch(`http://localhost:8000/${item._id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${user.accessToken}`
            },
        }).then(() => { // }).then(async res => {
            dispatch(deletePost(item._id));
        }).catch(err => {
            console.log(err);
        });
    };
    const createdAt = new Date(item.createdAt).toLocaleDateString("it-IT");
    return (
        <div className={item.status === "open" ? styles.item : styles.itemCompleted} key={id} onClick={() => setSelected(!selected)} >
            <div className={styles.date}> {createdAt} </div>
            <div className={styles.postTitle}> {item.title} </div>
            {<div className={styles.postDescription}> {item.description}</div>}
            {<div>Commenti: </div>}
        </div>
    );
};