import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputWord, setInputWord] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://test-app-ty7f.onrender.com/run-script",
        {
          word: inputWord,
        }
      );
      setOutput(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Script Runner</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
          placeholder="Enter a word..."
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      <p style={{ marginTop: "20px", fontSize: "18px" }}>{output}</p>
    </div>
  );
}

export default App;
