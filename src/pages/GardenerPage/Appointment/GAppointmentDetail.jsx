import React from "react";
import "./GAppointmentDetail.css";

function GAppointmentDetail({ appointment, isOpen, onClose, onCancel }) {
  if (!isOpen || !appointment) return null;

  const handleCancel = () => {
    onCancel(appointment);
  };

  return (
    <div className="gapdetail-modal-overlay" onClick={onClose}>
      <div
        className="gapdetail-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="gapdetail-modal-header">
          <button className="gapdetail-back-button" onClick={onClose}>
            ← Quay lại
          </button>
          <h2 className="gapdetail-modal-title">Chi tiết cuộc hẹn</h2>
        </div>

        {/* Modal Body */}
        <div className="gapdetail-modal-body">
          {/* Appointment Info Section */}
          <div className="gapdetail-appointment-section">
            <div className="gapdetail-appointment-info">
              <div className="gapdetail-appointment-icon">📅</div>
              <div className="gapdetail-appointment-details">
                <h3 className="gapdetail-appointment-subject">
                  {appointment.subject}
                </h3>
                <span
                  className={`gapdetail-status-badge gapdetail-status-${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="gapdetail-details-section">
            <div className="gapdetail-detail-row">
              <span className="gapdetail-detail-label">Thời gian:</span>
              <span className="gapdetail-detail-value">
                {/* Add a function for calculating the endTime of the appointment */}
                {appointment.startTime} - {appointment.endTime}
              </span>
            </div>
            <div className="gapdetail-detail-row">
              <span className="gapdetail-detail-label">Loại cuộc hẹn:</span>
              <span className="gapdetail-detail-value">
                {appointment.appointmentType}
              </span>
            </div>
            <div className="gapdetail-detail-row">
              <span className="gapdetail-detail-label">Trạng thái:</span>
              <span className="gapdetail-detail-value">
                {appointment.status}
              </span>
            </div>
            <div className="gapdetail-detail-row gapdetail-description-row">
              <span className="gapdetail-detail-label">Mô tả:</span>
              <div className="gapdetail-description-content">
                {appointment.description}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="gapdetail-modal-actions">
            <button className="gapdetail-cancel-button" onClick={handleCancel}>
              🗑 Hủy cuộc hẹn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GAppointmentDetail;
