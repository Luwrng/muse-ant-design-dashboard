import React, { useEffect } from "react";
import { useState } from "react";
import GOrderDelivery from "../OrderDelivery/GOrderDelivery";
import "./GOrderDetail.css";
import gardenerOrderService from "../../../services/apiServices/gardenerOrderService";

function GOrderDetail({ orderId, onBack }) {
  const [isCreatingDelivery, setIsCreatingDelivery] = useState(false);
  const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [deliveryQuantities, setDeliveryQuantities] = useState({});
  const [errors, setErrors] = useState({});

  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
      const fetchOrderDeatil = async () => {
        try{
          const accountId = localStorage.getItem("account_id");
          const result = gardenerOrderService.getGardenerOrderDetail(accountId, orderId);
          setOrderData(result);
        }
        catch(err){
          console.log(err);
        }
      }

      fetchOrderDeatil();
  },[orderId])

  // Sample order data
  // const orderData = {
  //   1: {
  //     id: "ORD001",
  //     customer: "Green Store",
  //     total: "1.500.000",
  //     unit: "kg",
  //     createdDate: "15/01/2024",
  //     status: "pending",
  //     statusText: "Chờ xử lý",
  //     products: [
  //       {
  //         id: 1,
  //         name: "Hoa hồng đỏ",
  //         price: "200.000",
  //         total: 5,
  //         delivered: 0,
  //         remaining: 5,
  //       },
  //       {
  //         id: 2,
  //         name: "Hoa tulip vàng",
  //         price: "150.000",
  //         total: 3,
  //         delivered: 0,
  //         remaining: 3,
  //       },
  //       {
  //         id: 3,
  //         name: "Cây xanh mini",
  //         price: "300.000",
  //         total: 2,
  //         delivered: 0,
  //         remaining: 2,
  //       },
  //     ],
  //   },
  //   6: {
  //     id: "ORD006",
  //     customer: "Green Store",
  //     total: "1.500.000",
  //     unit: "kg",
  //     createdDate: "15/01/2024",
  //     status: "pending",
  //     statusText: "Chờ xử lý",
  //     products: [
  //       {
  //         id: 1,
  //         name: "Hoa hồng đỏ",
  //         price: "200.000",
  //         total: 5,
  //         delivered: 0,
  //         remaining: 5,
  //       },
  //       {
  //         id: 2,
  //         name: "Hoa tulip vàng",
  //         price: "150.000",
  //         total: 3,
  //         delivered: 0,
  //         remaining: 3,
  //       },
  //       {
  //         id: 3,
  //         name: "Cây xanh mini",
  //         price: "300.000",
  //         total: 2,
  //         delivered: 0,
  //         remaining: 2,
  //       },
  //     ],
  //   },
  // };

  // const order = orderData[orderId] || orderData[1];

  const handleQuantityChange = (productId, value) => {
    const product = orderData.orderDetails.find((p) => p.productId === productId);
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

    try{
      
    }
    catch(err){
      console.log(err)
    }

    console.log("Creating delivery with quantities:", deliveryQuantities);
    setIsCreatingDelivery(false);
    setDeliveryQuantities({});
  };

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
          <h1 className="godetail-title">Chi tiết đơn hàng {orderData.orderId}</h1>
          <span className={`godetail-status godetail-status-${orderData.status}`}>
            {orderData.status}
          </span>
        </div>

        <div className="godetail-info">
          <p className="godetail-customer">Khách hàng: {orderData.accountName}</p>
          <p className="godetail-total">Tổng tiền: {orderData.totalAmount} ₫</p>
          <p className="godetail-unit">Đơn vị khối lượng: {orderData.weightUnit}</p> {/*bring down to the list of product*/}
          <p className="godetail-date">Ngày tạo: {orderData.createdAt}</p>
        </div>

        <div className="godetail-products">
          <h2 className="godetail-products-title">Danh sách sản phẩm</h2>

          {orderData.orderDetails.map((detail) => (
            <div key={detail.orderDetailId} className="godetail-product-item">
              <div className="godetail-product-left">
                {isCreatingDelivery && detail.remainDeliveredQuantity > 0 && (
                  <input
                    type="checkbox"
                    className="godetail-product-checkbox"
                    checked={deliveryQuantities[detail.orderDetailId] > 0}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        handleQuantityChange(detail.orderDetailId, 0);
                      }
                    }}
                  />
                )}
                <div className="godetail-product-info">
                  <h3 className="godetail-product-name">{detail.productName}</h3>
                  <p className="godetail-product-price">{detail.price} ₫</p>

                  {isCreatingDelivery && detail.remainDeliveredQuantity > 0 && (
                    <div className="godetail-quantity-input">
                      <label>Số lượng giao:</label>
                      <input
                        type="number"
                        min="0"
                        max={detail.remainDeliveredQuantity}
                        value={deliveryQuantities[detail.orderDetailId] || ""}
                        onChange={(e) =>
                          handleQuantityChange(detail.orderDetailId, e.target.value)
                        }
                        className={errors[detail.orderDetailIds] ? "godetail-error" : ""}
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
                    Đã giao: {detail.quantity - detail.remainDeliveredQuantity}
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
              disabled={getSelectedProductsCount() === 0}
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
