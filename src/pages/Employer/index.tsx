import { useState, useEffect } from "react";
import { db, collection, getDocs, setDoc, doc } from "../../Firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./style.scss";

interface Restaurant {
    id: string;
    name: string;
    location: string;
}

export default function Employer() {
    const [employeeName, setEmployeeName] = useState("");
    const [employeePosition, setEmployeePosition] = useState("funcionario");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            const querySnapshot = await getDocs(collection(db, "restaurants"));
            const restaurantsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Restaurant[];
            setRestaurants(restaurantsList);
        };
        fetchRestaurants();
    }, []);

    const handleRegisterEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRestaurant) {
            alert("Por favor, selecione um restaurante.");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
            const newEmployee = {
                name: employeeName,
                position: employeePosition,
                email,
                userId: userCredential.user.uid,
                createdAt: new Date(),
            };
            await setDoc(doc(db, `restaurants/${selectedRestaurant}/employees`, email), newEmployee);
            setEmployeeName("");
            setEmployeePosition("funcionario");
            setEmail("");
            setPassword("");
            setSelectedRestaurant(null);
            alert("Funcionário registrado com sucesso!");
        } catch (error) {
            console.error("Erro ao registrar funcionário: ", error);
        }
    };

    const handleMouseEnter = (location: string) => {
        setHoveredLocation(location);
    };

    const handleMouseLeave = () => {
        setHoveredLocation(null);
    };

    return (
        <div className="employer-container">
            <form onSubmit={handleRegisterEmployee} className="employer-form">
                <Input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Nome do Funcionário"
                />
                <select
                    value={employeePosition}
                    onChange={(e) => setEmployeePosition(e.target.value)}
                >
                    <option value="funcionario">Funcionário</option>
                    <option value="gerente">Gerente</option>
                </select>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                />
                <div className="restaurant-selection">
                    <label>Selecione o Restaurante:</label>
                    {restaurants.map(restaurant => (
                        <div
                            key={restaurant.id}
                            onMouseEnter={() => handleMouseEnter(restaurant.location)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <input
                                type="radio"
                                name="restaurant"
                                value={restaurant.id}
                                checked={selectedRestaurant === restaurant.id}
                                onChange={() => setSelectedRestaurant(restaurant.id)}
                            />
                            <label>{restaurant.name}</label>
                        </div>
                    ))}
                </div>
                <Button type="submit" onClick={() => {}}>Registrar Funcionário</Button>
            </form>
            {hoveredLocation && (
                <div className="hovered-location">
                    <p>Localização: {hoveredLocation}</p>
                </div>
            )}
        </div>
    );
}