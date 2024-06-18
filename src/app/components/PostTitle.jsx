import styles from "../list.module.css"
export const PostTitle = ({ title, color }) => {
    return (
        <h3 style={{ color }}>
            {title}
        </h3>
    )
}