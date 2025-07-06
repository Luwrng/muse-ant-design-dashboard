import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  Modal,
  Space,
} from "antd";
import DetailButton from "../components/button/DetailButton";
import SearchButton from "../components/button/SearchButton";

const { Title } = Typography;

function GardenerPostStatistics() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGardener, setSelectedGardener] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Dữ liệu mock: bài đăng của mỗi Gardener
  const [data, setData] = useState([
    {
      GardenerId: 101,
      GardenerName: "Nguyễn Văn A",
      Posts: [
        { ProductId: 1, ProductName: "Cà Rốt Hữu Cơ" },
        { ProductId: 4, ProductName: "Củ cải trắng" },
      ],
    },
    {
      GardenerId: 102,
      GardenerName: "Lê Thị B",
      Posts: [{ ProductId: 2, ProductName: "Chuối" }],
    },
    {
      GardenerId: 103,
      GardenerName: "Trần Văn C",
      Posts: [
        { ProductId: 3, ProductName: "Lá Bạc Hà" },
        { ProductId: 5, ProductName: "Lá Tía Tô" },
        { ProductId: 6, ProductName: "Hành Lá" },
      ],
    },
  ]);

  const showModal = (record) => {
    setSelectedGardener(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedGardener(null);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "GardenerId",
      key: "GardenerId",
      width: 100,
    },
    {
      title: "Tên Gardener",
      dataIndex: "GardenerName",
      key: "GardenerName",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.GardenerName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Số bài đăng",
      key: "PostCount",
      render: (_, record) => record.Posts.length,
      width: 150,
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space size={20}>
          <DetailButton
            tooltip="Xem chi tiết bài đăng"
            record={record}
            showModal={showModal}
          />
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
              title={
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={5}>Thống Kê Bài Đăng Theo Gardener</Title>
                  </Col>
                  <Col>
                    <Space>
                      <SearchButton
                        placeholder="Tìm kiếm Gardener..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </Space>
                  </Col>
                </Row>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{
                    position: ["bottomCenter", "bottomRight"],
                    pageSize: 10,
                  }}
                  rowKey="GardenerId"
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="Chi tiết bài đăng"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedGardener && (
          <ul style={{ paddingLeft: 20 }}>
            {selectedGardener.Posts.map((post) => (
              <li key={post.ProductId}>{post.ProductName}</li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  );
}

export default GardenerPostStatistics;
