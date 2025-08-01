import React, { useEffect } from "react";
import { useState } from "react";
import { EyeFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import GOrderDetail from "./GOrderDetail";
import "./GOrderPage.css";
import gardenerOrderService from "../../../services/apiServices/gardenerOrderService";
import Paginate from "../../../../components/paginate/Paginate";

function GOrderPage() {
  const [activeFilter, setActiveFilter] = useState("PENDING");
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);

  //Paginate variable
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalResult, setTotalResult] = useState();

  useEffect(() => {
    fetchOrder();
  }, [currentPage, activeFilter]);

  const fetchOrder = async () => {
    try {
      const gardenerId = localStorage.getItem("account_id");
      const result = await gardenerOrderService.getGardenerOrder(
        gardenerId,
        currentPage,
        10,
        "Status",
        activeFilter
      );

      setOrders(result.items);
      setTotalPage(result.totalPages);
      setTotalResult(result.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePagChange = (page) => {
    setCurrentPage(page);
  };

  const filterTabs = [
    { key: "PENDING", label: "Chờ xử lý" },
    { key: "PREPARING", label: "Chuẩn bị hàng" },
    { key: "DELIVERING", label: "Đang giao" },
    { key: "DELIVERED", label: "Đã giao" },
    { key: "COMPLETED", label: "Hoàn thành" },
    { key: "CANCELLED", label: "Đã hủy" },
  ];

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    setCurrentPage(1);
  };

  const handleView = (orderId) => {
    setSelectedOrderId(orderId);
    setShowOrderDetail(true);
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await gardenerOrderService.updateOrderStatus(orderId, status);
      fetchOrder();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={`gorder-management ${
          showOrderDetail ? "gorder-hidden" : ""
        }`}
      >
        <h1 className="gorder-page-title">Quản lý đơn hàng</h1>

        {/* Filter Tabs */}
        <div className="gorder-header-bottom">
          <div className="gorder-filter-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                className={`gorder-filter-tab ${
                  activeFilter === tab.key ? "gorder-active" : ""
                }`}
                onClick={() => handleFilterChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="gorder-search-container"></div>
        </div>

        {/* Orders Table */}
        <div className="gorder-table-container">
          <table className="gorder-table">
            <thead>
              <tr className="gorder-table-header">
                <th className="gorder-th">ID</th>
                <th className="gorder-th">Nhà bán lẻ</th>
                <th className="gorder-th">Tổng tiền</th>
                <th className="gorder-th">Số lượng sản phẩm</th>
                <th className="gorder-th">Ngày tạo</th>
                <th className="gorder-th">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orders) &&
                orders.map((order) => (
                  <tr key={order.id} className="gorder-table-row">
                    <td className="gorder-td">{order.orderId}</td>
                    <td className="gorder-td">{order.retailerName}</td>
                    <td className="gorder-td">{order.totalAmount} ₫</td>
                    <td className="gorder-td">{order.productTypeAmount}</td>
                    <td className="gorder-td">
                      {new Date(order.createdAt).toISOString().split("T")[0]},{" "}
                      {
                        new Date(order.createdAt)
                          .toISOString()
                          .split("T")[1]
                          .split(".")[0]
                      }
                    </td>
                    {/* <td className="gorder-td">
                      <span
                        className={`gorder-status gorder-status-${order.status}`}
                      >
                        {order.status}
                      </span>
                    </td> */}
                    <td className="gorder-td">
                      <div className="gorder-actions">
                        <button
                          className="gorder-action-btn gorder-view-btn"
                          onClick={() => handleView(order.orderId)}
                          title="Xem chi tiết"
                        >
                          <EyeFilled />
                        </button>

                        {order.status === "PENDING" ? (
                          <>
                            <button
                              className="gorder-action-btn gorder-accept-btn"
                              onClick={() =>
                                handleUpdateOrderStatus(
                                  order.orderId,
                                  "PREPARING"
                                )
                              }
                              title="Xem chi tiết"
                            >
                              <CheckOutlined />
                            </button>
                            <button
                              className="gorder-action-btn gorder-deny-btn"
                              onClick={() =>
                                handleUpdateOrderStatus(
                                  order.orderId,
                                  "CANCELLED"
                                )
                              }
                              title="Xem chi tiết"
                            >
                              <CloseOutlined />
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Paginate
          currentPage={currentPage}
          totalPages={totalPage}
          totalResults={totalResult}
          onPageChange={handlePagChange}
        />
      </div>
      {showOrderDetail && (
        <GOrderDetail
          orderId={selectedOrderId}
          onBack={() => setShowOrderDetail(false)}
        />
      )}
    </>
  );
}

export default GOrderPage;
