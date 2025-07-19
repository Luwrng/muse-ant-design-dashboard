import React from "react";
import "./SignUpSuccessModal.css";

function SignUpSuccessModal({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="siup-popup-overlay">
      <div className="siup-popup-container">
        <div className="siup-popup-icon">✅</div>
        <h2 className="siup-popup-title">Đăng ký hoàn tất!</h2>
        <p className="siup-popup-message">
          Vui lòng chờ xác minh. Kết quả xác minh sẽ được gửi đến số điện thoại
          của bạn sau.
        </p>
        <button onClick={onClose} className="siup-popup-button">
          Đóng
        </button>
      </div>
    </div>
  );
}

export default SignUpSuccessModal;
