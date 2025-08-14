import React from "react";
import { useState } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import convesionImg from "../assets/images/face-3.jpg";
import convesionImg2 from "../assets/images/face-4.jpg";
import convesionImg3 from "../assets/images/face-5.jpeg";
import convesionImg4 from "../assets/images/face-6.jpeg";
import convesionImg5 from "../assets/images/face-2.jpg";
import project1 from "../assets/images/home-decor-1.jpeg";
import project2 from "../assets/images/home-decor-2.jpeg";
import project3 from "../assets/images/home-decor-3.jpeg";

function Profile() {
  const [imageURL, setImageURL] = useState(false);
  const [loading, setLoading] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Kích thước ảnh phải nhỏ hơn 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(imageUrl);
      });
    }
  };

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Tải Ảnh Lên</div>
    </div>
  );

  const data = [
    {
      title: "Sophie B.",
      avatar: convesionImg,
      description: "Dịch vụ rất tốt, nhân viên chuyên nghiệp",
    },
    {
      title: "Anne Marie",
      avatar: convesionImg2,
      description: "Tôi rất hài lòng với kết quả",
    },
    {
      title: "Ivan",
      avatar: convesionImg3,
      description: "Sẽ tiếp tục sử dụng dịch vụ",
    },
    {
      title: "Peterson",
      avatar: convesionImg4,
      description: "Chất lượng dịch vụ tuyệt vời",
    },
    {
      title: "Maria",
      avatar: convesionImg5,
      description: "Đội ngũ nhân viên rất nhiệt tình",
    },
  ];

  const project = [
    {
      img: project1,
      titlesub: "Thiết Kế #1",
      title: "Thiết Kế Sân Vườn Hiện Đại",
      disciption:
        "Dự án thiết kế và thi công sân vườn theo phong cách hiện đại cho biệt thự",
    },
    {
      img: project2,
      titlesub: "Thiết Kế #2",
      title: "Vườn Trên Sân Thượng",
      disciption:
        "Thiết kế không gian xanh trên sân thượng kết hợp với khu vực thư giãn",
    },
    {
      img: project3,
      titlesub: "Thiết Kế #3",
      title: "Sân Vườn Phong Cách Nhật",
      disciption:
        "Thiết kế sân vườn theo phong cách Nhật Bản với hồ cá Koi và cây cảnh",
    },
  ];

  // return (
  //   <>
  //     <div
  //       className="profile-nav-bg"
  //       style={{ backgroundImage: "url(" + BgProfile + ")" }}
  //     ></div>

  //     <Card
  //       className="card-profile-head"
  //       bodyStyle={{ display: "none" }}
  //       title={
  //         <Row justify="space-between" align="middle" gutter={[24, 0]}>
  //           <Col span={24} md={12} className="col-info">
  //             <Avatar.Group>
  //               <Avatar size={74} shape="square" src={profilavatar} />

  //               <div className="avatar-info">
  //                 <h4 className="font-semibold m-0">Nguyễn Văn A</h4>
  //                 <p>Quản Lý</p>
  //               </div>
  //             </Avatar.Group>
  //           </Col>
  //           <Col
  //             span={24}
  //             md={12}
  //             style={{
  //               display: "flex",
  //               alignItems: "center",
  //               justifyContent: "flex-end",
  //             }}
  //           >
  //             <Radio.Group defaultValue="a">
  //               <Radio.Button value="a">THÔNG TIN</Radio.Button>
  //               <Radio.Button value="b">NHÓM</Radio.Button>
  //               <Radio.Button value="c">DỰ ÁN</Radio.Button>
  //             </Radio.Group>
  //           </Col>
  //         </Row>
  //       }
  //     ></Card>

  //     <Row gutter={[24, 0]}>
  //       <Col span={24} md={8} className="mb-24">
  //         <Card
  //           bordered={false}
  //           title={<h6 className="font-semibold m-0">Thông Tin Cá Nhân</h6>}
  //           className="header-solid h-full card-profile-information"
  //           extra={<Button type="link">{pencil}</Button>}
  //           bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
  //         >
  //           <p className="text-dark">
  //             {" "}
  //             Quản lý dự án với hơn 5 năm kinh nghiệm trong lĩnh vực thiết kế và chăm sóc sân vườn.{" "}
  //           </p>
  //           <hr className="my-25" />
  //           <Descriptions title="Thông Tin Chi Tiết">
  //             <Descriptions.Item label="Họ Tên" span={3}>
  //               Nguyễn Văn A
  //             </Descriptions.Item>
  //             <Descriptions.Item label="Điện Thoại" span={3}>
  //               0123456789
  //             </Descriptions.Item>
  //             <Descriptions.Item label="Email" span={3}>
  //               nguyenvana@email.com
  //             </Descriptions.Item>
  //             <Descriptions.Item label="Địa Chỉ" span={3}>
  //               123 Đường ABC, Quận 1, TP.HCM
  //             </Descriptions.Item>
  //             <Descriptions.Item label="Mạng Xã Hội" span={3}>
  //               <a href="#pablo" className="mx-5 px-5">
  //                 {<TwitterOutlined />}
  //               </a>
  //               <a href="#pablo" className="mx-5 px-5">
  //                 {<FacebookOutlined style={{ color: "#344e86" }} />}
  //               </a>
  //               <a href="#pablo" className="mx-5 px-5">
  //                 {<InstagramOutlined style={{ color: "#e1306c" }} />}
  //               </a>
  //             </Descriptions.Item>
  //           </Descriptions>
  //         </Card>
  //       </Col>
  //       <Col span={24} md={8} className="mb-24">
  //         <Card
  //           bordered={false}
  //           title={<h6 className="font-semibold m-0">Đánh Giá Từ Khách Hàng</h6>}
  //           className="header-solid h-full"
  //           bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
  //         >
  //           <List
  //             itemLayout="horizontal"
  //             dataSource={data}
  //             split={false}
  //             className="conversations-list"
  //             renderItem={(item) => (
  //               <List.Item actions={[<Button type="link">XEM</Button>]}>
  //                 <List.Item.Meta
  //                   avatar={
  //                     <Avatar shape="square" size={48} src={item.avatar} />
  //                   }
  //                   title={item.title}
  //                   description={item.description}
  //                 />
  //               </List.Item>
  //             )}
  //           />
  //         </Card>
  //       </Col>
  //       <Col span={24} md={8} className="mb-24">
  //         <Card
  //           bordered={false}
  //           title={<h6 className="font-semibold m-0">Dự Án Đã Thực Hiện</h6>}
  //           className="header-solid h-full"
  //           bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
  //         >
  //           <Row gutter={[24, 24]}>
  //             {project.map((p, index) => (
  //               <Col span={24} md={24} key={index}>
  //                 <Card className="card-project" bordered={false}>
  //                   <div className="card-tag">{p.titlesub}</div>
  //                   <h5>{p.title}</h5>
  //                   <p>{p.disciption}</p>
  //                   <Row gutter={[6, 0]} className="card-footer">
  //                     <Col span={12}>
  //                       <Button type="button">XEM CHI TIẾT</Button>
  //                     </Col>
  //                   </Row>
  //                 </Card>
  //               </Col>
  //             ))}
  //           </Row>
  //         </Card>
  //       </Col>
  //     </Row>
  //     <Card
  //       bordered={false}
  //       className="header-solid mb-24"
  //       title={
  //         <>
  //           <h6 className="font-semibold">Cài Đặt Nền Tảng</h6>
  //           <p>Quản lý cài đặt hệ thống</p>
  //         </>
  //       }
  //     >
  //       <Row gutter={[24, 24]}>
  //         <Col span={24} md={12}>
  //           <Card className="card-info-2" bordered={false}>
  //             <div className="gradent">
  //               <div className="card-content">
  //                 <h6>Thông Báo Email</h6>
  //                 <p>Nhận thông báo qua email</p>
  //                 <Switch defaultChecked />
  //               </div>
  //             </div>
  //           </Card>
  //         </Col>
  //         <Col span={24} md={12}>
  //           <Card className="card-info-2" bordered={false}>
  //             <div className="gradent">
  //               <div className="card-content">
  //                 <h6>Thông Báo SMS</h6>
  //                 <p>Nhận thông báo qua tin nhắn</p>
  //                 <Switch defaultChecked />
  //               </div>
  //             </div>
  //           </Card>
  //         </Col>
  //         <Col span={24} md={12}>
  //           <Card className="card-info-2" bordered={false}>
  //             <div className="gradent">
  //               <div className="card-content">
  //                 <h6>Xác Thực 2 Lớp</h6>
  //                 <p>Bảo mật tài khoản</p>
  //                 <Switch />
  //               </div>
  //             </div>
  //           </Card>
  //         </Col>
  //         <Col span={24} md={12}>
  //           <Card className="card-info-2" bordered={false}>
  //             <div className="gradent">
  //               <div className="card-content">
  //                 <h6>Sao Lưu Tự Động</h6>
  //                 <p>Sao lưu dữ liệu định kỳ</p>
  //                 <Switch defaultChecked />
  //               </div>
  //             </div>
  //           </Card>
  //         </Col>
  //       </Row>
  //     </Card>
  //   </>
  // );
}

export default Profile;
