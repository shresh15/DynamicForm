// src/formSchema.js
import { db } from "./firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

/**
 * Saves the dynamic form schema to Firestore
 * @param {string} formName - Name/title of the form
 * @param {Array} fields - Array of field objects (label, type, options)
 */
const FormSchema = async (formName, fields) => {
  try {
    const docRef = await addDoc(collection(db, "forms"), {
      formName,
      fields,
      createdAt: new Date(),
    });
    console.log("✅ Form saved with ID:", docRef.id);
    alert("Form saved successfully to Firebase!");
  } catch (error) {
    console.error("❌ Error saving form:", error);
    alert("Failed to save form. Check console for details.");
  }
};

export default FormSchema;
