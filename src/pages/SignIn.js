// import React, { Component, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Layout,
//   Menu,
//   Button,
//   Row,
//   Col,
//   Typography,
//   Form,
//   Input,
//   Switch,
// } from "antd";
// import signinbg from "../assets/images/img-signin.jpg";
// import {
//   DribbbleOutlined,
//   TwitterOutlined,
//   InstagramOutlined,
//   GithubOutlined,
// } from "@ant-design/icons";
// import styled from "styled-components";

// function onChange(checked) {
//   console.log(`switch to ${checked}`);
// }
// const { Title } = Typography;
// const { Header, Footer, Content } = Layout;

// const CustomButton = styled(Button)`
//   width: 100%;
//   background: #28bf8d;
//   border: none;

//   &:hover {
//     background: #239e78 !important;
//     border: none !important;
//   }
//   ,
//   &:focus,
//   &:active {
//     background: #28bf8d !important;
//     border: none !important;
//   }
// `;

// export default class SignIn extends Component {
//   render() {
//     const onFinish = (values) => {
//       console.log("Success:", values);
//     };

//     const onFinishFailed = (errorInfo) => {
//       console.log("Failed:", errorInfo);
//     };
//     return (
//       <>
//         <Layout className="layout-default layout-signin">
//           <Header>
//             <div className="header-col header-nav">
//               <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
//                 <Menu.Item key="3">
//                   <Link to="/sign-up">
//                     <span> Đăng kí </span>
//                   </Link>
//                 </Menu.Item>
//                 <Menu.Item key="4">
//                   <Link to="/sign-in">
//                     <span> Đăng nhập </span>
//                   </Link>
//                 </Menu.Item>
//               </Menu>
//             </div>
//           </Header>
//           <Content className="signin">
//             <Row gutter={[24, 0]} justify="space-around">
//               <Col
//                 xs={{ span: 24, offset: 0 }}
//                 lg={{ span: 6, offset: 2 }}
//                 md={{ span: 12 }}
//               >
//                 <Title className="mb-15">Đăng nhập</Title>

//                 <Form
//                   onFinish={onFinish}
//                   onFinishFailed={onFinishFailed}
//                   layout="vertical"
//                   className="row-col"
//                 >
//                   <Form.Item
//                     className="username"
//                     label="Số diện thoại"
//                     name="Số diện thoại"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Hãy nhập số điện thoại của bạn !!!!!!",
//                       },
//                     ]}
//                   >
//                     <Input placeholder="Số điện thoại" />
//                   </Form.Item>

//                   <Form.Item
//                     className="username"
//                     label="Mật khẩu"
//                     name="password"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Hãy nhập mật khẩu của bạn!!!!!",
//                       },
//                     ]}
//                   >
//                     <Input placeholder="Mật khẩu" />
//                   </Form.Item>

//                   {/* <Form.Item
//                     name="remember"
//                     className="aligin-center"
//                     valuePropName="checked"
//                   >
//                     <Switch defaultChecked onChange={onChange} />
//                  Ghi nhớ
//                   </Form.Item> */}

//                   <Form.Item>
//                     <CustomButton
//                       type="primary"
//                       htmlType="submit"
//                       onClick={(e) => {
//                         e.currentTarget.blur(); // remove focus so it returns to normal
//                       }}
//                     >
//                       Đăng nhập
//                     </CustomButton>
//                   </Form.Item>
//                   <p className="font-semibold text-muted">
//                     Bạn chưa có tài khoản ?{" "}
//                     <Link to="/sign-up" className="text-dark font-bold">
//                       Đăng kí
//                     </Link>
//                   </p>
//                 </Form>
//               </Col>
//               <Col className="sign-img">
//                 <img src={signinbg} alt="" />
//               </Col>
//             </Row>
//           </Content>
//           {/* <Footer>
//             <Menu mode="horizontal">
//               <Menu.Item>Company</Menu.Item>
//               <Menu.Item>About Us</Menu.Item>
//               <Menu.Item>Teams</Menu.Item>
//               <Menu.Item>Products</Menu.Item>
//               <Menu.Item>Blogs</Menu.Item>
//               <Menu.Item>Pricing</Menu.Item>
//             </Menu>
//             <Menu mode="horizontal" className="menu-nav-social">
//               <Menu.Item>
//                 <Link to="#">{<DribbbleOutlined />}</Link>
//               </Menu.Item>
//               <Menu.Item>
//                 <Link to="#">{<TwitterOutlined />}</Link>
//               </Menu.Item>
//               <Menu.Item>
//                 <Link to="#">{<InstagramOutlined />}</Link>
//               </Menu.Item>
//               <Menu.Item>
//                 <Link to="#">
//                   <svg
//                     width="18"
//                     height="18"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 512 512"
//                   >
//                     <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path>
//                   </svg>
//                 </Link>
//               </Menu.Item>
//               <Menu.Item>
//                 <Link to="#">{<GithubOutlined />}</Link>
//               </Menu.Item>
//             </Menu>
//             <p className="copyright">
//               {" "}
//               Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.{" "}
//             </p>
//           </Footer> */}
//         </Layout>
//       </>
//     );
//   }
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Layout, Menu, Button, Row, Col, Typography, Form, Input } from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import styled from "styled-components";
import authenticateService from "./services/apiServices/authenticateService";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const CustomButton = styled(Button)`
  width: 100%;
  background: #28bf8d;
  border: none;

  &:hover {
    background: #239e78 !important;
    border: none !important;
  }
  &:focus,
  &:active {
    background: #28bf8d !important;
    border: none !important;
  }
`;

export default function SignIn() {
  const [form] = Form.useForm(); // optional if you want to control form manually
  const [loading, setLoading] = useState(false); // example useState
  const [error, setError] = useState("");
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      localStorage.clear();
      const result = await authenticateService.login(values);
      localStorage.setItem("auth_token", result.token);
      localStorage.setItem("account_id", result.accountId);
      localStorage.setItem("account_name", result.name);
      localStorage.setItem("account_avatar", result.avatar);
      setLoading(false);
      setError(null);
      history.push("/gardener/landing");
    } catch (err) {
      setLoading(false);
      console.log("Login failed: ", err.response.data);
      setError(err.response.data.Error);
    }

    // Simulate API login call
    // setTimeout(() => {
    //   console.log("Logged in!");
    //   setLoading(false);
    // }, 1000);
  };

  return (
    <Layout className="layout-default layout-signin">
      <Header>
        <div className="header-col header-nav">
          <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="3">
              <Link to="/sign-up">Đăng kí</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/sign-in">Đăng nhập</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col xs={24} lg={{ span: 6, offset: 2 }} md={12}>
            <Title className="mb-15">Đăng nhập</Title>
            {error && (
              <p
                style={{
                  color: "red",
                  fontWeight: "500",
                  fontSize: "1rem",
                }}
              >
                {error}
              </p>
            )}
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập số điện thoại của bạn !!!",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu của bạn !!!",
                  },
                ]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item>
                <CustomButton
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Đăng nhập
                </CustomButton>
              </Form.Item>

              <p className="font-semibold text-muted">
                Bạn chưa có tài khoản?{" "}
                <Link to="/sign-up" className="text-dark font-bold">
                  Đăng kí
                </Link>
              </p>
            </Form>
          </Col>
          <Col className="sign-img">
            <img src={signinbg} alt="" />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
