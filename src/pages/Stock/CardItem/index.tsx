import "./style.scss";
import { ComponentProps, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface CardItemProps extends ComponentProps<"div"> {
    handleModalOpen: VoidFunction;
    productName: string; // Nome do prato
    productQuantity: number; // Quantidade de ingredientes
    productUnit: string; // Unidade dos ingredientes
    returnQuantity?: (name: string, quantity: number) => void;
}

export default function CardItem({
    handleModalOpen,
    productName,
    productQuantity,
    productUnit,
    returnQuantity,
    ...props
}: CardItemProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        returnQuantity && returnQuantity(productName, count);
    }, [count]);

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
                <FaMinus onClick={() => count > 0 && setCount(count - 1)} />{" "}
                <div className="counter">
                    <p>{count}</p>
                </div>
                <FaPlus onClick={() => setCount(count + 1)} />
            </div>
        </div>
    );
}
