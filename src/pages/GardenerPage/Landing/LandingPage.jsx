"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Leaf,
  CalendarDays,
  Sprout,
  HeartHandshake,
  MapPinHouse,
  BadgeCheck,
  HandHeart,
} from "lucide-react";
import { useHistory, Link } from "react-router-dom";
import GardenerLandingImage from "../../../assets/images/gardener/GardenerLanding.png";
import "./LandingPage.css";
import servicePackageService from "../../services/apiServices/servicePackageService";
import paymentService from "../../services/apiServices/paymentService";
import GPopup from "./GPopup";

function GardenerLandingPage() {
  const [servicePackages, setServicePackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchServicePackages = async () => {
      try {
        const result = await servicePackageService.getAvailableServicePackage(
          "Status",
          "ACTIVE"
        );

        console.log("servicePackages result:", result);
        setServicePackages(result.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service packages:", error);
        setLoading(false);
      }
    };

    fetchServicePackages();
  }, []);

  const handlePayPackage = async (pkg) => {
    try {
      if (!localStorage.getItem("account_id")) {
        setShowAlertPopup(true);
        return;
      }

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleConfirm = () => {
    history.push("/sign-in?redirect=/gardener/service-package");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="glanding-hearder bg-emerald-500 text-white">
        <div className="glanding-container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="glanding-logo flex items-center space-x-2">
              <div className="glanding-logo-icon w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="glanding-logo-text text-xl font-bold">
                CleanFoodViet
              </span>
            </div>
            <nav className="glanding-nasetServicePackagesv md:flex items-center space-x-8">
              <div className="glanding-link-div">
                <Link to="/sign-in" className="glanding-a-link">
                  Đăng nhập
                </Link>
              </div>
              <div className="glanding-link-div">
                <Link to="/sign-up" className="glanding-a-link">
                  Đăng ký
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="glanding-hero bg-emerald-500 text-white py-16">
        <div className="glanding-container mx-auto px-4">
          <div className="glanding-hero-grid lg:grid-cols-2 gap-12 items-center">
            <div className="glanding-hero-content">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Sản phẩm tươi
                <br />
                Từ trang trại đến kệ hàng
              </h1>
              <p className="text-lg mb-8 text-emerald-100">
                Clean Food Viet kết nối Nhà bán lẻ Người làm vườn để phương án
                có sản phẩm tươi, sạch. Thụ hưởng những sản phẩm chất lượng tốt
                nhất từ Người làm vườn trực tiếp đến Nhà bán lẻ bằng nguồn cung
                ứng minh bạch, có thể truy xuất nguồn gốc.
              </p>
              <div className="glanding-hero-buttons flex flex-col sm:flex-row gap-4">
                <button
                  className="glanding-btn-primary bg-white text-emerald-500 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                  onClick={() => history.push("/sign-in")}
                >
                  Đăng nhập
                </button>
                <button
                  className="glanding-btn-secondary border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                  onClick={() => history.push("/sign-up")}
                >
                  Đăng ký
                </button>
              </div>
              <div className="glanding-hero-features flex items-center gap-8 mt-8 text-sm">
                <div className="glanding-hero-feature flex items-center gap-2">
                  <Sprout className="w-4 h-4" />
                  <span>Sản phẩm sạch</span>
                </div>
                <div className="glanding-hero-feature flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Kết nối trực tiếp</span>
                </div>
                <div className="glanding-hero-feature flex items-center gap-2">
                  <MapPinHouse className="w-4 h-4" />
                  <span>Nguồn cung ổn định</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={GardenerLandingImage}
                alt="Grocery store interior"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="glanding-features py-16 bg-gray-50">
        <div className="glanding-container mx-auto px-4">
          <div className="glanding-features-header text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Tại sao bạn lại chọn Clean Food Viet
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi đang tạo ra một hệ sinh thái bền vững, nơi thực phẩm
              sạch được vận chuyển hiệu quả từ đất lên kệ
            </p>
          </div>

          <div className="glanding-features-grid grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glanding-feature-card bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="glanding-feature-icon-div w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="glanding-feature-icon w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Kết nối trực tiếp</h3>
              <p className="text-sm text-gray-600">
                Kết nối trực tiếp các nhà bán lẻ với người làm vườn để phương,
                loại bỏ trung gian và đảm bảo giá cả cạnh tranh.
              </p>
            </div>

            <div className="glanding-feature-card bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="glanding-feature-icon-div w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BadgeCheck className="glanding-feature-icon w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Đảm bảo chất lượng</h3>
              <p className="text-sm text-gray-600">
                Sản phẩm sạch đã được xác minh với thả năng truy xuất nguồn gốc,
                đảm bảo chất lượng từ khi ra khỏi trang trại đến khi lên kệ
                hàng.
              </p>
            </div>

            <div className="glanding-feature-card bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="glanding-feature-icon-div w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <HandHeart className="glanding-feature-icon w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Quảng bá sản phẩm của bạn</h3>
              <p className="text-sm text-gray-600">
                Quản lý bài đăng của bạn để quảng bá sản phẩm của bạn đến các
                khách hàng tiềm năng. Mở rộng mạng lưới khách hàng thông qua nền
                tảng của chúng tôi.
              </p>
            </div>

            <div className="glanding-feature-card bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="glanding-feature-icon-div w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="glanding-feature-icon w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Lên lịch hẹn</h3>
              <p className="text-sm text-gray-600">
                Lên lịch hẹn với Người làm vườn với có có cuộc hẹn tại vườn một
                cách minh bạch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Selection Section */}
      <section className="glanding-packages py-16">
        <div className="glanding-container mx-auto px-4">
          <div className="glanding-packages-header text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Chọn gói của bạn</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi có kế hoạch hoàn hảo giúp bạn thành công, hãy đăng ký
              ngay và bắt đầu quản lý Khu vườn trực tuyến của bạn!
            </p>
          </div>

          {loading ? (
            <div className="glanding-loading-container text-center">
              <div className="glanding-spinner inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
              <p className="glanding-loading-text mt-2 text-gray-600">
                Đang tải gói dịch vụ...
              </p>
            </div>
          ) : (
            <div className="glanding-packages-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.isArray(servicePackages) &&
                servicePackages.map((pkg) => (
                  <div
                    key={pkg.servicePackageId}
                    className={`glanding-package-card bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${
                      pkg.packageName === "Plus"
                        ? "border-emerald-500 relative"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="glanding-package-header text-center mb-6">
                      <h3 className="glanding-package-name text-xl font-bold mb-2">
                        {pkg.packageName}
                      </h3>
                      <div className="glanding-package-pricemb-4">
                        <span className="glanding-price-amount text-3xl font-bold">
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="glanding-price-period text-gray-500 ml-1">
                          /{pkg.duration} ngày
                        </span>
                      </div>
                      <p className="glanding-package-description text-gray-600 text-sm">
                        {pkg.description}
                      </p>
                    </div>

                    <button
                      className={`glanding-package-button w-full py-3 px-4 rounded-lg font-medium mb-6 transition-colors glanding-secondary bg-gray-100 text-gray-800 `}
                      disabled={pkg.packageName === "Plus" ? true : false}
                      onClick={() => handlePayPackage(pkg)}
                      // ${
                      //   pkg.packageName === "Plus"
                      //     ? "glanding-primary bg-emerald-500 text-white"
                      //     : "glanding-secondary bg-gray-100 text-gray-800"
                      // }
                    >
                      {/* {pkg.packageName === "Plus"
                      ? "Gói hiện tại"
                      : `Chọn ${pkg.packageName}`} */}
                      Mua gói
                    </button>

                    <div className="glanding-package-features space-y-3">
                      {Array.isArray(pkg.features) &&
                        pkg.features.map((feature, index) => (
                          <div
                            key={index}
                            className="glanding-package-feature flex items-start gap-3"
                          >
                            <Check className="glanding-feature-check w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="glanding-feature-text text-sm text-gray-700">
                              {feature.description}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="glanding-footer bg-gray-900 text-white py-12">
        <div className="glanding-container mx-auto px-4">
          <div className="glanding-footer-content flex items-center justify-between">
            <div>
              <div className="glanding-footer-logo flex items-center space-x-2 mb-4">
                <div className="glanding-footer-logo-icon w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="glanding-footer-logo-text text-xl font-bold">
                  CleanFoodViet
                </span>
              </div>
              <p className="glanding-footer-description text-gray-400 max-w-md">
                Kết nối nhà bán lẻ và người làm vườn để tạo nên một hệ sinh thái
                thực phẩm sạch và lành mạnh hơn.
              </p>
            </div>
          </div>

          <div className="glanding-footer-bottom border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 CleanFoodViet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <GPopup
        isOpen={showAlertPopup}
        onClose={() => setShowAlertPopup(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default GardenerLandingPage;
