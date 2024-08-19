import "./style.scss";
import { ReactNode } from "react";

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon?: ReactNode;
}

export default function Input({
    placeholder,
    icon,
    value,
    onChange,
}: InputProps) {
    return (
        <label className="input-container">
            {icon ? icon : ""}
            <input
                value={value}
                onChange={onChange}
                type="text"
                className="input"
                placeholder={placeholder}
                autoComplete="off"
            />
        </label>
    );
}
