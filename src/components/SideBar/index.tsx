import NavItem from "./NavItem";
import "./style.scss";
import { VscSettingsGear } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";
import { PiPackageDuotone } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
    const navigate = useNavigate();

    return (
        <aside className="side-bar">
            <img
                className="logo-image"
                src="../../../public/assets/svg/logo-white.svg"
                alt="logo"
            />
            <div className="nav-items">
                <NavItem
                    onClick={() => navigate("stock")}
                    icon={<PiPackageDuotone />}
                    label="Gestão de Estoque"
                />
                <NavItem
                    onClick={() => navigate("employer")}
                    icon={<FiUsers />}
                    label="Gestão de funcionário"
                />
                <NavItem
                    onClick={() => navigate("config")}
                    icon={<VscSettingsGear />}
                    label="Configurações"
                />
            </div>
            <NavItem onClick={() => ""} icon={<CiLogout />} label="Sair" />
        </aside>
    );
}
