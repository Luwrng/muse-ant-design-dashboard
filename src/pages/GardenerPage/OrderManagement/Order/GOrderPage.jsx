import React, { useEffect } from "react";
import { useState } from "react";
import { EyeFilled } from "@ant-design/icons";
import GOrderDetail from "./GOrderDetail";
import "./GOrderPage.css";
import gardenerOrderService from "../../../services/apiServices/gardenerOrderService";

function GOrderPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const gardenerId = localStorage.getItem("account_id");
        const result = await gardenerOrderService.getGardenerOrder(gardenerId);

        setOrders(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrder();
  }, []);


  const filterTabs = [
    { key: "all", label: "Tất cả", count: 6 },
    { key: "pending", label: "Chờ xử lý", count: 1 },
    { key: "delivering", label: "Đang giao", count: 1 },
    { key: "completed", label: "Hoàn thành", count: 4 },
  ];

  const filteredOrders =
    activeFilter === "all"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    setCurrentPage(1);
  };

  const handleView = (orderId) => {
    setSelectedOrderId(orderId);
    setShowOrderDetail(true);
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
        <div className="gorder-filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              className={`gorder-filter-tab ${
                activeFilter === tab.key ? "gorder-active" : ""
              }`}
              onClick={() => handleFilterChange(tab.key)}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="gorder-table-container">
          <table className="gorder-table">
            <thead>
              <tr className="gorder-table-header">
                <th className="gorder-th">ID</th>
                <th className="gorder-th">TÊN NHÀ BÁN LẺ</th>
                <th className="gorder-th">TỔNG TIỀN</th>
                <th className="gorder-th">SỐ LƯỢNG SẢN PHẨM</th>
                <th className="gorder-th">NGÀY TẠO</th>
                <th className="gorder-th">TRẠNG THÁI</th>
                <th className="gorder-th">HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredOrders) &&
                filteredOrders.map((order) => (
                  <tr key={order.id} className="gorder-table-row">
                    <td className="gorder-td">{order.id}</td>
                    <td className="gorder-td">{order.store}</td>
                    <td className="gorder-td">{order.total} ₫</td>
                    <td className="gorder-td">{order.items}</td>
                    <td className="gorder-td">{order.date}</td>
                    <td className="gorder-td">
                      <span
                        className={`gorder-status gorder-status-${order.status}`}
                      >
                        {order.statusText}
                      </span>
                    </td>
                    <td className="gorder-td">
                      <div className="gorder-actions">
                        <button
                          className="gorder-action-btn gorder-view-btn"
                          onClick={() => handleView(order.id)}
                          title="Xem chi tiết"
                        >
                          <EyeFilled />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="gorder-pagination">
          <div className="gorder-pagination-info">
            Hiển thị từ 1 đến {filteredOrders.length} trong tổng số{" "}
            {filteredOrders.length} kết quả
          </div>
          <div className="gorder-pagination-controls">
            <button
              className="gorder-pagination-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            <button className="gorder-pagination-btn gorder-active">1</button>
            <button
              className="gorder-pagination-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === 1}
            >
              Tiếp
            </button>
          </div>
        </div>
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
