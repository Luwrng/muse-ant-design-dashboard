import React, { useEffect, useState } from "react";
import {
    Card,
    List,
    Typography,
    Tag,
    Button,
    Space,
    message as AntMessage,
} from "antd";
import { CheckOutlined, LinkOutlined } from "@ant-design/icons";

const { Text } = Typography;

const mockNotifications = [
    {
        NotificationId: "1",
        Message: "Đơn hàng mới đã được tạo.",
        Link: "/orders/1",
        IsRead: false,
        CreatedAt: "2025-06-24T10:00:00",
        AccountId: "acc123",
    },
    {
        NotificationId: "2",
        Message: "Tài khoản của bạn đã được cập nhật.",
        Link: "/account/profile",
        IsRead: true,
        CreatedAt: "2025-06-23T08:30:00",
        AccountId: "acc123",
    },
];

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Gọi API thật ở đây nếu có
        setNotifications(mockNotifications);
    }, []);

    const markAsRead = (id) => {
        const newData = notifications.map((item) =>
            item.NotificationId === id ? { ...item, IsRead: true } : item
        );
        setNotifications(newData);
        AntMessage.success("Đã đánh dấu là đã đọc.");
    };

    return (
        <Card title="Thông báo" style={{ maxWidth: 800, margin: "0 auto", marginTop: 32 }}>
            <List
                dataSource={notifications}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            !item.IsRead && (
                                <Button
                                    size="small"
                                    type="link"
                                    icon={<CheckOutlined />}
                                    onClick={() => markAsRead(item.NotificationId)}
                                >
                                    Đánh dấu đã đọc
                                </Button>
                            ),
                            item.Link && (
                                <a href={item.Link}>
                                    <Button size="small" icon={<LinkOutlined />} type="link">
                                        Xem
                                    </Button>
                                </a>
                            ),
                        ]}
                    >
                        <List.Item.Meta
                            title={
                                <Space>
                                    <Text strong>{item.Message}</Text>
                                    {!item.IsRead && <Tag color="blue">Mới</Tag>}
                                </Space>
                            }
                            description={`Thời gian: ${new Date(item.CreatedAt).toLocaleString()}`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default NotificationPage;
