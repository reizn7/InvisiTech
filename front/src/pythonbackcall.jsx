import { useState } from "react";

function PythonBackCall() {
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState("");
    
    const handleButtonClick = async () => {
        setLoad(true);
        try {
        const data = await fetch("http://localhost:5000/call_python_function", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });
        const response = await data.json();
    if (response.output) {
        setMessage(response.output);
      } else {
        setMessage("Python script ran, but no output.");
      }
    } catch (error) {
      console.error("Error calling Python function:", error);
      setMessage("Error calling Python function");
    } finally {
      setLoad(false);
    }
  };
    
    return (
        <div className="python-backcall">
        <button onClick={handleButtonClick}>Start Invisibility Cloak</button>
        {message && <p>{message}</p>}
        </div>
    );
}

export default PythonBackCall;