import "./style.scss";
import { ReactNode } from "react";

interface InputProps {
    placeholder: string;
    icon?: ReactNode;
}

export default function Input({ placeholder, icon }: InputProps) {
    return (
        <label className="input-container">
            {icon ? icon : ""}
            <input
                type="text"
                className="input"
                placeholder={placeholder}
                autoComplete="off"
            />
        </label>
    );
}
