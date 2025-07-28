import React from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";

function LineChart({ orderAmount }) {
  const { Title, Paragraph } = Typography;

  // Tạo dữ liệu biểu đồ từ doanh thu
  const chartData = {
    series: [
      {
        name: "Doanh thu",
        data: [orderAmount || 0], // Có thể thay đổi thành mảng thời gian nếu cần
      },
    ],
    options: {
      chart: {
        id: "order-amount-chart",
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Hiện tại"], // Có thể thay đổi nếu có nhiều mốc thời gian
      },
      tooltip: {
        y: {
          formatter: (val) => `${val.toLocaleString()} VND`,
        },
      },
    },
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Doanh thu</Title>
          <Paragraph className="lastweek">
            Tổng doanh thu hiện tại: <span className="bnb2">{(orderAmount || 0).toLocaleString()} VND</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li><MinusOutlined /> Doanh thu</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
        width="100%"
      />
    </>
  );
}

export default LineChart;
  