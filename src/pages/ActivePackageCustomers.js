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



const ActivePackageCustomers = () => {
    const [packages, setPackages] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activePackageKey, setActivePackageKey] = useState(null);
    const [orders, setOrders] = useState(null);


    const getFilteredOrdersByPackage = () => {
        if (!orders || !activePackageKey) return [];

        return orders
            .filter(order =>
                order.servicePackageId === activePackageKey &&
                (order.gardenerName?.toLowerCase().includes(searchText.toLowerCase()) ||
                    order.gardenerPhone?.includes(searchText) ||
                    order.gardenerEmail?.toLowerCase().includes(searchText))
            );
    };

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await cleanfood.admin.getPackage({ page: 1, size: 100 });
                setPackages(res.items || []);
                const ord = await cleanfood.admin.getServicePackageOrders({ page: 1, size: 100 });
                setOrders(ord.items || [])
            } catch (err) {
                console.error("Lỗi khi lấy danh sách gói dịch vụ:", err);
                console.error("Lỗi khi lấy thông tin khách hàng: ", err)
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
            dataIndex: "gardenerId",
            align: "center",
        },
        {
            title: "Họ Tên",
            dataIndex: "gardenerName",
            align: "center",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "gardenerPhone",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "gardenerEmail",
            align: "center",
        },
        {
            title: "Trạng Thái",
            dataIndex: "status",
            align: "center",
            render: (status) => (
                <Tag color={status === "SUCCESS" ? "green" : "red"}>
                    {status === "SUCCESS" ? "Hoạt Động" : "Đã Khóa"}
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
                                dataSource={getFilteredOrdersByPackage()}
                                locale={{
                                    emptyText: <Empty description="Không có khách hàng nào sử dụng gói này" />,
                                }}
                                pagination={false}
                                rowKey="servicePackageOrderId"
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
                        <Descriptions.Item label="Mã KH">{selectedCustomer.gardenerId}</Descriptions.Item>
                        <Descriptions.Item label="Họ Tên">{selectedCustomer.gardenerName}</Descriptions.Item>
                        <Descriptions.Item label="Số Điện Thoại">{selectedCustomer.gardenerPhone}</Descriptions.Item>
                        <Descriptions.Item label="Email">{selectedCustomer.gardenerEmail}</Descriptions.Item>
                        <Descriptions.Item label="Mã Gói">{selectedCustomer.servicePackageId}</Descriptions.Item>
                        <Descriptions.Item label="Tổng Thanh Toán">{`${Number(selectedCustomer.totalAmount).toLocaleString()} đ`}</Descriptions.Item>
                        <Descriptions.Item label="Ngày Mua">{new Date(selectedCustomer.createdAt).toLocaleString("vi-VN")}</Descriptions.Item>
                        <Descriptions.Item label="Trạng Thái">
                            <Tag color={selectedCustomer.status === "SUCCESS" ? "green" : "red"}>
                                {selectedCustomer.status === "SUCCESS" ? "Thành công" : "Thất bại"}
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                )}

            </Modal>
        </>

    );

};

export default ActivePackageCustomers;
