import React, { useEffect, useState } from "react";
import "./style.scss";
import { ReactNode } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiX } from "react-icons/fi";

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setValue?: (value: string) => void;
    placeholder: string;
    icon?: ReactNode;
    error?: string;
    type?: string;
    data?: string[];
    width?: string;
}

export default function Input({
    placeholder,
    icon,
    value,
    onChange,
    setValue,
    error = "",
    type = "text",
    data,
    width = "240px",
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const [isBoxOpen, setIsBoxOpen] = useState(true);
    const [isManuallyClosed, setIsManuallyClosed] = useState(false);

    const highlightText = (name: string, value: string) => {
        const normalizedValue = value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
        const normalizedName = name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        const startIndex = normalizedName.indexOf(normalizedValue);

        if (startIndex === -1 || !value) {
            return <span>{name}</span>;
        }

        const beforeMatch = name.slice(0, startIndex);
        const match = name.slice(startIndex, startIndex + value.length);
        const afterMatch = name.slice(startIndex + value.length);

        return (
            <span>
                {beforeMatch}
                <span style={{ color: "#3e4684", fontWeight: 600 }}>
                    {match}
                </span>
                {afterMatch}
            </span>
        );
    };

    const filteredData = data?.filter((name) => {
        if (value) {
            const normalizedValue = value
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
            const normalizedName = name
                ?.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
            return normalizedName.includes(normalizedValue);
        }
        return true;
    });

    const filteredEqualData = data?.filter((name) => {
        if (value) {
            return name === value;
        }
        return false;
    });

    useEffect(() => {
        if (filteredEqualData?.length && filteredEqualData?.length > 0) {
            setIsBoxOpen(false);
        } else if (!isManuallyClosed) {
            setIsBoxOpen(true);
        }
    }, [value, filteredEqualData, isManuallyClosed]);

    const handleTogglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    const boxCondition =
        filteredData && filteredData.length > 0 && value && isBoxOpen;
    return (
        <label
            className={`input-container ${
                boxCondition ? "input-box-open" : ""
            } ${error && "input-error"}`}
        >
            {icon && <span className="input-icon">{icon}</span>}
            <input
                style={{ width: width }}
                value={value}
                onChange={onChange}
                type={
                    type === "password" && !showPassword ? "password" : "text"
                }
                className={`input`}
                placeholder={error ? error : placeholder}
                autoComplete="off"
            />

            {boxCondition && (
                <div style={{ width: width }} className="input-box-container">
                    <ul className="input-box-content">
                        {filteredData.map((name, index) => (
                            <li
                                onClick={() => {
                                    setValue!(name);
                                    setIsBoxOpen(false);
                                }}
                                key={index}
                            >
                                {highlightText(name, value)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

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
