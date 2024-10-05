import "./style.scss";
import { ComponentProps, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface CardItemProps extends ComponentProps<"div"> {
    handleModalOpen: VoidFunction;
    productName: string; // Nome do prato
    productQuantity: number; // Quantidade de ingredientes
    productUnit: string; // Unidade dos ingredientes
}

export default function CardItem({
    handleModalOpen,
    productName,
    productQuantity,
    productUnit,
    ...props
}: CardItemProps) {
    const [count, setCount] = useState(0);

    return (
        <div {...props} className="carditem-output-container">
            <div className="carditem-title" onClick={handleModalOpen}>
                <p>{productName}</p> {/* Nome do prato */}
            </div>
            <div className="carditem-output-details">
                <p>
                    {productQuantity} {productUnit}
                </p>{" "}
                {/* Exibindo quantidade e unidade */}
            </div>
            <div className="carditem-output-controller">
                <FaMinus onClick={() => setCount((count) => count - 1)} />
                <div className="counter">
                    <p>{count}</p>
                </div>
                <FaPlus onClick={() => setCount((count) => count + 1)} />
            </div>
        </div>
    );
}
