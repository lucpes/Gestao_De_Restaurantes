import { ReactNode } from "react";
import "./style.scss";

interface NavItemProps {
    label: string;
    icon: ReactNode;
    onClick: VoidFunction;
}

export default function NavItem({ label, icon, onClick }: NavItemProps) {
    return (
        <div onClick={onClick} className="navitem-container">
            <div className="icon-content">{icon}</div>
            <p className="nav-label">{label}</p>
        </div>
    );
}
