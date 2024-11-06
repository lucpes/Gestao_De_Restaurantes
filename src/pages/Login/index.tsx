import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./style.scss";
import { CiUser, CiLock, CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { auth } from "../../Firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home/stock");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <Logo
                    style={{ scale: "0.9", height: "240px" }}
                    color="#3e4684"
                />
                <div className="input-button-content">
                    <Input
                        width="235px"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        icon={<CiUser className="icon" />}
                    />
                    <Input
                        width="200px"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        icon={<CiLock className="icon" />}
                        type="password"
                    />
                    <Button onClick={handleSubmit}>Login</Button>
                </div>
                <div className="links-login">
                    <CiLogin />
                    <a href="/signup">Registrar</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
