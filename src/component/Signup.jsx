import React from "react";
import { Button, Form, Input, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increment, userSlice } from "./redux/slice/userSlice";
const { Option } = Select;
const key = "amitjagdale";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userCredentials);
  console.log(user, "user list");

  const onFinish = (values) => {
    console.log("Success:", values);

    if (values.email && values.password && values.role) {
      const matchedReduxUser = user?.find((item) => {
        return item.email === values.email;
      });
      if (matchedReduxUser) {
        message.error("User is existing!");
        return;
      }
      //   const encryptedPAssword = sha256(values?.password).toString();
      const oldUser = JSON.parse(localStorage.getItem("user"));
      const userStore = [
        ...oldUser,
        {
          email: values.email,
          password: values.password,
          role: values.role,
        },
      ];
      dispatch(
        increment({
          email: values.email,
          password: values.password,
          role: values.role,
        })
      );

      localStorage.setItem("user", JSON.stringify(userStore));
      message.success("Register sucessfully!");
      navigate("/login");
    } else {
      message.error("Required All Field!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Select Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Choose a role">
            <Option value="Admin">Admin</Option>
            <Option value="User">User</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
