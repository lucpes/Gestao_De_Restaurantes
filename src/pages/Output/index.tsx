import { useState } from "react";
import CardItem from "../Stock/CardItem";
import "./style.scss";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

interface Item {
  name: string;
  items: string[];
}

export default function Output() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  function handleCardItem(item: Item) {
    setCurrentItem(item);
    setIsOpen(true);
  }

  return (
    <section className="output-container">
      <div className="title-line">
        <h1>Saída de pratos</h1>
      </div>
      <div className="cards-content">
        <CardItem handleModalOpen={() => handleCardItem({ name: "Camarão Internacional", items: ["200g de carne", "200g de carne", "200g de carne"] })} />
        <CardItem handleModalOpen={() => handleCardItem({ name: "Camarão Internacional", items: ["200g de carne", "200g de carne", "200g de carne"] })} />
        <CardItem handleModalOpen={() => handleCardItem({ name: "Camarão Internacional", items: ["200g de carne", "200g de carne", "200g de carne"] })} />
        <CardItem handleModalOpen={() => handleCardItem({ name: "Camarão Internacional", items: ["200g de carne", "200g de carne", "200g de carne"] })} />
        <CardItem handleModalOpen={() => handleCardItem({ name: "Camarão Internacional", items: ["200g de carne", "200g de carne", "200g de carne"] })} />
        <CiSquarePlus className="icon" size={"60px"} />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {currentItem && (
            <div className="modal-item">
              <h3>{currentItem.name}</h3>
              <ul>
                {currentItem.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="modal-button">
                <Button onClick={() => ""}>Excluir</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}