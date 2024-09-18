import { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs } from "../../../Firebase/firebaseConfig";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./styles.scss";

export default function AddProductForm() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [categories, setCategories] = useState<{ id: string; name: string; subcategories: string[] }[]>([]);
    const [subcategories, setSubcategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const querySnapshot = await getDocs(collection(db, "ingredients"));
            const categoriesList: { id: string; name: string; subcategories: string[] }[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                categoriesList.push({ id: doc.id, name: data.name, subcategories: data.subcategories });
            });
            setCategories(categoriesList);
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e: { target: { value: any; }; }) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);
        setSubcategories(selectedCategoryData ? selectedCategoryData.subcategories : []);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const newProduct = {
                name,
                quantity: parseInt(quantity),
                category,
                subcategory,
                createdAt: new Date(),
            };
            await addDoc(collection(db, "stockItems"), newProduct);
            setName("");
            setQuantity("");
            setCategory("");
            setSubcategory("");
            alert("Produto adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar produto: ", error);
        }
    };

    return (
        <div className="add-product-form-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do Produto"
                />
                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantidade"
                />
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">Selecione uma Categoria</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
                <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                    <option value="">Selecione uma Subcategoria</option>
                    {subcategories.map((subcat, index) => (
                        <option key={index} value={subcat}>{subcat}</option>
                    ))}
                </select>
                <Button type="submit" onClick={() => {}}>Adicionar Produto</Button>
            </form>
        </div>
    );
}