import { useState, useEffect } from "react";
import { db, collection, addDoc } from "../../../Firebase/firebaseConfig";
import { auth } from "../../../Firebase/firebaseConfig"; // Certifique-se de importar auth
import { onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import "./style.scss";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function AddItemForm() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [userID, setUserID] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verifica se o usuário está autenticado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
                setIsAuthenticated(true);
            } else {
                setUserID(null);
                setIsAuthenticated(false);
                alert(
                    "Você precisa estar autenticado para adicionar itens ao estoque."
                );
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!isAuthenticated) {
            alert("Você precisa estar logado para adicionar itens.");
            return;
        }

        try {
            await addDoc(collection(db, "stockItems"), {
                name,
                quantity: parseFloat(quantity),
                userID, // Adicionando userID ao documento
            });
            setName("");
            setQuantity("");
            window.location.reload();
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
                <Button type="submit" onClick={() => ""}>
                    Cadastrar
                </Button>
            </form>
        </div>
    );
}
