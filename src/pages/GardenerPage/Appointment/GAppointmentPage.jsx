import React, { useEffect } from "react";

import { useState } from "react";
import { EyeFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import GRequestAppointment from "./GRequestAppointment";
import GAppointmentDetail from "./GAppointmentDetail";
import GAppointmentCancelModal from "./GAppointmentCancelModal";
import "./GAppointmentPage.css";
import appointmentService from "../../services/apiServices/appointmentService";

// const scheduledAppointments = [
//   {
//     id: 1,
//     subject: "Garden Design Consultation",
//     description:
//       "Comprehensive consultation for residential garden redesign including landscape planning and plant selection strategies.",
//     type: "Garden Design",
//     status: "Confirmed",
//     startTime: "10:30",
//     endTime: "12:30",
//     day: new Date("2025-07-07T00:00:00"), // Monday
//     colorClass: "gappointment-appointment-orange",
//   },
//   {
//     id: 2,
//     subject: "Plant Care Session",
//     description:
//       "Expert advice on plant health, disease prevention, and proper fertilization techniques.",
//     type: "Consultation",
//     status: "Pending",
//     startTime: "14:00",
//     endTime: "15:00",
//     day: new Date("2025-07-08T00:00:00"), // Tuesday
//     colorClass: "gappointment-appointment-blue",
//   },
//   {
//     id: 3,
//     subject: "Landscape Planning",
//     description:
//       "Detailed planning session for outdoor space optimization and seasonal maintenance.",
//     type: "Planning",
//     status: "Confirmed",
//     startTime: "9:00",
//     endTime: "10:30",
//     day: new Date("2025-07-09T00:00:00"), // Thursday
//     colorClass: "gappointment-appointment-green",
//   },
//   {
//     id: 4,
//     subject: "Evening Consultation",
//     description:
//       "Late evening consultation for busy professionals who prefer after-work appointments.",
//     type: "Consultation",
//     status: "Confirmed",
//     startTime: "19:00",
//     endTime: "20:30",
//     day: new Date("2025-07-10T00:00:00"), // Wednesday
//     colorClass: "gappointment-appointment-indigo",
//   },
//   {
//     id: 5,
//     subject: "Early Morning Review",
//     description:
//       "Early morning garden maintenance review for optimal plant care scheduling.",
//     type: "Review",
//     status: "Pending",
//     startTime: "6:00",
//     endTime: "7:30",
//     day: new Date("2025-07-11T00:00:00"), // Friday
//     colorClass: "gappointment-appointment-purple",
//   },
// ];

// const waitingApprovals = [
//   {
//     id: 3,
//     name: "David Chen",
//     phone: "0456789123",
//     date: "12/07/2024",
//     time: "10:30",
//     duration: "120 phút",
//     type: "Garden Design",
//     subject: "Tư vấn thiết kế sân vườn",
//     description:
//       "Tư vấn thiết kế sân vườn cho biệt thự với diện tích 200m2, bao gồm lựa chọn cây cảnh, bố trí không gian xanh và hệ thống tưới nước tự động. Khách hàng mong muốn có một không gian xanh mát, thân thiện với môi trường và dễ dàng chăm sóc.",
//     avatar: "/placeholder.svg?height=40&width=40",
//     status: "Chờ phê duyệt",
//   },
//   {
//     id: 4,
//     name: "Michael Johnson",
//     phone: "0123456789",
//     date: "10/07/2024",
//     time: "09:00",
//     duration: "60 phút",
//     type: "Consultation",
//     subject: "Tư vấn cây cảnh văn phòng",
//     description:
//       "Tư vấn lựa chọn và bố trí cây cảnh cho không gian văn phòng 50m2, yêu cầu cây dễ chăm sóc và phù hợp với ánh sáng trong nhà. Khách hàng muốn tạo không gian làm việc xanh, tươi mát và tăng năng suất làm việc cho nhân viên.",
//     avatar: "/placeholder.svg?height=40&width=40",
//     status: "Chờ phê duyệt",
//   },
// ];

const timeSlots = [
  //   "0:00",
  //   "0:30",
  //   "1:00",
  //   "1:30",
  //   "2:00",
  //   "2:30",
  //   "3:00",
  //   "3:30",
  //   "4:00",
  //   "4:30",
  //   "5:00",
  //   "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  //   "22:30",
  //   "23:00",
  //   "23:30",
];

function GAppointmentPage() {
  const [activeTab, setActiveTab] = useState("wait-approve");
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const [pendingAppointment, setPendingAppointments] = useState([]);
  const [scheduledAppointments, setScheduledAppointments] = useState([]);

  const today = new Date();

  useEffect(() => {
    const fetchPendingAppointment = async () => {
      try {
        if (activeTab === "wait-approve") {
          const gardenerId = localStorage.getItem("account_id");
          const result =
            await appointmentService.getAccountRequestedAppointments(
              gardenerId
            );

          setPendingAppointments(result.items);
        } else if (activeTab === "schedule") {
          const gardenerId = localStorage.getItem("account_id");
          const result =
            await appointmentService.getAccountScheduledAppointments(
              gardenerId
            );

          setScheduledAppointments(result);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPendingAppointment();
  }, [activeTab]);

  // #region Calendar functions
  // Function to get the start of the week (Monday)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  };

  // Function to get week days with dates
  const getWeekDays = (weekStart) => {
    const days = [];
    const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const fullDayNames = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      days.push({
        day: i + 1,
        label: fullDayNames[i],
        shortLabel: dayNames[i],
        date: date.getDate().toString(),
        fullDate: new Date(date),
      });
    }
    return days;
  };

  // Function to format week range
  const getWeekRange = (weekStart) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const startMonth = monthNames[weekStart.getMonth()];
    const endMonth = monthNames[weekEnd.getMonth()];
    const startDate = weekStart.getDate();
    const endDate = weekEnd.getDate();
    const year = weekStart.getFullYear();

    if (weekStart.getMonth() === weekEnd.getMonth()) {
      return `${startMonth} ${startDate} - ${endDate}, ${year}`;
    } else {
      return `${startMonth} ${startDate} - ${endMonth} ${endDate}, ${year}`;
    }
  };

  // Navigation functions
  const goToPreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
  };

  const goToNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
  };

  // Initialize current week start
  const weekStart = getWeekStart(currentWeekStart);
  const weekDays = getWeekDays(weekStart);
  const weekRange = getWeekRange(weekStart);
  // #endregion

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "gappointment-status-confirmed";
      case "pending":
        return "gappointment-status-pending";
      default:
        return "gappointment-status-default";
    }
  };

  const getAppointmentForTimeSlot = (day, time) => {
    return scheduledAppointments.find(
      (apt) =>
        apt.day.toDateString() === day.toDateString() &&
        apt.startTime <= time &&
        apt.endTime > time
    );
  };

  const getAppointmentHeight = (appointment) => {
    const start = timeSlots.indexOf(appointment.startTime);
    const end = timeSlots.indexOf(appointment.endTime);
    return end - start;
  };

  // Modal functions for Wait for Approve
  const openRequestModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRequestModal(true);
  };

  const closeRequestModal = () => {
    setShowRequestModal(false);
    setSelectedAppointment(null);
  };

  const handleApprove = async (appointment) => {
    try {
      await appointmentService.updateAppointmentStatus(
        appointment.appointmentId,
        "ACCEPTED"
      );

      setPendingAppointments(
        pendingAppointment.map((appo) =>
          appo.filter(
            (item) => item.appointmentId !== appointment.appointmentId
          )
        )
      );
    } catch (err) {
      console.log(err);
    }

    closeRequestModal();
  };

  const handleReject = async (appointment) => {
    try {
      await appointmentService.updateAppointmentStatus(
        appointment.appointmentId,
        "REJECTED"
      );

      setPendingAppointments(
        pendingAppointment.map((appo) =>
          appo.filter(
            (item) => item.appointmentId !== appointment.appointmentId
          )
        )
      );
    } catch (err) {
      console.log(err);
    }

    closeRequestModal();
  };

  // Modal functions for Schedule Detail
  const openDetailModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedAppointment(null);
  };

  const handleCancelRequest = (appointment) => {
    setShowDetailModal(false);
    setShowCancelPopup(true);
  };

  // Cancel popup functions
  const closeCancelPopup = () => {
    setShowCancelPopup(false);
    setSelectedAppointment(null);
  };

  const handleCancelConfirm = async (appointment, reason) => {
    console.log("Cancelled appointment:", appointment, "Reason:", reason);
    try {
      const gardenerId = localStorage.getItem("account_id");
      await appointmentService.cancelAppointment(appointment.appointmentId, {
        cancelledBy: gardenerId,
        cancellationReason: reason,
      });
    } catch (err) {
      console.log(err);
    }
    setShowCancelPopup(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="gappointment-appointment-container">
      <div className="gappointment-appointment-header">
        <h1 className="gappointment-appointment-title">Quản lý các cuộc hẹn</h1>
        {/* <p className="gappointment-appointment-subtitle">
          Quản lý các cuộc hẹn đã được đặt trước và những yêu cầu về tạo cuộc
          hẹn từ phía Retailer
        </p> */}
      </div>

      <div className="gappointment-tabs-container">
        <div className="gappointment-tabs-list">
          <button
            className={`gappointment-tab-trigger ${
              activeTab === "wait-approve" ? "gappointment-active" : ""
            }`}
            onClick={() => setActiveTab("wait-approve")}
          >
            <span className="gappointment-tab-icon">⏰</span>
            Wait for Approve
          </button>
          <button
            className={`gappointment-tab-trigger ${
              activeTab === "schedule" ? "gappointment-active" : ""
            }`}
            onClick={() => setActiveTab("schedule")}
          >
            <span className="gappointment-tab-icon">📅</span>
            Schedule
          </button>
        </div>

        {activeTab === "wait-approve" && (
          <div className="gappointment-tab-content">
            <div className="gappointment-table-container">
              <table className="gappointment-appointments-table">
                <thead>
                  <tr className="gappointment-table-header">
                    <th>HÌNH ĐẠI DIỆN</th>
                    <th>SỐ ĐIỆN THOẠI</th>
                    <th>NGÀY HẸN</th>
                    <th>HẸN TRONG BAO LÂU</th>
                    <th>LOẠI CUỘC HẸN</th>
                    <th>HÀNH ĐỘNG</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(pendingAppointment) &&
                    pendingAppointment.map((appointment) => (
                      <tr
                        key={appointment.appointmentId}
                        className="gappointment-table-row"
                      >
                        <td>
                          <div className="gappointment-client-info">
                            <div className="gappointment-avatar">
                              {appointment.retailerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="gappointment-client-name">
                              {appointment.retailerName}
                            </span>
                          </div>
                        </td>
                        <td className="gappointment-phone-cell">
                          {appointment.phoneNumber}
                        </td>
                        <td className="gappointment-date-cell">
                          {
                            new Date(appointment.date)
                              .toISOString()
                              .split("T")[1]
                              .split(".")[0]
                          }{" "}
                          {
                            new Date(appointment.appointmentDate)
                              .toISOString()
                              .split("T")[0]
                          }
                        </td>
                        <td className="gappointment-duration-cell">
                          {appointment.duration}
                        </td>
                        <td>
                          <span className="gappointment-type-badge">
                            {appointment.appointmentType}
                          </span>
                        </td>
                        <td>
                          <button
                            className="gappointment-view-button"
                            onClick={() => openRequestModal(appointment)}
                          >
                            <EyeFilled />
                          </button>
                          <button
                            className="gappointment-approve-button"
                            onClick={handleApprove}
                          >
                            <CheckOutlined />
                          </button>
                          <button
                            className="gappointment-reject-button"
                            onClick={handleReject}
                          >
                            <CloseOutlined />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="gappointment-tab-content">
            <div className="gappointment-calendar-container">
              {/* Week Navigation */}
              <div className="gappointment-week-navigation">
                <div className="gappointment-nav-controls">
                  <button
                    className="gappointment-nav-button"
                    onClick={goToPreviousWeek}
                  >
                    ‹
                  </button>
                  <span className="gappointment-week-range">{weekRange}</span>
                  <button
                    className="gappointment-nav-button"
                    onClick={goToNextWeek}
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Schedule Grid: Columns = Days, Rows = Time */}
              <div className="gappointment-schedule-grid">
                {/* Header Row - Days of Week (Columns) */}
                <div className="gappointment-schedule-header">
                  <div className="gappointment-time-header-cell">TIME</div>
                  {weekDays.map((dayInfo) => (
                    <div
                      key={dayInfo.day}
                      className="gappointment-day-header-cell"
                    >
                      <div className="gappointment-day-info">
                        <span className="gappointment-day-name">
                          {dayInfo.shortLabel}
                        </span>
                        <span className="gappointment-day-date">
                          {dayInfo.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Rows */}
                <div className="gappointment-schedule-body">
                  {timeSlots.map((time, timeIndex) => (
                    <div key={time} className="gappointment-time-row">
                      {/* Time Cell */}
                      <div className="gappointment-time-cell">
                        <span className="gappointment-time-label">{time}</span>
                      </div>

                      {/* Day Cells for this time slot */}
                      {weekDays.map((dayInfo) => {
                        const appointment = getAppointmentForTimeSlot(
                          dayInfo.fullDate,
                          time
                        );
                        const isFirstSlot =
                          appointment && appointment.startTime === time;

                        return (
                          <div
                            key={`${dayInfo.day}-${time}`}
                            className="gappointment-day-cell"
                          >
                            {isFirstSlot && (
                              <div
                                className={`gappointment-appointment-block ${
                                  today > appointment.appointmentDate
                                    ? "gappointment-appointment-green"
                                    : "gappointment-appointment-"
                                }`}
                                style={{
                                  height: `${
                                    getAppointmentHeight(appointment) * 50 - 4
                                  }px`,
                                }}
                                onClick={() => openDetailModal(appointment)}
                              >
                                <div className="gappointment-appointment-info-block">
                                  <div className="gappointment-appointment-subject">
                                    {appointment.subject}
                                  </div>
                                  <div className="gappointment-appointment-description">
                                    {appointment.description}
                                  </div>
                                </div>
                                <div className="gappointment-appointment-badges">
                                  <span className="gappointment-type-badge-small">
                                    {appointment.appointmentType}
                                  </span>
                                  <span
                                    className={`gappointment-status-badge-small ${getStatusClass(
                                      appointment.status
                                    )}`}
                                  >
                                    {appointment.status}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Request Appointment  */}
      <GRequestAppointment
        appointment={selectedAppointment}
        isOpen={showRequestModal}
        onClose={closeRequestModal}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Appointment Detail Modal (for Schedule) */}
      <GAppointmentDetail
        appointment={selectedAppointment}
        isOpen={showDetailModal}
        onClose={closeDetailModal}
        onCancel={handleCancelRequest}
      />

      {/* Appointment Cancel Popup */}
      <GAppointmentCancelModal
        appointment={selectedAppointment}
        isOpen={showCancelPopup}
        onClose={closeCancelPopup}
        onConfirm={handleCancelConfirm}
      />
    </div>
  );
}

export default GAppointmentPage;
