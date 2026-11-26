import styles from './style.module.css';

export default function Catalog() {
    return (
        <header className={styles.arletteHeader}>
            <img src="/assets/ArletteLogo.svg" alt="Arlette Logo" />
            <form className={styles.arletteSearchForm}>
                <input type="text" placeholder="Search..." />
                <button className="btn" type="submit">Search</button>
            </form>

            <div className={styles.arletteUserProfile}>
                <span>Gwen</span>
                <button className="btn" type="button">Logout</button>
            </div>
        </header>
    )
}