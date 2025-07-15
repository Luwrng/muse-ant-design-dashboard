import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import CloudinaryUpload from "../cloudinary/CloudinaryUpload";

const { Title } = Typography;
const { Header, Content } = Layout;

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
    };
  }

  onFinish = (values) => {
    const dataToSend = {
      ...values,
      avatar: this.state.imageUrl || null,
    };
    console.log("📦 Dữ liệu gửi lên backend:", dataToSend);
    // TODO: gửi dataToSend lên backend nếu cần
  };

  onFinishFailed = (errorInfo) => {
    console.log("❌ Lỗi form:", errorInfo);
  };

  render() {
    return (
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-nav">
            <Menu mode="horizontal" defaultSelectedKeys={["4"]}>
              <Menu.Item key="3">
                <Link to="/sign-up">
                  <span>Đăng kí</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/sign-in">
                  <span>Đăng nhập</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>

        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col xs={24} lg={{ span: 6, offset: 2 }} md={12}>
              <Title className="mb-15">Đăng nhập</Title>

              {/* Upload ảnh avatar */}
              <CloudinaryUpload
                onUploaded={(url) => {
                  this.setState({ imageUrl: url });
                  console.log("✅ Ảnh đã upload:", url);
                }}
              />

              <Form
                layout="vertical"
                className="row-col"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                    SIGN IN
                  </Button>
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
              <img src={signinbg} alt="Sign in background" />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
