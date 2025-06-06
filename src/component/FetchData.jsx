import React, { useEffect, useState } from "react";
import axios from "axios";
const FetchData = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const res = await axios.get(
      "https://api.aviationstack.com/v1/flights?access_key=7a87efa33f5d7ee984e012e078fd7786"
    );

    console.log(res);
  }
  return <div>hello</div>;
};

export default FetchData;
