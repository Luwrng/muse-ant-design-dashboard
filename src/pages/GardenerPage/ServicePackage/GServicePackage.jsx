import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./GServicePackage.css";
import servicePackageService from "../../services/apiServices/servicePackageService";
import paymentService from "../../services/apiServices/paymentService";

function GServicePackage() {
  const history = useHistory();

  const [packages, setPackages] = useState([]);
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const result = await servicePackageService.getAvailableServicePackage(
          "Status",
          "ACTIVE"
        );

        setPackages(result.items);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPackage();
  }, []);

  const handlePayPackage = async (pkg) => {
    try {
      const data = {
        gardenerId: localStorage.getItem("account_id"),
        servicePackageId: pkg.servicePackageId,
        quantity: 1,
        location: null,
      };

      const response = await paymentService.makingPayment(data);

      window.location.href = response.sessionUrl;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="gspackage-container">
      <button
        className="gspackage-back-button"
        onClick={() => history.push("/gardener/dashboard")}
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
        {Array.isArray(packages) &&
          packages.map((pkg, index) => (
            <div
              key={index}
              className={`gspackage-card ${
                pkg.isCurrent ? "gspackage-card-current" : ""
              }`}
            >
              <div className="gspackage-card-header">
                <h3 className="gspackage-package-name">{pkg.packageName}</h3>
                <div className="gspackage-price-section">
                  <span className="gspackage-price">{pkg.price}</span>
                  <span className="gspackage-period">/{pkg.duration} ngày</span>
                </div>
                {/* <p className="gspackage-description">{pkg.status}</p> */}

                <div className="gspackage-features">
                  {Array.isArray(pkg.features) &&
                    pkg.features.map((feature, featureIndex) => (
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
                        <span>{feature.description}</span>
                      </div>
                    ))}
                </div>
              </div>

              <button
                className={`gspackage-button gspackage-button-default`}
                onClick={() => handlePayPackage(pkg)}
              >
                Mua gói
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default GServicePackage;
