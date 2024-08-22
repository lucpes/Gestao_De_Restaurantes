import "./style.scss";
import { ReactNode } from "react";

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon?: ReactNode;
    error?: string;
}

export default function Input({
    placeholder,
    icon,
    value,
    onChange,
    error = "",
}: InputProps) {
    return (
        <label className={`input-container ${error && "input-error"}`}>
            {icon ? icon : ""}
            <input
                value={value}
                onChange={onChange}
                type="text"
                className="input"
                placeholder={error ? error : placeholder}
                autoComplete="off"
            />
        </label>
    );
}
