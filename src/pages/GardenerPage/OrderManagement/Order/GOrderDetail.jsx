import React, { useEffect } from "react";
import { useState } from "react";
import GOrderDelivery from "../OrderDelivery/GOrderDelivery";
import "./GOrderDetail.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import gardenerOrderService from "../../../services/apiServices/gardenerOrderService";
import matchers from "@testing-library/jest-dom/matchers";
import GApprovePopup from "./Popups/GApprovePopup";
import GRejectPopup from "./Popups/GRejectPopup";
import LoadingPopup from "../../../../components/loading/LoadingPopup";
import notificationService from "../../../services/apiServices/notificationService";
import { message } from "antd";

function GOrderDetail({ orderId, onBack }) {
  const [isCreatingDelivery, setIsCreatingDelivery] = useState(false);
  // const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [deliveryQuantities, setDeliveryQuantities] = useState({});
  const [errors, setErrors] = useState({});

  const [orderData, setOrderData] = useState(null);
  const [orderDeliveries, setOrderDeliveries] = useState([]);
  const [expandedDeliveryId, setExpandedDeliveryId] = useState(null);

  // const [contractImage, setContractImage] = useState(null);
  // const [contractImagePreview, setContractImagePreview] = useState(null);

  const [createOrderDelivery, setCreateOrderDelivery] = useState({
    deliveryDate: new Date().toISOString().split("T")[0],
    note: "",
    delieryDetailsDTOs: [{}],
  });

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [orderForModal, setOrderForModal] = useState(null);

  const [minDeliveryDate, setMinDeliveryDate] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  // const handleContractImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setContractImage(file);
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setContractImagePreview(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  //  const removeContractImage = () => {
  //    setContractImage(null);
  //    setContractImagePreview(null);
  //  };

  //Date time input handler
  const formatForDatetimeLocal = (date) => {
    // Format to "YYYY-MM-DDTHH:MM"
    return date.toISOString().slice(0, 16);
  };

  const getTodayAtMidnight = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  };

  const formatDateToLocalDatetimeString = (date) => {
    const pad = (n) => String(n).padStart(2, "0");

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes())
    );
  };

  const fetchOrderDetail = async () => {
    setIsLoading(true);
    try {
      const accountId = localStorage.getItem("account_id");
      const result = await gardenerOrderService.getGardenerOrderDetail(
        accountId,
        orderId
      );
      setOrderData(result);

      const deliveriesResult = await gardenerOrderService.getOrderDeliveries(
        orderId
      );
      setOrderDeliveries(deliveriesResult);

      // === Setup latest delivery date ===
      let latestDate = null;

      if (deliveriesResult && deliveriesResult.length > 0) {
        latestDate = deliveriesResult.reduce((latest, current) => {
          const currentDate = new Date(current.deliveryDate);
          return currentDate > new Date(latest.deliveryDate) ? current : latest;
        }).deliveryDate;
      }

      const finalMinDate = latestDate
        ? new Date(latestDate)
        : getTodayAtMidnight();

      setMinDeliveryDate(formatDateToLocalDatetimeString(finalMinDate));
    } catch (err) {
      console.log(err);
      setOrderData(null);
      setOrderDeliveries([]);
      setMinDeliveryDate(formatDateToLocalDatetimeString(getTodayAtMidnight()));
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

  const handleQuantityChange = (orderDetailId, value) => {
    const orderDetail = orderData.orderDetails.find(
      (p) => p.orderDetailId === orderDetailId
    );
    const quantity = Number.parseInt(value) || 0;

    if (quantity > orderDetail.quantity - orderDetail.deliveredQuantity) {
      setErrors({
        ...errors,
        [orderDetailId]: `Số lượng không được vượt quá ${orderDetail.deliveredQuantity}`,
      });
    } else {
      setErrors({
        ...errors,
        [orderDetailId]: null,
      });
    }

    setDeliveryQuantities({
      ...deliveryQuantities,
      [orderDetailId]: quantity,
    });
  };

  const getSelectedProductsCount = () => {
    return Object.values(deliveryQuantities).filter((qty) => qty > 0).length;
  };

  const handleCreateDelivery = async () => {
    // Check for any errors before proceeding
    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (hasErrors) {
      // alert("Vui lòng sửa các lỗi nhập liệu trước khi tạo đơn giao hàng.");
      message.error(
        "Vui lòng sửa các lỗi nhập liệu trước khi tạo đơn giao hàng."
      );
      return;
    }

    // Filter out products with 0 quantity or no quantity set
    const orderDetailsToDeliver = orderData.orderDetails
      .filter(
        (detail) =>
          deliveryQuantities[detail.orderDetailId] != null &&
          deliveryQuantities[detail.orderDetailId] > 0
      )
      .map((detail) => ({
        orderDetailId: detail.orderDetailId,
        deliveredAt: createOrderDelivery.deliveryDate,
        quantity: deliveryQuantities[detail.orderDetailId],
        price: detail.price,
        productUnit: detail.productUnit,
        currency: detail.currency,
      }));

    if (orderDetailsToDeliver.length === 0) {
      // alert("Vui lòng chọn ít nhất một sản phẩm để giao.");
      message.wwarning("Vui lòng chọn ít nhất một sản phẩm để giao.");
      return;
    }

    setIsLoading(true);
    try {
      const createdeliveryData = createOrderDelivery;
      createOrderDelivery.delieryDetailsDTOs = orderDetailsToDeliver;

      await gardenerOrderService.createOrderDelivery(
        orderId,
        createdeliveryData
      );

      // After successful creation, reset state and potentially re-fetch order/delivery data
      setIsCreatingDelivery(false);
      setDeliveryQuantities({});
      setErrors({});

      //Re-fetch data to update remaining quantities and delivery list
      const accountId = localStorage.getItem("account_id");
      const orderResult = await gardenerOrderService.getGardenerOrderDetail(
        accountId,
        orderId
      );
      setOrderData(orderResult);
      const deliveriesResult = await gardenerOrderService.getOrderDeliveries(
        orderId
      );
      setOrderDeliveries(deliveriesResult);

      // === Setup latest delivery date ===
      let latestDate = null;

      if (deliveriesResult && deliveriesResult.length > 0) {
        latestDate = deliveriesResult.reduce((latest, current) => {
          const currentDate = new Date(current.deliveryDate);
          return currentDate > new Date(latest.deliveryDate) ? current : latest;
        }).deliveryDate;
      }

      const finalMinDate = latestDate
        ? new Date(latestDate)
        : getTodayAtMidnight();

      setMinDeliveryDate(formatDateToLocalDatetimeString(finalMinDate));

      // alert("Đơn giao hàng đã được tạo thành công!");
      message.success("Đơn giao hàng đã được tạo thành công!");
    } catch (err) {
      console.log(err);
    } finally {
      setIsCreatingDelivery(false);
      setDeliveryQuantities({});
      setCreateOrderDelivery({
        deliveryDate: new Date().toISOString().split("T")[0],
        note: "",
        delieryDetailsDTOs: [{}],
      });
      setIsLoading(false);
    }
  };

  const toggleDeliveryDetails = (deliveryId) => {
    setExpandedDeliveryId(
      expandedDeliveryId === deliveryId ? null : deliveryId
    );
  };

  const handleCompleteDelivery = async (delivery) => {
    const matchedDetailsList = delivery.orderDeliveryDetails.map(
      (deliveryItem) => {
        const matches = orderData.orderDetails.find(
          (detail) => detail.productId === deliveryItem.productId
        );
        return {
          orderDetailId: matches.orderDetailId,
          remainDeliveryQuantity: matches.quantity - matches.deliveredQuantity,
        };
      }
    );

    setIsLoading(true);
    try {
      await gardenerOrderService.updateOrderDeliveryStatus(
        orderId,
        delivery.orderDeliveryId,
        "DELIVERED"
      );
      // Optionally update UI
      setOrderDeliveries((prev) =>
        prev.map((d) =>
          d.orderDeliveryId === delivery.orderDeliveryId
            ? { ...d, deliveryStatus: "DELIVERED" }
            : d
        )
      );

      await gardenerOrderService.updateGardenerOrderStatus(
        orderId,
        matchedDetailsList
      );
      fetchOrderDetail();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleUpdateOrderStatus = async (orderId, status) => {
  //   try {
  //     await gardenerOrderService.updateOrderStatus(orderId, status);
  //     fetchOrderDetail();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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

      fetchOrderDetail();
    } catch (err) {
      console.log(err);
    } finally {
      setShowApproveModal(false);
      setOrderForModal(null);
      setIsLoading(false);
    }
  };

  const handleRejectConfirm = async (order, rejectReason) => {
    setIsLoading(true);
    try {
      await gardenerOrderService.rejectOrder(order.orderId, {
        rejectReason,
      });

      const data = {
        accountId: order.retailerId,
        message: `Đơn hàng [${order.orderId}] đã bị nhà vườn từ chối. Vui lòng kiểm tra chi tiết đơn hàng hoặc liên hệ nhà vuòn để biết thêom thông tin.`,
        link: "Không có",
        sender: localStorage.getItem("account_name"),
      };
      await notificationService.sendNotification(data);

      // console.log(data, order);

      fetchOrderDetail(); // Refresh orders after update
    } catch (err) {
      console.log(err);
    } finally {
      setShowRejectModal(false);
      setOrderForModal(null);
      setIsLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "Chờ duyệt";
      case "PREPARING":
        return "Chuẩn bị hàng";
      case "DELIVERING":
        return "Đang giao";
      case "DELIVERED":
        return "Đã giao";
      case "COMPLETED":
        return "Hoàn thành";
      default:
        return "Đã hủy";
    }
  };

  if (!orderData) {
    return (
      <div className="godetail-loading">Đang tải chi tiết đơn hàng...</div>
    );
  }

  return (
    <div className="godetail-container">
      <div className="godetail-header">
        <button className="godetail-back-btn" onClick={onBack}>
          ← Quay lại
        </button>
        {orderData.status === "PENDING" ? (
          <div className="godetail-actions">
            <button
              className="godetail-accept-delivery-btn"
              onClick={() => handleUpdateOrderStatus(orderData, "PREPARING")}
            >
              Chấp nhận đơn hàng
            </button>
            <button
              className="godetail-deny-delivery-btn"
              onClick={() => handleUpdateOrderStatus(orderData, "CANCELLED")}
            >
              Từ chối đơn hàng
            </button>
          </div>
        ) : orderData.status === "PREPARING" ||
          orderData.status === "DELIVERING" ? (
          <div className="godetail-actions">
            {!isCreatingDelivery && (
              <>
                <button
                  className="godetail-create-delivery-btn"
                  onClick={() => setIsCreatingDelivery(true)}
                >
                  + Tạo đơn giao hàng
                </button>
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="godetail-content">
        <div className="godetail-title-section">
          <h1 className="godetail-title">
            Chi tiết đơn hàng {orderData.orderId}
          </h1>
          <span
            className={`godetail-status godetail-status-${orderData.status.toLowerCase()}`}
          >
            {getStatusClass(orderData.status)}
          </span>
        </div>

        {/* Order Detail Information */}
        {/* <div className="godetail-info">
          <p className="godetail-customer">
            Khách hàng: {orderData.accountName}
          </p>
          <p className="godetail-customer">
            Số điện thoại: {orderData.phoneNumber}
          </p>
          <p className="godetail-customer">
            Địa chỉ giao hàng: {orderData.shippingAddress}
          </p>
          <p className="godetail-total">
            Tổng tiền sản phẩm: {formatPrice(orderData.totalAmount)}
          </p>
          <p className="godetail-total">
            Chi phí vận chuyển: {formatPrice(orderData.shippingCost)}
          </p>
          <p className="godetail-total">
            Tổng tiền đặt cọc: {formatPrice(orderData.totalDepositAmount)}
          </p>
          <p className="godetail-unit">
            Phương thức thanh toán: {orderData.paymentMethod}
          </p>{" "}
          <p className="godetail-date">
            Ngày tạo:{" "}
            {new Date(orderData.createdAt).toISOString().split("T")[0]}
          </p>
        </div> */}

        <div className="godetail-info-card">
          <h2 className="godetail-info-title">Thông tin đơn hàng</h2>
          <div className="godetail-info-grid">
            <div className="godetail-info-item">
              <span className="godetail-info-label">Khách hàng:</span>
              <span className="godetail-info-value">
                {orderData.accountName}
              </span>
            </div>
            <div className="godetail-info-item">
              <span className="godetail-info-label">Số điện thoại:</span>
              <span className="godetail-info-value">
                {orderData.phoneNumber}
              </span>
            </div>
            <div className="godetail-info-item">
              <span className="godetail-info-label">Địa chỉ giao hàng:</span>
              <span className="godetail-info-value">
                {orderData.shippingAddress}
              </span>
            </div>
            <div className="godetail-info-item">
              <span className="godetail-info-label">Tổng tiền sản phẩm:</span>
              <span className="godetail-info-value godetail-price">
                {formatPrice(orderData.totalAmount)}
              </span>
            </div>
            <div className="godetail-info-item">
              <span className="godetail-info-label">Chi phí vận chuyển:</span>
              <span className="godetail-info-value godetail-price">
                {formatPrice(orderData.shippingCost)}
              </span>
            </div>
            <div className="godetail-info-item">
              <span className="godetail-info-label">Tổng tiền đặt cọc:</span>
              <span className="godetail-info-value godetail-price">
                {formatPrice(orderData.totalDepositAmount)}
              </span>
            </div>
            <div className="godetail-info-item">
              <span className="godetail-info-label">
                Phương thức thanh toán:
              </span>
              <span className="godetail-info-value">
                {orderData.paymentMethod}
              </span>
            </div>
            <div className="godetail-info-item">
              <span className="godetail-info-label">Ngày tạo:</span>
              <span className="godetail-info-value">
                {new Date(orderData.createdAt).toISOString().split("T")[0]}
              </span>
            </div>

            <div className="godetail-info-item godetail-contract-section">
              <span className="godetail-info-label">Tệp hợp đồng:</span>
              <div className="godetail-contract-display">
                {orderData.contractImage ? (
                  <>
                    {/* <div className="godetail-contract-image-container">
                    <img
                      src={orderData.contractImage || "/placeholder.svg"}
                      alt="Hình ảnh hợp đồng"
                      className="godetail-contract-image"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    <div
                      className="godetail-contract-error"
                      style={{ display: "none" }}
                    >
                      Không thể file hợp đồng
                    </div>
                  </div> */}
                    <div className="godetail-contract-file-container">
                      <div className="godetail-contract-file-info">
                        📄 File hợp đồng
                      </div>
                      <div className="godetail-contract-file-actions">
                        <a
                          href={orderData.contractImage}
                          download
                          className="godetail-contract-download-btn"
                        >
                          Tải xuống hợp đồng
                        </a>
                        {/* Optional: view on Office Online if file is public */}
                        <a
                          href={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                            orderData.contractImage
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="godetail-contract-view-btn"
                        >
                          Xem trên Office Online
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="godetail-no-contract">
                    Chưa có tệp hợp đồng
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="godetail-products">
          <h2 className="godetail-products-title">Danh sách sản phẩm</h2>
          {Array.isArray(orderData.orderDetails) &&
            orderData.orderDetails.map((detail) => (
              <div key={detail.orderDetailId} className="godetail-product-item">
                <div className="godetail-product-left">
                  {isCreatingDelivery &&
                    detail.deliveredQuantity < detail.quantity && (
                      <input
                        type="checkbox"
                        className="godetail-product-checkbox"
                        checked={deliveryQuantities[detail.orderDetailId] > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            // If checked, set quantity to remaining if not already set
                            if (
                              !deliveryQuantities[detail.orderDetailId] ||
                              deliveryQuantities[detail.orderDetailId] === 0
                            ) {
                              handleQuantityChange(
                                detail.orderDetailId,
                                detail.deliveredQuantity
                              );
                            }
                          } else {
                            handleQuantityChange(detail.orderDetailId, 0);
                          }
                        }}
                      />
                    )}
                  <div className="godetail-product-info">
                    <h3 className="godetail-product-name">
                      {detail.productName}
                    </h3>
                    <p className="godetail-product-price">
                      {detail.price} ₫/ {detail.weightUnit}
                    </p>
                    {isCreatingDelivery &&
                      detail.deliveredQuantity < detail.quantity && (
                        <div className="godetail-quantity-input">
                          <label>Số lượng giao:</label>
                          <input
                            type="number"
                            min="0"
                            max={detail.quantity - detail.deliveredQuantity}
                            value={
                              deliveryQuantities[detail.orderDetailId] || ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              if (!isNaN(value)) {
                                const clamped = Math.min(
                                  Math.max(value, 0),
                                  detail.quantity - detail.deliveredQuantity
                                ); // clamp between 0 and x
                                handleQuantityChange(
                                  detail.orderDetailId,
                                  clamped
                                );
                              }
                            }}
                            className={
                              errors[detail.orderDetailId]
                                ? "godetail-error"
                                : ""
                            }
                          />
                          <span className="godetail-quantity-limit">
                            / {detail.quantity - detail.deliveredQuantity}
                          </span>
                          {errors[detail.orderDetailId] && (
                            <div className="godetail-error-message">
                              {errors[detail.orderDetailId]}
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
                <div className="godetail-product-right">
                  <div className="godetail-quantity-info">
                    <span className="godetail-quantity-label">
                      Tổng: {detail.quantity} {detail.weightUnit}
                    </span>
                    <span className="godetail-quantity-label">
                      Đã giao: {detail.deliveredQuantity} {detail.weightUnit}
                    </span>
                    <span className="godetail-quantity-remaining">
                      Còn lại: {detail.quantity - detail.deliveredQuantity}{" "}
                      {detail.weightUnit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {isCreatingDelivery && (
          <>
            <div className="godetail-new-delivery-section mt-6">
              <h3 className="godetail-new-delivery-title">
                Thông tin giao hàng mới
              </h3>
              <div>
                <label
                  htmlFor="delivery-date"
                  className="godetail-delivery-label"
                >
                  Ngày giao:
                </label>
                <input
                  type="datetime-local"
                  id="delivery-date"
                  value={createOrderDelivery.deliveryDate}
                  min={minDeliveryDate}
                  onChange={(e) =>
                    setCreateOrderDelivery((prev) => ({
                      ...prev,
                      deliveryDate: e.target.value,
                    }))
                  }
                  className="godetail-delivery-input"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="delivery-note"
                  className="godetail-delivery-label"
                >
                  Ghi chú:
                </label>
                <textarea
                  id="delivery-note"
                  value={createOrderDelivery.note}
                  onChange={(e) =>
                    setCreateOrderDelivery((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }))
                  }
                  rows="3"
                  className="godetail-delivery-input"
                  placeholder="Nhập ghi chú cho đơn giao hàng (tùy chọn)"
                ></textarea>
              </div>
            </div>
            <div className="godetail-delivery-actions">
              <button
                className="godetail-create-btn"
                onClick={handleCreateDelivery}
                disabled={
                  getSelectedProductsCount() === 0 ||
                  Object.values(errors).some((error) => error !== null)
                }
              >
                Tạo phiếu giao hàng ({getSelectedProductsCount()} sản phẩm)
              </button>
              <button
                className="godetail-cancel-btn"
                onClick={() => {
                  setIsCreatingDelivery(false);
                  setDeliveryQuantities({});
                  setErrors({});
                }}
              >
                Hủy
              </button>
            </div>
          </>
        )}

        {/* New section for Order Deliveries List with dropdown */}
        <div className="godetail-deliveries-section">
          <h2 className="godetail-deliveries-title">Danh sách đơn giao hàng</h2>
          {orderDeliveries == null || orderDeliveries.length === 0 ? (
            <p className="godetail-no-deliveries">
              Chưa có đơn giao hàng nào cho đơn này.
            </p>
          ) : (
            orderDeliveries.map((delivery) => (
              <div
                key={delivery.orderDeliveryId}
                className="godetail-delivery-item"
              >
                <div
                  className="godetail-delivery-header"
                  onClick={() =>
                    toggleDeliveryDetails(delivery.orderDeliveryId)
                  }
                >
                  <h3>Mã giao hàng: {delivery.orderDeliveryId}</h3>
                  <div className="godetail-delivery-header-right">
                    <span
                      className={`godetail-status godetail-status-${delivery.deliveryStatus.toLowerCase()}`}
                    >
                      {getStatusClass(delivery.deliveryStatus)}
                    </span>
                    {expandedDeliveryId === delivery.orderDeliveryId ? (
                      <ChevronUp className="godetail-dropdown-icon" />
                    ) : (
                      <ChevronDown className="godetail-dropdown-icon" />
                    )}
                  </div>
                </div>
                <p>
                  Ngày giao:{" "}
                  {new Date(delivery.deliveryDate).toLocaleDateString()}
                </p>
                <p>Tổng tiền: {formatPrice(delivery.totalAmount)} </p>
                <p>Ghi chú: {delivery.note || "Không có"}</p>
                {delivery.deliveryStatus !== "DELIVERED" && (
                  <button
                    className="godetail-complete-button"
                    onClick={() => handleCompleteDelivery(delivery)}
                  >
                    Hoàn tất giao hàng
                  </button>
                )}
                {expandedDeliveryId === delivery.orderDeliveryId && (
                  <div className="godetail-delivery-details-list">
                    <h4>Sản phẩm đã giao:</h4>
                    {Array.isArray(delivery.orderDetails) &&
                    delivery.orderDetails.length === 0 ? (
                      <p className="godetail-no-delivery-details">
                        Không có sản phẩm nào trong đơn giao hàng này.
                      </p>
                    ) : (
                      Array.isArray(delivery.orderDeliveryDetails) &&
                      delivery.orderDeliveryDetails.map((detail) => (
                        <div
                          key={detail.orderDeliveryDetailId}
                          className="godetail-delivery-detail-item"
                        >
                          <span>{detail.productName}</span>
                          <span>
                            Số lượng: {detail.quantity} {detail.productUnit}
                          </span>
                          <span>
                            Giá: {detail.price} {detail.currency}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
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
    </div>
  );
}

export default GOrderDetail;
