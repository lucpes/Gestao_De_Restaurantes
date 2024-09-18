const { getFirestore, collection, doc, setDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');
const db = getFirestore();

const Product = {
  async create(data) {
    const docRef = doc(collection(db, 'products'));
    await setDoc(docRef, data);
    return docRef.id;
  },
  async readAll() {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async update(id, data) {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, data);
  },
  async delete(id) {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  }
};

module.exports = Product;