import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get("http://localhost:5001/api");
      console.log("REACT APP", { result });
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [loading]);

  return (
    <div className="App">
      {loading ? <p>Loading....</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App;
