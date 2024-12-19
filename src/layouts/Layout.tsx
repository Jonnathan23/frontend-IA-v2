import { NavLink, Outlet } from "react-router-dom";


export default function Laout() {


    return (
        <>
            <header className="header">
                <h1 className="header__title">Prediccion de Clases</h1>
                <nav className="nav">
                    <NavLink
                        to={"/"}
                        className={({ isActive }) => isActive ? "active header_link" : "header_link"}
                    >Prediccion</NavLink>

                    <NavLink
                        to={"/predictions"}
                        className={({ isActive }) => isActive ? "active header_link" : "header_link"}
                    >Historial</NavLink>
                </nav>
            </header>

            <main className="main">
                <Outlet />
            </main>
        </>
    )
}