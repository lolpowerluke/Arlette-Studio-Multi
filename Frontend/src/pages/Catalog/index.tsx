import styles from "./style.module.css"
import sidebar from "../../components/SidebarFilter"
import Byb from "@/components/Byb";

export default function Catalog() {
    return (
        <>
        <header>
            <Byb />
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

                    </select>
                </form>
            </aside>
        </main>
        </>
    )
}
