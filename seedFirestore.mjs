import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

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
const db = getFirestore(app);

async function seedFirestore() {
  const categories = [
    {
      name: 'Produtos Frescos',
      subcategories: [
        { name: 'Peixes', products: [{ name: 'Salmão', quantity: 10, unit: 'kg' }, { name: 'Robalo', quantity: 5, unit: 'kg' }] },
        { name: 'Carnes', products: [{ name: 'Frango', quantity: 20, unit: 'kg' }, { name: 'Carne Bovina', quantity: 25, unit: 'kg' }] },
        { name: 'Frutas', products: [{ name: 'Maçã', quantity: 15, unit: 'kg' }, { name: 'Banana', quantity: 10, unit: 'kg' }] }
      ]
    }
  ];

  for (const category of categories) {
    const categoryDocRef = doc(collection(db, 'categories'), category.name);
    await setDoc(categoryDocRef, { name: category.name });

    for (const subcategory of category.subcategories) {
      const subcategoryDocRef = doc(collection(categoryDocRef, 'subcategories'), subcategory.name);
      await setDoc(subcategoryDocRef, { name: subcategory.name });

      for (const product of subcategory.products) {
        const productDocRef = doc(collection(subcategoryDocRef, 'products'), product.name);
        await setDoc(productDocRef, product);
      }
    }
  }

  console.log('Categorias, subcategorias e produtos adicionados com sucesso!');
}

seedFirestore().catch(console.error);