import { CiUser, CiLock, CiLogin } from "react-icons/ci";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./style.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMAIL_ERROR_MESSAGE = "Email está incorreto!";
const PASSWORD_ERROR_MESSAGE = "A senha está incorreta!";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPasssword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPassswordError] = useState("");
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
            setPassswordError(PASSWORD_ERROR_MESSAGE);
            isCorrect = false;
        } else {
            setPassswordError("");
        }

        return isCorrect;
    }

    function handleSubmit() {
        if (!checkFields()) {
            return;
        }

        // adicionar lógica de signUp

        navigate("/");
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
                        onChange={(e) => setPasssword(e.target.value)}
                        placeholder="Senha"
                        icon={<CiLock className="icon" />}
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
