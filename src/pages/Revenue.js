import React, { useState } from "react";
import {
    Row,
    Col,
    Card,
    Typography,
    Select,
    Statistic,
    Table,
    Tag,
    Space,
} from "antd";
import { Line, Pie } from "@ant-design/plots";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const Revenue = () => {
    const [timeRange, setTimeRange] = useState("year");

    const revenueData = [
        { month: "Tháng 1", revenue: 2500 },
        { month: "Tháng 2", revenue: 3200 },
        { month: "Tháng 3", revenue: 3800 },
        { month: "Tháng 4", revenue: 4200 },
        { month: "Tháng 5", revenue: 4800 },
        { month: "Tháng 6", revenue: 5500 },
        { month: "Tháng 7", revenue: 6200 },
        { month: "Tháng 8", revenue: 5800 },
        { month: "Tháng 9", revenue: 6500 },
        { month: "Tháng 10", revenue: 7200 },
        { month: "Tháng 11", revenue: 7800 },
        { month: "Tháng 12", revenue: 8500 },
    ];

    const serviceRevenueData = [
        { type: "Chăm Sóc Vườn Cơ Bản", value: 35 },
        { type: "Thiết Kế Cảnh Quan Cao Cấp", value: 45 },
        { type: "Trồng Cây Theo Mùa", value: 20 },
    ];

    const topServicesData = [
        {
            key: "1",
            service: "Thiết Kế Cảnh Quan Cao Cấp",
            revenue: 45000,
            orders: 25,
            growth: 15.2,
        },
        {
            key: "2",
            service: "Chăm Sóc Vườn Cơ Bản",
            revenue: 35000,
            orders: 42,
            growth: 8.5,
        },
        {
            key: "3",
            service: "Trồng Cây Theo Mùa",
            revenue: 20000,
            orders: 18,
            growth: -2.3,
        },
    ];

    const revenueConfig = {
        data: revenueData,
        xField: "month",
        yField: "revenue",
        smooth: true,
        areaStyle: {
            fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
        },
    };

    const pieConfig = {
        data: serviceRevenueData,
        angleField: "value",
        colorField: "type",
        radius: 0.8,
        label: {
            type: "outer",
            content: "{type}: {percentage}",
        },
        interactions: [
            {
                type: "pie-legend-active",
            },
            {
                type: "element-active",
            },
        ],
    };

    const columns = [
        {
            title: "Dịch Vụ",
            dataIndex: "service",
            key: "service",
        },
        {
            title: "Doanh Thu",
            dataIndex: "revenue",
            key: "revenue",
            render: (value) => `${Number(value).toLocaleString()} đ`,
        },
        {
            title: "Số Đơn",
            dataIndex: "orders",
            key: "orders",
        },
        {
            title: "Tăng Trưởng",
            key: "growth",
            dataIndex: "growth",
            render: (growth) => (
                <Space>
                    {typeof growth === "number" ? (
                        growth > 0 ? (
                            <Tag color="success">
                                <ArrowUpOutlined /> {growth}%
                            </Tag>
                        ) : (
                            <Tag color="error">
                                <ArrowDownOutlined /> {Math.abs(growth)}%
                            </Tag>
                        )
                    ) : (
                        <Tag color="default">N/A</Tag>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="layout-content">
                <Row gutter={[24, 0]}>
                    <Col span={24}>
                        <Card
                            className="header-solid mb-24"
                            bordered={false}
                            title={
                                <Row justify="space-between" align="middle">
                                    <Col span={12}>
                                        <Title level={5}>Thống Kê Doanh Thu</Title>
                                    </Col>
                                    <Col span={12} style={{ textAlign: "right" }}>
                                        <Select
                                            defaultValue={timeRange}
                                            style={{ width: 120 }}
                                            onChange={setTimeRange}
                                        >
                                            <Option value="year">Năm</Option>
                                            <Option value="month">Tháng</Option>
                                            <Option value="week">Tuần</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            }
                        >
                            <Row gutter={[24, 24]}>
                                <Col xs={24} sm={24} md={8}>
                                    <Card bordered={false}>
                                        <Statistic
                                            title="Tổng Doanh Thu"
                                            value={100000}
                                            precision={0}
                                            suffix=" đ"
                                        />
                                        <Tag color="success" style={{ marginTop: 8 }}>
                                            <ArrowUpOutlined /> Tăng 12% so với kỳ trước
                                        </Tag>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <Card bordered={false}>
                                        <Statistic
                                            title="Giá Trị Đơn Hàng Trung Bình"
                                            value={850}
                                            precision={0}
                                            suffix=" đ"
                                        />
                                        <Tag color="success" style={{ marginTop: 8 }}>
                                            <ArrowUpOutlined /> Tăng 5% so với kỳ trước
                                        </Tag>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={8}>
                                    <Card bordered={false}>
                                        <Statistic
                                            title="Tổng Số Đơn Hàng"
                                            value={85}
                                            suffix=" đơn"
                                        />
                                        <Tag color="success" style={{ marginTop: 8 }}>
                                            <ArrowUpOutlined /> Tăng 8% so với kỳ trước
                                        </Tag>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={16}>
                        <Card
                            bordered={false}
                            className="criclebox mb-24"
                            title={<Title level={5}>Biểu Đồ Doanh Thu</Title>}
                        >
                            <Line {...revenueConfig} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Card
                            bordered={false}
                            className="criclebox mb-24"
                            title={<Title level={5}>Doanh Thu Theo Loại Dịch Vụ</Title>}
                        >
                            <Pie {...pieConfig} />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 0]}>
                    <Col span={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title={<Title level={5}>Dịch Vụ Hiệu Quả Nhất</Title>}
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={topServicesData}
                                    pagination={false}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Revenue;
