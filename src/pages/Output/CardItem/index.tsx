import "./style.scss";
import { ComponentProps, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

interface CardItemProps extends ComponentProps<"div"> {
  handleModalOpen: VoidFunction;
}

export default function CardItem({ handleModalOpen, ...props }: CardItemProps) {
  const [count, setCount] = useState(0);
  return (
    <div {...props} className="carditem-output-container">
      <div className="carditem-title" onClick={handleModalOpen}>
        <p>Camarão Internacional</p>
      </div>
      <div className="carditem-output-controller">
        <FaMinus onClick={() => setCount((count) => count - 1)} />
        <div className="counter">
          <p>{count}</p>
        </div>
        <FaPlus onClick={() => setCount((count) => count + 1)} />
      </div>
    </div>
  );
}