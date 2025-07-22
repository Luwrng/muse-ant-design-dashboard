import React, { useEffect } from "react";
import { useState } from "react";
import GOrderDelivery from "../OrderDelivery/GOrderDelivery";
import "./GOrderDetail.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import gardenerOrderService from "../../../services/apiServices/gardenerOrderService";

// Mock gardenerOrderService for demonstration
// const gardenerOrderService = {
//   getGardenerOrderDetail: async (accountId, orderId) => {
//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     const mockOrderData = {
//       1: {
//         orderId: "ORD001",
//         accountName: "Green Store",
//         totalAmount: "1.500.000",
//         weightUnit: "kg",
//         createdAt: "15/01/2024",
//         status: "pending",
//         statusText: "Chờ xử lý",
//         orderDetails: [
//           {
//             orderDetailId: "ODD001-001",
//             productId: "prod1",
//             productName: "Hoa hồng đỏ",
//             price: "200.000",
//             quantity: 5,
//             deliveredQuantity: 0,
//             remainDeliveredQuantity: 5,
//           },
//           {
//             orderDetailId: "ODD001-002",
//             productId: "prod2",
//             productName: "Hoa tulip vàng",
//             price: "150.000",
//             quantity: 3,
//             deliveredQuantity: 0,
//             remainDeliveredQuantity: 3,
//           },
//           {
//             orderDetailId: "ODD001-003",
//             productId: "prod3",
//             productName: "Cây xanh mini",
//             price: "300.000",
//             quantity: 2,
//             deliveredQuantity: 0,
//             remainDeliveredQuantity: 2,
//           },
//         ],
//       },
//       6: {
//         orderId: "ORD006",
//         accountName: "Blue Garden",
//         totalAmount: "2.000.000",
//         weightUnit: "cây",
//         createdAt: "20/02/2024",
//         status: "completed",
//         statusText: "Đã hoàn thành",
//         orderDetails: [
//           {
//             orderDetailId: "ODD006-001",
//             productId: "prod1",
//             productName: "Hoa hồng đỏ",
//             price: "200.000",
//             quantity: 5,
//             deliveredQuantity: 5,
//             remainDeliveredQuantity: 0,
//           },
//           {
//             orderDetailId: "ODD006-002",
//             productId: "prod4",
//             productName: "Cẩm tú cầu",
//             price: "250.000",
//             quantity: 4,
//             deliveredQuantity: 4,
//             remainDeliveredQuantity: 0,
//           },
//         ],
//       },
//     };
//     return mockOrderData[orderId] || mockOrderData[1]; // Default to order 1 if not found
//   },
//   getGardenerOrderDeliveries: async (accountId, orderId) => {
//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 700));
//     const mockDeliveryData = {
//       1: [
//         {
//           orderDeliveryId: "DEL001",
//           orderId: "ORD001",
//           deliveryDate: "2025-07-22T10:00:00Z",
//           deliveryStatus: "Delivered",
//           createdAt: "2025-07-21T08:00:00Z",
//           updatedAt: "2025-07-22T10:00:00Z",
//           note: "First batch delivered successfully.",
//           orderDetails: [
//             {
//               orderDeliveryDetailId: "DLD001-001",
//               productId: "prod1",
//               productName: "Hoa hồng đỏ",
//               deliveredAt: "2025-07-22T10:00:00Z",
//               quantity: 2,
//               price: 200000,
//               productUnit: "cây",
//               currency: "₫",
//             },
//             {
//               orderDeliveryDetailId: "DLD001-002",
//               productId: "prod2",
//               productName: "Hoa tulip vàng",
//               deliveredAt: "2025-07-22T10:00:00Z",
//               quantity: 1,
//               price: 150000,
//               productUnit: "bó",
//               currency: "₫",
//             },
//           ],
//         },
//         {
//           orderDeliveryId: "DEL002",
//           orderId: "ORD001",
//           deliveryDate: "2025-07-23T14:00:00Z",
//           deliveryStatus: "Pending",
//           createdAt: "2025-07-22T11:00:00Z",
//           updatedAt: "2025-07-22T11:00:00Z",
//           note: "Second delivery scheduled.",
//           orderDetails: [
//             {
//               orderDeliveryDetailId: "DLD002-001",
//               productId: "prod1",
//               productName: "Hoa hồng đỏ",
//               deliveredAt: "2025-07-23T14:00:00Z",
//               quantity: 3,
//               price: 200000,
//               productUnit: "cây",
//               currency: "₫",
//             },
//             {
//               orderDeliveryDetailId: "DLD002-002",
//               productId: "prod3",
//               productName: "Cây xanh mini",
//               deliveredAt: "2025-07-23T14:00:00Z",
//               quantity: 2,
//               price: 300000,
//               productUnit: "chậu",
//               currency: "₫",
//             },
//           ],
//         },
//         {
//           orderDeliveryId: "DEL003",
//           orderId: "ORD001",
//           deliveryDate: "2025-07-25T09:00:00Z",
//           deliveryStatus: "Delivering",
//           createdAt: "2025-07-24T16:00:00Z",
//           updatedAt: "2025-07-24T16:00:00Z",
//           note: "Final delivery in progress.",
//           orderDetails: [
//             {
//               orderDeliveryDetailId: "DLD003-001",
//               productId: "prod2",
//               productName: "Hoa tulip vàng",
//               deliveredAt: "2025-07-25T09:00:00Z",
//               quantity: 2,
//               price: 150000,
//               productUnit: "bó",
//               currency: "₫",
//             },
//           ],
//         },
//       ],
//       6: [
//         {
//           orderDeliveryId: "DEL004",
//           orderId: "ORD006",
//           deliveryDate: "2024-02-21T09:00:00Z",
//           deliveryStatus: "Delivered",
//           createdAt: "2024-02-20T10:00:00Z",
//           updatedAt: "2024-02-21T09:00:00Z",
//           note: "All items delivered for ORD006.",
//           orderDetails: [
//             {
//               orderDeliveryDetailId: "DLD004-001",
//               productId: "prod1",
//               productName: "Hoa hồng đỏ",
//               deliveredAt: "2024-02-21T09:00:00Z",
//               quantity: 5,
//               price: 200000,
//               productUnit: "cây",
//               currency: "₫",
//             },
//             {
//               orderDeliveryDetailId: "DLD004-002",
//               productId: "prod4",
//               productName: "Cẩm tú cầu",
//               deliveredAt: "2024-02-21T09:00:00Z",
//               quantity: 4,
//               price: 250000,
//               productUnit: "chậu",
//               currency: "₫",
//             },
//           ],
//         },
//       ],
//     };
//     return mockDeliveryData[orderId] || [];
//   },
// };

function GOrderDetail({ orderId, onBack }) {
  const [isCreatingDelivery, setIsCreatingDelivery] = useState(false);
  const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [deliveryQuantities, setDeliveryQuantities] = useState({});
  const [errors, setErrors] = useState({});

  const [orderData, setOrderData] = useState(null);
  const [orderDeliveries, setOrderDeliveries] = useState([]);
  const [expandedDeliveryId, setExpandedDeliveryId] = useState(null);

  useEffect(() => {
    const fetchOrderDeatil = async () => {
      try {
        const accountId = localStorage.getItem("account_id");
        const result = gardenerOrderService.getGardenerOrderDetail(
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

  const handleQuantityChange = (productId, value) => {
    const product = orderData.orderDetails.find(
      (p) => p.productId === productId
    );
    const quantity = Number.parseInt(value) || 0;

    if (quantity > product.remaining) {
      setErrors({
        ...errors,
        [productId]: `Số lượng không được vượt quá ${product.remaining}`,
      });
    } else {
      setErrors({
        ...errors,
        [productId]: null,
      });
    }

    setDeliveryQuantities({
      ...deliveryQuantities,
      [productId]: quantity,
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
    const productsToDeliver = Object.keys(deliveryQuantities)
      .filter((orderDetailId) => deliveryQuantities[orderDetailId] > 0)
      .map((orderDetailId) => ({
        orderDetailId,
        quantity: deliveryQuantities[orderDetailId],
      }));

    if (productsToDeliver.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để giao.");
      return;
    }

    try {
      // Simulate API call for creating delivery
      console.log("Creating delivery with products:", productsToDeliver);
      // In a real application, you would call a service here:
      // await gardenerOrderService.createDelivery(orderId, productsToDeliver);

      // After successful creation, reset state and potentially re-fetch order/delivery data
      setIsCreatingDelivery(false);
      setDeliveryQuantities({});
      setErrors({});
      // Re-fetch data to update remaining quantities and delivery list
      const accountId = localStorage.getItem("account_id") || "mock_account_id";
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
      console.log("Creating delivery with quantities:", deliveryQuantities);
      setIsCreatingDelivery(false);
      setDeliveryQuantities({});
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
              <div className="godetail-dropdown">
                <button
                  className="godetail-menu-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  ⋯
                </button>
                {showDropdown && (
                  <div className="godetail-dropdown-menu">
                    <button
                      className="godetail-dropdown-item"
                      onClick={() => {
                        setShowDeliveryPopup(true);
                        setShowDropdown(false);
                      }}
                    >
                      Xem đơn giao hàng
                    </button>
                  </div>
                )}
              </div>
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
            {orderData.statusText}
          </span>
        </div>
        <div className="godetail-info">
          <p className="godetail-customer">
            Khách hàng: {orderData.accountName}
          </p>
          <p className="godetail-total">Tổng tiền: {orderData.totalAmount} ₫</p>
          <p className="godetail-unit">
            Đơn vị khối lượng: {orderData.weightUnit}
          </p>{" "}
          <p className="godetail-date">Ngày tạo: {orderData.createdAt}</p>
        </div>
        <div className="godetail-products">
          <h2 className="godetail-products-title">Danh sách sản phẩm</h2>
          {Array.isArray(orderData.orderDetails) &&
            orderData.orderDetails.map((detail) => (
              <div key={detail.orderDetailId} className="godetail-product-item">
                <div className="godetail-product-left">
                  {isCreatingDelivery && detail.remainDeliveredQuantity > 0 && (
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
                              detail.remainDeliveredQuantity
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
                    <p className="godetail-product-price">{detail.price} ₫</p>
                    {isCreatingDelivery &&
                      detail.remainDeliveredQuantity > 0 && (
                        <div className="godetail-quantity-input">
                          <label>Số lượng giao:</label>
                          <input
                            type="number"
                            min="0"
                            max={detail.remainDeliveredQuantity}
                            value={
                              deliveryQuantities[detail.orderDetailId] || ""
                            }
                            onChange={(e) =>
                              handleQuantityChange(
                                detail.orderDetailId,
                                e.target.value
                              )
                            }
                            className={
                              errors[detail.orderDetailId]
                                ? "godetail-error"
                                : ""
                            }
                          />
                          <span className="godetail-quantity-limit">
                            / {detail.remainDeliveredQuantity}
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
                      Tổng: {detail.quantity}
                    </span>
                    <span className="godetail-quantity-label">
                      Đã giao:{" "}
                      {detail.quantity - detail.remainDeliveredQuantity}
                    </span>
                    <span className="godetail-quantity-remaining">
                      Còn lại: {detail.remainDeliveredQuantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {isCreatingDelivery && (
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
        )}

        {/* New section for Order Deliveries List with dropdown */}
        <div className="godetail-deliveries-section">
          <h2 className="godetail-deliveries-title">Danh sách đơn giao hàng</h2>
          {orderDeliveries.length === 0 ? (
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
                    {delivery.orderDetails.length === 0 ? (
                      <p className="godetail-no-delivery-details">
                        Không có sản phẩm nào trong đơn giao hàng này.
                      </p>
                    ) : (
                      delivery.orderDetails.map((detail) => (
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
