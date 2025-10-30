import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig.js";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

const RenderForm = ({ formName = "User Registration" }) => {
  const [formSchema, setFormSchema] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestForm = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the most recent form document matching formName
        const formsRef = collection(db, "forms");
        const q = query(
          formsRef,
          where("formName", "==", formName),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const querySnap = await getDocs(q);

        if (querySnap.empty) {
          setError(`No recent form found for "${formName}"`);
          setFormSchema(null);
        } else {
          const latestForm = querySnap.docs[0].data();

          // Validate that fields exists and is an array
          if (!latestForm?.fields || !Array.isArray(latestForm.fields)) {
            setError("Invalid Firestore schema: 'fields' array missing.");
            setFormSchema(null);
            return;
          }

          setFormSchema(latestForm);
        }
      } catch (err) {
        console.error("Error fetching form:", err);
        setError(
          "Failed to fetch form. Firestore index might be missing. Check console for details."
        );
        setFormSchema(null);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestForm();
  }, [formName]);

  const handleChange = (e, label) => {
    setFormData((prev) => ({ ...prev, [label]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    alert("Form submitted! Check console for values.");
  };

  if (loading) return <p className="text-center mt-6">Loading form...</p>;
  if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;
  if (!formSchema) return null;

  return (
    <div className="p-10 bg-gray-100 min-h-100vh flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          {formName}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border-2 border-black "
        >
          {formSchema.fields.map((field, index) => (
            <div key={index} className="flex items-center">
              <label className="w-1/3 font-semibold text-gray-700">
                {field.label}
              </label>
              <div className="w-2/3">
                {field.type === "dropdown" && Array.isArray(field.options) ? (
                  <select
                    value={formData[field.label] || ""}
                    onChange={(e) => handleChange(e, field.label)}
                    className="border-gray-300 rounded-lg  p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Select an option</option>
                    {field.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    value={formData[field.label] || ""}
                    onChange={(e) => handleChange(e, field.label)}
                    className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    autoComplete="off"
                  />
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="cursor-pointer w-1/3 mt-6 py-3 px-6 bg-indigo-900 text-white font-bold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenderForm;
