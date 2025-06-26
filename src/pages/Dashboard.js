import React from "react";
import {
    Card,
    Col,
    Row,
    Typography,
    Tooltip,
    Progress,
    Upload,
    message,
    Button,
    Timeline,
    Radio,
} from "antd";
import {
    ToTopOutlined,
    MenuUnfoldOutlined,
    RightOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";

import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava4 from "../assets/images/logo-spotify.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import team1 from "../assets/images/team-1.jpg";
import team2 from "../assets/images/team-2.jpg";
import team3 from "../assets/images/team-3.jpg";
import team4 from "../assets/images/team-4.jpg";
import card from "../assets/images/info-card-1.jpg";

function Dashboard() {
    const { Title, Text } = Typography;

    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    const [reverse, setReverse] = React.useState(false);

    const dollor = [
        <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
                fill="#fff"
            ></path>
            <path
                d="M11.5661 7.41784C11.9302 7.66058 12 7.8861 12 8C12 8.1139 11.9302 8.33942 11.5661 8.58216C11.4113 8.68536 11.2201 8.7776 11 8.84899L11 7.15101C11.2201 7.2224 11.4113 7.31464 11.5661 7.41784Z"
                fill="#fff"
            ></path>
            <path
                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 7C9.35503 7 8.80960 7.12586 8.43338 7.41784C7.59751 8.02643 7.59751 8.97357 8.43338 9.58216C8.80960 9.87414 9.35503 10 10 10C10.645 10 11.1904 9.87414 11.5666 9.58216C12.4025 8.97357 12.4025 8.02643 11.5666 7.41784C11.1904 7.12586 10.645 7 10 7Z"
                fill="#fff"
            ></path>
        </svg>,
    ];
    const profile = [
        <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
                fill="#fff"
            ></path>
            <path
                d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
                fill="#fff"
            ></path>
            <path
                d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
                fill="#fff"
            ></path>
            <path
                d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
                fill="#fff"
            ></path>
        </svg>,
    ];
    const heart = [
        <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
                fill="#fff"
            ></path>
        </svg>,
    ];
    const cart = [
        <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
                fill="#fff"
            ></path>
        </svg>,
    ];
    const count = [
        {
            today: "Doanh Thu Hôm Nay",
            title: "5.000.000 đ",
            persent: "+30%",
            icon: dollor,
            bnb: "bnb2",
        },
        {
            today: "Khách Hàng Mới",
            title: "+20",
            persent: "+20%",
            icon: profile,
            bnb: "bnb2",
        },
        {
            today: "Đơn Hàng Mới",
            title: "+15",
            persent: "10%",
            icon: heart,
            bnb: "redtext",
        },
        {
            today: "Doanh Thu Tháng",
            title: "150.000.000 đ",
            persent: "30%",
            icon: cart,
            bnb: "bnb2",
        },
    ];

    const list = [
        {
            img: ava1,
            Title: "Chăm Sóc Vườn Cơ Bản",
            bud: "500.000 đ",
            progress: <Progress percent={50} size="small" />,
            member: (
                <div className="avatar-group mt-2">
                    <Tooltip placement="bottom" title="Ryan Tompson">
                        <img className="tootip-img" src={team1} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Romina Hadid">
                        <img className="tootip-img" src={team2} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Alexander Smith">
                        <img className="tootip-img" src={team3} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Jessica Doe">
                        <img className="tootip-img" src={team4} alt="" />
                    </Tooltip>
                </div>
            ),
        },
        {
            img: ava2,
            Title: "Thiết Kế Cảnh Quan",
            bud: "2.000.000 đ",
            progress: <Progress percent={30} size="small" />,
            member: (
                <div className="avatar-group mt-2">
                    <Tooltip placement="bottom" title="Ryan Tompson">
                        <img className="tootip-img" src={team1} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Romina Hadid">
                        <img className="tootip-img" src={team2} alt="" />
                    </Tooltip>
                </div>
            ),
        },
        {
            img: ava3,
            Title: "Trồng Cây Theo Mùa",
            bud: "1.000.000 đ",
            progress: <Progress percent={80} size="small" />,
            member: (
                <div className="avatar-group mt-2">
                    <Tooltip placement="bottom" title="Ryan Tompson">
                        <img className="tootip-img" src={team1} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Romina Hadid">
                        <img className="tootip-img" src={team2} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Alexander Smith">
                        <img className="tootip-img" src={team3} alt="" />
                    </Tooltip>
                </div>
            ),
        },
        {
            img: ava4,
            Title: "Bảo Trì Vườn",
            bud: "800.000 đ",
            progress: <Progress percent={78} size="small" />,
            member: (
                <div className="avatar-group mt-2">
                    <Tooltip placement="bottom" title="Ryan Tompson">
                        <img className="tootip-img" src={team1} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Romina Hadid">
                        <img className="tootip-img" src={team2} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Alexander Smith">
                        <img className="tootip-img" src={team3} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Jessica Doe">
                        <img className="tootip-img" src={team4} alt="" />
                    </Tooltip>
                </div>
            ),
        },
    ];

    const timelineList = [
        {
            title: "Đơn Hàng #DH001",
            time: "09:00",
            color: "green",
        },
        {
            title: "Thanh Toán Từ Khách Hàng A",
            time: "10:45",
            color: "blue",
        },
        {
            title: "Khách Hàng Mới Đăng Ký",
            time: "12:30",
            color: "red",
        },
        {
            title: "Hoàn Thành Đơn Hàng #DH002",
            time: "14:00",
            color: "green",
        },
        {
            title: "Phản Hồi Từ Khách Hàng",
            time: "16:00",
            color: "gray",
        },
    ];

    const uploadProps = {
        name: "file",
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} đã tải lên thành công`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} tải lên thất bại`);
            }
        },
    };

    return (
        <>
            <div className="layout-content">
                <Row className="rowgap-vbox" gutter={[24, 0]}>
                    {count.map((c, index) => (
                        <Col
                            key={index}
                            xs={24}
                            sm={24}
                            md={12}
                            lg={6}
                            xl={6}
                            className="mb-24"
                        >
                            <Card bordered={false} className="criclebox ">
                                <div className="number">
                                    <Row align="middle" gutter={[24, 0]}>
                                        <Col xs={18}>
                                            <span>{c.today}</span>
                                            <Title level={3}>
                                                {c.title} <small className={c.bnb}>{c.persent}</small>
                                            </Title>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="icon-box">{c.icon}</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <Echart />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <LineChart />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
                        <Card bordered={false} className="criclebox cardbody h-full">
                            <div className="project-ant">
                                <div>
                                    <Title level={5}>Dịch Vụ Đang Thực Hiện</Title>
                                    <Paragraph className="lastweek">
                                        so với tuần trước <span className="blue">+30%</span>
                                    </Paragraph>
                                </div>
                                <div className="ant-filtertabs">
                                    <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                                        <Radio.Group onChange={onChange} defaultValue="a">
                                            <Radio.Button value="a">TẤT CẢ</Radio.Button>
                                            <Radio.Button value="b">TUẦN</Radio.Button>
                                            <Radio.Button value="c">THÁNG</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                            <div className="ant-list-box table-responsive">
                                <table className="width-100">
                                    <thead>
                                        <tr>
                                            <th>DỊCH VỤ</th>
                                            <th>KHÁCH HÀNG</th>
                                            <th>GIÁ</th>
                                            <th>TIẾN ĐỘ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((d, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <h6>
                                                        <img
                                                            src={d.img}
                                                            alt=""
                                                            className="avatar-sm mr-10"
                                                        />{" "}
                                                        {d.Title}
                                                    </h6>
                                                </td>
                                                <td>{d.member}</td>
                                                <td>
                                                    <span className="text-xs font-weight-bold">
                                                        {d.bud}{" "}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="percent-progress">{d.progress}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="uploadfile shadow-none">
                                <Upload {...uploadProps}>
                                    <Button
                                        type="dashed"
                                        className="ant-full-box"
                                        icon={<ToTopOutlined />}
                                    >
                                        <span className="click">Tải Lên Tệp Mới</span>
                                    </Button>
                                </Upload>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <div className="timeline-box">
                                <Title level={5}>Hoạt Động Gần Đây</Title>
                                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                                    <span className="bnb2">20%</span> so với tháng trước
                                </Paragraph>

                                <Timeline
                                    pending="Đang cập nhật..."
                                    className="timelinelist"
                                    reverse={reverse}
                                >
                                    {timelineList.map((t, index) => (
                                        <Timeline.Item color={t.color} key={index}>
                                            <Title level={5}>{t.title}</Title>
                                            <Text>{t.time}</Text>
                                        </Timeline.Item>
                                    ))}
                                </Timeline>
                                <Button
                                    type="primary"
                                    className="width-100"
                                    onClick={() => setReverse(!reverse)}
                                >
                                    {<MenuUnfoldOutlined />} ĐẢO CHIỀU HIỂN THỊ
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 0]}>
                    <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <Row gutter>
                                <Col
                                    xs={24}
                                    md={12}
                                    sm={24}
                                    lg={12}
                                    xl={14}
                                    className="mobile-24"
                                >
                                    <div className="h-full col-content p-20">
                                        <div className="ant-muse">
                                            <Text>Thống Kê Doanh Thu</Text>
                                            <Title level={5}>Tăng Trưởng Ổn Định</Title>
                                            <Paragraph className="lastweek mb-36">
                                                So với tháng trước đã tăng thêm
                                                <span className="bnb2"> 20%</span>
                                            </Paragraph>
                                        </div>
                                        <div className="card-footer">
                                            <a className="icon-move-right" href="#pablo">
                                                Xem Chi Tiết
                                                {<RightOutlined />}
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    xs={24}
                                    md={12}
                                    sm={24}
                                    lg={12}
                                    xl={10}
                                    className="col-img"
                                >
                                    <div className="ant-cret text-right">
                                        <img src={card} alt="" className="border10" />
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
                        <Card bordered={false} className="criclebox card-info-2 h-full">
                            <div className="gradent h-full col-content">
                                <div className="card-content">
                                    <Title level={5}>Thông Tin Hệ Thống</Title>
                                    <p>
                                        Hệ thống quản lý dịch vụ chăm sóc cây cảnh và thiết kế sân vườn
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <a className="icon-move-right" href="#pablo">
                                        Xem Thêm
                                        <RightOutlined />
                                    </a>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Dashboard; 