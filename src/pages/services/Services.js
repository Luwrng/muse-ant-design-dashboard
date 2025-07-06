import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Tooltip,
  Button,
  Card,
  Row,
  Col,
  Modal,
  Descriptions,
} from "antd";
import DetailButton from "../../components/button/DetailButton";
import EditButton from "../../components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import SearchButton from "../../components/button/SearchButton";

const mockData = [
  {
    serviceId: "POST_LIMIT",
    serviceName: "Giới hạn đăng bài",
    description:
      "Dịch vụ quy định số lượng bài đăng sản phẩm mà mỗi Gardener có thể tạo và hiển thị công khai trên nền tảng trong cùng một thời điểm.",
    status: "Active",
    packages: [
      {
        serviceFeatureId: 1,
        name: "Gói cơ bản",
        description:
          "Cho phép tạo tối đa 5 bài đăng sản phẩm cùng lúc. Phù hợp với những Gardener mới hoặc có số lượng sản phẩm ít.",
        defaultValue: "Enabled",
        status: "Active",
        value: 5,
      },
      {
        serviceFeatureId: 2,
        name: "Gói nâng cao",
        description:
          "Cho phép tạo tối đa 10 bài đăng sản phẩm đồng thời. Dành cho Gardener có danh mục sản phẩm phong phú.",
        defaultValue: "Disabled",
        status: "Inactive",
        value: 10,
      },
    ],
  },
  {
    serviceId: "PRIORITY_POST",
    serviceName: "Đăng bài ưu tiên",
    description:
      "Dịch vụ giúp bài đăng của Gardener được hiển thị ở các vị trí nổi bật trên nền tảng (trang chủ, đầu danh mục, v.v), giúp tăng khả năng tiếp cận khách hàng.",
    status: "Active",
    packages: [
      {
        serviceFeatureId: 3,
        name: "Gói ưu tiên cơ bản",
        description:
          "Bài đăng sẽ được ưu tiên hiển thị ở đầu danh sách sản phẩm trong 3 ngày kể từ lúc đăng.",
        defaultValue: "Disabled",
        status: "Inactive",
        value: 3,
      },
      {
        serviceFeatureId: 4,
        name: "Gói ưu tiên nâng cao",
        description:
          "Bài đăng sẽ hiển thị ở đầu danh sách trong 7 ngày và được gắn biểu tượng nổi bật để thu hút khách hàng.",
        defaultValue: "Disabled",
        status: "Inactive",
        value: 7,
      },
    ],
  },
  {
    serviceId: "IMAGE_LIMIT",
    serviceName: "Giới hạn hình ảnh",
    description:
      "Giới hạn số lượng hình ảnh trong mỗi bài đăng của Gardener, nhằm tối ưu tốc độ tải và hiển thị.",
    status: "Active",
    packages: [
      {
        serviceFeatureId: 5,
        name: "Gói cơ bản",
        description: "Mỗi bài đăng được đính kèm tối đa 3 hình ảnh.",
        status: "Active",
        value: 3,
      },
      {
        serviceFeatureId: 6,
        name: "Gói nâng cao",
        description: "Cho phép đăng đến 10 hình ảnh trong một bài viết.",
        status: "Inactive",
        value: 10,
      },
    ],
  },
];

const ServiceList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);



  // Flatten mockData
  useEffect(() => {
    const flattened = mockData.flatMap((service) =>
      service.packages.map((pkg) => ({
        key: pkg.serviceFeatureId,
        serviceId: service.serviceId,
        serviceName: service.serviceName,
        action: service.serviceName,
        value: pkg.value,
        description: pkg.description,
        status: pkg.status,
      }))
    );
    setDataSource(flattened);
  }, []);

  const columns = [

    {
      title: "Hành Động",
      dataIndex: "action",
      key: "action",
      align: "center",
    },
    {
      title: "Giá Trị",
      dataIndex: "value",
      key: "value",
      align: "center",
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
      align: "left",
      width: 400,
      ellipsis: {
        showTitle: false,
      },
      render: (desc) => (
        <Tooltip placement="topLeft" title={desc}>
          {desc}
        </Tooltip>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>
          {status === "Active" ? "Hoạt Động" : "Tạm Dừng"}
        </Tag>
      ),
    },
    {
      title: "Thao Tác",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <DetailButton onClick={() => {
            setSelectedRecord(record);
            setDetailModalVisible(true);
          }} />
          <EditButton onClick={() => console.log("Edit", record)} />
          <DeleteButton
            record={record}
            tooltip="Xóa"
            setData={(newData) =>
              setDataSource((prev) =>
                prev.filter((item) => item.key !== record.key)
              )
            }
          />
        </Space>
      ),
    },
  ];

  const filteredData = dataSource.filter((item) =>
    item.action.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>

      {/* Modal Chi Tiết */}
      <Modal
        visible={detailModalVisible}
        title="Chi Tiết Dịch Vụ"
        footer={
          <Button onClick={() => setDetailModalVisible(false)}>Đóng</Button>
        }
        onCancel={() => setDetailModalVisible(false)}
      >
        {selectedRecord && (
          <Descriptions bordered column={1}>

            <Descriptions.Item label="Hành Động">
              {selectedRecord.action}
            </Descriptions.Item>
            <Descriptions.Item label="Giá Trị">
              {selectedRecord.value}
            </Descriptions.Item>
            <Descriptions.Item label="Mô Tả">
              {selectedRecord.description}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng Thái">
              <Tag color={selectedRecord.status === "Active" ? "green" : "red"}>
                {selectedRecord.status === "Active" ? "Hoạt Động" : "Tạm Dừng"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title="Danh Sách Dịch Vụ"
        extra={
          <Row gutter={12}>
            <Col>
              <SearchButton
                placeholder="Tìm kiếm hành động..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
          </Row>
        }
      >
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              position: ["bottomCenter"],
              pageSize: 5,
            }}
          />
        </div>
      </Card>
    </>
  );

};



export default ServiceList;
