import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

let orderHistory = []; // Stores dummy orders

const PaymentModal = ({ visible, onClose, flight }) => {
  const [form] = Form.useForm();
  const [orderId, setOrderId] = useState(null);

  const navigate = useNavigate();
  const generateOrderId = () => {
    return "ORD-" + Math.floor(100000 + Math.random() * 900000);
  };

  const handlePayment = () => {
    form.validateFields().then((values) => {
      const newOrderId = generateOrderId();

      // Save booking details to local array (or use Redux later)
      orderHistory.push({
        orderId: newOrderId,
        flight,
        bookingTime: new Date().toISOString(),
        paymentDetails: values,
      });

      setOrderId(newOrderId);
      const userData = JSON.parse(localStorage.getItem("loggedin-user"));
      const userEmail = userData?.email;
      const existingBookings =
        JSON.parse(localStorage.getItem("bookedInfo")) || [];
      const bookedInfo = [
        ...existingBookings,
        {
          ...flight,
          orderId: newOrderId,
          username: userEmail,
        },
      ];
      localStorage.setItem("bookedInfo", JSON.stringify(bookedInfo));
      message.success("Payment Successful!");
      form.resetFields();
    });
  };

  return (
    <Modal
      title="ATM Card Payment"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      {orderId ? (
        <div className="text-center space-y-4">
          <h2 className="text-green-600 text-xl font-bold">
            Payment Successful!
          </h2>
          <p>
            Your Order ID: <span className="font-mono">{orderId}</span>
          </p>
          <Button
            type="primary"
            onClick={() => {
              setOrderId(null);
              onClose();
            }}
          >
            Close
          </Button>
        </div>
      ) : (
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[
              { required: true, message: "Please enter your card number" },
            ]}
          >
            <Input maxLength={16} placeholder="1234 5678 9012 3456" />
          </Form.Item>

          <Form.Item
            label="Card Holder Name"
            name="cardHolder"
            rules={[
              { required: true, message: "Please enter card holder's name" },
            ]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              label="Expiry Date"
              name="expiry"
              className="w-1/2"
              rules={[{ required: true, message: "Enter expiry date" }]}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>

            <Form.Item
              label="CVV"
              name="cvv"
              className="w-1/2"
              rules={[{ required: true, message: "Enter CVV" }]}
            >
              <Input.Password maxLength={4} placeholder="123" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" block onClick={handlePayment}>
              Pay ₹12,499
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default PaymentModal;
export { orderHistory };
