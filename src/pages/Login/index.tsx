import Button from "../../components/Button";
import Input from "../../components/Input";
import "./style.scss";
import { CiUser, CiLock, CiLogin } from "react-icons/ci";

function Login() {
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
                        placeholder="Email"
                        icon={<CiUser className="icon" />}
                    />
                    <Input
                        placeholder="Senha"
                        icon={<CiLock className="icon" />}
                    />
                    <Button>Login</Button>
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
