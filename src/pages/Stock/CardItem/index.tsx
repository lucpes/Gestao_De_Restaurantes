import React, { useState } from "react";
import { updateProduct } from "../../../Firebase/firebaseConfig";
import { FaMinus, FaPlus } from "react-icons/fa";

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
    const [ingredientQuantities, setIngredientQuantities] = useState(
        ingredients.map((ingredient) => ingredient.quantity)
    );

    const handleAdd = async () => {
        console.log(`handleAdd chamado para ${productName}`);
        setCount((prevCount) => {
            const newCount = prevCount + 1;
            console.log(`Contador atualizado: ${newCount}`);
            return newCount;
        });

        if (ingredients.length === 0) {
            console.error("Nenhum ingrediente encontrado.");
            return;
        }

        const newQuantities = ingredientQuantities.map((quantity, index) => {
            const newQuantity = quantity - 1;
            console.log(`Nova quantidade de ${ingredients[index].name}: ${newQuantity}`);
            if (!ingredients[index].categoryId || !ingredients[index].subcategoryId) {
                console.error(`categoryId ou subcategoryId não definido para o ingrediente ${ingredients[index].name}`);
                return quantity; // Retorna a quantidade original se categoryId ou subcategoryId estiver indefinido
            }
            updateProduct(
                ingredients[index].categoryId,
                ingredients[index].subcategoryId,
                ingredients[index].name.toLowerCase(), // Use o nome do ingrediente em minúsculas
                { quantity: newQuantity }
            ).then(() => {
                console.log(`Estoque atualizado de ${ingredients[index].name}: ${newQuantity}`);
            }).catch((error: unknown) => {
                console.error(`Erro ao atualizar o estoque do ingrediente ${ingredients[index].name}: ${error}`);
            });
            return newQuantity;
        });

        setIngredientQuantities(newQuantities);
        console.log("Novas quantidades de ingredientes:", newQuantities);
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