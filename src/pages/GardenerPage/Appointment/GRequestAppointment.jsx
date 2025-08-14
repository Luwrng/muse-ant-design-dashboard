import React from "react";
import "./GRequestAppointment.css";

function GRequestAppointment({
  appointment,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) {
  if (!isOpen || !appointment) return null;

  const handleApprove = async () => {
    await onApprove(appointment);
  };

  const handleReject = async () => {
    await onReject(appointment);
  };

  return (
    <div className="garequest-modal-overlay" onClick={onClose}>
      <div
        className="garequest-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="garequest-modal-header">
          <button className="garequest-back-button" onClick={onClose}>
            ← Quay lại
          </button>
          <h2 className="garequest-modal-title">Chi tiết yêu cầu hẹn</h2>
        </div>

        {/* Modal Body */}
        <div className="garequest-modal-body">
          {/* User Info Section */}
          <div className="garequest-user-section">
            <div className="garequest-user-info">
              <div className="garequest-user-avatar">
                {appointment.retailerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="garequest-user-details">
                <h3 className="garequest-user-name">
                  {appointment.retailerName}
                </h3>
                <span className="garequest-status-badge">
                  {appointment.status}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="garequest-details-section">
            <div className="garequest-detail-row">
              <span className="garequest-detail-label">Số điện thoại:</span>
              <span className="garequest-detail-value">
                {appointment.phoneNumber}
              </span>
            </div>
            <div className="garequest-detail-row">
              <span className="garequest-detail-label">Ngày hẹn:</span>
              <span className="garequest-detail-value">
                {/* {appointment.date} lúc {appointment.time} */}
                {
                  new Date(appointment.appointmentDate)
                    .toISOString()
                    .split("T")[0]
                }{" "}
                lúc{" "}
                {
                  new Date(appointment.appointmentDate)
                    .toISOString()
                    .split("T")[1]
                    .split(".")[0]
                }
              </span>
            </div>
            <div className="garequest-detail-row">
              <span className="garequest-detail-label">Hẹn trong bao lâu:</span>
              <span className="garequest-detail-value">
                {appointment.duration}
              </span>
            </div>
            <div className="garequest-detail-row">
              <span className="garequest-detail-label">Loại cuộc hẹn:</span>
              <span className="garequest-detail-value">
                {appointment.appointmentType}
              </span>
            </div>
            <div className="garequest-detail-row">
              <span className="garequest-detail-label">Chủ đề:</span>
              <span className="garequest-detail-value">
                {appointment.subject}
              </span>
            </div>
            <div className="garequest-detail-row garequest-description-row">
              <span className="garequest-detail-label">Mô tả:</span>
              <div className="garequest-description-content">
                {appointment.description}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="garequest-modal-actions">
            <button
              className="garequest-approve-button"
              onClick={handleApprove}
            >
              ✓ Chấp nhận
            </button>
            <button className="garequest-reject-button" onClick={handleReject}>
              ✕ Từ chối
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GRequestAppointment;
