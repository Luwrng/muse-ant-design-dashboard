import React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./GPasswordChange.css";
import accountService from "../../../services/apiServices/accountService";

function GPasswordChange({ onClose, phoneNumber }) {
  const [formData, setFormData] = useState({
    phoneNumber: phoneNumber,
    action: "CHANGE",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [confirmMismatch, setConfirmMismatch] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmMismatch) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      await accountService(formData);
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedForm);

    if (name === "confirmNewPassword" || name === "newPassword") {
      setConfirmMismatch(
        name === "confirmNewPassword"
          ? value !== updatedForm.newPassword
          : updatedForm.confirmNewPassword !== value
      );
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="gchangepass-popup-overlay" onClick={handleOverlayClick}>
      <div className="gchangepass-popup-container">
        <div className="gchangepass-popup-header">
          <button className="gchangepass-back-btn" onClick={onClose}>
            ←
          </button>
          <h2>Đổi mật khẩu</h2>
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="gchangepass-popup-form"
        >
          {/* Old Password */}
          <div className="gchangepass-form-group">
            <label htmlFor="oldPassword">
              Mật khẩu cũ <span className="gchangepass-required">*</span>
            </label>
            <div className="gchangepass-input-wrapper">
              <input
                type={showPasswords.old ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
              />
              <span
                className="gchangepass-toggle-icon"
                onClick={() => togglePasswordVisibility("old")}
              >
                {showPasswords.old ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* New Password */}
          <div className="gchangepass-form-group">
            <label htmlFor="newPassword">
              Mật Khẩu mới <span className="gchangepass-required">*</span>
            </label>
            <div className="gchangepass-input-wrapper">
              <input
                type={showPasswords.new ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <span
                className="gchangepass-toggle-icon"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="gchangepass-form-group">
            <label htmlFor="confirmNewPassword">
              Nhập lại mật Khẩu mới{" "}
              <span className="gchangepass-required">*</span>
            </label>
            <div className="gchangepass-input-wrapper">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
              />
              <span
                className="gchangepass-toggle-icon"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPasswords.confirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </span>
            </div>
            {confirmMismatch && (
              <p className="gchangepass-error-text">
                Mật khẩu xác nhận không khớp
              </p>
            )}
          </div>

          <div className="gchangepass-popup-actions">
            <button type="submit" className="gchangepass-btn-primary">
              Đổi Mật Khẩu
            </button>
            <button
              type="button"
              className="gchangepass-btn-secondary"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GPasswordChange;
