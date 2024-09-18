const { getFirestore, collection, doc, setDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');
const db = getFirestore();

const Category = {
  async create(data) {
    const docRef = doc(collection(db, 'categories'));
    await setDoc(docRef, data);
    return docRef.id;
  },
  async readAll() {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async update(id, data) {
    const docRef = doc(db, 'categories', id);
    await updateDoc(docRef, data);
  },
  async delete(id) {
    const docRef = doc(db, 'categories', id);
    await deleteDoc(docRef);
  }
};

module.exports = Category;