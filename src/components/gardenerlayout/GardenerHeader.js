import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Breadcrumb, Typography } from "antd";

import { BellOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import GNotificationIcon from "../../pages/GardenerPage/Notification/GNotificationIcon";
import httpService from "../../pages/services/apiServices/httpService";
import notificationService from "../../pages/services/apiServices/notificationService";
import SubscriptionIcon from "../../assets/images/gardener/subscription_icon.png";
import { Tooltip } from "antd";
// import UserInfo from "../UserInfo";

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
    "order-delivery": "Quản Lý Đơn Hàng Vận Chuyển",
    services: "Danh Sách Dịch Vụ",
    post: "Danh Sách Bài Đăng",
    product: "Quản Lý Sản Phẩm",
    "product-category": "Quản Lý Danh Mục Sản Phẩm",
    appointment: "Quản Lý Cuộc Hẹn",
    message: "Tin Nhắn",
    notifications: "Thông Báo",
    feedback: "Danh Sách Phản Hồi",
    profile: "Hồ Sơ",
    "sign-up": "Đăng Ký",
  };

  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentPageKey = pathSegments[pathSegments.length - 1];
  const pageTitle = breadcrumbMap[currentPageKey] || currentPageKey;

  const history = useHistory();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountId = localStorage.getItem("account_id");
        const result = await notificationService.getAccountNotification(
          accountId
        );
        setNotifications(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 40,
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        <Tooltip title="Gói dịch vụ">
          <img
            src={SubscriptionIcon}
            alt="Access Package"
            style={{
              width: 30,
              height: 30,
              marginBottom: "0.6rem",
              marginRight: "0.8rem",
            }}
            onClick={() => {
              // handle click event here
              history.push("/gardener/service-package");
            }}
          />
        </Tooltip>

        <GNotificationIcon notifications={notifications} />
      </div>

      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Trang Chủ</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {pageTitle}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
    </>
  );
}

export default GardenerHeader;
