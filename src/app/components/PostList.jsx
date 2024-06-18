"use client"
import { PostTitle } from "./PostTitle"
import styles from "../list.module.css"
import Post from "./post"

export default (props) => {
    return (
        <div className={styles.postContainer}>
            <PostTitle title={props.title} />
            {
                props.items.map((u, i) => {
                    return <Post key={i} id={i} item={u} />
                })}
        </div>
    );
}