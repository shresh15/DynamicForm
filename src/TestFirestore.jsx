// src/TestFirestore.js
import React, { useEffect } from "react";
import { db } from "./firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

function TestFirestore() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "forms"));
        if (querySnapshot.empty) {
          console.log("Firestore connected, but 'forms' collection is empty.");
        } else {
          querySnapshot.forEach((doc) => {
            console.log("📄", doc.id, "=>", doc.data());
          });
        }
      } catch (error) {
        console.error("Firestore connection error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Testing Firestore Connection</h2>
      <p>Check your browser console for results.</p>
    </div>
  );
}

export default TestFirestore;
