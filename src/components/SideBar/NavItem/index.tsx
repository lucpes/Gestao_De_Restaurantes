import { ComponentProps, ReactNode, useEffect, useState } from "react";
import "./style.scss";
import { useLocation } from "react-router-dom";

interface NavItemProps extends ComponentProps<"div"> {
    label: string;
    icon: ReactNode;
    path?: string;
}

export default function NavItem({ label, icon, path, ...props }: NavItemProps) {
    const [currentPage, setCurrentPage] = useState("");

    const location = useLocation();

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [currentPage, location]);

    return (
        <div
            {...props}
            className={`navitem-container ${
                path === currentPage ? "current-navitem" : ""
            }`}
        >
            <div className="icon-content">{icon}</div>
            <p className="nav-label">{label}</p>
        </div>
    );
}
