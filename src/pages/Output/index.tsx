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
    getCategories,
    updateProduct,
} from "../../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import { FaX } from "react-icons/fa6";

interface Ingredient {
    id?: string;
    name: string;
    quantity: string;
    type: string;
}

interface Item {
    id?: string;
    name: string;
    ingredients: Ingredient[];
}

interface Product {
    id: string;
    name: string;
    unit: string;
    quantity: number;
}

interface Subcategory {
    id: string;
    name: string;
    products: Product[];
}

interface Category {
    id: string;
    name: string;
    subcategories: Subcategory[];
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
    const [categories, setCategories] = useState<Category[]>([]);
    const [userID, setUserID] = useState<string | null>(null);
    const [userDishes, setUserDishes] = useState<Item[]>([]);
    const [ingredientsList, setIngredientList] = useState<string[]>([]);
    const [dispatchedPlates, setDispatchedPlates] = useState<
        {
            name: string;
            quantity: number;
        }[]
    >([]);

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

    useEffect(() => {
        async function fetchCategories() {
            try {
                const producstListFecthed: string[] = [];
                const categories = await getCategories();
                const formattedCategories = categories.map((category: any) => ({
                    ...category,
                    subcategories: category.subcategories.map(
                        (subcategory: any) => ({
                            ...subcategory,
                            products: subcategory.products.map(
                                (product: any) => ({
                                    ...product,
                                    name: product.name || "",
                                    quantity: product.quantity || 0,
                                    unit: product.unit || "",
                                })
                            ),
                        })
                    ),
                }));

                setCategories(formattedCategories);

                formattedCategories.forEach((categorie: Category) =>
                    categorie.subcategories.forEach((subcategorie) =>
                        subcategorie.products.forEach((products) =>
                            producstListFecthed.push(products.name)
                        )
                    )
                );

                setIngredientList(producstListFecthed);
            } catch (error) {
                console.error("erro ao carregar dados: ", error);
            }
        }
        fetchCategories();
    }, []);

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

    function handleDeleteIngredient(name: string) {
        const newIngredients = plate.ingredients.filter(
            (ingredient) => ingredient.name !== name
        );
        setPlate({ ...plate, ingredients: newIngredients });
    }

    async function handleSubmit() {
        console.log(plate.ingredients.length, userID);
        if (plate.ingredients.length === 0 || !userID) {
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

    async function handleDispatchPlates() {
        const ingredientsOut: { ingredientName: string; quantity: string }[] =
            [];

        // Processa os pratos para obter os ingredientes e quantidades
        dispatchedPlates.forEach((plate) => {
            userDishes.forEach((dishe) => {
                if (plate.name === dishe.name) {
                    dishe.ingredients.forEach((ingredient) => {
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

        // Atualiza os produtos no banco de dados com a quantidade temporária inicial
        for (const category of categories) {
            for (const subcategory of category.subcategories) {
                for (const product of subcategory.products) {
                    // Armazena a quantidade inicial em uma variável temporária
                    let updatedQuantity = product.quantity;

                    for (const ingredient of ingredientsOut) {
                        if (ingredient.ingredientName === product.name) {
                            // Atualiza a quantidade com base na quantidade do ingrediente
                            updatedQuantity -= Number(ingredient.quantity);
                        }
                    }

                    // Após atualizar a quantidade, realiza a atualização no banco
                    if (updatedQuantity !== product.quantity) {
                        // Apenas atualiza se houver mudança
                        await updateProduct(
                            category.id,
                            subcategory.id,
                            product.id,
                            {
                                ...product,
                                quantity: updatedQuantity,
                            }
                        );
                    }
                }
            }
        }

        // Recarrega a página após todas as atualizações
        window.location.reload();
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
                        returnQuantity={(name, quantity) => {
                            setDispatchedPlates((prevPlates) => {
                                const itemExists = prevPlates.find(
                                    (item) => item.name === name
                                );

                                if (itemExists) {
                                    return prevPlates
                                        .map((item) =>
                                            item.name === name
                                                ? { ...item, quantity }
                                                : item
                                        )
                                        .filter((item) => item.quantity > 0);
                                } else if (quantity > 0) {
                                    return [...prevPlates, { name, quantity }];
                                }

                                return prevPlates;
                            });
                        }}
                    />
                ))}
                <CiSquarePlus
                    onClick={() => setIsOpenAdd(true)}
                    className="icon"
                    size={"60px"}
                />
                <button onClick={handleDispatchPlates} className="button-plate">
                    Atribuir pratos
                </button>
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
                        <div className="add-ingredient-input-content">
                            <div>
                                <Input
                                    width="150px"
                                    value={ingredient.name}
                                    data={ingredientsList}
                                    setValue={(name) =>
                                        setIngredient({
                                            ...ingredient,
                                            name: name,
                                        })
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
                                    width="100px"
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
                                    data={["gramas", "kg", "litros", "ml"]}
                                    width="100px"
                                    value={ingredient.type}
                                    setValue={(name) =>
                                        setIngredient({
                                            ...ingredient,
                                            type: name,
                                        })
                                    }
                                    onChange={(e) =>
                                        setIngredient({
                                            ...ingredient,
                                            type: e.target.value,
                                        })
                                    }
                                    placeholder="Tipo"
                                />
                            </div>
                            <Button width="100%" onClick={handleAddIngredient}>
                                Adicionar Ingrediente
                            </Button>
                        </div>
                        {plate.ingredients.length > 0 && (
                            <>
                                <div className="ingredients-container">
                                    <h3 style={{ margin: 0 }}>
                                        Ingredientes salvos
                                    </h3>
                                    <div className="ingredients-content">
                                        {plate.ingredients.map(
                                            (ingredient, index) => (
                                                <p
                                                    key={index}
                                                    onClick={() =>
                                                        handleDeleteIngredient(
                                                            ingredient.name
                                                        )
                                                    }
                                                >
                                                    {ingredient.name} |{" "}
                                                    {ingredient.quantity}{" "}
                                                    {ingredient.type}
                                                    <FaX size={14} />
                                                </p>
                                            )
                                        )}
                                    </div>
                                </div>
                                <Button width="100%" onClick={handleSubmit}>
                                    Salvar Prato
                                </Button>
                            </>
                        )}
                    </div>
                </Modal>
            </div>
        </section>
    );
}
