// src/components/Stock.tsx

import { useState, useEffect } from "react";
import { db, collection, getDocs } from "../../Firebase/firebaseConfig";
import CardItem from "./CardItem";
import AddItem from "./AddItem";
import "./style.scss";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "../../components/Modal";

export default function Stock() {
    const [showForm, setShowForm] = useState(false);
    const [items, setItems] = useState<{ id: string, name: string, quantity: number }[]>([]);

    const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(db, "stockItems"));
        const itemsList: { id: string, name: string, quantity: number }[] = [];
        querySnapshot.forEach((doc) => {
            itemsList.push({ id: doc.id, ...doc.data() as any });
        });
        setItems(itemsList);
    };

    useEffect(() => {
        fetchItems();
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
                    onClick={() => setShowForm(true)}
                />
                {items.map(item => (
                    <CardItem key={item.id} name={item.name} />
                ))}
                <Modal isOpen={showForm} onClose={() => setShowForm(false)}> <AddItem /> </Modal>
            </div>
        </section>
    );
}
