import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { isBreakOrContinueStatement } from "typescript";

function App() {
  const [dataobj, setDataobj] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get("http://localhost:5001/api");

      setDataobj(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div>
          <h1>Projects</h1>
          {dataobj.projects?.map((project, index) => (
            <div key={index} className="data-container" style={{ backgroundColor: "lightblue" }}>
              <h2>{project.name}</h2>
              <h2>{project.key}</h2>
              <h1>Issues</h1>
              {project.issues.map((issue, index) => (
                <div key={index} className="data-container" style={{ backgroundColor: "gray" }}>
                  <h2>{issue.status}</h2>
                </div>
              ))}
            </div>
          ))}
          <h1>Users</h1>
          {dataobj.users?.map((user, index) => (
            <div key={index} className="data-container" style={{ backgroundColor: "red" }}>
              <h2>{user.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
