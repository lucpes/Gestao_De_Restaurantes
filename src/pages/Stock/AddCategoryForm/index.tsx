import { useState } from "react";
import { addNewCategory } from "../../../services/categoryService";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./style.scss";

export default function AddCategoryForm() {
    const [categoryName, setCategoryName] = useState("");
    const [subcategories, setSubcategories] = useState("");
    const [collectionName] = useState("categories");

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const subcategoriesArray = subcategories.split(",").map(sub => sub.trim());
            await addNewCategory(collectionName, categoryName, subcategoriesArray);
            setCategoryName("");
            setSubcategories("");
            alert("Nova categoria adicionada com sucesso!");
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unknown error occurred");
            }
        }
    };

    return (
        <div className="add-category-form-container">
            <form onSubmit={handleSubmit} className="add-category-form">
                <Input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Nome da Categoria"
                />
                <Input
                    type="text"
                    value={subcategories}
                    onChange={(e) => setSubcategories(e.target.value)}
                    placeholder="Subcategorias (separadas por vírgula)"
                />
                <Button type="submit" onClick={() => {}}>Adicionar Categoria</Button>
            </form>
        </div>
    );
}