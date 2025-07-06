import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Tag,
  Popconfirm,
  message,
  Avatar,
  Divider,
  Descriptions,
  Image,
} from "antd";
import DetailButton from "../components/button/DetailButton";
import SearchButton from "../components/button/SearchButton";
// Images
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face6 from "../assets/images/face-6.jpeg";

const { Title } = Typography;

function GardenerVerification() {
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [data, setData] = useState([
    {
      id: "acc002",
      name: "Alexa Liras",
      email: "alexa@mail.com",
      phone: "0987654321",
      address: "123 Garden Street, District 1, HCMC",
      avatar: face3,
      gender: "Female",
      experience: "5 years in organic farming",
      status: "Pending",
      registrationDate: "2022-11-05",
      isVerified: false,
    },
    {
      id: "acc004",
      name: "Miriam Eric",
      email: "miriam@mail.com",
      phone: "0932123456",
      address: "456 Farm Road, District 2, HCMC",
      avatar: face4,
      gender: "Female",
      experience: "3 years in hydroponic farming",
      status: "Approved",
      registrationDate: "2023-01-25",
      isVerified: true,
    },
    {
      id: "acc006",
      name: "John Levi",
      email: "john@mail.com",
      phone: "0976543210",
      address: "789 Eco Farm, District 3, HCMC",
      avatar: face6,
      gender: "Male",
      experience: "7 years in sustainable farming",
      status: "Rejected",
      registrationDate: "2022-10-20",
      isVerified: false,
    },
    {
      id: "acc008",
      name: "Peter Parker",
      email: "peter@mail.com",
      phone: "0922333444",
      address: "321 Green Garden, District 4, HCMC",
      avatar: face3,
      gender: "Male",
      experience: "4 years in urban farming",
      status: "Approved",
      registrationDate: "2023-02-28",
      isVerified: true,
    },
    {
      id: "acc002",
      name: "Alexa Liras",
      email: "alexa@mail.com",
      phone: "0987654321",
      address: "123 Garden Street, District 1, HCMC",
      avatar: face3,
      gender: "Female",
      experience: "5 years in organic farming",
      status: "Pending",
      registrationDate: "2022-11-05",
      isVerified: false,
    },
    {
      id: "acc004",
      name: "Miriam Eric",
      email: "miriam@mail.com",
      phone: "0932123456",
      address: "456 Farm Road, District 2, HCMC",
      avatar: face4,
      gender: "Female",
      experience: "3 years in hydroponic farming",
      status: "Approved",
      registrationDate: "2023-01-25",
      isVerified: true,
    },
    {
      id: "acc006",
      name: "John Levi",
      email: "john@mail.com",
      phone: "0976543210",
      address: "789 Eco Farm, District 3, HCMC",
      avatar: face6,
      gender: "Male",
      experience: "7 years in sustainable farming",
      status: "Rejected",
      registrationDate: "2022-10-20",
      isVerified: false,
    },
    {
      id: "acc008",
      name: "Peter Parker",
      email: "peter@mail.com",
      phone: "0922333444",
      address: "321 Green Garden, District 4, HCMC",
      avatar: face3,
      gender: "Male",
      experience: "4 years in urban farming",
      status: "Approved",
      registrationDate: "2023-02-28",
      isVerified: true,
    },
    {
      id: "acc002",
      name: "Alexa Liras",
      email: "alexa@mail.com",
      phone: "0987654321",
      address: "123 Garden Street, District 1, HCMC",
      avatar: face3,
      gender: "Female",
      experience: "5 years in organic farming",
      status: "Pending",
      registrationDate: "2022-11-05",
      isVerified: false,
    },
    {
      id: "acc004",
      name: "Miriam Eric",
      email: "miriam@mail.com",
      phone: "0932123456",
      address: "456 Farm Road, District 2, HCMC",
      avatar: face4,
      gender: "Female",
      experience: "3 years in hydroponic farming",
      status: "Approved",
      registrationDate: "2023-01-25",
      isVerified: true,
    },
    {
      id: "acc006",
      name: "John Levi",
      email: "john@mail.com",
      phone: "0976543210",
      address: "789 Eco Farm, District 3, HCMC",
      avatar: face6,
      gender: "Male",
      experience: "7 years in sustainable farming",
      status: "Rejected",
      registrationDate: "2022-10-20",
      isVerified: false,
    },
    {
      id: "acc008",
      name: "Peter Parker",
      email: "peter@mail.com",
      phone: "0922333444",
      address: "321 Green Garden, District 4, HCMC",
      avatar: face3,
      gender: "Male",
      experience: "4 years in urban farming",
      status: "Approved",
      registrationDate: "2023-02-28",
      isVerified: true,
    },
    {
      id: "acc002",
      name: "Alexa Liras",
      email: "alexa@mail.com",
      phone: "0987654321",
      address: "123 Garden Street, District 1, HCMC",
      avatar: face3,
      gender: "Female",
      experience: "5 years in organic farming",
      status: "Pending",
      registrationDate: "2022-11-05",
      isVerified: false,
    },
    {
      id: "acc004",
      name: "Miriam Eric",
      email: "miriam@mail.com",
      phone: "0932123456",
      address: "456 Farm Road, District 2, HCMC",
      avatar: face4,
      gender: "Female",
      experience: "3 years in hydroponic farming",
      status: "Approved",
      registrationDate: "2023-01-25",
      isVerified: true,
    },
    {
      id: "acc006",
      name: "John Levi",
      email: "john@mail.com",
      phone: "0976543210",
      address: "789 Eco Farm, District 3, HCMC",
      avatar: face6,
      gender: "Male",
      experience: "7 years in sustainable farming",
      status: "Rejected",
      registrationDate: "2022-10-20",
      isVerified: false,
    },
    {
      id: "acc008",
      name: "Peter Parker",
      email: "peter@mail.com",
      phone: "0922333444",
      address: "321 Green Garden, District 4, HCMC",
      avatar: face3,
      gender: "Male",
      experience: "4 years in urban farming",
      status: "Approved",
      registrationDate: "2023-02-28",
      isVerified: true,
    },

  ]);

  const showViewModal = (record) => {
    setViewingRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setViewingRecord(null);
  };

  const columns = [
    {
      title: "Đại lý",
      key: "retailer",
      width: 250,

      render: (_, record) => (
        <Space>
          <Avatar size={40} src={record.avatar} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,

    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 180,
      render: (phone) => phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3"),
      align: "center",
    },
    {
      title: "Địa chỉ ",
      dataIndex: "address",
      key: "address",
      width: 180,
      render: (address) => address.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3"),
      align: "center",
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "registrationDate",
      key: "registrationDate",
      width: 180,
      align: "center",
    },

    {
      title: "Thao tác",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space>
          <DetailButton record={record} showModal={showViewModal} />
        </Space>
      ),
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
              title="Danh sách đại lý "
              extra={
                <Space>
                  <SearchButton
                    placeholder="Tìm kiếm đại lý..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </Space>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{
                    position: ["bottomCenter", "bottomCenter"],
                    pageSize: 6,
                  }}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* View Details Modal */}
      <Modal
        title="Chi tiết đại lý"
        visible={isViewModalVisible}
        onCancel={handleCancel}
        width={600}
        footer={null}
      >
        {viewingRecord && (
          <>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar size={100} src={viewingRecord.avatar} />
              <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>
                {viewingRecord.name}
              </Title>
              <div style={{ color: "#8c8c8c" }}>
                Đăng kí vào ngày {" "}
                {new Date(viewingRecord.registrationDate).toLocaleString()}
              </div>
            </div>

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Email" span={2}>
                {viewingRecord.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại" span={2}>
                {viewingRecord.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={2}>
                {viewingRecord.address}
              </Descriptions.Item>
            
              <Descriptions.Item label="Giới tính" span={2}>
                {viewingRecord.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái" span={2}>
                {viewingRecord.status === "Approved" ? <Tag color="green">Đã phê duyệt</Tag> : <Tag color="red">Chưa phê duyệt</Tag>}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Modal>
    </>
  );
}

export default GardenerVerification;
