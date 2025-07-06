import React, { Component } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
} from "antd";
import logo1 from "../assets/images/logos-facebook.svg";
import logo2 from "../assets/images/logo-apple.svg";
import logo3 from "../assets/images/Google__G__Logo.svg.png";

import { Link } from "react-router-dom";


const { Title } = Typography;
const { Header, Content } = Layout;

export default class SignUp extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <div className="layout-default ant-layout layout-sign-up" style={{ overflowY: "hidden", height: "100vh" }}>
          <Header>
            <div className="header-col header-nav">
              <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="3">
                  <Link to="/sign-up">

                    <span> Đăng kí </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/sign-in">

                    <span>Đăng nhập </span>
                  </Link>
                </Menu.Item>
              </Menu>
            </div>
          </Header>

          <Content className="p-0">
            <div className="sign-up-header">
              <div className="content">
                <Title>Sign Up</Title>
                <p className="text-lg">
                  Use these awesome forms to login or create new account in your
                  project for free.
                </p>
              </div>
            </div>

            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              title={<h5>Đăng kí</h5>}
              bordered="false"
            >

              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="row-col"
              >
                <Form.Item
                  name="Tên"
                  rules={[
                    { required: true, message: "Nhập tên của bạn!" },
                  ]}
                >
                  <Input placeholder="Tên" />
                </Form.Item>
                <Form.Item
                  name="Số điện thoại"
                  rules={[
                    { required: true, message: "Nhập số điện thoại của bạn!" },
                  ]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input placeholder="Mật Khẩu" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>
                    Tôi đồng ý với{" "}
                    <a href="#pablo" className="font-bold text-dark">
                      Điều khoản và điều kiện
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Đăng kí
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                Bạn đã có tài khoản ?{" "}
                <Link to="/sign-in" className="font-bold text-dark">
                  Đăng nhập
                </Link>
              </p>
            </Card>
          </Content>

        </div>
      </>
    );
  }
}
