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

function ProductCategory() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [searchText, setSearchText] = useState("");


  const [data, setData] = useState([
    {
      ProductId: 1,
      ProductName: "Cà Rốt Hữu Cơ",
      CreatedAt: "2025-06-01T10:00:00Z",
      UpdatedAt: "2025-06-10T12:00:00Z",
      Status: "Hoạt động",
      ProductCategoryId: 1,
      GardenerId: 101,

      Name: "Rau củ",
      Description: "Rau củ hữu cơ tươi sạch",

    },
    {
      ProductId: 2,
      ProductName: "Chuối",
      CreatedAt: "2025-06-03T11:30:00Z",
      UpdatedAt: "2025-06-11T09:45:00Z",
      Status: "Ngừng hoạt động",
      ProductCategoryId: 2,
      GardenerId: 102,

      Name: "Trái cây",
      Description: "Trái cây tươi theo mùa",

    },
    {
      ProductId: 3,
      ProductName: "Lá Bạc Hà",
      CreatedAt: "2025-06-05T09:15:00Z",
      UpdatedAt: "2025-06-12T08:20:00Z",
      Status: "Hoạt động",
      ProductCategoryId: 3,
      GardenerId: 103,

      Name: "Thảo mộc",
      Description: "Thảo mộc dùng để nấu ăn",

    },
  ])

  const showModal = (record) => {
    setIsModalVisible(true);
    setSelectedData(record);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedData(null);
  };


  const columns = [
    {
      title: "STT",
      dataIndex: "ProductId",
      key: "ProductId",
      width: 100,
    },
    {
      title: "Tên",
      dataIndex: "ProductName",
      key: "ProductName",
      width: 200,
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.ProductName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.Name).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key: "Description",
      width: 400,
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space size={20}>
          <DetailButton
            tooltip="Xem chi tiết"
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
                    <Title level={5}>Danh Mục Sản Phẩm</Title>
                  </Col>
                  <Col>
                    <Space>
                      <SearchButton
                        placeholder="Tìm kiếm danh mục..."
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
                    showTotal: (total, range) =>
                      `${total} danh mục`,
                  }}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title="Chi tiết danh mục"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ padding: "12px 0" }}>
          <p><strong>Tên danh mục: </strong> {selectedData?.Name}</p>
          <p><strong>Mô tả: </strong> {selectedData?.Description}</p>
        </div>
      </Modal>
    </>
  );
}

export default ProductCategory;
