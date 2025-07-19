import React from "react";
import { useState } from "react";
import "./GAppointmentCancelModal.css";

function GAppointmentCancelModal({ appointment, isOpen, onClose, onConfirm }) {
  const [reason, setReason] = useState("");

  if (!isOpen || !appointment) return null;

  function getFormattedStartAndEndTime(isoDate, durationMinutes) {
  const start = new Date(isoDate);
  const end = new Date(start.getTime() + durationMinutes * 60000);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

    return {
      startTime: formatTime(start),
      endTime: formatTime(end)
    };
  } 
  const { startTime, endTime } = getFormattedStartAndEndTime(appointment.appointmentDate, appointment.duration);


  const handleConfirm = async () => {
    await onConfirm(appointment, reason);
    setReason(""); 
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <div className="gacancel-modal-overlay" onClick={handleClose}>
      <div
        className="gacancel-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="gacancel-modal-header">
          <h2 className="gacancel-modal-title">Xác nhận hủy cuộc hẹn</h2>
        </div>

        {/* Modal Body */}
        <div className="gacancel-modal-body">
          {/* Confirmation Message */}
          <div className="gacancel-message-section">
            <div className="gacancel-warning-icon">⚠️</div>
            <p className="gacancel-confirmation-text">
              Bạn muốn hủy cuộc hẹn này?
            </p>
          </div>

          {/* Appointment Info */}
          <div className="gacancel-appointment-info">
            <h4 className="gacancel-appointment-subject">
              {appointment.subject}
            </h4>
            <p className="gacancel-appointment-time">
              {/* Add a function for calculating the endTime of the appointment */}
              {startTime} - {endTime}
            </p>
          </div>

          {/* Reason Input */}
          <div className="gacancel-reason-section">
            <label className="gacancel-reason-label" htmlFor="cancel-reason">
              Lý do:
            </label>
            <textarea
              id="cancel-reason"
              className="gacancel-reason-input"
              placeholder="Nhập lý do hủy cuộc hẹn..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="gacancel-modal-actions">
            <button className="gacancel-cancel-button" onClick={handleClose}>
              Hủy
            </button>
            <button className="gacancel-confirm-button" onClick={handleConfirm}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GAppointmentCancelModal;
