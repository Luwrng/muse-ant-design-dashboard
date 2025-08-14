import React, { useMemo, useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Checkbox,
  Typography,
  Divider,
  Row,
  Col,
} from "antd";
import { cleanfood } from "../../api_admin";

const { Text } = Typography;

const Package_add = ({ onSubmit, onCancel, dat }) => {
  const [form] = Form.useForm();
  const [featureList, setFeatureList] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await cleanfood.admin.getServiceFeatures({
          page: 1,
          size: 100,
        });
        setFeatureList(res.items);
      } catch (err) {
        console.error("Lỗi lấy danh sách service features:", err);
      }
    };
    fetchFeatures();
  }, []);

  const handleFinish = async (values) => {
    const featureIdsArray = Array.isArray(values.featureIds)
      ? values.featureIds
      : [values.featureIds];

    const payload = {
      packageName: values.packageName,
      description: values.description,
      price: values.price,
      duration: values.duration,
      featureIds: featureIdsArray, // 👈 chỉ là mảng string
    };

    console.log("Dữ liệu gửi lên API:", payload);
    await onSubmit(payload);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        status: "Active",
        price: 0,
        duration: 30,
        featureIds: [],
      }}
    >
      <Row gutter={24}>
        <Col xs={24} md={14}>
          <Form.Item
            label="Tên gói dịch vụ"
            name="packageName"
            rules={[
              { required: true, message: "Vui lòng nhập tên gói dịch vụ" },
            ]}
          >
            <Input placeholder="Nhập tên gói dịch vụ" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập mô tả về gói dịch vụ" />
          </Form.Item>

          <Form.Item
            label="Giá (VNĐ)"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Nhập giá gói dịch vụ"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>

          <Form.Item
            label="Thời hạn (ngày)"
            name="duration"
            rules={[{ required: true, message: "Vui lòng nhập thời hạn" }]}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder="Số ngày"
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={10}>
          <Form.Item
            label="Chọn các tính năng (feature) cho gói dịch vụ"
            name="featureIds"
            rules={[
              { required: true, message: "Vui lòng chọn ít nhất 1 tính năng" },
            ]}
          >
            <Checkbox.Group>
              <div style={{ overflowY: "auto", maxHeight: "400px" }}>
                {featureList
                  .filter((feature) => feature.status === "ACTIVE")
                  .map((feature) => (

                    <div
                      key={feature.serviceFeatureId}
                      style={{ marginBottom: 8 }}
                    >
                      <Checkbox
                        value={feature.serviceFeatureId}
                        style={{
                          width: "300px",
                          display: "flex",
                          alignItems: "center",
                          padding: "8px",
                          borderRadius: "4px",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        <Text strong>{feature.serviceFeatureName}</Text>
                      </Checkbox>
                    </div>
                  ))}
              </div>
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      <div style={{ textAlign: "right" }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Hủy
        </Button>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </div>
    </Form>
  );
};

export default Package_add;
