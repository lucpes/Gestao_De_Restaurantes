import "./style.scss";
import { ComponentProps } from "react";

interface ProductCardItemProps extends ComponentProps<"div"> {
    handleModalOpen: VoidFunction;
    productName: string;
    productQuantity: number;
    productUnit: string;
}

export default function ProductCardItem({
    handleModalOpen,
    productName,
    productQuantity,
    productUnit,
    ...props
}: ProductCardItemProps) {
    return (
        <div {...props} className="product-carditem-container">
            <div {...props} className="product-carditem-container">
                <div
                    className="product-carditem-title"
                    onClick={handleModalOpen}
                >
                    <p>{productName}</p>
                </div>
                <div className="product-carditem-details">
                    <p>
                        {productQuantity} {productUnit}
                    </p>
                </div>
            </div>

            <div className="product-carditem-details">
                <p>
                    {productQuantity} {productUnit}
                </p>
            </div>
        </div>
    );
}
