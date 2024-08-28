import NavItem from "./NavItem";
import "./style.scss";
import { VscSettingsGear } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";
import { PiPackageDuotone } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { SlNotebook } from "react-icons/sl";
import Logo from "../Logo";

export default function SideBar() {
    const navigate = useNavigate();

    return (
        <aside className="side-bar">
            <Logo style={{ scale: "0.8", height: "240px" }} color="#DDE5F4" />
            <div className="nav-items">
                <NavItem
                    path="/home/stock"
                    onClick={() => navigate("stock")}
                    icon={<PiPackageDuotone />}
                    label="Gestão de estoque"
                />
                <NavItem
                    path="/home/output"
                    onClick={() => navigate("output")}
                    icon={<SlNotebook />}
                    label="Saída de pratos"
                />
                <NavItem
                    path="/home/employer"
                    onClick={() => navigate("employer")}
                    icon={<FiUsers />}
                    label="Gestão de funcionário"
                />
                <NavItem
                    path="/home/config"
                    onClick={() => navigate("config")}
                    icon={<VscSettingsGear />}
                    label="Configurações"
                />
            </div>
            <NavItem
                style={{ width: "fit-content" }}
                onClick={() => navigate("/")}
                icon={<CiLogout />}
                label="Sair"
            />
        </aside>
    );
}
