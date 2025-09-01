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
  faUserCheck,
  faMoneyBill,
  faCircleExclamation,
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
              <FontAwesomeIcon icon={faUserCheck} />
              <span>Nhà Vườn</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="gardener-verification">
            <NavLink to="/gardener-verification">
              <FontAwesomeIcon icon={faUserCheck} />
              <span>Người Bán Lẻ</span>
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>
        {/* FE-02: Quản lý dịch vụ */}
        <Menu.Item key="services">
          <NavLink to="/services">
            <FontAwesomeIcon icon={faClone} />
            <span>Quản Lý Dịch Vụ</span>
          </NavLink>
        </Menu.Item>
        {/* FE-03: Quản lý gói dịch vụ */}
        <Menu.Item key="package">
          <NavLink to="/package">
            <FontAwesomeIcon icon={faList} />
            <span>Quản Lý Gói Dịch Vụ</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="subscription-orders">
          <NavLink to="/subscription-orders">
            <FontAwesomeIcon icon={faMoneyBill} />
            <span>Quản lí đăng kí</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="productcategory">
          <NavLink to="/productcategory">
            <FontAwesomeIcon icon={faUserGroup} />
            <span>Danh mục sản phẩm</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="active-package-customers">
          <NavLink to="/active-package-customers">
            <FontAwesomeIcon icon={faUserGroup} />
            <span>Danh Sách Khách Hàng Đang Sử Dụng Gói</span>
          </NavLink>
        </Menu.Item> */}
        {/* FE-09: Quản lý báo cáo */}

        <Menu.Item key="reports-list">
          <NavLink to="/reports-list">
            <FontAwesomeIcon icon={faCircleExclamation} />
            <span>Quản Lý Báo Cáo</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="reported-posts">
            <NavLink to="/reported-posts">
              <FontAwesomeIcon icon={faNewspaper} />
              <span>Bài Viết Bị Báo Cáo</span>
            </NavLink>
          </Menu.Item> */}

        <Menu.Divider />
      </Menu>
    </>
  );
}

export default Sidenav;
