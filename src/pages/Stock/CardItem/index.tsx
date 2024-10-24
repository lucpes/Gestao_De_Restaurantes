import "./style.scss";
import { ComponentProps, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebaseConfig";


interface CardItemProps extends ComponentProps<"div"> {
    handleModalOpen: VoidFunction;
    productName: string; // Nome do prato
    productQuantity: number; // Quantidade de ingredientes
    productUnit: string; // Unidade dos ingredientes
    ingredients: Array<{
        id: string;
        categoryId: string;
        subcategoryId: string;
        quantity: number;
    }>;
}

export default function CardItem({
    handleModalOpen,
    productName,
    productQuantity,
    productUnit,
    ingredients,
    ...props
}: CardItemProps) {
    const [count, setCount] = useState(0);

    const handleAdd = async () => {
        setCount(count + 1);
        for (const ingredient of ingredients) {
            const ingredientRef = doc(db, `categories/${ingredient.categoryId}/subcategories/${ingredient.subcategoryId}/products/${ingredient.id}`);
            const ingredientDoc = await getDoc(ingredientRef);
            if (ingredientDoc.exists()) {
                const ingredientData = ingredientDoc.data();
                const newQuantity = ingredientData.quantity - ingredient.quantity * (count + 1);
                await updateDoc(ingredientRef, { quantity: newQuantity });
            }
        }
    };

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
                <FaPlus onClick={handleAdd} />
            </div>
        </div>
    );
}
