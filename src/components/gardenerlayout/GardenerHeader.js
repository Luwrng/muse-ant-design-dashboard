import React from "react";
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  Button,
  List,
  Avatar,
  Input,
  Drawer,
  Typography,
  Switch,
} from "antd";

import {
  SearchOutlined,
  StarOutlined,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { BellOutlined } from "@ant-design/icons";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import avtar from "../../assets/images/team-2.jpg";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

function GardenerHeader({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) {
  const { Title, Text } = Typography;

  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");

  useEffect(() => window.scrollTo(0, 0));

  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);

  const breadcrumbMap = {
    dashboard: "Tổng Quan",
    order: "Quản Lý Đơn Hàng",
    "order-delivery": "Quản Lý Đơn hàng Vận Chuyển",
    services: "Danh Sách Dịch Vụ",
    post: "Danh Sách Bìa Đăng",
    product: "Quản Lý Sản Phẩm",
    "product-category": "Quản Lý Danh Mục Sản Phẩm",
    appointment: "Quản Lý Cuộc Hẹn",
    message: "Tin Nhắn",
    notifications: "Thông Báo",
    feedback: "Danh Sách Phản Hồi",
    profile: "Hồ Sơ",
    "sign-up": "Đăng Xuất",
  };
  const location = useLocation();
  const path = location.pathname.replace("/", "");
  const pageTitle = breadcrumbMap[path] || path;

  const history = useHistory();

  const goToNotifications = () => {
    history.push("/notifications");
  };

  return (
    <>
      <div
        onClick={goToNotifications}
        style={{
          position: "absolute",
          top: 20,
          right: 40,
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        <BellOutlined />
      </div>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {pageTitle}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {pageTitle}
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default GardenerHeader;
