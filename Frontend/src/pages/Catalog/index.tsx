export default function Catalog() {
    return (
        <header className="ArletteHeader">
            <img src="/assets/ArletteLogo.svg" alt="Arlette Logo" />
            <form className="ArletteSearchForm">
                <input type="text" placeholder="Search..." />
                <button type="submit">Search</button>
            </form>

            <div className="ArletteUserProfile">
                <span>Gwen</span>
                <button type="button">Logout</button>
            </div>
        </header>
    )
}