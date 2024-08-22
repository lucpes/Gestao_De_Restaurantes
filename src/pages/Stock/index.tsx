import CardItem from "./CardItem";
import "./style.scss";
import { CiSquarePlus } from "react-icons/ci";

export default function Stock() {
    return (
        <section className="stock-container">
            <div className="title-line">
                <h1>Estoque</h1>
            </div>
            <div className="cards-content">
                <CiSquarePlus className="icon" size={"60px"} />
                <CardItem />
                <CardItem name="Peixão assado com banana" />
                <CardItem name="Peixão assado com banana  assado com banana  assado com banana" />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
            </div>
        </section>
    );
}
