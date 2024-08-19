import { Outlet } from "react-router-dom";
import MenuHamburguer from "./components/MenuHamburguer";
import SideBar from "./components/SideBar";

export default function Layout() {
    return (
        <main>
            <SideBar />
            <MenuHamburguer />
            <Outlet />
        </main>
    );
}
