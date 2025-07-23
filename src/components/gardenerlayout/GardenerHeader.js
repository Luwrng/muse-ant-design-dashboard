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

  const sampleNotifications = [
    {
      id: 1,
      senderName: "Jackie Monroe",
      message: "requests permission to change Design System",
      category: "Project",
      sendAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false,
      avatar: "/placeholder.svg?height=40&width=40",
      link: "https://example.com/project/design-system",
    },
    {
      id: 2,
      senderName: "Chris Graham",
      message: "has added a new employee",
      category: "Employee",
      sendAt: new Date(Date.now() - 28 * 60 * 1000), // 28 minutes ago
      isRead: false,
      avatar: "/placeholder.svg?height=40&width=40",
      link: null,
    },
    {
      id: 3,
      senderName: "Paul Miller",
      message: "has added a new project Mobile App",
      category: "Project",
      sendAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      isRead: true,
      avatar: "/placeholder.svg?height=40&width=40",
      link: "https://example.com/project/mobile-app",
    },
    {
      id: 4,
      senderName: "Oliver Wilson",
      message: "has added a new vendor and changed the client",
      category: "Vendor & Client",
      sendAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      isRead: true,
      avatar: "/placeholder.svg?height=40&width=40",
      link: null,
    },
    {
      id: 5,
      senderName: "Marilyn Cooper",
      message:
        'mentioned you in a comment: "The new UI colors look vibrant and stunning."',
      category: "Project",
      sendAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      isRead: true,
      avatar: "/placeholder.svg?height=40&width=40",
      link: "https://example.com/project/ui-colors",
    },
    {
      id: 6,
      senderName: "Edward Simpson",
      message: "requests permission to change Keynote Presentation",
      category: "Project",
      sendAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      isRead: true,
      avatar: "/placeholder.svg?height=40&width=40",
      link: null,
    },
  ];

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
