import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, updateDoc, deleteDoc,arrayRemove,arrayUnion, query, where} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9QnCA3D_lo2ZXmTsSL78ybwO3KBULgj4",
  authDomain: "gestao-de-restaurante.firebaseapp.com",
  projectId: "gestao-de-restaurante",
  storageBucket: "gestao-de-restaurante.appspot.com",
  messagingSenderId: "390150717928",
  appId: "1:390150717928:web:dfc689b9434d5c4bb8645d",
  measurementId: "G-RZ62XF2XXM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getFirestore(app);

export { auth, firestore, db, collection, addDoc, getDocs, setDoc, doc, updateDoc, deleteDoc,arrayRemove,arrayUnion, query, where };

// Adicionar funções para categorias e produtos
export async function createCategory(category) {
    const docRef = doc(collection(db, 'categories'), category.name);
    await setDoc(docRef, category);
    return docRef.id;
  }
  

  // Funções para produtos
  export async function createProduct(product) {
    const { categoryId, subcategoryId, name, ...productData } = product;
    const docRef = doc(collection(db, `categories/${categoryId}/subcategories/${subcategoryId}/products`), name);
    await setDoc(docRef, { name, ...productData });
    return docRef.id;
}
  
export async function deleteProduct(categoryId, subcategoryId, productId) {
    console.log(`Tentando deletar produto: categoryId=${categoryId}, subcategoryId=${subcategoryId}, productId=${productId}`);
    const docRef = doc(db, `categories/${categoryId}/subcategories/${subcategoryId}/products/${productId}`);
    try {
        await deleteDoc(docRef);
        console.log(`Produto deletado com sucesso: ${productId}`);
    } catch (error) {
        console.error(`Erro ao deletar produto: ${error}`);
    }
}
  export async function getProducts() {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        supplier: data.supplier,
        expiryDate: data.expiryDate,
        quantity: data.quantity,
        unit: data.unit,
        price: data.price,
      };
    });
  }

// Adicionar funções para categorias e produtos

export async function fetchAllIngredients() {
    console.time("fetchAllIngredients"); // Início da medição de tempo

    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const allIngredients = [];

    for (const categoryDoc of categoriesSnapshot.docs) {
        const subcategoriesSnapshot = await getDocs(collection(categoryDoc.ref, 'subcategories'));

        for (const subcategoryDoc of subcategoriesSnapshot.docs) {
            const productsSnapshot = await getDocs(collection(subcategoryDoc.ref, 'products'));

            for (const productDoc of productsSnapshot.docs) {
                allIngredients.push(productDoc.data());
            }
        }
    }

    console.timeEnd("fetchAllIngredients"); // Fim da medição de tempo

    return allIngredients;
}

export async function getCategories() {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const categories = [];
    for (const doc of querySnapshot.docs) {
        const data = doc.data();
        console.log('Dados da categoria:', data); // Log para verificar os dados da categoria

        const subcategoriesSnapshot = await getDocs(collection(doc.ref, 'subcategories'));
        const subcategories = [];
        for (const subDoc of subcategoriesSnapshot.docs) {
            const subData = subDoc.data();
            console.log('Dados da subcategoria:', subData); // Log para verificar os dados da subcategoria

            const productsSnapshot = await getDocs(collection(subDoc.ref, 'products'));
            const products = productsSnapshot.docs.map(prodDoc => ({ id: prodDoc.id, ...prodDoc.data() }));
            console.log('Dados dos produtos:', products); // Log para verificar os dados dos produtos

            subcategories.push({ id: subDoc.id, name: subData.name, products });
        }

        const ingredientsSnapshot = await getDocs(collection(doc.ref, 'ingredients'));
        const ingredients = ingredientsSnapshot.docs.map(ingDoc => ({ id: ingDoc.id, ...ingDoc.data() }));
        console.log('Dados dos ingredientes:', ingredients); // Log para verificar os dados dos ingredientes

        categories.push({ id: doc.id, name: data.name, subcategories, ingredients });
    }
    return categories;
}


export async function updateProduct(categoryId, subcategoryId, productName, data) {
    const formattedProductName = productName.toLowerCase();
    const docRef = doc(db, `categories/${categoryId}/subcategories/${subcategoryId}/products/${formattedProductName}`);
    await updateDoc(docRef, data);
}
  
  export async function updateCategory(id, data) {
    const docRef = doc(db, 'categories', id);
    await updateDoc(docRef, data);
  }
  export async function deleteCategory(id) {
    const docRef = doc(db, 'categories', id);
    await deleteDoc(docRef);
  }
  
  export async function addSubcategory(categoryId, subcategory) {
    const docRef = doc(collection(db, `categories/${categoryId}/subcategories`), subcategory.name);
    await setDoc(docRef, subcategory);
    return docRef.id;
  }

  export async function removeSubcategory(categoryId, subcategoryId) {
    const docRef = doc(db, `categories/${categoryId}/subcategories/${subcategoryId}`);
    await deleteDoc(docRef);
  }
  