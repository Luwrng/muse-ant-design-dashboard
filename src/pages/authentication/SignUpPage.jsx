// src/pages/SignUpPage.js
import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom";
import CloudinaryUpload from "../../cloudinary/CloudinaryUpload";
import SignUpSuccessModal from "./SignUpSuccessModal";
import authenticateService from "../services/apiServices/authenticateService";
import AddressSelector from "./AddressSelector";

//Firebase auth service
import { auth } from "../../firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
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
    country: "Việt Nam",
    city: "",
    province: "",
    ward: "",
    postalCode: "",
    certName: "",
    issuingAuthority: "",
    issueDate: "",
    expiryDate: "",
    imageUrl: "",
  });
  const [addressLine, setAddressLine] = useState("");

  const [isAgreed, setIsAgreed] = useState(false);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // #region Handle Firebase SMS
  const [otp, setOtp] = useState();

  const handleNextStep = async () => {
    var fullAddress = `${formData.ward}, ${formData.city}, ${formData.province}, ${formData.country}`;
    if (formData.address === "") {
      setAddressLine(fullAddress);
    } else {
      setAddressLine(`${formData.address}, ${addressLine}`);
    }

    if (currentStep === 1) {
      if (!formData.name || !formData.phone || !formData.password) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
      }

      // Kiểm tra auth có hợp lệ không
      if (!auth || !auth.app) {
        alert("Firebase chưa sẵn sàng. Vui lòng thử lại sau.");
        return;
      }

      // 🔄 Reset reCAPTCHA if already initialized in Step 1
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (err) {
          console.warn("Không thể xóa reCAPTCHA:", err);
        }
        window.recaptchaVerifier = null;
      }

      // ✅ Initialize reCAPTCHA (Step 1 only)
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              console.log("reCAPTCHA resolved:", response);
            },
            "expired-callback": () => {
              console.warn("reCAPTCHA hết hạn");
            },
          }
        );
      } catch (err) {
        console.error("🔥 Lỗi tạo reCAPTCHA:", err);
        alert("Lỗi reCAPTCHA. Không thể tiếp tục.");
        return;
      }

      const appVerifier = window.recaptchaVerifier;
      const fullPhone = "+84" + formData.phone.replace(/^0/, "");

      try {
        // const confirmationResult = await signInWithPhoneNumber(
        //   auth,
        //   fullPhone,
        //   appVerifier
        // );
        const confirmationResult = await Promise.race([
          signInWithPhoneNumber(auth, fullPhone, appVerifier),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Yêu cầu gửi OTP quá thời gian")),
              60000
            )
          ),
        ]);
        window.confirmationResult = confirmationResult;
        alert("✅ OTP đã gửi. Vui lòng kiểm tra tin nhắn!");
        setCurrentStep(2);
      } catch (error) {
        console.error("❌ Gửi OTP lỗi:", error);
        alert("Không thể gửi OTP. " + error.message);
      }
    }

    // 👉 Xác minh OTP
    else if (currentStep === 2) {
      if (!otp || otp.length !== 6) {
        alert("Vui lòng nhập mã OTP hợp lệ.");
        return;
      }
      try {
        // const result = await window.confirmationResult.confirm(otp);
        const result = await Promise.race([
          window.confirmationResult.confirm(otp),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Xác minh OTP quá thời gian")),
              60000
            )
          ),
        ]);
        console.log("✅ Xác minh thành công:", result.user);
        setCurrentStep(3);
      } catch (error) {
        console.error("❌ OTP không đúng:", error);
        alert("Mã OTP sai hoặc đã hết hạn.");
      }
    }
  };

  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (
      !formData.imageUrl ||
      !formData.certName ||
      !formData.issuingAuthority ||
      !formData.issueDate ||
      !formData.expiryDate
    ) {
      alert("Vui lòng nhập đầy đủ thông tin chứng chỉ.");
      return;
    }

    const payload = {
      phoneNumber: formData.phone,
      password: formData.password,
      bio: "Không có",
      email: "Không có",
      gender: null,
      avatar: null,
      name: formData.name,
      imageUrl: formData.imageUrl,
      issuingAuthority: formData.issuingAuthority,
      issueDate: formData.issueDate,
      expiryDate: formData.expiryDate,
      status: "PENDING",
      addressLine: addressLine,
      country: formData.country,
      city: formData.city,
      province: formData.province,
      postalCode: formData.postalCode,
      certName: formData.certName,
    };

    try {
      // console.log(payload);

      const res = await authenticateService.gardenerRegister(payload);
      console.log("Đăng ký thành công:", res.data);
      setShowSuccessPopup(true);
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      alert("Đăng ký thất bại.");
    }
  };

  const handleSignUpSuccess = () => {
    setShowSuccessPopup(false);
    history.push("/sign-in");
  };

  const CleanFoodVietLogo = () => (
    <div className="siup-logo-container">
      <span className="siup-logo-text">CleanFoodViet</span>
    </div>
  );

  const Step1 = () => (
    <div className="siup-page-layout">
      <div className="siup-sidebar-left"></div>
      <div className="siup-content-center">
        <div className="siup-content-wrapper">
          <CleanFoodVietLogo />
          <div className="siup-form-container">
            <h1 className="siup-page-title">Đăng ký</h1>
            <div className="siup-form-fields">
              {["name", "phone", "password"].map((field) => (
                <div className="siup-field-group" key={field}>
                  <label className="siup-field-label">
                    {field === "name"
                      ? "Tên"
                      : field === "phone"
                      ? "Số điện thoại"
                      : "Mật khẩu"}{" "}
                    <span className="siup-required">*</span>
                  </label>

                  {field === "password" ? (
                    <div className="siup-password-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="siup-input-field siup-password-input"
                        placeholder="Nhập mật khẩu"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        required
                      />
                      <button
                        type="button"
                        className="siup-password-toggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="siup-input-field"
                      placeholder={
                        field === "name"
                          ? "Nhập tên"
                          : field === "phone"
                          ? "Nhập số điện thoại"
                          : `Nhập ${field}`
                      }
                      value={formData[field]}
                      onChange={(e) =>
                        handleInputChange(
                          field,
                          field === "phone"
                            ? e.target.value.replace(/\D/g, "")
                            : e.target.value
                        )
                      }
                      required
                    />
                  )}
                </div>
              ))}
              {/* Địa chỉ: tỉnh - quận - xã */}
              <div className="siup-field-group">
                <label className="siup-field-label">
                  Địa chỉ (Tỉnh / Huyện / Phường){" "}
                  <span className="siup-required">*</span>
                </label>
                <AddressSelector onChange={handleInputChange} />
              </div>

              {/* Số nhà, tên đường */}
              <div className="siup-field-group">
                <label className="siup-field-label">
                  Số nhà / Tên đường{" "}
                  {/*<span className="siup-required">*</span>*/}
                </label>
                <input
                  type="text"
                  className="siup-input-field"
                  placeholder="Nhập số nhà, tên đường"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>

              {/* Postal Code nếu muốn người dùng nhập */}
              <div className="siup-field-group">
                <label className="siup-field-label">
                  Mã bưu điện (Postal Code)
                </label>
                <input
                  type="text"
                  className="siup-input-field"
                  placeholder="VD: 700000"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                  required
                />
              </div>

              <div className="siup-checkbox-container">
                <input
                  type="checkbox"
                  id="terms"
                  className="siup-checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <label htmlFor="terms" className="siup-checkbox-label">
                  Tôi đồng ý với{" "}
                  <span className="siup-link">điều khoản và dịch vụ</span>
                </label>
              </div>

              <button
                onClick={handleNextStep}
                className="siup-submit-button"
                disabled={!isAgreed}
                style={{
                  backgroundColor: isAgreed ? "#10b981" : "#d1d5db",
                  cursor: isAgreed ? "pointer" : "not-allowed",
                }}
              >
                Đăng ký
              </button>

              <div id="recaptcha-container"></div>

              <div className="siup-login-link">
                Đã có tài khoản?{" "}
                <span
                  className="siup-link"
                  onClick={() => history.push("/sign-in")}
                >
                  Đăng nhập ngay
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="siup-sidebar-right"></div>
    </div>
  );

  const Step2 = () => (
    <div className="siup-page-layout">
      <div className="siup-sidebar-left"></div>
      <div className="siup-content-center">
        <div className="siup-content-wrapper">
          <CleanFoodVietLogo />
          <div className="siup-otp-container">
            <button onClick={handlePrevStep} className="siup-back-button">
              ← Quay lại
            </button>
            <h1 className="siup-page-title">Xác minh OTP</h1>
            <p>OTP đã gửi đến {formData.phone}</p>
            <input
              type="tel"
              placeholder="Nhập mã OTP"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="siup-otp-input"
            />
            <button onClick={handleNextStep} className="siup-submit-button">
              Xác minh
            </button>
            <p className="siup-resend-link" onClick={handleNextStep}>
              Gửi lại mã?
            </p>
          </div>
        </div>
      </div>
      <div className="siup-sidebar-right"></div>
    </div>
  );

  const Step3 = () => (
    <div className="siup-page-layout">
      <div className="siup-sidebar-left"></div>
      <div className="siup-content-center">
        <div className="siup-content-wrapper">
          <CleanFoodVietLogo />
          <div className="siup-certificate-form ">
            <button onClick={handlePrevStep} className="siup-back-button">
              ← Quay lại
            </button>
            <h1 className="siup-page-title">Thông tin chứng chỉ</h1>
            <CloudinaryUpload
              onUploaded={(url) => handleInputChange("imageUrl", url)}
            />
            <input
              placeholder="Tên chứng chỉ"
              value={formData.certName}
              onChange={(e) => handleInputChange("certName", e.target.value)}
              className="siup-input-field"
            />
            <input
              placeholder="Cơ quan cấp"
              value={formData.issuingAuthority}
              onChange={(e) =>
                handleInputChange("issuingAuthority", e.target.value)
              }
              className="siup-input-field"
            />
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => handleInputChange("issueDate", e.target.value)}
              className="siup-input-field"
            />
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              className="siup-input-field"
            />
            <button onClick={handleSubmit} className="siup-submit-button">
              Hoàn tất
            </button>
            <SignUpSuccessModal
              isVisible={showSuccessPopup}
              onClose={handleSignUpSuccess}
            />
          </div>
        </div>
      </div>
      <div className="siup-sidebar-right"></div>
    </div>
  );

  return currentStep === 1 ? Step1() : currentStep === 2 ? Step2() : Step3();
}

export default SignUpPage;
