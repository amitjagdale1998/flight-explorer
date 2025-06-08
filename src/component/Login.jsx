import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserCredentials, userSlice } from "./redux/slice/userSlice";
import CryptoJS from "crypto-js";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const userInfo = localStorage.getItem("user");
    const users = JSON.parse(userInfo);

    const matchedUser = users?.find((item) => {
      const decrypted = CryptoJS.AES.decrypt(item.password, "amitjagdale");
      const originalPassword = decrypted.toString(CryptoJS.enc.Utf8);
      
      return item.email === values.email && originalPassword === values?.password;
    });
    

    if (matchedUser) {
      console.log(matchedUser);
      localStorage.setItem("loggedin-user", JSON.stringify(matchedUser));
      message.success("Login Successful!");
      if (matchedUser?.role === "User") {
        navigate("/home");
      } else {
        navigate("/admin");
      }
    } else {
      navigate("/login");
      message.error("Invalid email or password!");
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    handleLogin(values);
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
          rules={[{ required: true, message: "Please input your email!" }]}
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

        
          
           <Form.Item   wrapperCol={{ offset: 8, span: 16 }}>
          
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
      
          
        </Form.Item>
       
        <div className=" flex justify-center mx-auto">Don't have an account? <span className="  cursor-pointer text-blue-600 font-bold" onClick={()=>navigate("/signup")}>Sign up</span></div>
       
        
       
      </Form>
    </div>
  );
};

export default Login;
