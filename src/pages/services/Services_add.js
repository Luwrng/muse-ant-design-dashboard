import React from "react";
import {
    Modal,
    Form,
    Input,
    Select,
    Button,
    Card,
    Typography,
    Space,
    Checkbox,
    Divider
} from "antd";

const { Option } = Select;
const { Title, Text } = Typography;

const Services_add = ({ open, onClose, onSubmit, mockData }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                onSubmit(values);
                form.resetFields();
                onClose();
            })
            .catch((info) => {
                console.log("Lỗi validate:", info);
            });
    };

    return (
        <Modal
            open={open}
            title="Thêm Dịch Vụ Mới"
            onCancel={onClose}
            onOk={handleOk}
            okText="Lưu"
            cancelText="Hủy"
            width={800}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Tên dịch vụ"
                    name="serviceName"
                    rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
                >
                    <Input placeholder="VD: Giới hạn đăng bài" />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                >
                    <Input.TextArea rows={3} placeholder="Mô tả chi tiết về dịch vụ" />
                </Form.Item>

                <Form.Item
                    label="Trạng thái"
                    name="status"
                    initialValue="Active"
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="Active">Đang hoạt động</Option>

                    </Select>
                </Form.Item>

                <div style={{ fontWeight: 600, marginBottom: 8 }}>Chọn gói dịch vụ</div>
                {mockData.map((service) => (
                    <>
                        {service.packages.map((pkg) => (
                            <div>
                              
                                    <Checkbox value={pkg.key}>
                                        <Text strong>{pkg.name}</Text>
                                        <br />
                                        <Text type="secondary">{pkg.description}</Text>
                                    </Checkbox>
                            </div>
                        ))}
                    </>
                ))}
            </Form>
        </Modal>
    );
};

export default Services_add;
