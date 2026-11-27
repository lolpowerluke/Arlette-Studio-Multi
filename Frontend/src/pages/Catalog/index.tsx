import styles from "./style.module.css"
export default function Catalog() {
    return (
        <>
        <header>
            <div className="buildYourBuggy">
                <img className={styles.bybImage1} src="./assets/Header1.svg"></img>
                <img className={styles.bybImage2} src="./assets/Header2.svg"></img>
            </div>
        </header>

        <main className="catalog">
            <aside className="filters" aria-label="Filter">
                <div className="filters__header">
                    <h2>Filters</h2>
                    <button type="button" aria-label="Filters wissen">
                        ✕
                    </button>
                </div>
                <form className="filters__form">
                    <select name="Beschikbaarheid">
                        <option 
                    </select>
                </form>
            </aside>
        </main>
        </>
    )
}
