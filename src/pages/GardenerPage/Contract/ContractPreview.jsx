"use client";

import { ArrowLeft, Printer, Download } from "lucide-react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";
import "./ContractPage.css";
import { message } from "antd";

export default function ContractPreview({ contractData, onBack }) {
  const handlePrint = () => {
    window.print();
  };

  const handleExport = async () => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              // Official Header
              new Paragraph({
                children: [
                  new TextRun({
                    text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                    bold: true,
                    size: 28,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Độc lập – Tự do – Hạnh phúc",
                    bold: true,
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "────────────",
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
              }),

              // Contract Title
              new Paragraph({
                children: [
                  new TextRun({
                    text: "HỢP ĐỒNG MUA BÁN HÀNG HÓA",
                    bold: true,
                    size: 32,
                  }),
                  new TextRun({
                    text: "1",
                    superScript: true,
                    size: 20,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Số: ${
                      contractData.contractNumber || ".../.../2024/HĐMB"
                    }`,
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
              }),

              // Legal References
              new Paragraph({
                children: [
                  new TextRun({
                    text: "- Căn cứ Bộ luật Dân sự 2015;",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "- Căn cứ Luật Thương mại 2005 (đã được sửa đổi, bổ sung bởi Luật số 05/2017/QH14 và Luật số 61/2018/QH14);",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "- Căn cứ nhu cầu và khả năng thực tế của các bên.",
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),

              // Date and Location
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Hôm nay, ${formatDate(
                      contractData.signDate
                    )}, tại địa chỉ: ${
                      contractData.signLocation ||
                      "..................................................."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Chúng tôi, gồm có:",
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),

              // Party A
              new Paragraph({
                children: [
                  new TextRun({
                    text: "BÊN BÁN (Bên A)",
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Tên doanh nghiệp: ${
                      contractData.sellerCompanyName ||
                      "..................................................."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Mã số doanh nghiệp: ${
                      contractData.sellerTaxId ||
                      "..................................................."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Địa chỉ trụ sở chính: ${
                      contractData.sellerAddress ||
                      "..................................................."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Người đại diện theo pháp luật: ${
                      contractData.sellerLegalRep ||
                      "..................................................."
                    } Chức danh: ${
                      contractData.sellerPosition || "....................."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `CMND/CCCD/Hộ chiếu số: ${
                      contractData.sellerIdNumber || "........................"
                    } cấp ngày ${
                      contractData.sellerIdDate
                        ? formatDate(contractData.sellerIdDate)
                        : "................"
                    } nơi cấp: ${
                      contractData.sellerIdPlace || "....................."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Số điện thoại: ${
                      contractData.sellerPhone ||
                      "..................................................."
                    } Fax: ${
                      contractData.sellerFax ||
                      "..................................................."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Tài khoản ngân hàng số: ${
                      contractData.sellerBankAccount ||
                      "........................"
                    } Mở tại ngân hàng: ${
                      contractData.sellerBank ||
                      "..................................................."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),

              // Party B
              new Paragraph({
                children: [
                  new TextRun({
                    text: "BÊN MUA (Bên B)",
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Tên doanh nghiệp: ${
                      contractData.buyerCompanyName ||
                      "..................................................."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Mã số doanh nghiệp: ${
                      contractData.buyerTaxId ||
                      "..................................................."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Địa chỉ trụ sở chính: ${
                      contractData.buyerAddress ||
                      "..................................................."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),

              // Article 1 - Products Table
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Điều 1. Tên hàng hóa, số lượng, chất lượng, giá trị hợp đồng",
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Bên A bán cho Bên B hàng hóa sau đây:",
                    size: 24,
                  }),
                ],
                spacing: { after: 200 },
              }),

              // Products Table
              new Table({
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: "STT", bold: true }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: "Tên hàng hóa", bold: true }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: "Đơn vị", bold: true }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: "Số lượng", bold: true }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "Đơn giá (VNĐ)",
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "Thành tiền (VNĐ)",
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: "Ghi chú", bold: true }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                    ],
                  }),
                  ...contractData.products.map(
                    (product, index) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: product.stt || (index + 1).toString(),
                                  }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: product.tenHangHoa || "",
                                  }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({ text: product.donVi || "" }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({ text: product.soLuong || "" }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: product.donGia
                                      ? Number.parseFloat(
                                          product.donGia
                                        ).toLocaleString("vi-VN")
                                      : "",
                                  }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: (
                                      (Number.parseFloat(product.soLuong) ||
                                        0) *
                                      (Number.parseFloat(product.donGia) || 0)
                                    ).toLocaleString("vi-VN"),
                                  }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({ text: product.ghiChu || "" }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                        ],
                      })
                  ),
                ],
              }),

              // Total
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Tổng cộng: ${calculateTotal().toLocaleString(
                      "vi-VN"
                    )} VNĐ`,
                    bold: true,
                    size: 24,
                  }),
                ],
                spacing: { before: 200, after: 200 },
              }),

              // Contract Articles
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Điều 2. Thanh toán",
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `1. Bên B phải thanh toán cho Bên A số tiền ghi tại Điều 1 của Hợp đồng này vào ${
                      contractData.paymentDate
                        ? formatDate(contractData.paymentDate)
                        : "ngày...tháng...năm..."
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `2. Bên B thanh toán cho Bên A theo hình thức ${
                      contractData.paymentMethod ||
                      "[Điền hình thức thanh toán, ví dụ tiền mặt, chuyển khoản.]"
                    }`,
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Điều 3. Thời gian, địa điểm, phương thức giao hàng",
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "1. Bên A giao hàng cho bên B theo lịch sau:",
                    size: 24,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Table({
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: "STT", bold: true }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: "Tên hàng hóa", bold: true }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: "Đơn vị", bold: true }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: "Số lượng", bold: true }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "Thời gian giao hàng",
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "Địa điểm giao hàng",
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: "Ghi chú", bold: true }),
                            ],
                          }),
                        ],
                        borders: {
                          top: { style: BorderStyle.SINGLE, size: 1 },
                          bottom: { style: BorderStyle.SINGLE, size: 1 },
                          left: { style: BorderStyle.SINGLE, size: 1 },
                          right: { style: BorderStyle.SINGLE, size: 1 },
                        },
                      }),
                    ],
                  }),
                  ...contractData.deliverySchedule.map(
                    (item, index) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: item.stt || (index + 1).toString(),
                                  }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({ text: item.tenHangHoa || "" }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({ text: item.donVi || "" }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({ text: item.soLuong || "" }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: item.thoiGianGiao
                                      ? formatDate(item.thoiGianGiao)
                                      : "",
                                  }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({ text: item.diaDiemGiao || "" }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({ text: item.ghiChu || "" }),
                                ],
                              }),
                            ],
                            borders: {
                              top: { style: BorderStyle.SINGLE, size: 1 },
                              bottom: { style: BorderStyle.SINGLE, size: 1 },
                              left: { style: BorderStyle.SINGLE, size: 1 },
                              right: { style: BorderStyle.SINGLE, size: 1 },
                            },
                          }),
                        ],
                      })
                  ),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `2. Phương tiện vận chuyển và chi phí vận chuyển do bên ${
                      contractData.transportResponsibility || "......"
                    } chịu. Chi phí bốc xếp (${
                      contractData.loadingUnloadingCost ||
                      "mỗi bên chịu một đầu hoặc........"
                    })`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `3. Quy định lịch giao nhận hàng hóa mà bên mua không đến nhận hàng thì phải chịu chi phí lưu kho bãi là ${
                      contractData.storageCostPerDay || "..."
                    } đồng/ngày. Nếu phương tiện vận chuyển bên mua đến mà bên bán không có hàng giao thì bên bán phải chịu chi phí thực tế cho việc điều động phương tiện`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `4. Khi nhận hàng, bên mua có trách nhiệm kiểm nhận phẩm chất, quy cách hàng hóa tại chỗ. Nếu phát hiện hàng thiếu hoặc không đúng tiêu chuẩn chất lượng… thì lập biên bản tại chỗ, yêu cầu bên bán xác nhận. Hàng đã ra khỏi kho bên bán không chịu trách nhiệm (trừ loại hàng có quy định thời hạn bảo hành)`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `5. Trường hợp giao nhận hàng theo nguyên đai, nguyên kiện, nếu bên mua sau khi chở về nhập kho mới phát hiện có vi phạm thì phải lập biên bản gọi cơ quan kiểm tra trung gian (…………………….) đến xác nhận và phải gửi đến bên bán trong hạn …ngày tính từ khi lập biên bản. Sau … ngày nếu bên bán đã nhận được biên bản mà không có ý kiến gì thì coi như đã chịu trách nhiệm bồi thường lô hàng đó`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `6. Mỗi lô hàng khi giao nhận phải có xác nhận chất lượng bằng phiếu hoặc biên bản kiểm nghiệm; khi đến nhận hàng, người nhận phải có đủ: Giấy giới thiệu của cơ quan bên mua; Phiếu xuất kho của cơ quan bên bán; Giấy chứng minh nhân dân hoặc Căn cước công dân`,
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Điều 4. Trách nhiệm của các bên",
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "1. Bên bán không chịu trách nhiệm về bất kỳ khiếm khuyết nào của hàng hoá nếu vào thời điểm giao kết hợp đồng bên mua đã biết hoặc phải biết về những khiếm khuyết đó",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "2. Trừ trường hợp quy định tại khoản 1 Điều này, trong thời hạn khiếu nại theo quy định của Luật Thương mại 2005, bên bán phải chịu trách nhiệm về bất kỳ khiếm khuyết nào của hàng hoá đã có trước thời điểm chuyển rủi ro cho bên mua, kể cả trường hợp khiếm khuyết đó được phát hiện sau thời điểm chuyển rủi ro",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "3. Bên bán phải chịu trách nhiệm về khiếm khuyết của hàng hóa phát sinh sau thời điểm chuyển rủi ro nếu khiếm khuyết đó do bên bán vi phạm hợp đồng",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "4. Bên mua có trách nhiệm thanh toán và nhận hàng theo đúng thời gian đã thỏa thuận",
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Điều 5. Bảo hành và hướng dẫn sử dụng hàng hóa",
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `1. Bên A có trách nhiệm bảo hành chất lượng và giá trị sử dụng loại hàng ${
                      contractData.warrantyProduct || "......"
                    } cho bên mua trong thời gian là ${
                      contractData.warrantyPeriod || "..........."
                    } tháng`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "2. Bên A phải cung cấp đủ mỗi đơn vị hàng hóa một giấy hướng dẫn sử dụng (nếu cần)",
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Điều 6. Ngưng thanh toán tiền mua hàng",
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Việc ngừng thanh toán tiền mua hàng được quy định như sau:",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "1. Bên B có bằng chứng về việc bên A lừa dối thì có quyền tạm ngừng việc thanh toán",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "2. Bên B có bằng chứng về việc hàng hóa đang là đối tượng bị tranh chấp thì có quyền tạm ngừng thanh toán cho đến khi việc tranh chấp đã được giải quyết",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "3. Bên B có bằng chứng về việc bên A đã giao hàng không phù hợp với hợp đồng thì có quyền tạm ngừng thanh toán cho đến khi bên A đã khắc phục sự không phù hợp đó",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "4. Trường hợp tạm ngừng thanh toán theo quy định tại khoản 2 và khoản 3 Điều này mà bằng chứng do bên B đưa ra không xác thực, gây thiệt hại cho bên A thì bên B phải bồi thường thiệt hại đó và chịu các chế tài khác theo quy định của pháp luật",
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Điều 7. Điều khoản phạt vi phạm hợp đồng",
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `1. Hai bên cam kết thực hiện nghiêm túc các điều khoản đã thỏa thuận trên, không được đơn phương thay đổi hoặc hủy bỏ hợp đồng, bên nào không thực hiện hoặc đơn phương đình chỉ thực hiện hợp đồng mà không có lý do chính đáng thì sẽ bị phạt ${
                      contractData.penaltyPercentage || "..."
                    }% giá trị của hợp đồng bị vi phạm`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "2. Bên nào vi phạm các điều khoản trên đây sẽ phải chịu trách nhiệm vật chất theo quy định của các văn bản pháp luật có hiệu lực hiện hành về phạt vi phạm chất lượng, số lượng, thời gian, địa điểm, thanh toán, bảo hành…mức phạt cụ thể do hai bên thỏa thuận dựa trên khung phạt Nhà nước đã quy định trong các văn bản pháp luật về loại hợp đồng này",
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Điều 8. Bất khả kháng và giải quyết tranh chấp",
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "1. Bất khả kháng nghĩa là các sự kiện xảy ra một cách khách quan, không thể lường trước được và không thể khắc phục được mặc dù đã áp dụng mọi biện pháp cần thiết trong khả năng cho phép, một trong các Bên vẫn không có khả năng thực hiện được nghĩa vụ của mình theo Hợp đồng này; gồm nhưng không giới hạn ở: thiên tai, hỏa hoạn, lũ lụt, chiến tranh, can thiệp của chính quyền bằng vũ trang, cản trở giao thông vận tải và các sự kiện khác tương tự",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "2. Khi xảy ra sự kiện bất khả kháng, bên gặp phải bất khả kháng phải không chậm chễ, thông báo cho bên kia tình trạng thực tế, đề xuất phương án xử lý và nỗ lực giảm thiểu tổn thất, thiệt hại đến mức thấp nhất có thể",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "3. Trừ trường hợp bất khả kháng, hai bên phải thực hiện đầy đủ và đúng thời hạn các nội dung của hợp đồng này. Trong quá trình thực hiện hợp đồng, nếu có vướng mắc từ bất kỳ bên nào, hai bên sẽ cùng nhau giải quyết trên tinh thần hợp tác. Trong trường hợp không tự giải quyết được, hai bên thống nhất đưa ra giải quyết tại Tòa án có thẩm quyền. Phán quyết của tòa án là quyết định cuối cùng, có giá trị ràng buộc các bên. Bên thua phải chịu toàn bộ các chi phí giải quyết tranh chấp",
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Điều 9. Điều khoản chung",
                    bold: true,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "1. Hợp đồng này có hiệu lực từ ngày ký và tự động thanh lý hợp đồng kể từ khi Bên B đã nhận đủ hàng và Bên A đã nhận đủ tiền",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "2. Hợp đồng này có giá trị thay thế mọi giao dịch, thỏa thuận trước đây của hai bên. Mọi sự bổ sung, sửa đổi hợp đồng này đều phải có sự đồng ý bằng văn bản của hai bên",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "3. Trừ các trường hợp được quy định ở trên, hợp đồng này không thể bị hủy bỏ nếu không có thỏa thuận bằng văn bản của các bên. Trong trường hợp hủy hợp đồng, trách nhiệm liên quan tới phạt vi phạm hợp đồng và bồi thường thiệt hại được bảo lưu",
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `4. Hợp đồng này được lập thành ${
                      contractData.contractCopies || "..."
                    } bản, có giá trị như nhau. Mỗi bên giữ ${
                      contractData.contractCopies
                        ? Math.ceil(contractData.contractCopies / 2)
                        : "..."
                    } bản và có giá trị pháp lý như nhau`,
                    size: 24,
                  }),
                ],
                spacing: { after: 300 },
              }),

              // Signature Section
              new Paragraph({
                children: [
                  new TextRun({
                    text: "ĐẠI DIỆN BÊN A",
                    bold: true,
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.LEFT,
                spacing: { before: 400, after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "(Ký, ghi rõ họ tên và đóng dấu)",
                    italics: true,
                    size: 20,
                  }),
                ],
                alignment: AlignmentType.LEFT,
                spacing: { after: 400 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "ĐẠI DIỆN BÊN B",
                    bold: true,
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "(Ký, ghi rõ họ tên và đóng dấu)",
                    italics: true,
                    size: 20,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
                spacing: { after: 400 },
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const fileName = `Hop_dong_${contractData.contractNumber || "moi"}_${
        new Date().toISOString().split("T")[0]
      }.docx`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error generating document:", error);
      // alert("Có lỗi xảy ra khi xuất file. Vui lòng thử lại.");
      message.error("Có lỗi xảy ra khi xuất file. Vui lòng thử lại.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "...tháng...năm...";
    const date = new Date(dateString);
    return `ngày ${date.getDate()} tháng ${
      date.getMonth() + 1
    } năm ${date.getFullYear()}`;
  };

  const calculateTotal = () => {
    return contractData.products.reduce((total, product) => {
      const soLuong = Number.parseFloat(product.soLuong) || 0;
      const donGia = Number.parseFloat(product.donGia) || 0;
      return total + soLuong * donGia;
    }, 0);
  };

  return (
    <div className="gcreatecontract-preview-container" id="contract-prview">
      {/* Header */}
      <div className="gcreatecontract-preview-header">
        <div className="gcreatecontract-preview-header-content">
          <div className="gcreatecontract-header-left">
            <button onClick={onBack} className="gcreatecontract-back-btn">
              <ArrowLeft className="gcreatecontract-icon" />
            </button>
            <div className="gcreatecontract-title-section">
              {/* <div className="gcreatecontract-icon-wrapper">
                <span className="gcreatecontract-doc-icon">📄</span>
              </div> */}
              <div>
                <h1 className="gcreatecontract-main-title">Tạo Hợp Đồng</h1>
                <p className="gcreatecontract-subtitle">
                  Hợp đồng cung cấp sản phẩm nông sản
                </p>
              </div>
            </div>
          </div>
          <div className="gcreatecontract-action-buttons">
            <button onClick={onBack} className="gcreatecontract-edit-btn">
              Chỉnh sửa
            </button>
            <button onClick={handlePrint} className="gcreatecontract-print-btn">
              <Printer className="gcreatecontract-icon" />
              In
            </button>
            <button
              onClick={handleExport}
              className="gcreatecontract-export-btn"
            >
              <Download className="gcreatecontract-icon" />
              Xuất file
            </button>
          </div>
        </div>
      </div>

      {/* Contract Document */}
      <div className="gcreatecontract-document" id="contract-preview">
        {/* Official Header */}
        <div className="gcreatecontract-official-header">
          <div className="gcreatecontract-country-header">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </div>
          <div className="gcreatecontract-motto">
            Độc lập – Tự do – Hạnh phúc
          </div>
          <div className="gcreatecontract-separator">────────────</div>
        </div>

        {/* Contract Title */}
        <div className="gcreatecontract-contract-title">
          <h1>
            HỢP ĐỒNG MUA BÁN HÀNG HÓA<sup>1</sup>
          </h1>
          <p className="gcreatecontract-contract-number">
            Số: {contractData.contractNumber || ".../.../2024/HĐMB"}
          </p>
        </div>

        {/* Legal References */}
        <div className="gcreatecontract-legal-refs">
          <p>- Căn cứ Bộ luật Dân sự 2015;</p>
          <p>
            - Căn cứ Luật Thương mại 2005 (đã được sửa đổi, bổ sung bởi Luật số
            05/2017/QH14 và Luật số 61/2018/QH14);
          </p>
          <p>- Căn cứ nhu cầu và khả năng thực tế của các bên.</p>
        </div>

        {/* Date and Location */}
        <div className="gcreatecontract-date-location">
          <p>
            Hôm nay, {formatDate(contractData.signDate)}, tại địa chỉ
            <sup>2</sup>:{" "}
            {contractData.signLocation ||
              "..................................................."}
          </p>
          <p>Chúng tôi, gồm có:</p>
        </div>

        {/* Party A */}
        <div className="gcreatecontract-party-section">
          <h3 className="gcreatecontract-party-title">BÊN BÁN (Bên A)</h3>
          <div className="gcreatecontract-party-info">
            <p>
              Tên doanh nghiệp:{" "}
              {contractData.sellerCompanyName ||
                "..................................................."}
            </p>
            <p>
              Mã số doanh nghiệp:{" "}
              {contractData.sellerTaxId ||
                "..................................................."}
            </p>
            <p>
              Địa chỉ trụ sở chính:{" "}
              {contractData.sellerAddress ||
                "..................................................."}
            </p>
            <p>
              Người đại diện theo pháp luật<sup>3</sup>:{" "}
              {contractData.sellerLegalRep ||
                "..................................................."}{" "}
              Chức danh
              <sup>4</sup>:{" "}
              {contractData.sellerPosition || "....................."}
            </p>
            <p>
              CMND/CCCD/Hộ chiếu số<sup>5</sup>:{" "}
              {contractData.sellerIdNumber || "........................"} cấp
              ngày{" "}
              {contractData.sellerIdDate
                ? formatDate(contractData.sellerIdDate)
                : "................"}{" "}
              nơi cấp: {contractData.sellerIdPlace || "....................."}
            </p>
            <p>
              Số điện thoại:{" "}
              {contractData.sellerPhone ||
                "..................................................."}{" "}
              Fax:{" "}
              {contractData.sellerFax ||
                "..................................................."}
            </p>
            <p>
              Tài khoản ngân hàng số<sup>6</sup>:{" "}
              {contractData.sellerBankAccount || "........................"} Mở
              tại ngân hàng:{" "}
              {contractData.sellerBank ||
                "..................................................."}
            </p>
          </div>
        </div>

        {/* Party B */}
        <div className="gcreatecontract-party-section">
          <h3 className="gcreatecontract-party-title">BÊN MUA (Bên B)</h3>
          <div className="gcreatecontract-party-info">
            <p>
              Tên doanh nghiệp:{" "}
              {contractData.buyerCompanyName ||
                "..................................................."}
            </p>
            <p>
              Mã số doanh nghiệp:{" "}
              {contractData.buyerTaxId ||
                "..................................................."}
            </p>
            <p>
              Địa chỉ trụ sở chính:{" "}
              {contractData.buyerAddress ||
                "..................................................."}
            </p>
          </div>
        </div>

        {/* Agreement Text */}
        <div className="gcreatecontract-agreement-text">
          <p>
            Trên cơ sở thỏa thuận hoàn toàn tự nguyện, hai bên thống nhất ký kết
            hợp đồng mua bán hàng hóa với các điều khoản như sau:
          </p>
        </div>

        {/* Article 1 */}
        <div className="gcreatecontract-article">
          <h4 className="gcreatecontract-article-title">
            Điều 1. Tên hàng hóa, số lượng, chất lượng, giá trị hợp đồng
          </h4>
          <p className="gcreatecontract-article-subtitle">
            Bên A bán cho Bên B hàng hóa sau đây:
          </p>

          <div className="gcreatecontract-contract-table-wrapper">
            <table className="gcreatecontract-contract-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên hàng hóa</th>
                  <th>Đơn vị</th>
                  <th>Số lượng</th>
                  <th>
                    Đơn giá<sup>13</sup>
                    <br />
                    (VNĐ đồng)
                  </th>
                  <th>
                    Thành tiền<sup>14</sup>
                    <br />
                    (VNĐ đồng)
                  </th>
                  <th>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {contractData.products.map((product, index) => (
                  <tr key={index}>
                    <td className="gcreatecontract-center">{product.stt}</td>
                    <td>{product.tenHangHoa || ""}</td>
                    <td>{product.donVi || ""}</td>
                    <td className="gcreatecontract-center">
                      {product.soLuong || ""}
                    </td>
                    <td className="gcreatecontract-right">
                      {product.donGia
                        ? Number.parseFloat(product.donGia).toLocaleString(
                            "vi-VN"
                          )
                        : ""}
                    </td>
                    <td className="gcreatecontract-right">
                      {(
                        (Number.parseFloat(product.soLuong) || 0) *
                        (Number.parseFloat(product.donGia) || 0)
                      ).toLocaleString("vi-VN")}
                    </td>
                    <td>{product.ghiChu || ""}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="7" className="gcreatecontract-dots">
                    ...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="gcreatecontract-total-section-preview">
            <div className="gcreatecontract-total-line">
              <strong>
                Tổng cộng<sup>15</sup>:{" "}
                {calculateTotal().toLocaleString("vi-VN")} VNĐ
              </strong>
            </div>
            <div className="gcreatecontract-total-line">
              <strong>
                Bằng chữ<sup>16</sup>:{" "}
                {calculateTotal() === 0
                  ? "0 đồng"
                  : "..................................................."}
              </strong>
            </div>
          </div>
        </div>

        {/* Article 2 */}
        <div className="gcreatecontract-article">
          <h4 className="gcreatecontract-article-title">Điều 2. Thanh toán</h4>
          <p>
            1. Bên B phải thanh toán cho Bên A số tiền ghi tại Điều 1 của Hợp
            đồng này vào{" "}
            {contractData.paymentDate
              ? formatDate(contractData.paymentDate)
              : "ngày...tháng...năm..."}
          </p>
          <p>
            2. Bên B thanh toán cho Bên A theo hình thức{" "}
            {contractData.paymentMethod ||
              "[Điền hình thức thanh toán, ví dụ tiền mặt, chuyển khoản.]"}
          </p>
        </div>

        {/* Article 3 */}
        <div className="gcreatecontract-article">
          <h4 className="gcreatecontract-article-title">
            Điều 3. Thời gian, địa điểm, phương thức giao hàng
          </h4>
          <p>1. Bên A giao hàng cho bên B theo lịch sau:</p>

          <div className="gcreatecontract-contract-table-wrapper">
            <table className="gcreatecontract-contract-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên hàng hóa</th>
                  <th>Đơn vị</th>
                  <th>Số lượng</th>
                  <th>Thời gian giao hàng</th>
                  <th>Địa điểm giao hàng</th>
                  <th>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {contractData.deliverySchedule.map((item, index) => (
                  <tr key={index}>
                    <td className="gcreatecontract-center">{item.stt}</td>
                    <td>{item.tenHangHoa || ""}</td>
                    <td>{item.donVi || ""}</td>
                    <td className="gcreatecontract-center">
                      {item.soLuong || ""}
                    </td>
                    <td>
                      {item.thoiGianGiao ? formatDate(item.thoiGianGiao) : ""}
                    </td>
                    <td>{item.diaDiemGiao || ""}</td>
                    <td>{item.ghiChu || ""}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="7" className="gcreatecontract-dots">
                    ...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            2. Phương tiện vận chuyển và chi phí vận chuyển do bên{" "}
            {contractData.transportResponsibility || "......"} chịu. Chi phí bốc
            xếp (
            {contractData.loadingUnloadingCost ||
              "mỗi bên chịu một đầu hoặc........"}
            ).
          </p>
          <p>
            3. Quy định lịch giao nhận hàng hóa mà bên mua không đến nhận hàng
            thì phải chịu chi phí lưu kho bãi là{" "}
            {contractData.storageCostPerDay || "..."} đồng/ngày. Nếu phương tiện
            vận chuyển bên mua đến mà bên bán không có hàng giao thì bên bán
            phải chịu chi phí thực tế cho việc điều động phương tiện.
          </p>
          <p>
            4. Khi nhận hàng, bên mua có trách nhiệm kiểm nhận phẩm chất, quy
            cách hàng hóa tại chỗ. Nếu phát hiện hàng thiếu hoặc không đúng tiêu
            chuẩn chất lượng… thì lập biên bản tại chỗ, yêu cầu bên bán xác
            nhận. Hàng đã ra khỏi kho bên bán không chịu trách nhiệm (trừ loại
            hàng có quy định thời hạn bảo hành).
          </p>
          <p>
            5. Trường hợp giao nhận hàng theo nguyên đai, nguyên kiện, nếu bên
            mua sau khi chở về nhập kho mới phát hiện có vi phạm thì phải lập
            biên bản gọi cơ quan kiểm tra trung gian (…………………….) đến xác nhận và
            phải gửi đến bên bán trong hạn …ngày tính từ khi lập biên bản. Sau …
            ngày nếu bên bán đã nhận được biên bản mà không có ý kiến gì thì coi
            như đã chịu trách nhiệm bồi thường lô hàng đó.
          </p>
          <p>
            6. Mỗi lô hàng khi giao nhận phải có xác nhận chất lượng bằng phiếu
            hoặc biên bản kiểm nghiệm; khi đến nhận hàng, người nhận phải có đủ:
            Giấy giới thiệu của cơ quan bên mua; Phiếu xuất kho của cơ quan bên
            bán; Giấy chứng minh nhân dân hoặc Căn cước công dân.
          </p>
        </div>

        {/* Article 4 */}
        <div className="gcreatecontract-article">
          <h4 className="gcreatecontract-article-title">
            Điều 4. Trách nhiệm của các bên
          </h4>
          <p>
            1. Bên bán không chịu trách nhiệm về bất kỳ khiếm khuyết nào của
            hàng hoá nếu vào thời điểm giao kết hợp đồng bên mua đã biết hoặc
            phải biết về những khiếm khuyết đó.
          </p>
          <p>
            2. Trừ trường hợp quy định tại khoản 1 Điều này, trong thời hạn
            khiếu nại theo quy định của Luật Thương mại 2005, bên bán phải chịu
            trách nhiệm về bất kỳ khiếm khuyết nào của hàng hoá đã có trước thời
            điểm chuyển rủi ro cho bên mua, kể cả trường hợp khiếm khuyết đó
            được phát hiện sau thời điểm chuyển rủi ro.
          </p>
          <p>
            3. Bên bán phải chịu trách nhiệm về khiếm khuyết của hàng hóa phát
            sinh sau thời điểm chuyển rủi ro nếu khiếm khuyết đó do bên bán vi
            phạm hợp đồng.
          </p>
          <p>
            4. Bên mua có trách nhiệm thanh toán và nhận hàng theo đúng thời
            gian đã thỏa thuận.
          </p>
        </div>

        {/* Article 5 */}
        <div className="gcreatecontract-article">
          <h4 className="gcreatecontract-article-title">
            Điều 5. Bảo hành và hướng dẫn sử dụng hàng hóa
          </h4>
          <p>
            1. Bên A có trách nhiệm bảo hành chất lượng và giá trị sử dụng loại
            hàng {contractData.warrantyProduct || "......"} cho bên mua trong
            thời gian là {contractData.warrantyPeriod || "..........."} tháng.
          </p>
          <p>
            2. Bên A phải cung cấp đủ mỗi đơn vị hàng hóa một giấy hướng dẫn sử
            dụng (nếu cần).
          </p>
        </div>

        {/* Article 6 */}
        <div className="gcreatecontract-article">
          <h4 className="gcreatecontract-article-title">
            Điều 6. Ngưng thanh toán tiền mua hàng
          </h4>
          <p>Việc ngừng thanh toán tiền mua hàng được quy định như sau:</p>
          <p>
            1. Bên B có bằng chứng về việc bên A lừa dối thì có quyền tạm ngừng
            việc thanh toán.
          </p>
          <p>
            2. Bên B có bằng chứng về việc hàng hóa đang là đối tượng bị tranh
            chấp thì có quyền tạm ngừng thanh toán cho đến khi việc tranh chấp
            đã được giải quyết.
          </p>
          <p>
            3. Bên B có bằng chứng về việc bên A đã giao hàng không phù hợp với
            hợp đồng thì có quyền tạm ngừng thanh toán cho đến khi bên A đã khắc
            phục sự không phù hợp đó.
          </p>
          <p>
            4. Trường hợp tạm ngừng thanh toán theo quy định tại khoản 2 và
            khoản 3 Điều này mà bằng chứng do bên B đưa ra không xác thực, gây
            thiệt hại cho bên A thì bên B phải bồi thường thiệt hại đó và chịu
            các chế tài khác theo quy định của pháp luật.
          </p>
        </div>

        {/* Article 7 */}
        <div className="gcreatecontract-article">
          <h4 className="gcreatecontract-article-title">
            Điều 7. Điều khoản phạt vi phạm hợp đồng
          </h4>
          <p>
            1. Hai bên cam kết thực hiện nghiêm túc các điều khoản đã thỏa thuận
            trên, không được đơn phương thay đổi hoặc hủy bỏ hợp đồng, bên nào
            không thực hiện hoặc đơn phương đình chỉ thực hiện hợp đồng mà không
            có lý do chính đáng thì sẽ bị phạt{" "}
            {contractData.penaltyPercentage || "..."}% giá trị của hợp đồng bị
            vi phạm.
          </p>
          <p>
            2. Bên nào vi phạm các điều khoản trên đây sẽ phải chịu trách nhiệm
            vật chất theo quy định của các văn bản pháp luật có hiệu lực hiện
            hành về phạt vi phạm chất lượng, số lượng, thời gian, địa điểm,
            thanh toán, bảo hành…mức phạt cụ thể do hai bên thỏa thuận dựa trên
            khung phạt Nhà nước đã quy định trong các văn bản pháp luật về loại
            hợp đồng này.
          </p>
        </div>

        {/* Article 8 */}
        <div className="gcreatecontract-article">
          <h4 className="gcreatecontract-article-title">
            Điều 8. Bất khả kháng và giải quyết tranh chấp
          </h4>
          <p>
            1. Bất khả kháng nghĩa là các sự kiện xảy ra một cách khách quan,
            không thể lường trước được và không thể khắc phục được mặc dù đã áp
            dụng mọi biện pháp cần thiết trong khả năng cho phép, một trong các
            Bên vẫn không có khả năng thực hiện được nghĩa vụ của mình theo Hợp
            đồng này; gồm nhưng không giới hạn ở: thiên tai, hỏa hoạn, lũ lụt,
            chiến tranh, can thiệp của chính quyền bằng vũ trang, cản trở giao
            thông vận tải và các sự kiện khác tương tự.
          </p>
          <p>
            2. Khi xảy ra sự kiện bất khả kháng, bên gặp phải bất khả kháng phải
            không chậm chễ, thông báo cho bên kia tình trạng thực tế, đề xuất
            phương án xử lý và nỗ lực giảm thiểu tổn thất, thiệt hại đến mức
            thấp nhất có thể.
          </p>
          <p>
            3. Trừ trường hợp bất khả kháng, hai bên phải thực hiện đầy đủ và
            đúng thời hạn các nội dung của hợp đồng này. Trong quá trình thực
            hiện hợp đồng, nếu có vướng mắc từ bất kỳ bên nào, hai bên sẽ cùng
            nhau giải quyết trên tinh thần hợp tác. Trong trường hợp không tự
            giải quyết được, hai bên thống nhất đưa ra giải quyết tại Tòa án có
            thẩm quyền. Phán quyết của tòa án là quyết định cuối cùng, có giá
            trị ràng buộc các bên. Bên thua phải chịu toàn bộ các chi phí giải
            quyết tranh chấp.
          </p>
        </div>

        {/* Article 9 */}
        <div className="gcreatecontract-article">
          <h4 className="gcreatecontract-article-title">
            Điều 9. Điều khoản chung
          </h4>
          <p>
            1. Hợp đồng này có hiệu lực từ ngày ký và tự động thanh lý hợp đồng
            kể từ khi Bên B đã nhận đủ hàng và Bên A đã nhận đủ tiền.
          </p>
          <p>
            2. Hợp đồng này có giá trị thay thế mọi giao dịch, thỏa thuận trước
            đây của hai bên. Mọi sự bổ sung, sửa đổi hợp đồng này đều phải có sự
            đồng ý bằng văn bản của hai bên.
          </p>
          <p>
            3. Trừ các trường hợp được quy định ở trên, hợp đồng này không thể
            bị hủy bỏ nếu không có thỏa thuận bằng văn bản của các bên. Trong
            trường hợp hủy hợp đồng, trách nhiệm liên quan tới phạt vi phạm hợp
            đồng và bồi thường thiệt hại được bảo lưu.
          </p>
          <p>
            4. Hợp đồng này được lập thành{" "}
            {contractData.contractCopies || "..."} bản, có giá trị như nhau. Mỗi
            bên giữ{" "}
            {contractData.contractCopies
              ? Math.ceil(contractData.contractCopies / 2)
              : "..."}{" "}
            bản và có giá trị pháp lý như nhau.
          </p>
        </div>

        {/* Signature Section */}
        <div className="gcreatecontract-signature-section">
          <div className="gcreatecontract-signature-party">
            <h4>ĐẠI DIỆN BÊN A</h4>
            <p className="gcreatecontract-signature-note">
              (Ký, ghi rõ họ tên và đóng dấu)
            </p>
            <div className="gcreatecontract-signature-space"></div>
          </div>
          <div className="gcreatecontract-signature-party">
            <h4>ĐẠI DIỆN BÊN B</h4>
            <p className="gcreatecontract-signature-note">
              (Ký, ghi rõ họ tên và đóng dấu)
            </p>
            <div className="gcreatecontract-signature-space"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
