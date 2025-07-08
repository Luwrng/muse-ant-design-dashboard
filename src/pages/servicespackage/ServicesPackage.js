import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  message,
  Tag,
  Space,
  Descriptions,
  List,
  Popconfirm,
} from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DetailButton from "../../components/button/DetailButton";
import EditButton from "../../components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import SearchButton from "../../components/button/SearchButton";
import { Typography } from "antd";

const ServicesPackage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [searchText, setSearchText] = useState("");
  const showPackageDetails = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalVisible(true);
  };

  const handleEdit = (pkg) => {
    message.info("Chức năng đang được phát triển");
  };
  const { Text } = Typography;

  const columns = [
    {
      title: "Tên Gói Dịch Vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${Number(price).toLocaleString()} đ`,
      align: "center",
    },
    {
      title: "Thời Hạn",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => `${duration} ngày `,
      align: "center",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "error"}>
          {status === "active" ? "Đang Bán" : "Ngừng Bán"}
        </Tag>
      ),
    },

    {
      title: "Thao Tác",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <DetailButton onClick={() => showPackageDetails(record)} />
          <EditButton onClick={() => showModal(record)} />
          <DeleteButton record={record} tooltip="Xóa" />
        </Space>
      ),
    },
  ];

  const showModal = (record) => {
    setSelectedPackage(record);
    setIsModalVisible(true);
  };

  const data = [
    {
      key: "1",
      name: "Gói Đăng Bài Cơ Bản",
      description:
        "Cho phép Gardener đăng và hiển thị số lượng bài viết giới hạn với mức ưu tiên thấp.",
      price: 500000,
      duration: 30, // 1 tháng
      status: "active",
      services: [
        "Tối đa 5 bài đăng sản phẩm cùng lúc",
        "Không ưu tiên hiển thị trên trang chủ",
        "Không có nhãn nổi bật",
        "Bài đăng hết hạn sau 15 ngày",
      ],
    },
    {
      key: "2",
      name: "Gói Đăng Bài Nâng Cao",
      description:
        "Tăng giới hạn bài đăng và thời gian hiển thị, phù hợp với Gardener có danh mục đa dạng.",
      price: 1200000,
      duration: 90, // 3 tháng
      status: "active",
      services: [
        "Tối đa 10 bài đăng sản phẩm cùng lúc",
        "Ưu tiên hiển thị đầu danh mục trong 3 ngày",
        "Gắn nhãn nổi bật cho 2 bài đăng mỗi tháng",
        "Bài đăng hết hạn sau 30 ngày",
      ],
    },
    {
      key: "3",
      name: "Gói Đăng Bài Doanh Nghiệp",
      description:
        "Dành cho đơn vị kinh doanh lớn, tối ưu khả năng hiển thị và tiếp cận khách hàng.",
      price: 2500000,
      duration: 180, // 6 tháng
      status: "inactive",
      services: [
        "Không giới hạn số bài đăng cùng lúc",
        "Ưu tiên hiển thị toàn thời gian",
        "Tất cả bài đăng được gắn nhãn nổi bật",
        "Hỗ trợ nội dung và thiết kế bài đăng chuyên nghiệp",
      ],
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
              title="Quản Lý Gói Dịch Vụ"
              extra={
                <Space>
                  <SearchButton
                    placeholder="Tìm kiếm gói dịch vụ..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button type="primary">Thêm Gói Mới</Button>
                </Space>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{
                    position: ["bottomCenter", "bottomRight"],
                    total: data.length,
                    pageSize: 5,
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="Chi Tiết Gói Dịch Vụ"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        {selectedPackage && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tên Gói">
              {selectedPackage.name}
            </Descriptions.Item>
            <Descriptions.Item label="Mô Tả">
              {selectedPackage.description}
            </Descriptions.Item>
            <Descriptions.Item label="Giá">
              {`${Number(selectedPackage.price).toLocaleString()} đ`}
            </Descriptions.Item>
            <Descriptions.Item label="Thời Hạn">
              {`${selectedPackage.duration} ngày`}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng Thái">
              <Tag
                color={
                  selectedPackage.status === "active" ? "success" : "error"
                }
              >
                {selectedPackage.status === "active" ? "Đang Bán" : "Ngừng Bán"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Dịch Vụ Bao Gồm">
              <List
                size="small"
                dataSource={selectedPackage.services}
                renderItem={(item) => <List.Item>- {item}</List.Item>}
              />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default ServicesPackage;
