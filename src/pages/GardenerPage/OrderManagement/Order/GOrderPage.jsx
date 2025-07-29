import React, { useEffect } from "react";
import { useState } from "react";
import { EyeFilled } from "@ant-design/icons";
import GOrderDetail from "./GOrderDetail";
import "./GOrderPage.css";
import gardenerOrderService from "../../../services/apiServices/gardenerOrderService";
import Paginate from "../../../../components/paginate/Paginate";

function GOrderPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);

  //Paginate variable
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalResult, setTotalResult] = useState();

  useEffect(() => {
    fetchOrder(currentPage);
  }, [currentPage]);

  const fetchOrder = async (currentPage) => {
    try {
      const gardenerId = localStorage.getItem("account_id");
      const result = await gardenerOrderService.getGardenerOrder(
        gardenerId,
        currentPage,
        10
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
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Chờ xử lý" },
    { key: "delivering", label: "Đang giao" },
    { key: "completed", label: "Hoàn thành" },
  ];

  const filteredOrders = Array.isArray(orders)
    ? activeFilter === "all"
      ? orders || []
      : (orders || []).filter(
          (order) => order.status.toLowerCase() === activeFilter
        )
    : [];

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
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="gorder-table-container">
          <table className="gorder-table">
            <thead>
              <tr className="gorder-table-header">
                <th className="gorder-th">ID</th>
                <th className="gorder-th">ID NHÀ BÁN LẺ</th>
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
                    <td className="gorder-td">{order.orderId}</td>
                    <td className="gorder-td">{order.retailerId}</td>
                    <td className="gorder-td">{order.totalAmount} ₫</td>
                    <td className="gorder-td">{order.productTypeAmount}</td>
                    <td className="gorder-td">{order.createdAt}</td>
                    <td className="gorder-td">
                      <span
                        className={`gorder-status gorder-status-${order.status}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="gorder-td">
                      <div className="gorder-actions">
                        <button
                          className="gorder-action-btn gorder-view-btn"
                          onClick={() => handleView(order.orderId)}
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

        {/* Pagination
        <div className="gorder-pagination">
          <div className="gorder-pagination-info"></div>
          <div className="gpost-pagination-controls">
            <button className="gpost-pagination-btn">‹</button>
            {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
              <button
                key={index}
                className={`gpost-pagination-btn ${
                  page === 1 ? "gpost-active" : ""
                }`}
              >
                {page}
              </button>
            ))}
            <button className="gpost-pagination-btn">›</button>
          </div>
        </div> */}

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
