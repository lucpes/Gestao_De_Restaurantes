import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./style.scss";
import { CiUser, CiLock, CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPasssword] = useState("");
    const navigate = useNavigate();

    function handleSubmit() {
        navigate("/home");
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <img
                    className="logo-image"
                    src="assets/svg/logo.svg"
                    alt="logo"
                />
                <div className="input-button-content">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        icon={<CiUser className="icon" />}
                    />
                    {email}
                    <Input
                        value={password}
                        onChange={(e) => setPasssword(e.target.value)}
                        placeholder="Senha"
                        icon={<CiLock className="icon" />}
                    />
                    <Button onClick={handleSubmit}>Login</Button>
                </div>
                <div className="links-login">
                    <CiLogin />
                    <a href="">Registrar</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
