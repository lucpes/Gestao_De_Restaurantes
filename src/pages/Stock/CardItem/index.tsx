import "./style.scss";

export default function CardItem({ name = "Arroz" }: { name?: string }) {
    return (
        <div className="carditem-container">
            <div className="title">
                <h3>{name}</h3>
            </div>
            <div className="carditem-info">
                {/* <p>Quantidade:</p> */}
                <p>10 kg</p>
            </div>
            <div></div>
        </div>
    );
}
