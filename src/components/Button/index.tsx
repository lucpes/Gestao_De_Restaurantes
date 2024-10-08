import { ReactNode } from "react";
import "./style.scss";

interface ButtonProps {
    children: ReactNode;
    onClick: VoidFunction;
    type?: "button" | "submit" | "reset" | undefined;
    width?: string;
}

export default function Button({
    children,
    onClick,
    type = "button",
    width = "150px",
}: ButtonProps) {
    return (
        <button
            style={{ width: width }}
            className="button-container"
            type={type}
            onClick={onClick}
        >
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="label">{children}</span>
        </button>
    );
}
