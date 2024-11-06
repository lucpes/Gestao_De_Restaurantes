import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { updateProduct } from "../../Firebase/firebaseConfig";

interface Ingredient {
    id: string;
    name: string;
    quantity: number;
    categoryId: string;
    subcategoryId: string;
}

interface TestStockProps {
    productName: string;
    ingredients: Ingredient[];
}

const TestStock: React.FC<TestStockProps> = ({ productName, ingredients }) => {
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

        const newQuantities = ingredientQuantities.map((quantity, index) => {
            const newQuantity = quantity - 1;
            console.log(`Nova quantidade de ${ingredients[index].name}: ${newQuantity}`);
            updateProduct(
                ingredients[index].categoryId,
                ingredients[index].subcategoryId,
                ingredients[index].name.toLowerCase(), // Use o nome do ingrediente em minúsculas
                { quantity: newQuantity }
            ).then(() => {
                console.log(`Estoque atualizado de ${ingredients[index].name}: ${newQuantity}`);
            }).catch((error) => {
                console.error(`Erro ao atualizar o estoque do ingrediente ${ingredients[index].name}: ${error}`);
            });
            return newQuantity;
        });

        setIngredientQuantities(newQuantities);
        console.log("Novas quantidades de ingredientes:", newQuantities);
    };

    return (
        <div className="test-stock-container">
            <h1>{productName}</h1>
            <div className="ingredient-list">
                <h2>Ingredientes</h2>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={ingredient.id}>
                            {ingredient.name}: {ingredientQuantities[index]}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="counter-controller">
                <FaMinus onClick={() => count > 0 && setCount(count - 1)} />
                <div className="counter">
                    <p>{count}</p>
                </div>
                <FaPlus onClick={handleAdd} />
            </div>
        </div>
    );
};

export default TestStock;