import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

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

export { auth, firestore, db, collection, addDoc, getDocs, setDoc, doc, updateDoc, deleteDoc };

// Adicionar funções para categorias e produtos
export async function createCategory(data) {
  const docRef = doc(collection(db, 'categories'));
  await setDoc(docRef, data);
  return docRef.id;
}

export async function getCategories() {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, name: data.name }; // Garantir que 'name' está presente
    });
  }

export async function updateCategory(id, data) {
  const docRef = doc(db, 'categories', id);
  await updateDoc(docRef, data);
}

export async function deleteCategory(id) {
  const docRef = doc(db, 'categories', id);
  await deleteDoc(docRef);
}

// Funções similares para produtos
export async function createProduct(data) {
  const docRef = doc(collection(db, 'products'));
  await setDoc(docRef, data);
  return docRef.id;
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

export async function updateProduct(id, data) {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, data);
}

export async function deleteProduct(id) {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
}