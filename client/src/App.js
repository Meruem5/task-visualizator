import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { isBreakOrContinueStatement } from "typescript";

function App() {
  const [dataobj, setDataobj] = useState({});
  const [loading, setLoading] = useState(false);

  const fieldsOfInterest = {
    projects: ["name", "key", "issues"],
    issues: ["status"],
    users: ["name"],
  };
  const listBGColor = {
    projects: "lightblue",
    issues: "gray",
    users: "red",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get("http://localhost:5001/api");

      setDataobj(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const capitalizeTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const renderList = (title, dataArray, listUniqueKey) => {
    return (
      <div {...(listUniqueKey && { key: listUniqueKey })}>
        <h1>{capitalizeTitle(title)}</h1>
        {dataArray?.map((data, index) => (
          <div
            key={index}
            className="ListItemWrapper"
            style={{ backgroundColor: listBGColor[title] }}
          >
            {fieldsOfInterest[title].map((key, index) => {
              const isArray = data[key] instanceof Array;

              return isArray ? (
                renderList(key, data[key], index)
              ) : (
                <h2 key={index}>{data[key]}</h2>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <>
          {renderList("projects", dataobj.projects)}
          {renderList("users", dataobj.users)}
        </>
      )}
    </>
  );
}

export default App;
