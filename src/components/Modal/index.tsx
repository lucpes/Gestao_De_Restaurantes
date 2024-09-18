import { ReactNode } from "react";
import "./style.scss";
import { IoIosClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  children: ReactNode;
}

export default function Modal({ children, onClose, isOpen }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <IoIosClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}