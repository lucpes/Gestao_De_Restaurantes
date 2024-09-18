import { useState } from "react";
import { db, collection, addDoc, updateDoc, doc } from "../../../Firebase/firebaseConfig";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import categories from "../../../services/categoryData";
import "./style.scss";

export default function AddItemForm() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [quantity, setQuantity] = useState("");
    const [newItemName, setNewItemName] = useState("");
    const [newItemUnit, setNewItemUnit] = useState("kg");

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Lógica para adicionar o item ao estoque
        alert(`Item adicionado: ${selectedItem}, Quantidade: ${quantity}`);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory("");
        setSelectedItem("");
    };

    const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubcategory(e.target.value);
        setSelectedItem("");
    };

    const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(e.target.value);
    };

    const handleAddNewItem = async () => {
        if (!selectedCategory || !selectedSubcategory || !newItemName) {
            alert("Por favor, selecione uma categoria, subcategoria e insira o nome do novo item.");
            return;
        }

        const selectedCategoryObj = categories.find(cat => cat.name === selectedCategory);
        const selectedSubcategoryObj = selectedCategoryObj?.subcategories.find(sub => sub.name === selectedSubcategory);

        if (selectedSubcategoryObj) {
            selectedSubcategoryObj.items.push({ name: newItemName, quantity: 0, unit: newItemUnit });

            // Atualizar a subcategoria no Firestore
            if (selectedCategoryObj && selectedCategoryObj.id) {
                const categoryDoc = doc(db, "categories", selectedCategoryObj.id.toString());
                await updateDoc(categoryDoc, {
                    subcategories: selectedCategoryObj.subcategories
                });
            } else {
                alert("Erro ao adicionar o novo item: Categoria ou Subcategoria não encontrada.");
            }

            alert(`Novo item adicionado: ${newItemName}`);
            setNewItemName("");
        }
    };

    const selectedCategoryObj = categories.find(cat => cat.name === selectedCategory);
    const selectedSubcategoryObj = selectedCategoryObj?.subcategories.find(sub => sub.name === selectedSubcategory);

    return (
        <div className="add-item-form-container">
            <form onSubmit={handleSubmit} className="add-item-form">
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Selecione uma Categoria</option>
                    {categories.map(category => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                </select>
                {selectedCategory && (
                    <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
                        <option value="">Selecione uma Subcategoria</option>
                        {selectedCategoryObj?.subcategories.map(subcategory => (
                            <option key={subcategory.name} value={subcategory.name}>{subcategory.name}</option>
                        ))}
                    </select>
                )}
                {selectedSubcategory && (
                    <select value={selectedItem} onChange={handleItemChange}>
                        <option value="">Selecione um Item</option>
                        {selectedSubcategoryObj?.items.map(item => (
                            <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                )}
                {selectedItem && (
                    <Input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantidade (kg ou g)"
                    />
                )}
                <Button type="submit" onClick={() => {}}>Adicionar Item</Button>
            </form>
            <div className="add-new-item">
                <Input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Novo Item"
                />
                <select value={newItemUnit} onChange={(e) => setNewItemUnit(e.target.value)}>
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="litros">litros</option>
                </select>
                <Button type="submit" onClick={() => {}}>Adicionar Novo Item</Button>
            </div>
        </div>
    );
}