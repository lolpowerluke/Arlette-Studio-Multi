import styles from './style.module.css';

export default function Header() {
    return (
        <>
        <header className={styles.header}>
            <img src="/assets/ArletteLogo.svg" alt="Arlette Logo" />
            <form className={styles.searchForm}>
                <input type="text" placeholder="Zoeken" />
                <button className={styles.btnSearch} type="submit">
                    <img src="/assets/search.svg"></img>
                </button>
            </form>

            <div className={styles.userProfile}>
                <span>Gwen</span>
                <button className="btnSmall" type="button">Logout</button>
            </div>
        </header>
        </>
    )
}
