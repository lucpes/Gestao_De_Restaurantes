import React from "react";
import "./style.scss";

const ButtonRedirect = () => {
    const handleRedirect = () => {
        window.location.href = "https://www.loldle.net"; // Substitua com o URL desejado
    };

    return (
        <div className="outer-container">
            <div className="inner-container">
                <button className="big-red-button" onClick={handleRedirect}>
                    🚨 PRESSIONE 🚨
                </button>
            </div>
        </div>
    );
};

export default ButtonRedirect;
