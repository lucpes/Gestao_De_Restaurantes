import React, { useState, useEffect } from "react";
import { getCategories, deleteProduct } from "../../Firebase/firebaseConfig";
import ProductCardItem from "./ProductCardItem";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import "./style.scss";
import Loader from "../../components/Loader";

interface Product {
    id: string;
    name: string;
    quantity: number;
    unit: string;
}

interface Subcategory {
    id: string;
    name: string;
    products: Product[];
}

interface Category {
    id: string;
    name: string;
    subcategories: Subcategory[];
}

function Stock() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            setLoading(true);
            try {
                const categories = await getCategories();
                const formattedCategories = categories.map((category: any) => ({
                    ...category,
                    subcategories: category.subcategories.map(
                        (subcategory: any) => ({
                            ...subcategory,
                            products: subcategory.products.map(
                                (product: any) => ({
                                    ...product,
                                    name: product.name || "",
                                    quantity: product.quantity || 0,
                                    unit: product.unit || "",
                                })
                            ),
                        })
                    ),
                }));
                setCategories(formattedCategories);
            } catch (error) {
                console.error("erro ao carregar dados: ", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setSelectedSubcategory("");
        const category = categories.find((cat) => cat.id === categoryId);
        setProducts(
            category
                ? category.subcategories.flatMap((sub) => sub.products)
                : []
        );
    };

    const handleSubcategoryChange = (subcategoryId: string) => {
        setSelectedSubcategory(subcategoryId);
        const category = categories.find((cat) => cat.id === selectedCategory);
        const subcategory = category?.subcategories.find(
            (sub) => sub.id === subcategoryId
        );
        setProducts(subcategory ? subcategory.products : []);
    };

    const handleCardItem = (product: Product) => {
        setCurrentProduct(product);
        setIsOpen(true);
    };

    const handleDelete = async () => {
        if (currentProduct) {
            console.log(`Tentando deletar produto: ${currentProduct.id}`);
            try {
                await deleteProduct(
                    selectedCategory,
                    selectedSubcategory,
                    currentProduct.id
                );
                alert("Produto excluído com sucesso!");
                setIsOpen(false);
                setProducts(
                    products.filter(
                        (product) => product.id !== currentProduct.id
                    )
                );
            } catch (error) {
                console.error("Erro ao excluir produto:", error);
                alert("Erro ao excluir produto.");
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <section className="stock-container">
            <div className="title-line">
                <h1>Estoque de Produtos</h1>
            </div>
            <div className="stock-content">
                <div className="menu">
                    <h2>Categorias</h2>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <span
                                    title={category.name}
                                    onClick={() =>
                                        handleCategoryChange(category.id)
                                    }
                                >
                                    {category.name.length > 16
                                        ? category.name.slice(0, 16) + "..."
                                        : category.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                {selectedCategory && (
                    <div className="menu">
                        <h2>Subcategorias</h2>
                        <ul>
                            {categories
                                .find((cat) => cat.id === selectedCategory)
                                ?.subcategories.map((subcategory) => (
                                    <li key={subcategory.id}>
                                        <span
                                            title={subcategory.name}
                                            onClick={() =>
                                                handleSubcategoryChange(
                                                    subcategory.id
                                                )
                                            }
                                        >
                                            {subcategory.name.length > 16
                                                ? subcategory.name.slice(
                                                      0,
                                                      16
                                                  ) + "..."
                                                : subcategory.name}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
                {products.length > 0 && (
                    <div className="menu">
                        {products.map((product) => (
                            <ProductCardItem
                                key={product.id}
                                handleModalOpen={() => handleCardItem(product)}
                                productName={product.name}
                                productQuantity={product.quantity}
                                productUnit={product.unit}
                            />
                        ))}
                        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                            {currentProduct && (
                                <div className="modal-item">
                                    <h3>{currentProduct.name}</h3>
                                    <ul>
                                        <li>
                                            Quantidade:{" "}
                                            {currentProduct.quantity}
                                        </li>
                                        <li>Unidade: {currentProduct.unit}</li>
                                    </ul>
                                    <div className="modal-button">
                                        <Button onClick={handleDelete}>
                                            Excluir
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Modal>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Stock;
