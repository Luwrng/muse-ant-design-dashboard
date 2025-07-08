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
    {
      id: "ORD004",
      store: "Nature Shop",
      total: "800.000",
      items: 2,
      date: "09:15 13/01/2024",
      status: "completed",
      statusText: "Hoàn thành",
    },
    {
      id: "ORD005",
      store: "Nature Shop",
      total: "800.000",
      items: 2,
      date: "09:15 13/01/2024",
      status: "completed",
      statusText: "Hoàn thành",
    },
    {
      id: "ORD006",
      store: "Nature Shop",
      total: "800.000",
      items: 2,
      date: "09:15 13/01/2024",
      status: "completed",
      statusText: "Hoàn thành",
    },
    {
      id: "ORD007",
      store: "Nature Shop",
      total: "800.000",
      items: 2,
      date: "09:15 13/01/2024",
      status: "completed",
      statusText: "Hoàn thành",
    },
    {
      id: "ORD008",
      store: "Nature Shop",
      total: "800.000",
      items: 2,
      date: "09:15 13/01/2024",
      status: "completed",
      statusText: "Hoàn thành",
    },
    {
      id: "ORD009",
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
    <div className="gorder-order-management">
      <h1 className="gorder-page-title">Quản lý đơn hàng</h1>

      {/* Filter Tabs */}
      <div className="gorder-filter-tabs">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            className={`gorder-filter-tab ${
              activeFilter === tab.key ? "active" : ""
            }`}
            onClick={() => handleFilterChange(tab.key)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Order Cards */}
      <div className="gorder-orders-grid-div">
        <div className="gorder-orders-grid">
          {filteredOrders.map((order) => (
            <div key={order.id} className="gorder-order-card">
              <div className="gorder-order-header">
                <div className="gorder-order-id">{order.id}</div>
                <div className={`gorder-order-status ${order.status}`}>
                  {order.statusText}
                </div>
              </div>

              <div className="gorder-order-store">{order.store}</div>

              <div className="gorder-order-details">
                <div className="gorder-order-row">
                  <span className="gorder-label">Tổng tiền:</span>
                  <span className="gorder-value">{order.total} ₫</span>
                </div>
                <div className="gorder-order-row">
                  <span className="gorder-label">Số sản phẩm:</span>
                  <span className="gorder-value">{order.items} loại</span>
                </div>
                <div className="gorder-order-row">
                  <span className="gorder-label">Ngày tạo:</span>
                  <span className="gorder-value">{order.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="gorder-pagination">
        <div className="gorder-pagination-info">
          Hiển thị từ 1 đến 6 trong tổng số XX kết quả
        </div>
        <div className="gorder-pagination-controls">
          <button
            className="gorder-pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`gorder-pagination-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <span className="gorder-pagination-dots">...</span>

          {[8, 9, 10].map((page) => (
            <button
              key={page}
              className="gorder-pagination-btn"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="gorder-pagination-btn"
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
