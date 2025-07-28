import React, { useEffect } from "react";
import { useState } from "react";
import GOrderDelivery from "../OrderDelivery/GOrderDelivery";
import "./GOrderDetail.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import gardenerOrderService from "../../../services/apiServices/gardenerOrderService";

function GOrderDetail({ orderId, onBack }) {
  const [isCreatingDelivery, setIsCreatingDelivery] = useState(false);
  const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [deliveryQuantities, setDeliveryQuantities] = useState({});
  const [errors, setErrors] = useState({});

  const [orderData, setOrderData] = useState(null);
  const [orderDeliveries, setOrderDeliveries] = useState([]);
  const [expandedDeliveryId, setExpandedDeliveryId] = useState(null);

  const [createOrderDelivery, setCreateOrderDelivery] = useState({
    deliveryDate: new Date().toISOString().split("T")[0],
    note: "",
    delieryDetailsDTOs: [{}],
  });

  useEffect(() => {
    const fetchOrderDeatil = async () => {
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
      } catch (err) {
        console.log(err);
        setOrderData(null);
        setOrderDeliveries([]);
      }
    };

    fetchOrderDeatil();
  }, [orderId]);

  const handleQuantityChange = (orderDetailId, value) => {
    const orderDetail = orderData.orderDetails.find(
      (p) => p.orderDetailId === orderDetailId
    );
    const quantity = Number.parseInt(value) || 0;

    if (quantity < orderDetail.deliveredQuantity) {
      setErrors({
        ...errors,
        [orderDetailId]: `Số lượng không được vượt quá ${orderDetail.remaining}`,
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
      alert("Vui lòng sửa các lỗi nhập liệu trước khi tạo đơn giao hàng.");
      return;
    }

    // Filter out products with 0 quantity or no quantity set
    const productsToDeliver = orderData.orderDetails
      .filter(
        (detail) =>
          deliveryQuantities[detail.orderDetailId] != null &&
          deliveryQuantities[detail.orderDetailId] > 0
      )
      .map((detail) => ({
        productId: detail.productId,
        deliveredAt: createOrderDelivery.deliveryDate,
        quantity: deliveryQuantities[detail.orderDetailId],
        price: detail.price,
        productUnit: detail.productUnit,
        currency: detail.currency,
      }));

    if (productsToDeliver.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để giao.");
      return;
    }

    try {
      const createdeliveryData = createOrderDelivery;
      createOrderDelivery.delieryDetailsDTOs = productsToDeliver;

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
      const deliveriesResult =
        await gardenerOrderService.getGardenerOrderDeliveries(
          accountId,
          orderId
        );
      setOrderDeliveries(deliveriesResult);

      alert("Đơn giao hàng đã được tạo thành công!");
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
    }
  };

  const toggleDeliveryDetails = (deliveryId) => {
    setExpandedDeliveryId(
      expandedDeliveryId === deliveryId ? null : deliveryId
    );
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
      </div>
      <div className="godetail-content">
        <div className="godetail-title-section">
          <h1 className="godetail-title">
            Chi tiết đơn hàng {orderData.orderId}
          </h1>
          <span
            className={`godetail-status godetail-status-${orderData.status}`}
          >
            {orderData.status}
          </span>
        </div>
        <div className="godetail-info">
          <p className="godetail-customer">
            Khách hàng: {orderData.accountName}
          </p>
          <p className="godetail-total">Tổng tiền: {orderData.totalAmount} ₫</p>
          <p className="godetail-unit">
            Phương thức thanh toán: {orderData.paymentMethod}
          </p>{" "}
          <p className="godetail-date">
            Ngày tạo:{" "}
            {new Date(orderData.createdAt).toISOString().split("T")[0]}
          </p>
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
                      Đã giao:
                      {detail.deliveredQuantity} {detail.weightUnit}
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
                  type="date"
                  id="delivery-date"
                  value={createOrderDelivery.deliveryDate}
                  min={new Date().toISOString().split("T")[0]}
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
                      {delivery.deliveryStatus}
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
                <p>Ghi chú: {delivery.note || "Không có"}</p>

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
      {showDeliveryPopup && (
        <GOrderDelivery
          orderId={orderData.orderId}
          onClose={() => setShowDeliveryPopup(false)}
        />
      )}
    </div>
  );
}

export default GOrderDetail;
