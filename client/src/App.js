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
      }, 5000);
    }
  }, [loading]);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? <p>Loading....</p> : <p>{data}</p>}
      </header>
    </div>
  );
}

export default App;
