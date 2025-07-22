import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Modal, Tag, Space, Descriptions, Typography, Empty, Tabs, Layout, Menu, Select } from "antd";
import { cleanfood } from "../api_admin"; // sửa đúng path nếu cần
import SearchButton from "../components/button/SearchButton";
import DetailButton from "../components/button/DetailButton";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Sider, Content } = Layout;
const { Option } = Select;



const contracts = [/* giữ nguyên như bạn đã gửi ở trên */];
const customers = [/* giữ nguyên như bạn đã gửi ở trên */];


function getCustomersByPackage(contracts, packages, customers) {
    const today = new Date();
    const activeContracts = contracts.filter(contract => contract.status === "Active" && new Date(contract.endDate) >= today);
    const result = {};
    packages.forEach(pkg => {
        const gardenerIds = activeContracts.filter(c => c.packageId === pkg.servicePackageId || c.packageId === pkg.key).map(c => c.gardenerId);
        result[pkg.servicePackageId || pkg.key] = customers.filter(cus => gardenerIds.includes(cus.gardenerId));
    });
    return result;
}

const ActivePackageCustomers = () => {
    const [packages, setPackages] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activePackageKey, setActivePackageKey] = useState(null);


    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await cleanfood.admin.getPackage({ page: 1, size: 100 });
                setPackages(res.items || []);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách gói dịch vụ:", err);
            }
        };
        fetchPackages();
    }, []);

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
            align: "center",
        },
        {
            title: "Họ Tên",
            dataIndex: "name",
            align: "center",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "phone",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            align: "center",
        },
        {
            title: "Trạng Thái",
            dataIndex: "status",
            align: "center",
            render: (status) => (
                <Tag color={status === "active" ? "green" : "red"}>
                    {status === "active" ? "Hoạt Động" : "Đã Khóa"}
                </Tag>
            ),
        },
        {
            title: "Thao Tác",
            key: "action",
            align: "center",
            render: (_, record) => (
                <DetailButton
                    onClick={() => showCustomerDetails(record)}
                    icon={faEye}
                    title="Chi Tiết"
                />
            ),
        },
    ];

    const customersByPackage = getCustomersByPackage(contracts, packages, customers);
    const filterCustomers = (list) =>
        list.filter(cus =>
            cus.name.toLowerCase().includes(searchText.toLowerCase()) ||
            cus.phone.includes(searchText) ||
            cus.email.toLowerCase().includes(searchText.toLowerCase())
        );

    return (
        <>
            <div style={{ width: "100%" }}>
                <Card
                    bordered={false}
                    title="Danh Sách Khách Hàng Đang Sử Dụng Gói Dịch Vụ"
                    extra={
                        <SearchButton
                            placeholder="Tìm kiếm khách hàng..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    }
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Select
                                placeholder="Chọn gói dịch vụ đang hoạt động"
                                value={activePackageKey}
                                onChange={(value) => setActivePackageKey(value)}
                                style={{ width: "100%" }}
                            >
                                {packages
                                    .filter((pkg) => pkg.status === "ACTIVE")
                                    .map((pkg) => (
                                        <Option key={pkg.servicePackageId || pkg.key} value={pkg.servicePackageId || pkg.key}>
                                            {pkg.packageName || pkg.name}
                                        </Option>
                                    ))}
                            </Select>
                        </Col>
                    </Row>

                    {activePackageKey && (
                        <>


                            <Table
                                columns={columns}
                                dataSource={filterCustomers(customersByPackage[activePackageKey] || [])}
                                locale={{
                                    emptyText: <Empty description="Không có khách hàng nào sử dụng gói này" />,
                                }}
                                pagination={false}
                                rowKey="customerId"
                                scroll={{ x: "max-content" }}
                            />
                        </>
                    )}
                </Card>
            </div>

            {/* Modal hiển thị chi tiết khách hàng */}
            <Modal
                title="Chi Tiết Khách Hàng"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={<Button onClick={handleCancel}>Đóng</Button>}
            >
                {selectedCustomer && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Mã Khách Hàng">{selectedCustomer.customerId}</Descriptions.Item>
                        <Descriptions.Item label="Họ Tên">{selectedCustomer.name}</Descriptions.Item>
                        <Descriptions.Item label="Số Điện Thoại">{selectedCustomer.phone}</Descriptions.Item>
                        <Descriptions.Item label="Email">{selectedCustomer.email}</Descriptions.Item>
                        <Descriptions.Item label="Địa Chỉ">{selectedCustomer.address}</Descriptions.Item>
                        <Descriptions.Item label="Ngày Tham Gia">{selectedCustomer.joinDate}</Descriptions.Item>
                        <Descriptions.Item label="Tổng Số Đơn Hàng">{selectedCustomer.totalOrders}</Descriptions.Item>
                        <Descriptions.Item label="Tổng Chi Tiêu">
                            {`${Number(selectedCustomer.totalSpent).toLocaleString()} đ`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng Thái">
                            <Tag color={selectedCustomer.status === "active" ? "green" : "red"}>
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
