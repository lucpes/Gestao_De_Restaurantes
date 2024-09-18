export interface Item {
    name: string;
    quantity: number;
    unit: string;
    items?: Item[];
}

export interface Subcategory {
    name: string;
    items: Item[];
}

export interface Category {
    id?: number;
    name: string;
    subcategories: Subcategory[];
}

const categories: Category[] = [
    {
        name: "Tipos de Ingredientes",
        subcategories: [
            {
                name: "Produtos Frescos",
                items: [
                    { name: "Frutas", quantity: 0, unit: "kg" },
                    { name: "Vegetais", quantity: 0, unit: "kg" },
                    { name: "Carnes", quantity: 0, unit: "kg" },
                    { name: "Peixes", quantity: 0, unit: "kg" },
                    { name: "Laticínios", quantity: 0, unit: "kg" }
                ]
            },
            {
                name: "Produtos Secos",
                items: [
                    { name: "Grãos", quantity: 0, unit: "kg" },
                    { name: "Farinhas", quantity: 0, unit: "kg" },
                    { name: "Açúcares", quantity: 0, unit: "kg" },
                    { name: "Especiarias", quantity: 0, unit: "kg" }
                ]
            },
            {
                name: "Produtos Processados",
                items: [
                    { name: "Enlatados", quantity: 0, unit: "kg" },
                    { name: "Molhos Prontos", quantity: 0, unit: "kg" },
                    { name: "Conservas", quantity: 0, unit: "kg" }
                ]
            }
        ]
    },
    {
        name: "Tipos de Pratos",
        subcategories: [
            {
                name: "Entradas",
                items: [
                    { name: "Saladas", quantity: 0, unit: "kg" },
                    { name: "Sopas", quantity: 0, unit: "kg" },
                    { name: "Aperitivos", quantity: 0, unit: "kg" }
                ]
            },
            {
                name: "Pratos Principais",
                items: [
                    {
                        name: "Carnes",
                        items: [
                            { name: "Picanha", quantity: 0, unit: "kg" },
                            { name: "Patinho", quantity: 0, unit: "kg" },
                            { name: "Alcatra", quantity: 0, unit: "kg" }
                        ]
                    },
                    { name: "Peixes", quantity: 0, unit: "kg" },
                    { name: "Massas", quantity: 0, unit: "kg" },
                    { name: "Vegetarianos", quantity: 0, unit: "kg" }
                ]
            },
            {
                name: "Sobremesas",
                items: [
                    { name: "Bolos", quantity: 0, unit: "kg" },
                    { name: "Tortas", quantity: 0, unit: "kg" },
                    { name: "Frutas", quantity: 0, unit: "kg" },
                    { name: "Doces", quantity: 0, unit: "kg" }
                ]
            }
        ]
    },
    {
        id: 4,
        name: "Ingredientes Específicos",
        subcategories: [
            {
                name: "Temperos e Condimentos",
                items: [
                    { name: "Sal", quantity: 0, unit: "kg" },
                    { name: "Pimenta", quantity: 0, unit: "kg" },
                    { name: "Azeite", quantity: 0, unit: "litros" }
                ]
            },
            {
                name: "Grãos e Cereais",
                items: [
                    { name: "Arroz", quantity: 0, unit: "kg" },
                    { name: "Trigo", quantity: 0, unit: "kg" },
                    { name: "Aveia", quantity: 0, unit: "kg" }
                ]
            },
            {
                name: "Bebidas e Alcoólicos",
                items: [
                    { name: "Vinhos", quantity: 0, unit: "garrafas" },
                    { name: "Cervejas", quantity: 0, unit: "garrafas" },
                    { name: "Refrigerantes", quantity: 0, unit: "latas" }
                ]
            }
        ]
    }
];

export default categories;