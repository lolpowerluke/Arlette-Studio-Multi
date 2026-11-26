import styles from './style.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <img src="/assets/ArletteLogo.svg" alt="Arlette Logo" />
            <form className={styles.searchForm}>
                <input type="text" placeholder="Search..." />
                <button className="btn" type="submit">Search</button>
            </form>

            <div className={styles.userProfile}>
                <span>Gwen</span>
                <button className="btn" type="button">Logout</button>
            </div>
        </header>
    )
}
