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
    doc,
    setDoc,
    collection,
    getDocs,
    query,
    where,
    getCategories,
    fetchAllIngredients,
} from "../../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import { FaX } from "react-icons/fa6";

interface Ingredient {
    id: string;
    name: string;
    quantity: number;
    categoryId: string;
    subcategoryId: string;
}

interface Item {
    id?: string;
    name: string;
    ingredients: Ingredient[];
}

interface Category {
    id: string;
    name: string;
    subcategories: {
        id: string;
        name: string;
        products: {
            name: string;
            quantity: string;
            unit: string;
        }[];
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
    const [ingredient, setIngredient] = useState<Ingredient>({
        id: "",
        name: "",
        quantity: 0,
        categoryId: "",
        subcategoryId: "",
    });
    const [userID, setUserID] = useState<string | null>(null);
    const [userDishes, setUserDishes] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subcategories, setSubcategories] = useState<{ id: string; name: string }[]>([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState("");

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
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const category = categories.find(cat => cat.id === selectedCategory);
            if (category) {
                setSubcategories(category.subcategories || []);
            }
        } else {
            setSubcategories([]);
        }
    }, [categories, selectedCategory]);

    async function fetchCategories() {
        const categories = await getCategories();
        console.log('Categorias retornadas:', categories); // Log para verificar os dados retornados
    
        const formattedCategories: Category[] = categories.map((category: any) => ({
            id: category.id,
            name: category.name,
            subcategories: category.subcategories.map((subcategory: any) => ({
                id: subcategory.id,
                name: subcategory.name,
                products: subcategory.products.map((product: any) => ({
                    name: product.name,
                    quantity: product.quantity,
                    unit: product.unit,
                })),
            })),
        }));
    
        console.log('Categorias formatadas:', formattedCategories); // Log para verificar os dados formatados
        setCategories(formattedCategories);
    }

    async function fetchUserDishes(userId: string) {
        try {
            const q = query(
                collection(db, "dishes"),
                where("userID", "==", userId)
            );
            const querySnapshot = await getDocs(q);
            const dishes = querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
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
        if (plate.ingredients.length === 0 || !userID || !selectedCategory || !selectedSubcategory) {
            alert("Por favor, preencha todas as informações!");
            return;
        }
        try {
            console.time("handleSubmit"); // Início da medição de tempo
            // Buscar todos os ingredientes de todas as categorias e subcategorias
            const allIngredients = await fetchAllIngredients();
            // Verificar se os ingredientes do prato estão cadastrados
            const missingIngredients = plate.ingredients.filter(ingredient => 
                !allIngredients.some(ing => ing.name === ingredient.name)
            );
            if (missingIngredients.length > 0) {
                alert(`Os seguintes ingredientes não estão cadastrados: ${missingIngredients.map(ing => ing.name).join(", ")}`);
                console.timeEnd("handleSubmit"); // Fim da medição de tempo
                return;
            }
            // Use o nome do prato como ID do documento
            const dishDocRef = doc(db, "dishes", plate.name); 
            await setDoc(dishDocRef, {
                name: plate.name,
                userID: userID,
                ingredients: plate.ingredients,
            });
            alert("Prato adicionado com sucesso!");
            setIsOpenAdd(false);
            setPlate({ name: "", ingredients: [] });
            fetchUserDishes(userID);
            console.timeEnd("handleSubmit"); // Fim da medição de tempo
        } catch (error) {
            console.error("Erro ao adicionar prato: ", error);
            console.timeEnd("handleSubmit"); // Fim da medição de tempo
        }
    }

    function handleAddIngredient() {
        if (!ingredient.name || !ingredient.quantity || !ingredient.categoryId || !ingredient.subcategoryId) {
            alert("Por favor, preencha todas as informações do ingrediente!");
            return;
        }
        setPlate({
            ...plate,
            ingredients: [...plate.ingredients, ingredient],
        });
        setIngredient({ id: "", name: "", quantity: 0, categoryId: "", subcategoryId: "" });
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
                        ingredients={dish.ingredients} // Ingredientes do prato
                    />
                ))}
                <CiSquarePlus
                    onClick={() => setIsOpenAdd(true)}
                    className="icon"
                    size={"60px"}
                />
                <button className="button-plate">Atribuir pratos</button>
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
                                        {item.name} - {item.quantity} {item.categoryId}
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
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Selecione uma Categoria</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                        >
                            <option value="">Selecione uma Subcategoria</option>
                            {subcategories.map((subcategory) => (
                                <option key={subcategory.id} value={subcategory.id}>
                                    {subcategory.name}
                                </option>
                            ))}
                        </select>

                        <div className="add-ingredient-input-content">
                            <div>
                                <Input
                                    width="150px"
                                    value={ingredient.name}
                                    onChange={(e) => setIngredient({ ...ingredient, name: e.target.value })}
                                    placeholder="Nome do Ingrediente"
                                />
                                <Input
                                    width="100px"
                                    value={ingredient.quantity.toString()}
                                    onChange={(e) =>
                                        setIngredient({
                                            ...ingredient,
                                            quantity: parseFloat(e.target.value),
                                        })
                                    }
                                    placeholder="Quantidade"
                                />
                                <Input
                                    width="100px"
                                    value={ingredient.categoryId}
                                    onChange={(e) =>
                                        setIngredient({
                                            ...ingredient,
                                            categoryId: e.target.value,
                                        })
                                    }
                                    placeholder="Categoria"
                                />
                                <Input
                                    width="100px"
                                    value={ingredient.subcategoryId}
                                    onChange={(e) =>
                                        setIngredient({
                                            ...ingredient,
                                            subcategoryId: e.target.value,
                                        })
                                    }
                                    placeholder="Subcategoria"
                                />
                                <Button onClick={handleAddIngredient}>
                                    Adicionar Ingrediente
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </section>
    );
}