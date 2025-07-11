import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./GServicePackage.css";

function GServicePackage() {
  const history = useHistory();
  const packages = [
    {
      name: "Germinate",
      price: "10,00 US$",
      period: "/30 ngày",
      description: "Gói cơ bản cho người mới bắt đầu",
      features: ["Kết nối: 5", "Hỗ trợ: 1"],
      buttonText: "Chọn Germinate",
      buttonClass: "gspackage-button-default",
    },
    {
      name: "Growing",
      price: "25,00 US$",
      period: "/30 ngày",
      description: "Gói phát triển cho doanh nghiệp nhỏ",
      features: ["Kết nối: 15", "Hỗ trợ: 3", "Phân tích: 10"],
      buttonText: "Chọn Growing",
      buttonClass: "gspackage-button-default",
    },
    {
      name: "Fruiting",
      price: "50,00 US$",
      period: "/30 ngày",
      description: "Gói chuyên nghiệp cho doanh nghiệp lớn",
      features: ["Kết nối: 999", "Hỗ trợ: 24", "Phân tích: 50", "Tùy chỉnh: 5"],
      buttonText: "Chọn Fruiting",
      buttonClass: "gspackage-button-default",
    },
    {
      name: "Plus",
      price: "20,00 US$",
      period: "/30 ngày",
      description:
        "Nâng cao năng suất và tính sáng tạo với quyền truy cập mở rộng",
      features: [
        "Truy cập: 1",
        "Mở rộng: 10",
        "Chế độ: 2",
        "Nghiên cứu: 5",
        "Tạo GPT: 3",
        "Video Sora: 2",
        "Thử nghiệm: 1",
      ],
      buttonText: "Gói hiện tại",
      buttonClass: "gspackage-button-current",
      isCurrent: true,
    },
  ];

  return (
    <div className="gspackage-container">
      <button
        className="gspackage-back-button"
        onClick={() => history.push("/gardener/landing")}
      >
        <svg
          className="gspackage-back-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Quay lại
      </button>
      <div className="gspackage-header">
        <h1 className="gspackage-title">Chọn gói của bạn</h1>
        <p className="gspackage-subtitle">
          Chúng tôi có kế hoạch hoàn hảo giúp bạn thành công, hãy đăng ký ngay
          và bắt đầu quản lý Khu vườn trực tuyến của bạn!
        </p>
      </div>

      <div className="gspackage-grid">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`gspackage-card ${
              pkg.isCurrent ? "gspackage-card-current" : ""
            }`}
          >
            <div className="gspackage-card-header">
              <h3 className="gspackage-package-name">{pkg.name}</h3>
              <div className="gspackage-price-section">
                <span className="gspackage-price">{pkg.price}</span>
                <span className="gspackage-period">{pkg.period}</span>
              </div>
              <p className="gspackage-description">{pkg.description}</p>
            </div>

            <button className={`gspackage-button ${pkg.buttonClass}`}>
              {pkg.buttonText}
            </button>

            <div className="gspackage-features">
              {pkg.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="gspackage-feature">
                  <svg
                    className="gspackage-check-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GServicePackage;
