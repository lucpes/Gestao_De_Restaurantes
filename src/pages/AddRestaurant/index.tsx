import { useState } from "react";
import { db, setDoc, doc } from "../../Firebase/firebaseConfig";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./style.scss";

export default function AddRestaurant() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newRestaurant = {
                name,
                location,
                createdAt: new Date(),
            };
            await setDoc(doc(db, "restaurants", name), newRestaurant);
            setName("");
            setLocation("");
            alert("Restaurante adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar restaurante: ", error);
        }
    };

    return (
        <div className="add-restaurant-container">
            <form onSubmit={handleSubmit} className="add-restaurant-form">
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do Restaurante"
                />
                <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Localização"
                />
                <Button type="submit" onClick={() => {}}>Adicionar Restaurante</Button>
            </form>
        </div>
    );
}