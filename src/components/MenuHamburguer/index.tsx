import { useState } from "react";
import "./style.scss";

export default function MenuHamburguer() {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    function handleToggleSideBar(e: React.MouseEvent<HTMLLabelElement>) {
        if (e.target instanceof HTMLInputElement) {
            const menuElement = document.querySelector(".side-bar");
            if (isSideBarOpen) {
                menuElement?.classList.remove("open");
                menuElement?.classList.add("close");
                setIsSideBarOpen(false);
            } else {
                menuElement?.classList.remove("close");
                menuElement?.classList.add("open");
                setIsSideBarOpen(true);
            }
        }
    }

    return (
        <label
            onClick={handleToggleSideBar}
            className={`burger`}
            htmlFor="burger"
        >
            <input type="checkbox" id="burger" />
            <span className={!isSideBarOpen ? "span-open" : ""}></span>
            <span className={!isSideBarOpen ? "span-open" : ""}></span>
            <span className={!isSideBarOpen ? "span-open" : ""}></span>
        </label>
    );
}
