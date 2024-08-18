import { ReactNode } from "react";
import "./style.scss";

interface ButtonProps {
    children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
    return (
        <button>
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="label">{children}</span>
        </button>
    );
}
