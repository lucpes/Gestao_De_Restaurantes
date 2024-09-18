import { db, addDoc, collection, updateDoc, doc } from "../Firebase/firebaseConfig";
import categories from "./categoryData";

export const addNewCategory = async (collectionName, categoryName, subcategories) => {
    const docRef = await addDoc(collection(db, collectionName), {
        name: categoryName,
        items: subcategories
    });
    return docRef;
};

export const addCategoriesToFirestore = async () => {
    for (const category of categories) {
        await addDoc(collection(db, "categories"), category);
    }
};

export const updateCategory = async (categoryId, updatedSubcategories) => {
    const categoryDoc = doc(db, "categories", categoryId);
    await updateDoc(categoryDoc, {
        subcategories: updatedSubcategories
    });
};