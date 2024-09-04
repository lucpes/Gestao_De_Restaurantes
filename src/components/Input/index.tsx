import React, { useState } from "react";
import "./style.scss";
import { ReactNode } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon?: ReactNode;
    error?: string;
    type?: string;
}

export default function Input({
    placeholder,
    icon,
    value,
    onChange,
    error = "",
    type = "text"
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <label className={`input-container ${error && "input-error"}`}>
            {icon && <span className="input-icon">{icon}</span>}
            <input
                value={value}
                onChange={onChange}
                type={type === "password" && !showPassword ? "password" : "text"}
                className="input"
                placeholder={error ? error : placeholder}
                autoComplete="off"
            />
            {type === "password" && (
                <span
                    className="toggle-password"
                    onClick={handleTogglePassword}
                >
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
            )}
        </label>
    );
}
