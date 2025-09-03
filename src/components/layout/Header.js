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
import UserInfo from "../UserInfo";

function Header({
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
    account: "Nhà Vườn",
    "gardener-verification": "Đại Lý",
    services: "Danh Sách Dịch Vụ",
    package: "Danh Sách Gói",
    productcategory: "Danh Mục Sản Phẩm",
    "subscription-contracts": "Danh sách gói đăng kí",
    "subscription-orders": "Danh sách đơn mua gói dịch vụ",
    "active-package-customers": "Danh sách khách hàng đang sửa dụng gói",
    notifications: "Thông Báo",
    "reports-list": "Danh Sách Báo Cáo",
    "reported-posts": "Bài Viết Bị Báo Cáo",
    profile: "Hồ Sơ",
    "sign-in": "Đăng Nhập",
    "sign-up": "Đăng Ký",
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
        style={{
          position: "absolute",
          top: 20,
          right: 40,
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          onClick={goToNotifications}
          style={{ cursor: "pointer", fontSize: "20px" }}
        >
          <BellOutlined />
        </div>
        <UserInfo />
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
              {/* {pageTitle} */}
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Header;
