import React from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";

function LineChart({ monthlyRevenue = [] }) {
  const { Title, Paragraph } = Typography;

  const categories = monthlyRevenue.map((item) => item.month);
  const dataSeries = monthlyRevenue.map((item) => item.amount);
  const total = dataSeries.reduce((sum, val) => sum + val, 0);

  const chartData = {
    series: [
      {
        name: "Doanh thu theo tháng",
        data: dataSeries,
      },
    ],
    options: {
      chart: {
        id: "monthly-revenue-chart",
        type: "area",
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      xaxis: {
        categories,

      },
      yaxis: {
        labels: {
          formatter: (val) => `${val / 1_000_000}M`,
        },

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
          <Title level={5}>Biểu đồ doanh thu theo tháng</Title>
          <Paragraph className="lastweek">
            Tổng doanh thu: <span className="bnb2">{total.toLocaleString()} VND</span>
          </Paragraph>
        </div>
        <div className="sales">

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
