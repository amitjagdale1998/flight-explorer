import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
const columns = [
  {
    title: "Flight Date",
    dataIndex: ["flight_date"],
    width: "15%",
  },
  {
    title: "Status",
    dataIndex: ["flight_status"],
    width: "10%",
  },
  {
    title: "Departure Airport",
    dataIndex: ["departure", "airport"],
    width: "15%",
  },
  {
    title: "Departure Scheduled",
    dataIndex: ["departure", "scheduled"],
    width: "15%",
  },
  {
    title: "Departure Estimated",
    dataIndex: ["departure", "estimated"],
    width: "15%",
  },
  {
    title: "Arrival Airport",
    dataIndex: ["arrival", "airport"],
    width: "15%",
  },
  {
    title: "Arrival Scheduled",
    dataIndex: ["arrival", "scheduled"],
    width: "15%",
  },
  {
    title: "Arrival Estimated",
    dataIndex: ["arrival", "estimated"],
    width: "15%",
  },
  {
    title: "Airline",
    dataIndex: ["airline", "name"],
    width: "15%",
  },
  {
    title: "Flight Number",
    dataIndex: ["flight", "number"],
    width: "10%",
  },
  {
    title: "Booking",
    render: () => {
      return <div>hello</div>;
    },
  },
];

const Home = () => {
  const [flightData, setFlightData] = useState([]);
  console.log(flightData, "flightData");
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const getFlightData = async () => {
    try {
      const res = await axios.get(
        "https://api.aviationstack.com/v1/flights?access_key=7a87efa33f5d7ee984e012e078fd7786"
      );
      console.log(res);
      setFlightData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFlightData();
  }, []);
  return (
    <Table columns={columns} dataSource={flightData} onChange={onChange} />
  );
};
export default Home;
