import { ReactNode } from "react";
import "./style.scss";

interface ButtonProps {
    children: ReactNode;
    onClick: VoidFunction;
    type?: "button" | "submit" | "reset" | undefined;
}

export default function Button({
    children,
    onClick,
    type = "button",
}: ButtonProps) {
    return (
        <button className="button-container" type={type} onClick={onClick}>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="label">{children}</span>
        </button>
    );
}
