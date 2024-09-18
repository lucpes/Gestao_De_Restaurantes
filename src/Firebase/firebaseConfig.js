import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, updateDoc, deleteDoc,arrayRemove,arrayUnion } from "firebase/firestore";

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

export { auth, firestore, db, collection, addDoc, getDocs, setDoc, doc, updateDoc, deleteDoc,arrayRemove,arrayUnion };

// Adicionar funções para categorias e produtos
export async function createCategory(category) {
    const docRef = await addDoc(collection(db, 'categories'), category);
    return docRef.id;
  }
  

  export async function removeSubcategory(categoryId, subcategory) {
    const docRef = doc(db, 'categories', categoryId);
    await updateDoc(docRef, { subcategories: arrayRemove(subcategory) });
  }
  
  // Funções para produtos
  export async function createProduct(product) {
    const { categoryId, subcategoryId, ...productData } = product;
    const docRef = await addDoc(collection(db, `categories/${categoryId}/subcategories/${subcategoryId}/products`), productData);
    return docRef.id;
  }
  

  
  export async function updateProduct(id, data) {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, data);
  }
  
  export async function deleteProduct(id, productId) {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
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
      categories.push({ id: doc.id, name: data.name, subcategories });
    }
    return categories;
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
    const docRef = await addDoc(collection(db, `categories/${categoryId}/subcategories`), subcategory);
    return docRef.id;
  }
  