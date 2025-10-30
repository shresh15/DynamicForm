import React, { useState } from "react";
import FormBuilder from "./formBuilder";
import TestFirestore from "./TestFirestore";

function App() {
  const [schema, setSchema] = useState([]);

  return (
    // <div style={{ padding: 20 }}>
    //   <h1 style={{ textAlign: "center" }}>Dynamic Form Builder</h1>
    //   <FormBuilder onSchemaChange={(fields) => setSchema(fields)} />

    //   {/* <pre style={{ marginTop: 40, background: "#eee", padding: 10 }}>
    //     <strong>Live JSON Schema:</strong>
    //     <br />
    //     {JSON.stringify({ fields: schema }, null, 2)}
    //   </pre> */}
    // </div>
    <TestFirestore />
  );
}

export default App;
