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

interface DispatchedPlate {
    name: string;
    quantity: number;
}

export default function Report() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [userID, setUserID] = useState<string | null>(null);
    const [dispatchedPlates, setDispatchedPlates] = useState<DispatchedPlate[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
                console.log("User ID set:", user.uid);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userID) {
            fetchDishes(userID);
        }
    }, [userID]);

    useEffect(() => {
        // Recupera os dados do localStorage
        const storedDispatchedPlates = localStorage.getItem("dispatchedPlates");
        if (storedDispatchedPlates) {
            setDispatchedPlates(JSON.parse(storedDispatchedPlates));
        }
    }, []);

    async function fetchDishes(userId: string) {
        try {
            const q = query(collection(db, "dishes"), where("userID", "==", userId));
            const querySnapshot = await getDocs(q);
            const fetchedDishes = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Dish[];
            setDishes(fetchedDishes);
            console.log("Dishes fetched:", fetchedDishes);
        } catch (error) {
            console.error("Erro ao buscar pratos:", error);
        }
    }

    function handleDispatchPlates() {
        console.log("Dispatched Plates before processing:", dispatchedPlates);

        const ingredientsOut: { ingredientName: string; quantity: string }[] = [];

        // Processa os pratos para obter os ingredientes e quantidades
        dispatchedPlates.forEach((plate) => {
            dishes.forEach((dish) => {
                if (plate.name === dish.name) {
                    dish.ingredients.forEach((ingredient) => {
                        ingredientsOut.push({
                            ingredientName: ingredient.name,
                            quantity: (
                                (ingredient.quantity as unknown as number) *
                                plate.quantity
                            ).toString(),
                        });
                    });
                }
            });
        });

        // Calcula a quantidade total de pratos despachados
        const total = dispatchedPlates.reduce(
            (acc, plate) => acc + plate.quantity,
            0
        );

        // Exibe a quantidade de vezes que cada prato foi retirado
        dispatchedPlates.forEach((plate) => {
            console.log(`O prato ${plate.name} foi retirado ${plate.quantity} vezes.`);
        });

        // Atualiza o estado com a quantidade total de pratos despachados
        setDispatchedPlates(dispatchedPlates);
        console.log("Dispatched Plates after processing:", dispatchedPlates);
    }

    return (
        <section className="report-container">
            <div className="title-line">
                <h1>Relatório de Pratos</h1>
            </div>
            <div className="report-content">
                {dishes.length > 0 ? (
                    <ul>
                        {dishes.map((dish) => {
                            const dispatchedPlate = dispatchedPlates.find(
                                (plate) => plate.name === dish.name
                            );
                            return (
                                <li key={dish.id}>
                                    <h3>
                                        {dish.name}{" "}
                                        {dispatchedPlate
                                            ? `x ${dispatchedPlate.quantity}`
                                            : ""}
                                    </h3>
                                    <ul>
                                        {dish.ingredients.map((ingredient, index) => (
                                            <li key={index}>
                                                {ingredient.name} - {ingredient.quantity} {ingredient.type}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>Nenhum prato encontrado.</p>
                )}
            </div>
            <div className="total-dispatched">
                <h2>Total de pratos despachados: {dispatchedPlates.reduce((acc, plate) => acc + plate.quantity, 0)}</h2>
            </div>
            <button onClick={handleDispatchPlates}>Verificar Pratos Despachados</button>
        </section>
    );
}