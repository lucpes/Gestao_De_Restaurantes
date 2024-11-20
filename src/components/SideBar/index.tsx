import NavItem from "./NavItem";
import "./style.scss";
import { VscSettingsGear } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";
import { PiPackageDuotone } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { SlNotebook } from "react-icons/sl";
import { MdRestaurant } from "react-icons/md"; // Importando o ícone de restaurante
import Logo from "../Logo";

export default function SideBar() {
  const navigate = useNavigate();

  return (
    <aside className="side-bar">
      <Logo style={{ scale: "0.8", height: "240px" }} color="#DDE5F4" />
      <div className="nav-items">a
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
        <NavItem
          path="/home/add-restaurant"
          onClick={() => navigate("add-restaurant")}
          icon={<MdRestaurant />} // Ícone de restaurante
          label="Adicionar Restaurante"
        />
        <NavItem
          path="/home/add-product"
          onClick={() => navigate("add-product")}
          icon={<PiPackageDuotone />}
          label="Adicionar Produto"
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