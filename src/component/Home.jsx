import React, { useEffect, useState } from "react";
import { Button, DatePicker, Table } from "antd";
import axios from "axios";
import DatePickerFilter from "./common/DatePickerFilter";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addflight, selectflightSlice } from "./redux/slice/sectedFlightSlice";
const flightStore = [];
const Home = () => {
  const dispatch = useDispatch();
  const [flightData, setFlightData] = useState([]);
  console.log(flightData, "flightData");
  const [selectedDate, setSelectedDate] = useState(null);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

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
      width: "20%",
      render: (record) => {
        return (
          <div>
            {console.log(record)}
            <Button onClick={() => handleBookNow(record)}>Book Now</Button>
          </div>
        );
      },
    },
  ];

  function handleBookNow(selectedFlight) {
    console.log(selectedFlight, "selectedFlight");
    flightStore.push(selectedFlight);
    localStorage.setItem("selectedFlights", JSON.stringify(flightStore));
    dispatch(addflight(selectedFlight));
    navigate("/booknow");
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const getFlightData = async () => {
    try {
      let res;
      // if (selectedDate) {
      //   res = await axios.get(
      //     `https://api.aviationstack.com/v1/flight?access_key=7a87efa33f5d7ee984e012e078fd7786&flight_date=${selectedDate}`
      //   );
      // } else {
      res = await axios.get(
        "https://api.aviationstack.com/v1/flights?access_key=ba5fc04c6fe7075e775023f075d74646"
      );

      // }

      console.log(res);
      setFlightData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFlightData();
  }, []);

  useEffect(() => {
    filterFunction();
  }, [selectedDate, flightData]);
  const filterFunction = () => {
    if (!selectedDate && flightData.length > 0) {
      setTableData(flightData);
    }
    let filterDate;
    if (selectedDate) {
      filterDate = flightData.filter((items) => {
        if (String(items?.flight_date) === String(selectedDate)) {
          return items;
        }
      });

      console.log(filterDate, "filterDate");
      setTableData(filterDate);
    }
  };

  return (
    <div className=" m-10">
      <div className=" text-[20px] flex justify-center font-bold">
        Flight Details
      </div>
      <DatePickerFilter setSelectedDate={setSelectedDate} />
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />{" "}
    </div>
  );
};
export default Home;
