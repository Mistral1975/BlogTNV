import styles from "../page.module.css"
import Login from "./Login"
import Registration from "./Registration"

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div>
                    <h1 className={styles.title}>BlogTNV</h1>
                    <h3 style={{ opacity: 0.4, marginBottom: "20px" }}>
                        powered by {""}
                        <a href="https://www.instagram.com/italoungari/?hl=it"
                            className={styles.link}>
                            Ita
                        </a>
                    </h3>
                </div>
                <div className={styles.navButtons}>
                    <Registration />
                    <Login />
                </div>
            </div>
        </header>
    )
}
