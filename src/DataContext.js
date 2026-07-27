// DataContext.js
import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [decodedUrl, setDecodedUrl] = useState("");
  function encodeStr() {
    console.log(btoa(gf));
  }

  const gf = "";
  encodeStr();

  const encoded = process.env.REACT_APP_API_URL;
  const encodedID = process.env.REACT_APP_API_ID;

  let decodedvalue = atob(encoded);
  let decodedID = atob(encodedID);

  useEffect(() => {
    const fetchData = async () => {
      debugger;
      try {
        console.log("API", process.env.REACT_APP_API_URL);
        const response = await fetch(decodedvalue, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "x-correlation-id": uuidv4(),
            requesttype: "GetApiDetails",
            "x-apigw-api-id": decodedID,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        console.log("result", result);

        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
