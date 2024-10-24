import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { updateProduct } from "../../../Firebase/firebaseConfig";

interface Ingredient {
    id: string;
    name: string;
    quantity: number;
    categoryId: string;
    subcategoryId: string;
}

interface CardItemProps {
    handleModalOpen: () => void;
    productName: string;
    productQuantity: number;
    productUnit: string;
    ingredients: Ingredient[];
}

const CardItem: React.FC<CardItemProps> = ({
    handleModalOpen,
    productName,
    productQuantity,
    productUnit,
    ingredients,
    ...props
}) => {
    const [count, setCount] = useState(0);

    const handleAdd = async () => {
        console.log(`handleAdd chamado para ${productName}`);
        setCount(count + 1);
        console.log(`Contador atualizado: ${count + 1}`);
        for (const ingredient of ingredients) {
            console.log(`Processando ingrediente: ${ingredient.name}`);
            const newQuantity = ingredient.quantity - 1; // Ajuste a lógica de subtração conforme necessário
            console.log(`Nova quantidade de ${ingredient.name}: ${newQuantity}`);
            try {
                await updateProduct(ingredient.categoryId, ingredient.subcategoryId, ingredient.id, { quantity: newQuantity });
                console.log(`Estoque atualizado de ${ingredient.name}: ${newQuantity}`);
            } catch (error) {
                console.error(`Erro ao atualizar o estoque do ingrediente ${ingredient.name}: ${error}`);
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
};

export default CardItem;