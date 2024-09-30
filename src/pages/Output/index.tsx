import { useState } from "react";
import CardItem from "../Stock/CardItem";
import "./style.scss";
import { CiLock, CiSquarePlus, CiUser } from "react-icons/ci";
import { IoRestaurantOutline } from "react-icons/io5";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { type } from "os";

interface Item {
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
    const ingredientsList = [
        "chuchu",
        "banana",
        "arroz",
        "feijão",
        "peixe",
        "ovo",
        "castanha",
        "batata",
        "batata doce",
    ];

    function handleCardItem(item: Item) {
        setCurrentItem(item);
        setIsOpenPlate(true);
    }

    function handleSubmit() {}

    return (
        <section className="output-container">
            <div className="title-line">
                <h1>Saída de pratos</h1>
            </div>
            <div className="cards-content">
                <CardItem
                    handleModalOpen={() =>
                        handleCardItem({
                            name: "Camarão Internacional",
                            ingredients: [],
                        })
                    }
                />
                <CardItem
                    handleModalOpen={() =>
                        handleCardItem({
                            name: "Camarão Internacional",
                            ingredients: [],
                        })
                    }
                />
                <CardItem
                    handleModalOpen={() =>
                        handleCardItem({
                            name: "Camarão Internacional",
                            ingredients: [],
                        })
                    }
                />
                <CardItem
                    handleModalOpen={() =>
                        handleCardItem({
                            name: "Camarão Internacional",
                            ingredients: [],
                        })
                    }
                />
                <CardItem
                    handleModalOpen={() =>
                        handleCardItem({
                            name: "Camarão Internacional",
                            ingredients: [],
                        })
                    }
                />
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
                            <h3>{currentItem.name}</h3>
                            <ul>
                                {currentItem.ingredients.map((item, index) => (
                                    <li key={index}>{item.name}</li>
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
                            data={ingredientsList}
                            onChange={(e) =>
                                setIngredient({
                                    ...ingredient,
                                    name: e.target
                                        .value! as React.ChangeEvent<HTMLInputElement>,
                                })
                            }
                            placeholder="Nome do Igrediente"
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
                        <Button onClick={handleSubmit}>Login</Button>
                    </div>
                </Modal>
            </div>
        </section>
    );
}
