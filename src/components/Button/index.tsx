import { ReactNode } from "react";
import "./style.scss";

interface ButtonProps {
    children: ReactNode;
    onClick: VoidFunction;
}

export default function Button({ children, onClick }: ButtonProps) {
    return (
        <button onClick={onClick}>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="label">{children}</span>
        </button>
    );
}
