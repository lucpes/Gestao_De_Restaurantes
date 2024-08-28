import { useState } from "react";
import CardItem from "./CardItem";
import "./style.scss";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

export default function Output() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState();

    function handleCardItem() {
        setIsOpen(true);
    }

    return (
        <section className="output-container">
            <div className="title-line">
                <h1>Saída de pratos</h1>
            </div>
            <div className="cards-content">
                <CardItem handleModalOpen={handleCardItem} />
                <CardItem handleModalOpen={handleCardItem} />
                <CardItem handleModalOpen={handleCardItem} />
                <CardItem handleModalOpen={handleCardItem} />
                <CardItem handleModalOpen={handleCardItem} />
                <CiSquarePlus className="icon" size={"60px"} />
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="modal-item">
                        <h3>currentItem.name </h3>
                        <ul>
                            <li>200g de carne</li>
                            <li>200g de carne</li>
                            <li>200g de carne</li>
                        </ul>
                        <div className="modal-button">
                            <Button onClick={() => ""}>Excluir</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </section>
    );
}
