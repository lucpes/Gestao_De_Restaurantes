import { useState, useEffect } from "react";
import { db, collection, getDocs } from "../../Firebase/firebaseConfig";
import CardItem from "./CardItem";
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import AddItemForm from "./AddItemForm";
import "./style.scss";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

export default function Stock() {
    const [showProductForm, setShowProductForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showItemForm, setShowItemForm] = useState(false);
    const [items, setItems] = useState<{ id: string, name: string, quantity: number }[]>([]);
    const [categories, setCategories] = useState<{ id: string, name: string, items: any[] }[]>([]);

    const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(db, "stockItems"));
        const itemsList: { id: string, name: string, quantity: number }[] = [];
        querySnapshot.forEach((doc) => {
            itemsList.push({ id: doc.id, ...doc.data() as any });
        });
        setItems(itemsList);
    };

    const fetchCategories = async () => {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesList: { id: string, name: string, items: any[] }[] = [];
        querySnapshot.forEach((doc) => {
            categoriesList.push({ id: doc.id, ...doc.data() as any });
        });
        setCategories(categoriesList);
    };

    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, []);

    return (
        <section className="stock-container">
            <div className="title-line">
                <h1>Estoque</h1>
            </div>
            <div className="cards-content">
                <CiSquarePlus
                    className="icon"
                    size={"60px"}
                    onClick={() => setShowProductForm(true)}
                />
                {items && items.map(item => (
                    <CardItem key={item.id} name={item.name} />
                ))}
                {categories && categories.map(category => (
                    <div key={category.id}>
                        <h2>{category.name}</h2>
                        <ul>
                            {category.items && category.items.map((item, index) => (
                                <li key={index}>{typeof item === "string" ? item : item.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                <Modal isOpen={showProductForm} onClose={() => setShowProductForm(false)}>
                    <AddProductForm />
                </Modal>
                <Modal isOpen={showCategoryForm} onClose={() => setShowCategoryForm(false)}>
                    <AddCategoryForm />
                </Modal>
                <Modal isOpen={showItemForm} onClose={() => setShowItemForm(false)}>
                    <AddItemForm />
                </Modal>
                <Button onClick={() => setShowCategoryForm(true)}>Adicionar Categoria</Button>
                <Button onClick={() => setShowItemForm(true)}>Adicionar Item</Button>
            </div>
        </section>
    );
}