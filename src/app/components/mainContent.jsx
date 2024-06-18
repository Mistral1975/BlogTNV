import { useDispatch, useSelector } from "react-redux"; // Importa due hook di React Redux: useDispatch e useSelector. useDispatch consente di inviare azioni allo store Redux, mentre useSelector consente di accedere ai dati dallo store Redux.
import { useEffect, useState } from "react"; // Importa due hook di React: useEffect e useState. useEffect consente di eseguire effetti collaterali dopo il rendering del componente o in base alle dipendenze specificate, mentre useState consente di gestire lo stato locale del componente.
import { Header } from "./Header";
import Login from "./Login";
import PostList from "./PostList";
import { AddPost } from "./AddPost";
import { setList } from "../store/postSlice";
export const MainContent = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const postList = useSelector(state => state.post.postList);
    useEffect(() => {
        if (user.email) {
            console.log("Sono loggato, sto caricando la lista")
            fetch('http://localhost:8000/list', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${user.accessToken}`
                },
            }).then(async res => {
                const jsonRes = await res.json();
                console.log("lista caricata", jsonRes);
                dispatch(setList(jsonRes));
            }).catch(e => {
                console.log("Errore");
            })
        }
    }, [user.email])

    return (
        <>
            {<AddPost />}
        </>
    )
}