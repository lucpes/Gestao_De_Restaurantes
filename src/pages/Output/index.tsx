import { useState, useEffect } from "react";
import CardItem from "../Stock/CardItem"; // Certifique-se de que o caminho esteja correto
import "./style.scss";
import { IoRestaurantOutline } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {
    auth,
    db,
    addDoc,
    collection,
    getDocs,
    query,
    where,
} from "../../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth"; // Firebase Auth

interface Item {
    id?: string;
    name: string;
    ingredients: {
        name: string;
        quantity: string;
        type: string;
    }[];
}

export default function Output() {
    const [isOpenPlate, setIsOpenPlate] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [currentItem, setCurrentItem] = useState<Item | null>(null);
    const [plate, setPlate] = useState<Item>({
        name: "",
        ingredients: [],
    });
    const [ingredient, setIngredient] = useState({
        name: "",
        quantity: "",
        type: "",
    });
    const [userID, setUserID] = useState<string | null>(null);
    const [userDishes, setUserDishes] = useState<Item[]>([]);

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
            fetchUserDishes(userID);
        }
    }, [userID]);

    async function fetchUserDishes(userId: string) {
        try {
            const q = query(
                collection(db, "dishes"),
                where("userID", "==", userId)
            );
            const querySnapshot = await getDocs(q);
            const dishes = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Item[];
            setUserDishes(dishes);
        } catch (error) {
            console.error("Erro ao buscar pratos: ", error);
        }
    }

    function handleCardItem(item: Item) {
        setCurrentItem(item);
        setIsOpenPlate(true);
    }

    async function handleSubmit() {
        if (!plate.name || plate.ingredients.length === 0 || !userID) {
            alert("Por favor, preencha todas as informações!");
            return;
        }

        try {
            await addDoc(collection(db, "dishes"), {
                name: plate.name,
                userID: userID,
                ingredients: plate.ingredients,
            });

            alert("Prato adicionado com sucesso!");
            setIsOpenAdd(false);
            setPlate({ name: "", ingredients: [] });
            fetchUserDishes(userID);
        } catch (error) {
            console.error("Erro ao adicionar prato: ", error);
        }
    }

    function handleAddIngredient() {
        if (!ingredient.name || !ingredient.quantity || !ingredient.type) {
            alert("Por favor, preencha todas as informações do ingrediente!");
            return;
        }
        setPlate({
            ...plate,
            ingredients: [...plate.ingredients, ingredient],
        });
        setIngredient({ name: "", quantity: "", type: "" });
    }

    return (
        <section className="output-container">
            <div className="title-line">
                <h1>Seus pratos</h1>
            </div>
            <div className="cards-content">
                {userDishes.map((dish) => (
                    <CardItem
                        key={dish.id}
                        handleModalOpen={() => handleCardItem(dish)}
                        productName={dish.name} // Nome do prato
                        productQuantity={dish.ingredients.length} // Quantidade de ingredientes
                        productUnit="ingredientes" // Unidade padrão
                    />
                ))}
                <CiSquarePlus
                    onClick={() => setIsOpenAdd(true)}
                    className="icon"
                    size={"60px"}
                />
                <Modal
                    isOpen={isOpenPlate}
                    onClose={() => setIsOpenPlate(false)}
                >
                    {currentItem && (
                        <div className="modal-item">
                            <h3>{currentItem.name}</h3> {/* Nome do prato */}
                            <ul>
                                {currentItem.ingredients.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - {item.quantity}{" "}
                                        {item.type}
                                    </li>
                                ))}
                            </ul>
                            <div className="modal-button">
                                <Button onClick={() => ""}>Excluir</Button>
                            </div>
                        </div>
                    )}
                </Modal>

                <Modal isOpen={isOpenAdd} onClose={() => setIsOpenAdd(false)}>
                    <div className="modal-add-plate">
                        <h2 className="modal-add-title">
                            Adicionar Novo Prato
                        </h2>
                        <Input
                            value={plate.name}
                            onChange={(e) =>
                                setPlate({ ...plate, name: e.target.value })
                            }
                            placeholder="Nome do Prato"
                            icon={<IoRestaurantOutline size={20} />}
                        />
                        <Input
                            value={ingredient.name}
                            data={["chuchu", "banana", "arroz", "feijão"]} // Exemplo de lista
                            setValue={(name) =>
                                setIngredient({ ...ingredient, name: name })
                            }
                            onChange={(e) =>
                                setIngredient({
                                    ...ingredient,
                                    name: e.target.value,
                                })
                            }
                            placeholder="Nome do Ingrediente"
                        />
                        <Input
                            value={ingredient.quantity}
                            onChange={(e) =>
                                setIngredient({
                                    ...ingredient,
                                    quantity: e.target.value,
                                })
                            }
                            placeholder="Quantidade"
                        />
                        <Input
                            value={ingredient.type}
                            onChange={(e) =>
                                setIngredient({
                                    ...ingredient,
                                    type: e.target.value,
                                })
                            }
                            placeholder="Tipo"
                        />
                        <Button onClick={handleAddIngredient}>
                            Adicionar Ingrediente
                        </Button>
                        <Button onClick={handleSubmit}>Salvar Prato</Button>
                    </div>
                </Modal>
            </div>
        </section>
    );
}
