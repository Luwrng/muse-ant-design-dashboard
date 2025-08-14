import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logodoan from "../../assets/images/logodoan.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCellsLarge,
  faUser,
  faSignInAlt,
  faClipboardList,
  faPenSquare,
  faSeedling,
  faCalendarAlt,
  faMessage,
  faCreditCard,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./GardenerSidenav.css";

function GardenerSidenav() {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand">
        <img src={logodoan} alt="Logo" />
        <span>CleanFoodViet</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline" defaultSelectedKeys={[page]}>
        <Menu.Item key="dashboard">
          <NavLink to="/gardener/dashboard">
            <FontAwesomeIcon icon={faTableCellsLarge} />
            <span>Tổng Quan</span>
          </NavLink>
        </Menu.Item>

        {/* Quản lý đơn hàng */}
        <Menu.Item key="order">
          <NavLink to="/gardener/order">
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Đơn hàng</span>
          </NavLink>
        </Menu.Item>

        {/* FE-02: Quản lý bài đăng */}
        <Menu.Item key="post">
          <NavLink to="/gardener/post">
            <FontAwesomeIcon icon={faPenSquare} />
            <span>Quản Lý Bài đăng</span>
          </NavLink>
        </Menu.Item>

        {/* Quản lý sản phẩm */}
        <Menu.Item key="product">
          <NavLink to="/gardener/product">
            <FontAwesomeIcon icon={faSeedling} />
            <span>Sản phẩm</span>
          </NavLink>
        </Menu.Item>

        {/* Quản lý danh mục sản phẩm */}
        {/* <Menu.Item key="product-category">
          <NavLink to="/gardener/product-category">
            <FontAwesomeIcon icon={faSeedling} />
            <span>Danh Mục Sản phẩm</span>
          </NavLink>
        </Menu.Item> */}

        {/* Quản lý cuộc hẹn */}
        <Menu.Item key="appointment">
          <NavLink to="/gardener/appointment">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Quản Lý Cuộc Hẹn</span>
          </NavLink>
        </Menu.Item>

        {/* Quản lý tin nhắn */}
        <Menu.Item key="message">
          <NavLink to="/gardener/message">
            <FontAwesomeIcon icon={faMessage} />
            <span>Tin Nhắn</span>
          </NavLink>
        </Menu.Item>

        {/* Quản lý tin nhắn */}
        <Menu.Item key="package-payment">
          <NavLink to="/gardener/package-payment">
            <FontAwesomeIcon icon={faCreditCard} />
            <span>Thông tin mua gói</span>
          </NavLink>
        </Menu.Item>

        {/* Quản lý báo cáo */}
        <Menu.Item key="report">
          <NavLink to="/gardener/report">
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Báo Cáo</span>
          </NavLink>
        </Menu.Item>
        <Menu.Divider />

        <Menu.ItemGroup key="account-pages" title="Trang Tài Khoản">
          <Menu.Item key="profile">
            <NavLink to="/gardener/profile">
              <FontAwesomeIcon icon={faUser} />
              <span>Hồ Sơ</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="log-out"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            <div className="gnav-bar">
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Đăng Xuất</span>
            </div>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </>
  );
}

export default GardenerSidenav;
