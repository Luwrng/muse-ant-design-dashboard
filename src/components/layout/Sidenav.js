import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logodoan from "../../assets/images/logodoan.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCellsLarge,
  faUserGroup,
  faClone,
  faList,
  faFileContract,
  faBoxes,
  faNewspaper,
  faChartLine,
  faBell,
  faUserCheck,
  faBug,
  faUser,
  faSignInAlt,
  faUserPlus,
  faFileAlt,
  faShoppingBasket,
  faMoneyBill,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidenav.css";

function Sidenav() {
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
          <NavLink to="/dashboard">
            <FontAwesomeIcon icon={faTableCellsLarge} />
            <span>Tổng Quan</span>
          </NavLink>
        </Menu.Item>

        {/* FE-01: Quản lý tài khoản */}
        <Menu.SubMenu
          key="account-management"
          icon={<FontAwesomeIcon icon={faUserGroup} />}
          title="Quản Lý Tài Khoản"
        >
          <Menu.Item key="account">
            <NavLink to="/account">
              <FontAwesomeIcon icon={faList} />
              <span>Nhà Vườn</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="gardener-verification">
            <NavLink to="/gardener-verification">
              <FontAwesomeIcon icon={faUserCheck} />
              <span>Đại Lý</span>
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        {/* FE-02: Quản lý dịch vụ */}
        <Menu.SubMenu
          key="services-management"
          icon={<FontAwesomeIcon icon={faClone} />}
          title="Quản Lý Dịch Vụ"
        >
          <Menu.Item key="services">
            <NavLink to="/services">
              <FontAwesomeIcon icon={faList} />
              <span>Danh Sách Dịch Vụ</span>
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        {/* FE-03: Quản lý gói dịch vụ */}
        <Menu.SubMenu
          key="package-management"
          icon={<FontAwesomeIcon icon={faBoxes} />}
          title="Quản Lý Gói Dịch Vụ"
        >
          <Menu.Item key="package">
            <NavLink to="/package">
              <FontAwesomeIcon icon={faList} />
              <span>Danh Sách Gói</span>
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        {/* FE-04: Quản lý danh mục sản phẩm */}
        {/* <Menu.SubMenu
          key="product-management"
          icon={<FontAwesomeIcon icon={faShoppingBasket} />}
          title="Quản Lý Sản Phẩm"
        >
          <Menu.Item key="productcategory">
            <NavLink to="/productcategory">
              <FontAwesomeIcon icon={faList} />
              <span>Danh Mục Sản Phẩm</span>
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu> */}

        {/* FE-05 & FE-06: Quản lý đăng ký */}
        <Menu.SubMenu
          key="subscription-management"
          icon={<FontAwesomeIcon icon={faFileContract} />}
          title="Quản Lý Đăng Ký"
        >
          <Menu.Item key="subscription-contracts">
            <NavLink to="/subscription-contracts">
              <FontAwesomeIcon icon={faFileContract} />
              <span>Quản lí mua gói</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="subscription-orders">
            <NavLink to="/subscription-orders">
              <FontAwesomeIcon icon={faMoneyBill} />
              <span>Đơn Hàng & Thanh Toán</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="statistics">
            <NavLink to="/statistics">
              <FontAwesomeIcon icon={faChartLine} />
              <span>Thống Kê</span>
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="active-package-customers">
          <NavLink to="/active-package-customers">
            <FontAwesomeIcon icon={faUserGroup} />
            <span>Khách Hàng Đang Sử Dụng Gói</span>
          </NavLink>
        </Menu.Item>

        {/* FE-09: Quản lý báo cáo */}
        <Menu.SubMenu
          key="report-management"
          icon={<FontAwesomeIcon icon={faExclamationCircle} />}
          title="Quản Lý Báo Cáo"
        >
          <Menu.Item key="reports-list">
            <NavLink to="/reports-list">
              <FontAwesomeIcon icon={faList} />
              <span>Danh Sách Báo Cáo</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="reported-posts">
            <NavLink to="/reported-posts">
              <FontAwesomeIcon icon={faNewspaper} />
              <span>Bài Viết Bị Báo Cáo</span>
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Divider />

        <Menu.ItemGroup key="account-pages" title="Trang Tài Khoản">
          <Menu.Item key="profile">
            <NavLink to="/profile">
              <FontAwesomeIcon icon={faUser} />
              <span>Hồ Sơ</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="sign-in">
            <NavLink to="/sign-in">
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Đăng Nhập</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="sign-up">
            <NavLink to="/sign-up">
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Đăng Ký</span>
            </NavLink>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </>
  );
}

export default Sidenav;
