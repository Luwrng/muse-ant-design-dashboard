import React, { useEffect } from "react";
import { useState } from "react";
import { EyeFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import GOrderDetail from "./GOrderDetail";
import "./GOrderPage.css";
import gardenerOrderService from "../../../services/apiServices/gardenerOrderService";
import GApprovePopup from "./Popups/GApprovePopup";
import GRejectPopup from "./Popups/GRejectPopup";
import LoadingPopup from "../../../../components/loading/LoadingPopup";
import Paginate from "../../../../components/paginate/Paginate";
import notificationService from "../../../services/apiServices/notificationService";

function GOrderPage() {
  const [activeFilter, setActiveFilter] = useState("PENDING");
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);

  //Paginate variable
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalResult, setTotalResult] = useState();

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [orderForModal, setOrderForModal] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [currentPage, activeFilter]);

  const fetchOrder = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
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

  // const handleUpdateOrderStatus = async (orderId, status) => {
  //   try {
  //     await gardenerOrderService.updateOrderStatus(orderId, status);
  //     fetchOrder();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // Modified handleUpdateOrderStatus to open modals
  const handleUpdateOrderStatus = (order, status) => {
    setOrderForModal(order);
    if (status === "PREPARING") {
      setShowApproveModal(true);
    } else if (status === "CANCELLED") {
      setShowRejectModal(true);
    }
  };

  const handleApproveConfirm = async (order, shippingCost) => {
    setIsLoading(true);
    try {
      await gardenerOrderService.approveOrder(order.orderId, shippingCost);

      const data = {
        accountId: order.retailerId,
        message: `Đơn hàng [${order.orderId}] đã được duyệt thành công và đang chuẩn bị được giao`,
        link: "Không có",
        sender: localStorage.getItem("account_name"),
      };
      await notificationService.sendNotification(data);

      // console.log(data, order);
      fetchOrder();
    } catch (err) {
      console.log(err);
    } finally {
      setShowApproveModal(false);
      setOrderForModal(null);
      setIsLoading(false);
    }
  };

  const handleRejectConfirm = async (order, reason) => {
    setIsLoading(true);
    console.log(reason);
    try {
      await gardenerOrderService.rejectOrder(order.orderId, reason);

      const data = {
        accountId: order.retailerId,
        message: `Đơn hàng [${order.orderId}] đã bị nhà vườn từ chối. Vui lòng kiểm tra chi tiết đơn hàng hoặc liên hệ nhà vuòn để biết thêom thông tin.`,
        link: "Không có",
        sender: localStorage.getItem("account_name"),
      };
      await notificationService.sendNotification(data);

      // console.log(data, order);
      fetchOrder(); // Refresh orders after update
    } catch (err) {
      console.log(err);
    } finally {
      setShowRejectModal(false);
      setOrderForModal(null);
      setIsLoading(false);
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
                  <tr key={order.orderId} className="gorder-table-row">
                    <td className="gorder-td">{order.orderId}</td>
                    <td className="gorder-td">{order.retailerName}</td>
                    <td className="gorder-td">
                      {formatPrice(order.totalAmount + order.shippingCost)}
                    </td>
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
                                handleUpdateOrderStatus(order, "PREPARING")
                              }
                              title="Xem chi tiết"
                            >
                              <CheckOutlined />
                            </button>
                            <button
                              className="gorder-action-btn gorder-deny-btn"
                              onClick={() =>
                                handleUpdateOrderStatus(order, "CANCELLED")
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
      {showApproveModal && (
        <GApprovePopup
          order={orderForModal}
          onClose={() => setShowApproveModal(false)}
          onConfirm={handleApproveConfirm}
        />
      )}
      {showRejectModal && (
        <GRejectPopup
          order={orderForModal}
          onClose={() => setShowRejectModal(false)}
          onConfirm={handleRejectConfirm}
        />
      )}

      <LoadingPopup isOpen={isLoading} />
    </>
  );
}

export default GOrderPage;
