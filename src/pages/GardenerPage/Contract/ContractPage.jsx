"use client";

import { useState } from "react";
import { ArrowLeft, Eye, Plus, Trash2 } from "lucide-react";
import ContractPreview from "./ContractPreview";
import "./ContractPage.css";

export default function ContractCreator() {
  const [showPreview, setShowPreview] = useState(false);
  const [contractData, setContractData] = useState({
    contractNumber: "HD-2025-409719",
    signDate: "2025-08-20",
    signLocation: "",
    // Seller (Bên A) information
    sellerCompanyName: "",
    sellerTaxId: "",
    sellerLegalRep: "",
    sellerPosition: "",
    sellerIdNumber: "",
    sellerIdDate: "",
    sellerIdPlace: "",
    sellerPhone: "",
    sellerFax: "",
    sellerAddress: "",
    sellerBankAccount: "",
    sellerBank: "",
    // Buyer (Bên B) information
    buyerCompanyName: "",
    buyerTaxId: "",
    buyerLegalRep: "",
    buyerPosition: "",
    buyerIdNumber: "",
    buyerIdDate: "",
    buyerIdPlace: "",
    buyerPhone: "",
    buyerFax: "",
    buyerAddress: "",
    buyerBankAccount: "",
    buyerBank: "",
    // Product details
    products: [
      {
        stt: 1,
        tenHangHoa: "",
        donVi: "",
        soLuong: "",
        donGia: "",
        thanhTien: "",
        ghiChu: "",
      },
      {
        stt: 2,
        tenHangHoa: "",
        donVi: "",
        soLuong: "",
        donGia: "",
        thanhTien: "",
        ghiChu: "",
      },
      {
        stt: 3,
        tenHangHoa: "",
        donVi: "",
        soLuong: "",
        donGia: "",
        thanhTien: "",
        ghiChu: "",
      },
      {
        stt: 4,
        tenHangHoa: "",
        donVi: "",
        soLuong: "",
        donGia: "",
        thanhTien: "",
        ghiChu: "",
      },
    ],
    deliverySchedule: [
      {
        stt: 1,
        tenHangHoa: "",
        donVi: "",
        soLuong: "",
        thoiGianGiao: "",
        diaDiemGiao: "",
        ghiChu: "",
      },
      {
        stt: 2,
        tenHangHoa: "",
        donVi: "",
        soLuong: "",
        thoiGianGiao: "",
        diaDiemGiao: "",
        ghiChu: "",
      },
      {
        stt: 3,
        tenHangHoa: "",
        donVi: "",
        soLuong: "",
        thoiGianGiao: "",
        diaDiemGiao: "",
        ghiChu: "",
      },
    ],
    paymentDate: "",
    paymentMethod: "",
    transportResponsibility: "",
    loadingUnloadingCost: "",
    storageCostPerDay: "",
    warrantyPeriod: "",
    warrantyProduct: "",
    penaltyPercentage: "",
    contractCopies: "",
  });

  const handleInputChange = (field, value) => {
    setContractData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProductChange = (index, field, value) => {
    setContractData((prev) => ({
      ...prev,
      products: prev.products.map((product, i) =>
        i === index ? { ...product, [field]: value } : product
      ),
    }));
  };

  const handleDeliveryChange = (index, field, value) => {
    setContractData((prev) => ({
      ...prev,
      deliverySchedule: prev.deliverySchedule.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addDeliveryRow = () => {
    setContractData((prev) => ({
      ...prev,
      deliverySchedule: [
        ...prev.deliverySchedule,
        {
          stt: prev.deliverySchedule.length + 1,
          tenHangHoa: "",
          donVi: "",
          soLuong: "",
          thoiGianGiao: "",
          diaDiemGiao: "",
          ghiChu: "",
        },
      ],
    }));
  };

  const removeDeliveryRow = (index) => {
    if (contractData.deliverySchedule.length > 1) {
      setContractData((prev) => ({
        ...prev,
        deliverySchedule: prev.deliverySchedule
          .filter((_, i) => i !== index)
          .map((item, i) => ({ ...item, stt: i + 1 })),
      }));
    }
  };

  const addProductRow = () => {
    setContractData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          stt: prev.products.length + 1,
          tenHangHoa: "",
          donVi: "",
          soLuong: "",
          donGia: "",
          thanhTien: "",
          ghiChu: "",
        },
      ],
    }));
  };

  const removeProductRow = (index) => {
    if (contractData.products.length > 1) {
      setContractData((prev) => ({
        ...prev,
        products: prev.products
          .filter((_, i) => i !== index)
          .map((item, i) => ({ ...item, stt: i + 1 })),
      }));
    }
  };

  const calculateTotal = () => {
    return contractData.products.reduce((total, product) => {
      const soLuong = Number.parseFloat(product.soLuong) || 0;
      const donGia = Number.parseFloat(product.donGia) || 0;
      return total + soLuong * donGia;
    }, 0);
  };

  if (showPreview) {
    return (
      <ContractPreview
        contractData={contractData}
        onBack={() => setShowPreview(false)}
      />
    );
  }

  return (
    <div className="gcreatecontract-container">
      <div className="gcreatecontract-wrapper">
        {/* Header */}
        <div className="gcreatecontract-header">
          <div className="gcreatecontract-header-left">
            <button className="gcreatecontract-back-btn">
              <ArrowLeft className="gcreatecontract-icon" />
            </button>
            <div className="gcreatecontract-title-section">
              {/* <div className="gcreatecontract-icon-wrapper">
                <span className="gcreatecontract-doc-icon">📄</span>
              </div> */}
              <div>
                <h1 className="gcreatecontract-main-title">Tạo Hợp Đồng</h1>
                <p className="gcreatecontract-subtitle">
                  Hợp đồng cung cấp sản phẩm nông sản
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowPreview(true)}
            className="gcreatecontract-preview-btn"
          >
            <Eye className="gcreatecontract-icon" />
            Xem trước
          </button>
        </div>

        {/* Contract Information */}
        <div className="gcreatecontract-card">
          <div className="gcreatecontract-card-header">
            <h3 className="gcreatecontract-card-title">Thông tin hợp đồng</h3>
          </div>
          <div className="gcreatecontract-card-content">
            <div className="gcreatecontract-form-grid">
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Số hợp đồng</label>
                <input
                  className="gcreatecontract-input"
                  value={contractData.contractNumber}
                  onChange={(e) =>
                    handleInputChange("contractNumber", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Ngày ký</label>
                <input
                  className="gcreatecontract-input"
                  type="date"
                  value={contractData.signDate}
                  onChange={(e) =>
                    handleInputChange("signDate", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group gcreatecontract-full-width">
                <label className="gcreatecontract-label">Địa điểm ký</label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Tại địa chỉ..."
                  value={contractData.signLocation}
                  onChange={(e) =>
                    handleInputChange("signLocation", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Seller Information */}
        <div className="gcreatecontract-card">
          <div className="gcreatecontract-card-header">
            <h3 className="gcreatecontract-card-title">Bên bán (Bên A)</h3>
          </div>
          <div className="gcreatecontract-card-content">
            <div className="gcreatecontract-form-grid">
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Tên doanh nghiệp
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Tên doanh nghiệp/Họ tên cá nhân"
                  value={contractData.sellerCompanyName}
                  onChange={(e) =>
                    handleInputChange("sellerCompanyName", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Mã số doanh nghiệp
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Mã số thuế/CCCD"
                  value={contractData.sellerTaxId}
                  onChange={(e) =>
                    handleInputChange("sellerTaxId", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Người đại diện theo pháp luật
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Họ tên người đại diện"
                  value={contractData.sellerLegalRep}
                  onChange={(e) =>
                    handleInputChange("sellerLegalRep", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Chức danh</label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Chức danh"
                  value={contractData.sellerPosition}
                  onChange={(e) =>
                    handleInputChange("sellerPosition", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  CMND/CCCD/Hộ chiếu số
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Số CMND/CCCD"
                  value={contractData.sellerIdNumber}
                  onChange={(e) =>
                    handleInputChange("sellerIdNumber", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Cấp ngày</label>
                <input
                  className="gcreatecontract-input"
                  type="date"
                  value={contractData.sellerIdDate}
                  onChange={(e) =>
                    handleInputChange("sellerIdDate", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Nơi cấp</label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Nơi cấp"
                  value={contractData.sellerIdPlace}
                  onChange={(e) =>
                    handleInputChange("sellerIdPlace", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Số điện thoại</label>
                <input
                  className="gcreatecontract-input"
                  placeholder="0123456789"
                  value={contractData.sellerPhone}
                  onChange={(e) =>
                    handleInputChange("sellerPhone", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Fax</label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Số fax"
                  value={contractData.sellerFax}
                  onChange={(e) =>
                    handleInputChange("sellerFax", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Tài khoản ngân hàng số
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Số tài khoản"
                  value={contractData.sellerBankAccount}
                  onChange={(e) =>
                    handleInputChange("sellerBankAccount", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Mở tại ngân hàng
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Tên ngân hàng"
                  value={contractData.sellerBank}
                  onChange={(e) =>
                    handleInputChange("sellerBank", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group gcreatecontract-full-width">
                <label className="gcreatecontract-label">
                  Địa chỉ trụ sở chính
                </label>
                <textarea
                  className="gcreatecontract-textarea"
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  value={contractData.sellerAddress}
                  onChange={(e) =>
                    handleInputChange("sellerAddress", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buyer Information */}
        <div className="gcreatecontract-card">
          <div className="gcreatecontract-card-header">
            <h3 className="gcreatecontract-card-title">Bên mua (Bên B)</h3>
          </div>
          <div className="gcreatecontract-card-content">
            <div className="gcreatecontract-form-grid">
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Tên doanh nghiệp
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Tên doanh nghiệp/Họ tên cá nhân"
                  value={contractData.buyerCompanyName}
                  onChange={(e) =>
                    handleInputChange("buyerCompanyName", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Mã số doanh nghiệp
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Mã số thuế/CCCD"
                  value={contractData.buyerTaxId}
                  onChange={(e) =>
                    handleInputChange("buyerTaxId", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Người đại diện theo pháp luật
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Họ tên người đại diện"
                  value={contractData.buyerLegalRep}
                  onChange={(e) =>
                    handleInputChange("buyerLegalRep", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Chức danh</label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Chức danh"
                  value={contractData.buyerPosition}
                  onChange={(e) =>
                    handleInputChange("buyerPosition", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  CMND/CCCD/Hộ chiếu số
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Số CMND/CCCD"
                  value={contractData.buyerIdNumber}
                  onChange={(e) =>
                    handleInputChange("buyerIdNumber", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Cấp ngày</label>
                <input
                  className="gcreatecontract-input"
                  type="date"
                  value={contractData.buyerIdDate}
                  onChange={(e) =>
                    handleInputChange("buyerIdDate", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Nơi cấp</label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Nơi cấp"
                  value={contractData.buyerIdPlace}
                  onChange={(e) =>
                    handleInputChange("buyerIdPlace", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Số điện thoại</label>
                <input
                  className="gcreatecontract-input"
                  placeholder="0123456789"
                  value={contractData.buyerPhone}
                  onChange={(e) =>
                    handleInputChange("buyerPhone", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Fax</label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Số fax"
                  value={contractData.buyerFax}
                  onChange={(e) =>
                    handleInputChange("buyerFax", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Tài khoản ngân hàng số
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Số tài khoản"
                  value={contractData.buyerBankAccount}
                  onChange={(e) =>
                    handleInputChange("buyerBankAccount", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Mở tại ngân hàng
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Tên ngân hàng"
                  value={contractData.buyerBank}
                  onChange={(e) =>
                    handleInputChange("buyerBank", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group gcreatecontract-full-width">
                <label className="gcreatecontract-label">
                  Địa chỉ trụ sở chính
                </label>
                <textarea
                  className="gcreatecontract-textarea"
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  value={contractData.buyerAddress}
                  onChange={(e) =>
                    handleInputChange("buyerAddress", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="gcreatecontract-card">
          <div className="gcreatecontract-card-header">
            <h3 className="gcreatecontract-card-title">
              Điều 1: Tên hàng hóa, số lượng, chất lượng, giá trị hợp đồng
            </h3>
            <p className="gcreatecontract-card-subtitle">
              Bên A bán cho Bên B hàng hóa sau đây:
            </p>
          </div>
          <div className="gcreatecontract-card-content">
            <div className="gcreatecontract-table-wrapper">
              <table className="gcreatecontract-table">
                <thead>
                  <tr>
                    <th className="gcreatecontract-th">STT</th>
                    <th className="gcreatecontract-th">Tên hàng hóa</th>
                    <th className="gcreatecontract-th">Đơn vị</th>
                    <th className="gcreatecontract-th">Số lượng</th>
                    <th className="gcreatecontract-th">
                      Đơn giá<sup>13</sup>
                      <br />
                      (VNĐ đồng)
                    </th>
                    <th className="gcreatecontract-th">
                      Thành tiền<sup>14</sup>
                      <br />
                      (VNĐ đồng)
                    </th>
                    <th className="gcreatecontract-th">Ghi chú</th>
                    <th className="gcreatecontract-th">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {contractData.products.map((product, index) => (
                    <tr key={index}>
                      <td className="gcreatecontract-td gcreatecontract-center">
                        {product.stt}
                      </td>
                      <td className="gcreatecontract-td">
                        <input
                          className="gcreatecontract-table-input"
                          value={product.tenHangHoa}
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "tenHangHoa",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="gcreatecontract-td">
                        <input
                          className="gcreatecontract-table-input"
                          value={product.donVi}
                          onChange={(e) =>
                            handleProductChange(index, "donVi", e.target.value)
                          }
                        />
                      </td>
                      <td className="gcreatecontract-td">
                        <input
                          className="gcreatecontract-table-input"
                          type="number"
                          value={product.soLuong}
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "soLuong",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="gcreatecontract-td">
                        <input
                          className="gcreatecontract-table-input"
                          type="number"
                          value={product.donGia}
                          onChange={(e) =>
                            handleProductChange(index, "donGia", e.target.value)
                          }
                        />
                      </td>
                      <td className="gcreatecontract-td gcreatecontract-right">
                        {(
                          (Number.parseFloat(product.soLuong) || 0) *
                          (Number.parseFloat(product.donGia) || 0)
                        ).toLocaleString("vi-VN")}
                      </td>
                      <td className="gcreatecontract-td">
                        <input
                          className="gcreatecontract-table-input"
                          value={product.ghiChu}
                          onChange={(e) =>
                            handleProductChange(index, "ghiChu", e.target.value)
                          }
                        />
                      </td>
                      <td className="gcreatecontract-td gcreatecontract-center">
                        <button
                          onClick={() => removeProductRow(index)}
                          className="gcreatecontract-remove-btn"
                          disabled={contractData.products.length === 1}
                        >
                          <Trash2 className="gcreatecontract-small-icon" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="gcreatecontract-table-actions">
              <button
                onClick={addProductRow}
                className="gcreatecontract-add-row-btn"
              >
                <Plus className="gcreatecontract-small-icon" />
                Thêm dòng
              </button>
            </div>
            <div className="gcreatecontract-total-section">
              <div className="gcreatecontract-total-row">
                <strong>
                  Tổng cộng<sup>15</sup>:{" "}
                  {calculateTotal().toLocaleString("vi-VN")} VNĐ
                </strong>
              </div>
              <div className="gcreatecontract-total-row">
                <strong>
                  Bằng chữ<sup>16</sup>:{" "}
                  {calculateTotal() === 0 ? "0 đồng" : "..."}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="gcreatecontract-card">
          <div className="gcreatecontract-card-header">
            <h3 className="gcreatecontract-card-title">Điều 2: Thanh toán</h3>
          </div>
          <div className="gcreatecontract-card-content">
            <div className="gcreatecontract-form-grid">
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Ngày thanh toán</label>
                <input
                  className="gcreatecontract-input"
                  type="date"
                  value={contractData.paymentDate}
                  onChange={(e) =>
                    handleInputChange("paymentDate", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Hình thức thanh toán
                </label>
                <select
                  className="gcreatecontract-input"
                  value={contractData.paymentMethod}
                  onChange={(e) =>
                    handleInputChange("paymentMethod", e.target.value)
                  }
                >
                  <option value="">Chọn hình thức</option>
                  <option value="tiền mặt">Tiền mặt</option>
                  <option value="chuyển khoản">Chuyển khoản</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="gcreatecontract-card">
          <div className="gcreatecontract-card-header">
            <h3 className="gcreatecontract-card-title">
              Điều 3: Thời gian, địa điểm, phương thức giao hàng
            </h3>
            <p className="gcreatecontract-card-subtitle">
              1. Bên A giao hàng cho bên B theo lịch sau:
            </p>
          </div>
          <div className="gcreatecontract-card-content">
            <div className="gcreatecontract-table-wrapper">
              <table className="gcreatecontract-table">
                <thead>
                  <tr>
                    <th className="gcreatecontract-th">STT</th>
                    <th className="gcreatecontract-th">Tên hàng hóa</th>
                    <th className="gcreatecontract-th">Đơn vị</th>
                    <th className="gcreatecontract-th">Số lượng</th>
                    <th className="gcreatecontract-th">Thời gian giao hàng</th>
                    <th className="gcreatecontract-th">Địa điểm giao hàng</th>
                    <th className="gcreatecontract-th">Ghi chú</th>
                    <th className="gcreatecontract-th">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {contractData.deliverySchedule.map((item, index) => (
                    <tr key={index}>
                      <td className="gcreatecontract-td gcreatecontract-center">
                        {item.stt}
                      </td>
                      <td className="gcreatecontract-td">
                        <input
                          className="gcreatecontract-table-input"
                          value={item.tenHangHoa}
                          onChange={(e) =>
                            handleDeliveryChange(
                              index,
                              "tenHangHoa",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="gcreatecontract-td">
                        <input
                          className="gcreatecontract-table-input"
                          value={item.donVi}
                          onChange={(e) =>
                            handleDeliveryChange(index, "donVi", e.target.value)
                          }
                        />
                      </td>
                      <td className="gcreatecontract-td">
                        <input
                          className="gcreatecontract-table-input"
                          type="number"
                          value={item.soLuong}
                          onChange={(e) =>
                            handleDeliveryChange(
                              index,
                              "soLuong",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="gcreatecontract-td">
                        <input
                          className="gcreatecontract-table-input"
                          type="date"
                          value={item.thoiGianGiao}
                          onChange={(e) =>
                            handleDeliveryChange(
                              index,
                              "thoiGianGiao",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="gcreatecontract-td">
                        <input
                          className="gcreatecontract-table-input"
                          value={item.diaDiemGiao}
                          onChange={(e) =>
                            handleDeliveryChange(
                              index,
                              "diaDiemGiao",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="gcreatecontract-td">
                        <input
                          className="gcreatecontract-table-input"
                          value={item.ghiChu}
                          onChange={(e) =>
                            handleDeliveryChange(
                              index,
                              "ghiChu",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="gcreatecontract-td gcreatecontract-center">
                        <button
                          onClick={() => removeDeliveryRow(index)}
                          className="gcreatecontract-remove-btn"
                          disabled={contractData.deliverySchedule.length === 1}
                        >
                          <Trash2 className="gcreatecontract-small-icon" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="gcreatecontract-table-actions">
              <button
                onClick={addDeliveryRow}
                className="gcreatecontract-add-row-btn"
              >
                <Plus className="gcreatecontract-small-icon" />
                Thêm dòng
              </button>
            </div>
            <div className="gcreatecontract-form-grid">
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Phương tiện vận chuyển và chi phí do bên
                </label>
                <select
                  className="gcreatecontract-input"
                  value={contractData.transportResponsibility}
                  onChange={(e) =>
                    handleInputChange("transportResponsibility", e.target.value)
                  }
                >
                  <option value="">Chọn bên chịu trách nhiệm</option>
                  <option value="Bên A">Bên A</option>
                  <option value="Bên B">Bên B</option>
                </select>
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Chi phí bốc xếp</label>
                <input
                  className="gcreatecontract-input"
                  placeholder="mỗi bên chịu một đầu hoặc..."
                  value={contractData.loadingUnloadingCost}
                  onChange={(e) =>
                    handleInputChange("loadingUnloadingCost", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Chi phí lưu kho bãi (đồng/ngày)
                </label>
                <input
                  className="gcreatecontract-input"
                  type="number"
                  value={contractData.storageCostPerDay}
                  onChange={(e) =>
                    handleInputChange("storageCostPerDay", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="gcreatecontract-card">
          <div className="gcreatecontract-card-header">
            <h3 className="gcreatecontract-card-title">
              Điều 5: Bảo hành và hướng dẫn sử dụng hàng hóa
            </h3>
          </div>
          <div className="gcreatecontract-card-content">
            <div className="gcreatecontract-form-grid">
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Loại hàng bảo hành
                </label>
                <input
                  className="gcreatecontract-input"
                  placeholder="Tên loại hàng hóa"
                  value={contractData.warrantyProduct}
                  onChange={(e) =>
                    handleInputChange("warrantyProduct", e.target.value)
                  }
                />
              </div>
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Thời gian bảo hành (tháng)
                </label>
                <input
                  className="gcreatecontract-input"
                  type="number"
                  value={contractData.warrantyPeriod}
                  onChange={(e) =>
                    handleInputChange("warrantyPeriod", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="gcreatecontract-card">
          <div className="gcreatecontract-card-header">
            <h3 className="gcreatecontract-card-title">
              Điều 7: Điều khoản phạt vi phạm hợp đồng
            </h3>
          </div>
          <div className="gcreatecontract-card-content">
            <div className="gcreatecontract-form-grid">
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">
                  Mức phạt (% giá trị hợp đồng bị vi phạm)
                </label>
                <input
                  className="gcreatecontract-input"
                  type="number"
                  max="8"
                  placeholder="Tối đa 8%"
                  value={contractData.penaltyPercentage}
                  onChange={(e) =>
                    handleInputChange("penaltyPercentage", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="gcreatecontract-card">
          <div className="gcreatecontract-card-header">
            <h3 className="gcreatecontract-card-title">
              Điều 9: Điều khoản chung
            </h3>
          </div>
          <div className="gcreatecontract-card-content">
            <div className="gcreatecontract-form-grid">
              <div className="gcreatecontract-form-group">
                <label className="gcreatecontract-label">Số bản hợp đồng</label>
                <input
                  className="gcreatecontract-input"
                  type="number"
                  placeholder="Số bản"
                  value={contractData.contractCopies}
                  onChange={(e) =>
                    handleInputChange("contractCopies", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
