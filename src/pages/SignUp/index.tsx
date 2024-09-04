import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./style.scss";
import { CiUser, CiLock, CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';

const EMAIL_ERROR_MESSAGE = "Email está incorreto!";
const PASSWORD_ERROR_MESSAGE = "A senha está incorreta!";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    function checkFields() {
        let isCorrect = true;
        if (!email) {
            setEmailError(EMAIL_ERROR_MESSAGE);
            isCorrect = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError(PASSWORD_ERROR_MESSAGE);
            isCorrect = false;
        } else {
            setPasswordError("");
        }

        return isCorrect;
    }

    async function handleSubmit() {
        if (!checkFields()) {
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.error("Erro ao registrar:", error);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Registrar</h2>
                <div className="input-button-content">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        icon={<CiUser className="icon" />}
                        error={emailError}
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        icon={<CiLock className="icon" />}
                        type="password"
                        error={passwordError}
                    />
                    <Button onClick={handleSubmit}>Registrar</Button>
                </div>
                <div className="links-login">
                    <CiLogin />
                    <a href="/">Já tenho uma conta!</a>
                </div>
            </div>
        </div>
    );
}
