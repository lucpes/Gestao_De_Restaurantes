import { ReactNode } from "react";
import "./style.scss";
import { IoIosClose } from "react-icons/io";

interface ModalProps {
    isOpen: boolean;
    onClose: VoidFunction;
    children: ReactNode;
}

export default function Modal({ children, onClose, isOpen }: ModalProps) {
    return (
        <>
            {isOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <IoIosClose
                            onClick={onClose}
                            size={"32px"}
                            className="close-modal-icon"
                        />
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}
