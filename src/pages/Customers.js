import React, { useState } from "react";
import {
    Row,
    Col,
    Card,
    Table,
    Button,
    Modal,
    Tag,
    Space,
    Descriptions,
    message,
} from "antd";
import SearchButton from "../components/button/SearchButton";
const Customers = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchText, setSearchText] = useState("");       
    const showCustomerDetails = (customer) => {
        setSelectedCustomer(customer);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedCustomer(null);
    };

    const handleStatusChange = (customer, newStatus) => {
        message.success(`Đã cập nhật trạng thái khách hàng thành ${newStatus}`);
    };

    const columns = [
        {
            title: "Mã KH",
            dataIndex: "customerId",
            key: "customerId",
        },
        {
            title: "Họ Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Trạng Thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "active" ? "success" : "error"}>
                    {status === "active" ? "Hoạt Động" : "Đã Khóa"}
                </Tag>
            ),
        },
        {
            title: "Thao Tác",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showCustomerDetails(record)}>
                        Chi Tiết
                    </Button>
                    <Button
                        type={record.status === "active" ? "primary" : "default"}
                        danger={record.status === "active"}
                        onClick={() =>
                            handleStatusChange(
                                record,
                                record.status === "active" ? "inactive" : "active"
                            )
                        }
                    >
                        {record.status === "active" ? "Khóa" : "Kích Hoạt"}
                    </Button>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: "1",
            customerId: "KH001",
            name: "Nguyễn Văn A",
            phone: "0123456789",
            email: "nguyenvana@email.com",
            status: "active",
            address: "123 Đường ABC, Quận 1, TP.HCM",
            joinDate: "2024-01-15",
            totalOrders: 5,
            totalSpent: 7500000,
        },
        {
            key: "2",
            customerId: "KH002",
            name: "Trần Thị B",
            phone: "0987654321",
            email: "tranthib@email.com",
            status: "active",
            address: "456 Đường XYZ, Quận 2, TP.HCM",
            joinDate: "2024-02-01",
            totalOrders: 3,
            totalSpent: 4500000,
        },
        {
            key: "3",
            customerId: "KH003",
            name: "Lê Văn C",
            phone: "0369852147",
            email: "levanc@email.com",
            status: "inactive",
            address: "789 Đường DEF, Quận 3, TP.HCM",
            joinDate: "2024-02-15",
            totalOrders: 1,
            totalSpent: 1500000,
        },
    ];

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Quản Lý Khách Hàng"
                            extra={
                                <Space>
                                    <SearchButton
                                        placeholder="Tìm kiếm khách hàng..."
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                    <Button type="primary">
                                        Thêm Khách Hàng
                                    </Button>
                                </Space>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={{
                                        position: ["bottom", "right"],
                                        total: data.length,
                                        pageSize: 5,
                                        showSizeChanger: true,
                                      
                                    }}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            <Modal
                title="Chi Tiết Khách Hàng"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedCustomer && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Mã Khách Hàng">
                            {selectedCustomer.customerId}
                        </Descriptions.Item>
                        <Descriptions.Item label="Họ Tên">
                            {selectedCustomer.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số Điện Thoại">
                            {selectedCustomer.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {selectedCustomer.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa Chỉ">
                            {selectedCustomer.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày Tham Gia">
                            {selectedCustomer.joinDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng Số Đơn Hàng">
                            {selectedCustomer.totalOrders}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng Chi Tiêu">
                            {`${Number(selectedCustomer.totalSpent).toLocaleString()} đ`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng Thái">
                            <Tag color={selectedCustomer.status === "active" ? "success" : "error"}>
                                {selectedCustomer.status === "active" ? "Hoạt Động" : "Đã Khóa"}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </>
    );
};

export default Customers; 