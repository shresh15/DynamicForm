import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import FormSchema from "./formSchema";
const fieldTypes = [
  { value: "text", label: "Text Field" },
  { value: "number", label: "Number Field" },
  { value: "date", label: "Date Picker" },
  { value: "dropdown", label: "Dropdown" },
];

// Helper to create empty value for field
function getDefaultValue(type) {
  if (type === "dropdown") return "";
  if (type === "number") return "";
  if (type === "date") return "";
  return "";
}

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({
    label: "",
    type: "text",
    options: "",
  });
  const [formData, setFormData] = useState({});

  const handleAddField = () => {
    if (!newField.label) return alert("Please enter a field label");
    setFields([...fields, newField]);
    setFormData((prev) => ({
      ...prev,
      [newField.label]: getDefaultValue(newField.type),
    }));
    setNewField({ label: "", type: "text", options: "" });
  };

  const handleDeleteField = (index) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
    // Optionally update formData here as well
  };

  // Render dynamic field in preview
  const renderField = (field, idx) => {
    const name = field.label;
    switch (field.type) {
      case "text":
        return (
          <div key={idx} className="mb-4">
            <label className="block font-medium mb-1">{name}</label>
            <input
              type="text"
              className="border px-3 py-2 rounded-lg w-full"
              value={formData[name] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
            />
          </div>
        );
      case "number":
        return (
          <div key={idx} className="mb-4">
            <label className="block font-medium mb-1">{name}</label>
            <input
              type="number"
              className="border px-3 py-2 rounded-lg w-full"
              value={formData[name] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
            />
          </div>
        );
      case "date":
        return (
          <div key={idx} className="mb-4">
            <label className="block font-medium mb-1">{name}</label>
            <input
              type="date"
              className="border px-3 py-2 rounded-lg w-full"
              value={formData[name] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
            />
          </div>
        );
      case "dropdown":
        return (
          <div key={idx} className="mb-4">
            <label className="block font-medium mb-1">{name}</label>
            <select
              className="border px-3 py-2 rounded-lg w-full"
              value={formData[name] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
            >
              <option value="">Select...</option>
              {field.options.split(",").map((opt, i) => (
                <option key={i} value={opt.trim()}>
                  {opt.trim()}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-indigo-900 text-white text-center py-4">
        <h1 className="text-4xl font-bold">Dynamic Form Builder</h1>
      </div>
      <div className="flex justify-center gap-8 p-8">
        {/* Left: Form Design */}
        <div className="w-full md:w-1/3 bg-white border-2 rounded-2xl shadow-xl p-8 flex flex-col">
          <h2 className="text-2xl text-center font-semibold text-indigo-900 mb-6">
            Form Design
          </h2>
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <input
                type="text"
                placeholder="Field Label"
                value={newField.label}
                onChange={(e) =>
                  setNewField({ ...newField, label: e.target.value })
                }
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={newField.type}
                onChange={(e) =>
                  setNewField({ ...newField, type: e.target.value })
                }
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              >
                {fieldTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {newField.type === "dropdown" && (
                <input
                  type="text"
                  placeholder="Comma separated options"
                  value={newField.options}
                  onChange={(e) =>
                    setNewField({ ...newField, options: e.target.value })
                  }
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-3"
                />
              )}
            </div>
            <button
              onClick={handleAddField}
              className="bg-indigo-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <PlusCircle size={20} /> Add Field
            </button>
          </div>
          {/* List of added fields */}
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Fields List
          </h3>
          <div className="flex-1 overflow-y-auto">
            {fields.length === 0 ? (
              <p className="text-gray-500 text-sm">No fields added yet.</p>
            ) : (
              fields.map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-between items-center border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition mb-2"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {field.label}{" "}
                      <span className="text-sm text-gray-500">
                        ({field.type})
                      </span>
                    </p>
                    {field.type === "dropdown" && (
                      <p className="text-xs text-gray-500">
                        Options: {field.options}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteField(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right: Live Form Preview */}
        <div className="w-full md:w-1/3 bg-white border-2 border-black rounded-2xl shadow-xl p-8 flex flex-col">
          <h2 className="text-2xl font-semibold text-indigo-900 text-center mb-6">
            Live Form
          </h2>
          <form>
            {fields.length === 0 ? (
              <p className="text-gray-500 text-sm">Add fields</p>
            ) : (
              fields.map((field, idx) => renderField(field, idx))
            )}
          </form>
          <button
            onClick={() => FormSchema("User Registration", fields)}
            className="bg-indigo-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-auto"
          >
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
