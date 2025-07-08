import React from "react";
import { useState } from "react";
import "./GOrderPage.css";

function GOrderPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample order data
  const orders = [
    {
      id: "ORD001",
      store: "Green Store",
      total: "1.500.000",
      items: 3,
      date: "10:30 15/01/2024",
      status: "pending",
      statusText: "Chờ xử lý",
    },
    {
      id: "ORD002",
      store: "Flower Paradise",
      total: "2.200.000",
      items: 2,
      date: "14:20 14/01/2024",
      status: "delivering",
      statusText: "Đang giao",
    },
    {
      id: "ORD003",
      store: "Nature Shop",
      total: "800.000",
      items: 2,
      date: "09:15 13/01/2024",
      status: "completed",
      statusText: "Hoàn thành",
    },
  ];

  const filterTabs = [
    { key: "all", label: "Tất cả", count: 3 },
    { key: "pending", label: "Chờ xử lý", count: 1 },
    { key: "delivering", label: "Đang giao", count: 1 },
    { key: "completed", label: "Hoàn thành", count: 1 },
  ];

  const filteredOrders =
    activeFilter === "all"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="order-management">
      <h1 className="page-title">Quản lý đơn hàng</h1>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            className={`filter-tab ${activeFilter === tab.key ? "active" : ""}`}
            onClick={() => handleFilterChange(tab.key)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Order Cards */}
      <div className="orders-grid">
        {filteredOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-id">{order.id}</div>
              <div className={`order-status ${order.status}`}>
                {order.statusText}
              </div>
            </div>

            <div className="order-store">{order.store}</div>

            <div className="order-details">
              <div className="order-row">
                <span className="label">Tổng tiền:</span>
                <span className="value">{order.total} ₫</span>
              </div>
              <div className="order-row">
                <span className="label">Số sản phẩm:</span>
                <span className="value">{order.items} loại</span>
              </div>
              <div className="order-row">
                <span className="label">Ngày tạo:</span>
                <span className="value">{order.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Hiển thị từ 1 đến 6 trong tổng số XX kết quả
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`pagination-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <span className="pagination-dots">...</span>

          {[8, 9, 10].map((page) => (
            <button
              key={page}
              className="pagination-btn"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 10}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default GOrderPage;
