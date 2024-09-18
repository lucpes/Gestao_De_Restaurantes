import { useEffect } from "react";
import { addCategoriesToFirestore } from "../../services/categoryService";

export default function Config() {
    useEffect(() => {
        addCategoriesToFirestore();
    }, []);

    return (
        <div>
            <h1>Configurações</h1>
            <p>Categorias foram adicionadas ao Firestore.</p>
        </div>
    );
}