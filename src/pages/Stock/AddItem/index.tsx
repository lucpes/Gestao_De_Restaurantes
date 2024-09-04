import { useState } from "react";
import { db, collection, addDoc } from "../../../Firebase/firebaseConfig";
import "./style.scss";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function AddItemForm() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await addDoc(collection(db, "stockItems"), {
                name,
                quantity: parseFloat(quantity),
            });
            setName("");
            setQuantity("");
            window.location.reload()
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="add-item-container">
            <h2>Adicionar Novo Item</h2>
                <form onSubmit={handleSubmit}>
                    <Input 
                        type="text"
                        value={name}
                        placeholder="Nome"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input 
                        type="number"
                        value={quantity}
                        placeholder="Kg"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <Button type="submit" onClick={()=>""}>
                        Cadastrar
                    </Button>
                </form>
        </div>
        // <div className="add-item-form">
        //     <h2>Adicionar Novo Item</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label>Nome:</label>
        //             <input
        //                 type="text"
        //                 value={name}
        //                 onChange={(e) => setName(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Quantidade (kg):</label>
        //             <input
        //                 type="number"
        //                 value={quantity}
        //                 onChange={(e) => setQuantity(e.target.value)}
        //                 required
        //                 min="0"
        //             />
        //         </div>
        //         <button type="submit">Adicionar</button>
        //     </form>
        // </div>
    );
}
