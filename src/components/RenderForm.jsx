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

  useEffect(() => {
    const fetchLatestForm = async () => {
      try {
        setLoading(true);

        const formsRef = collection(db, "forms");
        const q = query(
          formsRef,
          where("formName", "==", formName),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const querySnap = await getDocs(q);

        if (querySnap.empty) {
          console.warn(`No recent form found for "${formName}"`);
          setFormSchema(null);
          return;
        }

        const latestForm = querySnap.docs[0].data();

        // Normalize the fields safely
        let fieldsArray = Array.isArray(latestForm.fields)
          ? latestForm.fields
          : Object.values(latestForm.fields || {});

        fieldsArray = fieldsArray.map((f) => ({
          label: f.label || "",
          type: f.type || "text",
          options: Array.isArray(f.options)
            ? f.options
            : f.options
            ? f.options.split(",").map((o) => o.trim())
            : [],
        }));

        setFormSchema({ ...latestForm, fields: fieldsArray });
      } catch (err) {
        console.error("Error fetching form:", err);
        setFormSchema(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestForm();

    // Optionally, re-fetch every 3 seconds while open
    const interval = setInterval(fetchLatestForm, 3000);
    return () => clearInterval(interval);
  }, [formName]);

  const handleChange = (e, label) => {
    setFormData((prev) => ({ ...prev, [label]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Submitted data:", formData);
    alert("Form submitted successfully! Check console for details.");
  };

  if (loading) return <p className="text-center mt-6">Loading form...</p>;
  if (!formSchema)
    return (
      <p className="text-center mt-6 text-gray-700">
        No form found for "{formName}".
      </p>
    );

  return (
    <div className="p-5 bg-gray-200 min-h-2/3 flex items-center justify-center">
      <div className="w-2/3 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          {formName}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border-2 border-black"
        >
          {formSchema.fields.map((field, index) => (
            <div key={index} className="flex items-center">
              <label className="w-1/3 font-semibold text-gray-700">
                {field.label}
              </label>
              <div className="w-2/3">
                {field.type === "dropdown" && field.options.length > 0 ? (
                  <select
                    value={formData[field.label] || ""}
                    onChange={(e) => handleChange(e, field.label)}
                    className="border border-black appearance-none rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                    className="border border-black rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
