import React from "react";
import { Form, Input, InputNumber, Select, Button, Divider } from "antd";

const { Option } = Select;

const ACTIONS = [
  { label: "Số lượng bài đăng", value: 0 },
  { label: "Ưu tiên bài đăng", value: 1 },
  { label: "Giới hạn hình ảnh", value: 2 },
];

const Service_add = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const payload = {
      serviceFeatureName: values.serviceFeatureName.trim(),
      description: values.description.trim(),
      defaultValue: values.defaultValue.trim(),
      action: values.action, // đã là số
    };
    onSubmit(payload);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        defaultValue: 0,
        action: 0, // số, không phải chuỗi
      }}
    >
      <Form.Item
        label="Tên dịch vụ"
        name="serviceFeatureName"
        rules={[{ required: true, message: "Vui lòng nhập tên dịch vụvụ" }]}
      >
        <Input placeholder="Nhập tên dịch vụ" />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
      >
        <Input.TextArea rows={3} placeholder="Nhập mô tả" />
      </Form.Item>

      <Form.Item
        label="Giá trị mặc định"
        name="defaultValue"
        rules={[{ required: true, message: "Vui lòng nhập giá trị mặc định" }]}
      >
        <Input placeholder="Nhập giá trị mặc định" />
      </Form.Item>

      <Form.Item
        label="Loại hành động"
        name="action"
        rules={[{ required: true, message: "Vui lòng chọn loại hành động" }]}
      >
        <Select>
          {ACTIONS.map((act) => (
            <Option key={act.value} value={act.value}>
              {act.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

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

export default Service_add;
