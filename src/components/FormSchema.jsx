// src/formSchema.js
import { db } from "../firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Saves the dynamic form schema to Firestore
 * @param {string} formName - Name/title of the form
 * @param {Array} fields - Array of field objects, example:
 * [
 *   { label: "Name", type: "text" },
 *   { label: "Gender", type: "dropdown", options: ["Male", "Female", "Other"] },
 *   { label: "Email", type: "email" }
 * ]
 */
const FormSchema = async (formName, fields) => {
  try {
    // Validate input
    if (!formName || typeof formName !== "string") {
      throw new Error("formName must be a non-empty string.");
    }
    if (!Array.isArray(fields) || fields.length === 0) {
      throw new Error("fields must be a non-empty array.");
    }
    for (const field of fields) {
      if (
        !field.label ||
        typeof field.label !== "string" ||
        !field.type ||
        typeof field.type !== "string"
      ) {
        throw new Error(
          "Each field must have a 'label' and 'type' property, both strings."
        );
      }
      // Ensure dropdown options are arrays
      if (field.type === "dropdown") {
        if (typeof field.options === "string") {
          field.options = field.options
            .split(",")
            .map((opt) => opt.trim())
            .filter((opt) => opt.length > 0);
        }
        if (!Array.isArray(field.options)) {
          throw new Error(
            `Field "${field.label}" is a dropdown but options is not an array.`
          );
        }
      }
    }

    const docRef = await addDoc(collection(db, "forms"), {
      formName,
      fields,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Form saved with ID:", docRef.id);
    alert("Form saved successfully to Firebase!");
  } catch (error) {
    console.error("❌ Error saving form:", error);
    alert("Failed to save form. Check console for details.");
  }
};

export default FormSchema;
