import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./GDashboard.css";
import statisticService from "../../services/apiServices/statisticService";
import LoadingPopup from "../../../components/loading/LoadingPopup";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function GDashboard() {
  const [date, setDate] = useState(new Date());
  const [dashboardData, setDashboardData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const statusOrder = [
      "PENDING",
      "PREPARED",
      "DELIVERING",
      "COMPLETED",
      "CANCELLED",
    ];

    const fetchStatistic = async () => {
      setIsLoading(true);
      try {
        const gardenerId = localStorage.getItem("account_id");
        var generalStat = await statisticService.getGeneralDashboardInfo(
          gardenerId
        );
        var yearlyOrder = await statisticService.getYearOrderStatistic(
          gardenerId
        );
        var upcommingAppointmentsData =
          await statisticService.getUpcommingAppointment(gardenerId);

        const countsByStatus = statusOrder.map(
          (status) =>
            generalStat.orderList.filter((order) => order.status === status)
              .length
        );

        const monthlyData = Array(12).fill(0);
        yearlyOrder.forEach((item) => {
          monthlyData[item.month - 1] = item.amount;
        });

        // Sample data for the dashboard
        const dashboardDataDetail = {
          totalOrders: generalStat.totalOrders,
          orderDelivery: generalStat.totalOrderDeliveries,
          appointments: generalStat.totalAppointments,
          products: generalStat.totalProducts,
          posts: generalStat.totalPosts,

          // Data for pie chart - order status
          orderStatus: {
            labels: [
              "Pending",
              "Prepared",
              "Delivering",
              "Completed",
              "Cancelled",
            ],
            datasets: [
              {
                data: countsByStatus,
                backgroundColor: [
                  "#FF9F40",
                  "#36A2EB",
                  "#4BC0C0",
                  "#97CA00",
                  "#E74C3C",
                ],
                borderWidth: 1,
              },
            ],
          },

          // Data for bar chart - monthly orders
          monthlyOrders: {
            labels: [
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
            ],
            datasets: [
              {
                label: "Orders",
                data: monthlyData,
                backgroundColor: "#36A2EB",
              },
            ],
          },

          // Sample upcoming appointments
          upcomingAppointments: upcommingAppointmentsData,
        };

        setDashboardData(dashboardDataDetail);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistic();
  }, []);

  // Options for bar chart
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Orders",
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 45,
          font: {
            size: 20,
          },
          padding: 20,
        },
      },
    },
  };

  // Function to highlight dates with appointments on calendar
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];

      if (
        !Array.isArray(dashboardData.upcomingAppointments) ||
        dashboardData.upcomingAppointments.length <= 0
      )
        return null;

      const hasAppointment = dashboardData.upcomingAppointments.some(
        (appointment) =>
          new Date(appointment.appointmentDate).toISOString().split("T")[0] ===
          dateStr
      );
      return hasAppointment ? "gdashboard-appointment-date" : null;
    }
  };

  return (
    <div className="gdashboard-container">
      <h1 className="gdashboard-title">Tổng quan</h1>
      {dashboardData && (
        <>
          {/* Stats Cards */}
          <div className="gdashboard-stats-container">
            <div className="gdashboard-stat-card">
              <h3>Tổng đơn hàng trong tháng</h3>
              <p className="gdashboard-stat-value">
                {dashboardData.totalOrders}
              </p>
              <span className="gdashboard-stat-icon order-icon">📦</span>
            </div>

            <div className="gdashboard-stat-card">
              <h3>Tổng đơn giao hàng trong tháng</h3>
              <p className="gdashboard-stat-value">
                {dashboardData.orderDelivery}
              </p>
              <span className="gdashboard-stat-icon delivery-icon">🚚</span>
            </div>
            <div className="gdashboard-stat-card">
              <h3>Số lượng các cuộc hẹn trong tháng</h3>
              <p className="gdashboard-stat-value">
                {dashboardData.appointments}
              </p>
              <span className="gdashboard-stat-icon appointment-icon">📅</span>
            </div>

            <div className="gdashboard-stat-card">
              <h3>Tổng sản phẩm</h3>
              <br />
              <p className="gdashboard-stat-value">{dashboardData.products}</p>
              <span className="gdashboard-stat-icon product-icon">🌱</span>
            </div>

            <div className="gdashboard-stat-card">
              <h3>Tổng số bài đăng</h3>
              <br />
              <p className="gdashboard-stat-value">{dashboardData.posts}</p>
              <span className="gdashboard-stat-icon post-icon">📝</span>
            </div>
          </div>

          {/* Charts and Calendar Section */}
          <div className="gdashboard-charts-container">
            {/* Calendar */}
            <div className="gdashboard-chart-card gdashboard-calendar">
              <div className="gdashboard-card-header">
                <h3>Appointment Calendar</h3>
                <h3>Upcoming Appointments</h3> {/* Moved title here */}
              </div>
              <div className="gdashboard-calendar-content">
                <Calendar
                  onChange={setDate}
                  value={date}
                  tileClassName={tileClassName}
                  className="gdashboard-react-calendar"
                />
                <div className="gdashboard-upcoming-appointments">
                  <ul className="gdashboard-appointment-list">
                    {dashboardData.upcomingAppointments.length > 0 &&
                      dashboardData.upcomingAppointments.map((appointment) => (
                        <li
                          key={appointment.appointmentId}
                          className="gdashboard-appointment-item"
                        >
                          <div className="gdashboard-appointment-title">
                            {appointment.appointmentType}
                          </div>
                          <div className="gdashboard-appointment-client">
                            {appointment.accountName}
                          </div>
                          <div className="gdashboard-appointment-time">
                            {new Date(
                              appointment.appointmentDate
                            ).toLocaleDateString()}{" "}
                            từ {appointment.startTime} đến {appointment.endTime}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="gdashboard-chart-card gdashboard-pie-chart">
              <h3 style={{ fontSize: "2rem", marginBottom: "3.5rem" }}>
                Order Status
              </h3>
              <div
                className="gdashboard-chart-wrapper"
                style={{ height: "450px", width: "100%" }}
              >
                <Pie data={dashboardData.orderStatus} options={pieOptions} />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="gdashboard-chart-card gdashboard-bar-chart">
              <h3>Monthly Orders</h3>
              <div className="gdashboard-chart-wrapper">
                <Bar options={barOptions} data={dashboardData.monthlyOrders} />
              </div>
            </div>
          </div>
        </>
      )}

      <LoadingPopup isOpen={isLoading} />
    </div>
  );
}

export default GDashboard;

// const dashboardDataDetail = {
//   totalOrders: 245,
//   orderDelivery: 189,
//   appointments: 32,
//   products: 78,
//   posts: 124,

//   // Data for pie chart - order status
//   orderStatus: {
//     labels: ["Pending", "Prepared", "Delivering", "Completed", "Cancelled"],
//     datasets: [
//       {
//         data: [35, 42, 28, 125, 15],
//         backgroundColor: [
//           "#FF9F40",
//           "#36A2EB",
//           "#4BC0C0",
//           "#97CA00",
//           "#E74C3C",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   },

//   // Data for bar chart - monthly orders
//   monthlyOrders: {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "Orders",
//         data: [18, 25, 30, 22, 17, 29, 32, 35, 28, 20, 15, 24],
//         backgroundColor: "#36A2EB",
//       },
//     ],
//   },

//   // Sample upcoming appointments
//   upcomingAppointments: [
//     {
//       id: 1,
//       title: "Garden Consultation",
//       client: "John Smith",
//       date: "2025-07-16",
//       time: "10:00 AM",
//     },
//     {
//       id: 2,
//       title: "Lawn Maintenance",
//       client: "Sarah Johnson",
//       date: "2025-07-17",
//       time: "2:30 PM",
//     },
//     {
//       id: 3,
//       title: "Tree Pruning",
//       client: "Michael Brown",
//       date: "2025-07-18",
//       time: "9:00 AM",
//     },
//     {
//       id: 4,
//       title: "Flower Bed Design",
//       client: "Emily Davis",
//       date: "2025-07-20",
//       time: "1:00 PM",
//     },
//     {
//       id: 5,
//       title: "Pest Control Check",
//       client: "David Lee",
//       date: "2025-07-22",
//       time: "11:00 AM",
//     },
//     {
//       id: 6,
//       title: "Irrigation System Repair",
//       client: "Olivia Wilson",
//       date: "2025-07-23",
//       time: "3:00 PM",
//     },
//   ],
// };
