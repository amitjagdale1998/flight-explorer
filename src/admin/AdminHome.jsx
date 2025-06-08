import React, { useEffect, useState } from "react";
import { Table, Tag, Typography, Empty } from "antd";

const { Title } = Typography;

const AdminHome = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookedInfo")) || [];
    setBookings(data);
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "User",
      dataIndex: "username",
      key: "username",
      render: (text) => <Tag color="purple">{text}</Tag>,
    },
    {
      title: "Flight Number",
      dataIndex: ["flight", "number"],
      key: "flightNumber",
      render: (text) => (
        <span className="font-semibold text-indigo-600">{text}</span>
      ),
    },
    {
      title: "Airline",
      dataIndex: ["airline", "name"],
      key: "airline",
      render: (text) => <span className="text-green-600">{text}</span>,
    },
    {
      title: "From",
      dataIndex: ["departure", "airport"],
      key: "from",
      render: (text) => <span className="text-blue-700">{text}</span>,
    },
    {
      title: "To",
      dataIndex: ["arrival", "airport"],
      key: "to",
      render: (text) => <span className="text-red-600">{text}</span>,
    },
    {
      title: "Flight Date",
      dataIndex: "flight_date",
      key: "flight_date",
      render: (text) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "flight_status",
      key: "flight_status",
      render: (status) => (
        <Tag color={status === "scheduled" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-7xl mx-auto mt-10">
      <Title level={3} className="text-center text-blue-600 mb-6">
        ✈️ Your Booked Flights
      </Title>

      {bookings.length === 0 ? (
        <Empty description="No bookings found." />
      ) : (
        <Table
          columns={columns}
          dataSource={bookings}
          rowKey="orderId"
          pagination={{ pageSize: 5 }}
          bordered
          className="rounded-md"
        />
      )}
    </div>
  );
};

export default AdminHome;
