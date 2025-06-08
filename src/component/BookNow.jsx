import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Tag, Descriptions, Divider } from "antd";
import PaymentModal from "./common/PaymentModal";
import { useNavigate } from "react-router-dom";

const BookNow = () => {
  const navigate = useNavigate();
  const selectedFlight = useSelector((state) => state?.selectedflight?.flights);
  console.log(selectedFlight);
  const [showPayment, setShowPayment] = useState(false);
  const {
    airline,
    flight: flightInfo,
    departure,
    arrival,
    flight_date,
    flight_status,
  } = selectedFlight?.[selectedFlight?.length - 1];
  useEffect(() => {
    if (!selectedFlight?.length) {
      message.error(
        "You are not Selected any flight!Please Select any Flight!"
      );

      navigate("/home");
      return;
    }
  }, [selectedFlight]);
  const price = "₹12,499";
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card
          title={`Flight ${flightInfo?.iata} (${airline?.name})`}
          bordered={false}
          className="w-full max-w-3xl shadow-lg"
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Flight Number">
              {flightInfo?.iata}
            </Descriptions.Item>
            <Descriptions.Item label="Airline">
              {airline?.name} ({airline?.iata})
            </Descriptions.Item>
            <Descriptions.Item label="From">
              {departure?.airport} ({departure?.iata}) -{" "}
              {new Date(departure?.scheduled).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="To">
              {arrival?.airport} ({arrival?.iata}) -{" "}
              {new Date(arrival?.scheduled).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Flight Date">
              {flight_date}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={flight_status === "scheduled" ? "blue" : "green"}>
                {flight_status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              <span className="text-green-600 font-semibold">{price}</span>
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <div className="flex justify-end gap-4 mt-4">
            {/* <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
              Book Now
            </Button> */}
            <Button
              type="default"
              className="border-green-500 text-green-600"
              onClick={() => setShowPayment(true)}
            >
              Pay Now
            </Button>
          </div>

          <PaymentModal
            visible={showPayment}
            onClose={() => setShowPayment(false)}
            flight={selectedFlight?.[selectedFlight?.length - 1]}
          />
        </Card>
      </div>
    </div>
  );
};

export default BookNow;
