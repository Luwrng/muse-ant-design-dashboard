import React from "react";
import { useState, useCallback } from "react";
import SignUpSuccessModal from "./SignUpSuccessModal";
import { useHistory } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    address: "",
    otp: "",
    certName: "",
    issuingAuthority: "",
    issueDate: "",
    expiryDate: "",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSignUpSuccess = () => {
    setShowSuccessPopup(false);
    history.push("/sign-in");
  };

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => {
      if (prev[field] === value) return prev;
      return { ...prev, [field]: value };
    });
  }, []);

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const CleanFoodVietLogo = () => (
    <div className="siup-logo-container">
      {/* <div className="siup-logo-icon">
        <span>🌱</span>
      </div> */}
      <span className="siup-logo-text">CleanFoodViet</span>
    </div>
  );

  if (currentStep === 1) {
    return (
      <>
        <div className="siup-page-layout">
          {/* Left green sidebar */}
          <div className="siup-sidebar-left"></div>

          {/* Center white content */}
          <div className="siup-content-center">
            <div className="siup-content-wrapper">
              <CleanFoodVietLogo />
              <div className="siup-form-container">
                <h1 className="siup-page-title">Đăng ký</h1>

                <div className="siup-form-fields">
                  <div className="siup-field-group">
                    <label htmlFor="name" className="siup-field-label">
                      Tên <span className="siup-required">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Nhập tên của bạn"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="siup-input-field"
                    />
                  </div>

                  <div className="siup-field-group">
                    <label htmlFor="phone" className="siup-field-label">
                      Số điện thoại <span className="siup-required">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Nhập số điện thoại của bạn"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        handleInputChange("phone", value);
                      }}
                      className="siup-input-field"
                      maxLength={11}
                    />
                  </div>

                  <div className="siup-field-group">
                    <label htmlFor="address" className="siup-field-label">
                      Địa chỉ <span className="siup-required">*</span>
                    </label>
                    <textarea
                      id="address"
                      placeholder="Nhập địa chỉ của bạn"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="siup-textarea-field"
                      rows={3}
                    />
                  </div>

                  <div className="siup-field-group">
                    <label htmlFor="password" className="siup-field-label">
                      Mật khẩu <span className="siup-required">*</span>
                    </label>
                    <div className="siup-password-container">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu của bạn"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="siup-input-field siup-password-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="siup-password-toggle"
                      >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>

                  <div className="siup-checkbox-container">
                    <input
                      type="checkbox"
                      id="terms"
                      className="siup-checkbox"
                    />
                    <label htmlFor="terms" className="siup-checkbox-label">
                      Tôi đồng ý với các{" "}
                      <span className="siup-link">điều khoản và dịch vụ</span>{" "}
                      của Clean Food Viet
                    </label>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="siup-submit-button"
                  >
                    Đăng ký
                  </button>

                  <div className="siup-login-link">
                    <span>
                      Bạn đã có tài khoản?{" "}
                      <span className="siup-link">Đăng nhập ngay</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right green sidebar */}
          <div className="siup-sidebar-right"></div>
        </div>
      </>
    );
  }

  if (currentStep === 2) {
    return (
      <>
        <div className="siup-page-layout">
          {/* Left green sidebar */}
          <div className="siup-sidebar-left"></div>

          {/* Center white content */}
          <div className="siup-content-center">
            <div className="siup-content-wrapper">
              <CleanFoodVietLogo />
              <div className="siup-form-container">
                <button onClick={handlePrevStep} className="siup-back-button">
                  ← Quay lại
                </button>

                <h1 className="siup-page-title">
                  Xác minh số điện thoại của bạn
                </h1>

                <p className="siup-description">
                  Chúng tôi đã gửi một tin nhắn SMS có mã OTP kích hoạt đến số
                  điện thoại của bạn +84{formData.phone}
                </p>

                <div className="siup-otp-container">
                  <input
                    type="tel"
                    placeholder="Nhập mã OTP"
                    value={formData.otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      handleInputChange("otp", value);
                    }}
                    className="siup-otp-input"
                    maxLength={6}
                  />

                  <button
                    onClick={handleNextStep}
                    className="siup-submit-button"
                  >
                    Xác Minh
                  </button>

                  <div className="siup-resend-link">
                    <span>
                      Bạn không nhận được mã xác minh{" "}
                      <span className="siup-link">Gửi lại mã</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right green sidebar */}
          <div className="siup-sidebar-right"></div>
        </div>
      </>
    );
  }

  if (currentStep === 3) {
    return (
      <>
        <div className="siup-page-layout">
          {/* Left green sidebar */}
          <div className="siup-sidebar-left"></div>

          {/* Center white content */}
          <div className="siup-content-center">
            <div className="siup-content-wrapper">
              <CleanFoodVietLogo />
              <div className="siup-form-container">
                <button onClick={handlePrevStep} className="siup-back-button">
                  ← Quay lại
                </button>
                <h1 className="siup-page-title">Cấp chứng chỉ của bạn</h1>
                <div className="siup-certificate-form">
                  {/* Image upload area */}
                  <div className="siup-upload-area">
                    <div className="siup-upload-icon">📁</div>
                    <p className="siup-upload-text">
                      + Thêm ảnh ảnh của bạn ở đây
                    </p>
                  </div>

                  {/* Certificate details form */}
                  <div className="siup-certificate-fields">
                    <div className="siup-field-group">
                      <label htmlFor="certName" className="siup-field-label">
                        Name <span className="siup-required">*</span>
                      </label>
                      <input
                        id="certName"
                        type="text"
                        placeholder="Enter certificate name"
                        value={formData.certName}
                        onChange={(e) =>
                          handleInputChange("certName", e.target.value)
                        }
                        className="siup-input-field"
                      />
                    </div>

                    <div className="siup-field-group">
                      <label
                        htmlFor="issuingAuthority"
                        className="siup-field-label"
                      >
                        Issuing Authority{" "}
                        <span className="siup-required">*</span>
                      </label>
                      <input
                        id="issuingAuthority"
                        type="text"
                        placeholder="Enter issuing authority"
                        value={formData.issuingAuthority}
                        onChange={(e) =>
                          handleInputChange("issuingAuthority", e.target.value)
                        }
                        className="siup-input-field"
                      />
                    </div>

                    <div className="siup-date-fields">
                      <div className="siup-field-group">
                        <label htmlFor="issueDate" className="siup-field-label">
                          Issue Date <span className="siup-required">*</span>
                        </label>
                        <input
                          id="issueDate"
                          type="date"
                          value={formData.issueDate}
                          onChange={(e) =>
                            handleInputChange("issueDate", e.target.value)
                          }
                          className="siup-input-field"
                        />
                      </div>

                      <div className="siup-field-group">
                        <label
                          htmlFor="expiryDate"
                          className="siup-field-label"
                        >
                          Expiry Date <span className="siup-required">*</span>
                        </label>
                        <input
                          id="expiryDate"
                          type="date"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          className="siup-input-field"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className="siup-submit-button"
                    onClick={() => setShowSuccessPopup(true)}
                  >
                    Hoàn thành
                  </button>
                </div>
                <SignUpSuccessModal
                  isVisible={showSuccessPopup}
                  onClose={() => handleSignUpSuccess()}
                />
              </div>
            </div>
          </div>

          {/* Right green sidebar */}
          <div className="siup-sidebar-right"></div>
        </div>
      </>
    );
  }

  return null;
}

export default SignUpPage;
