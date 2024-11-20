import { useState, useEffect } from "react";
import { getDocs, collection, query, where, db } from "../../Firebase/firebaseConfig";
import { auth } from "../../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import "./styles.scss";

interface Ingredient {
    name: string;
    quantity: number;
    type: string;
}

interface Dish {
    id: string;
    name: string;
    ingredients: Ingredient[];
    userID: string;
}

export default function Report() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userID) {
            fetchDishes(userID);
        }
    }, [userID]);

    async function fetchDishes(userId: string) {
        try {
            const q = query(collection(db, "dishes"), where("userID", "==", userId));
            const querySnapshot = await getDocs(q);
            const fetchedDishes = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Dish[];
            setDishes(fetchedDishes);
        } catch (error) {
            console.error("Erro ao buscar pratos: ", error);
        }
    }

    return (
        <section className="report-container">
            <div className="title-line">
                <h1>Relatório de Pratos</h1>
            </div>
            <div className="report-content">
                {dishes.length > 0 ? (
                    <ul>
                        {dishes.map((dish) => (
                            <li key={dish.id}>
                                <h3>{dish.name}</h3>
                                <ul>
                                    {dish.ingredients.map((ingredient, index) => (
                                        <li key={index}>
                                            {ingredient.name} - {ingredient.quantity} {ingredient.type}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum prato encontrado.</p>
                )}
            </div>
        </section>
    );
}