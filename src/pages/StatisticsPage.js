import React, { useEffect, useState } from "react";
import { Table, Card, Typography, Spin } from "antd";

const { Title } = Typography;

const StatisticsPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Dữ liệu mẫu
    const mockData = [
        { serviceName: "Đăng bài ưu tiên", buyerCount: 120 },
        { serviceName: "Giới hạn đăng bài", buyerCount: 80 },
       
    ];

    // Giả lập gọi API bằng setTimeout
    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setData(mockData);
                setLoading(false);
            }, );
        };

        fetchData();
    }, []);

    // Cấu hình cột bảng
    const columns = [
        {
            title: "Tên dịch vụ",
            dataIndex: "serviceName",
            key: "serviceName",
        },
        {
            title: "Số người mua",
            dataIndex: "buyerCount",
            key: "buyerCount",
        },
    ];

    return (
        <Card>
            <Title level={3}>Thống kê số người mua dịch vụ</Title>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={(record) => record.serviceName}
                    pagination={false}
                />
            )}
        </Card>
    );
};

export default StatisticsPage;
