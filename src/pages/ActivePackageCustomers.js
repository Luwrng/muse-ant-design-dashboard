import React, { useState } from "react";
import { Row, Col, Card, Table, Button, Modal, Tag, Space, Descriptions, Typography, Empty, Collapse, Tabs } from "antd";
import SearchButton from "../components/button/SearchButton";
import DetailButton from "../components/button/DetailButton";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const { Panel } = Collapse;

// Dữ liệu mẫu gói dịch vụ
const servicePackages = [
    {
        key: "1",
        name: "Gói Đăng Bài Cơ Bản",
        description: "Cho phép Gardener đăng và hiển thị số lượng bài viết giới hạn với mức ưu tiên thấp.",
        price: 500000,
        duration: 1, // 1 tháng
        status: "active",
    },
    {
        key: "2",
        name: "Gói Đăng Bài Nâng Cao",
        description: "Tăng giới hạn bài đăng và thời gian hiển thị, phù hợp với Gardener có danh mục đa dạng.",
        price: 1200000,
        duration: 3, // 3 tháng
        status: "active",
    },
    {
        key: "3",
        name: "Gói Đăng Bài Doanh Nghiệp",
        description: "Dành cho đơn vị kinh doanh lớn, tối ưu khả năng hiển thị và tiếp cận khách hàng.",
        price: 2500000,
        duration: 6, // 6 tháng
        status: "inactive",
    },
];

// Dữ liệu mẫu khách hàng
const customers = [
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
        gardenerId: "GDN001"
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
        gardenerId: "GDN002"
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
        gardenerId: "GDN003"
    },
    {
        key: "4",
        customerId: "KH004",
        name: "Phạm Thị D",
        phone: "0912345678",
        email: "phamthid@email.com",
        status: "active",
        address: "12 Đường MNO, Quận 4, TP.HCM",
        joinDate: "2024-03-10",
        totalOrders: 2,
        totalSpent: 2000000,
        gardenerId: "GDN004"
    },
    {
        key: "5",
        customerId: "KH005",
        name: "Đỗ Văn E",
        phone: "0934567890",
        email: "dovane@email.com",
        status: "active",
        address: "34 Đường PQR, Quận 5, TP.HCM",
        joinDate: "2024-04-01",
        totalOrders: 4,
        totalSpent: 3200000,
        gardenerId: "GDN005"
    },
    {
        key: "6",
        customerId: "KH006",
        name: "Ngô Thị F",
        phone: "0976543210",
        email: "ngothif@email.com",
        status: "active",
        address: "56 Đường STU, Quận 6, TP.HCM",
        joinDate: "2024-04-15",
        totalOrders: 6,
        totalSpent: 5000000,
        gardenerId: "GDN006"
    },
    {
        key: "7",
        customerId: "KH007",
        name: "Lý Văn G",
        phone: "0981234567",
        email: "lyvang@email.com",
        status: "active",
        address: "78 Đường VWX, Quận 7, TP.HCM",
        joinDate: "2024-05-01",
        totalOrders: 7,
        totalSpent: 8000000,
        gardenerId: "GDN007"
    },
];

// Dữ liệu mẫu hợp đồng
const contracts = [
    {
        subscriptionId: "SUB001",
        packageId: "1",
        gardenerId: "GDN001",
        status: "Active",
        subscriptionType: "POST_LIMIT",
        createdAt: "2025-06-08T10:00:00Z",
        startDate: "2025-06-10",
        endDate: "2025-07-10",
    },
    {
        subscriptionId: "SUB002",
        packageId: "2",
        gardenerId: "GDN002",
        status: "Active",
        subscriptionType: "PRIORITY_POST",
        createdAt: "2025-06-07T15:30:00Z",
        startDate: "2025-06-09",
        endDate: "2025-06-16",
    },
    {
        subscriptionId: "SUB003",
        packageId: "1",
        gardenerId: "GDN004",
        status: "Active",
        subscriptionType: "POST_LIMIT",
        createdAt: "2025-06-10T10:00:00Z",
        startDate: "2025-06-12",
        endDate: "2025-07-12",
    },
    {
        subscriptionId: "SUB004",
        packageId: "2",
        gardenerId: "GDN005",
        status: "Active",
        subscriptionType: "PRIORITY_POST",
        createdAt: "2025-06-11T10:00:00Z",
        startDate: "2025-06-13",
        endDate: "2025-07-13",
    },
    {
        subscriptionId: "SUB005",
        packageId: "2",
        gardenerId: "GDN006",
        status: "Active",
        subscriptionType: "PRIORITY_POST",
        createdAt: "2025-06-12T10:00:00Z",
        startDate: "2025-06-14",
        endDate: "2025-07-14",
    },
    {
        subscriptionId: "SUB006",
        packageId: "3",
        gardenerId: "GDN007",
        status: "Active",
        subscriptionType: "PRIORITY_POST",
        createdAt: "2025-06-13T10:00:00Z",
        startDate: "2025-06-15",
        endDate: "2025-07-15",
    },
];

// Lấy danh sách khách hàng đang sử dụng gói theo từng gói dịch vụ
function getCustomersByPackage() {
    const today = new Date();
    // Lấy hợp đồng còn hiệu lực
    const activeContracts = contracts.filter(contract => contract.status === "Active" && new Date(contract.endDate) >= today);
    // Nhóm theo packageId
    const result = {};
    servicePackages.forEach(pkg => {
        // Lấy gardenerId của hợp đồng thuộc gói này
        const gardenerIds = activeContracts.filter(c => c.packageId === pkg.key).map(c => c.gardenerId);
        // Lấy thông tin khách hàng tương ứng
        result[pkg.key] = customers.filter(cus => gardenerIds.includes(cus.gardenerId));
    });
    return result;
}

const ActivePackageCustomers = () => {
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

    const columns = [
        {
            title: "Mã KH",
            dataIndex: "customerId",
            key: "customerId",
            align: "center",
        },
        {
            title: "Họ Tên",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "phone",
            key: "phone",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "Trạng Thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (status) => (
                <Tag color={status === "active" ? "success" : "error"}>
                    {status === "active" ? "Hoạt Động" : "Đã Khóa"}
                </Tag>
            ),
         
        },
        {
            title: "Thao Tác",
            key: "action",
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <DetailButton
                        onClick={() => showCustomerDetails(record)}
                        icon={faEye}
                        title="Chi Tiết"
                    />
                </Space>
            ),
        },
    ];

    // Lấy danh sách khách hàng theo từng gói
    const customersByPackage = getCustomersByPackage();

    // Tìm kiếm áp dụng cho tất cả bảng
    const filterCustomers = (list) =>
        list.filter(cus =>
            cus.name.toLowerCase().includes(searchText.toLowerCase()) ||
            cus.phone.includes(searchText) ||
            cus.email.toLowerCase().includes(searchText.toLowerCase())
        );

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Danh Sách Khách Hàng Đang Sử Dụng Gói"
                            extra={
                                <SearchButton
                                    placeholder="Tìm kiếm khách hàng..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            }
                        >
                            <Tabs defaultActiveKey="1">
                                {servicePackages.map((pkg) => {
                                    const packageCustomers = filterCustomers(customersByPackage[pkg.key] || []);
                                    return (
                                        <Tabs.TabPane
                                            key={pkg.key}
                                            tab={
                                                <span style={{ fontSize: "16px", padding: "10px" }}>
                                                    {pkg.name}
                                                </span>
                                            }
                                        >
                                            <div className="table-responsive" >
                                                <Table
                                                    columns={columns}
                                                    dataSource={packageCustomers}
                                                    locale={{
                                                        emptyText: (
                                                            <Empty description="Không có khách hàng nào sử dụng gói này" />
                                                        ),
                                                    }}
                                                    pagination={false}
                                                    rowKey="customerId"
                                                    scroll={{ x: true }}
                                                />
                                            </div>
                                        </Tabs.TabPane>
                                    );
                                })}
                            </Tabs>

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

export default ActivePackageCustomers; 