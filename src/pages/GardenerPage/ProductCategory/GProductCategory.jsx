import React from "react";
import { useState } from "react";
import { EyeFilled, DeleteFilled } from "@ant-design/icons";
import { FaPenToSquare } from "react-icons/fa6";
import "./GProductCategory.css";

function GProductCategory() {
  const [categories] = useState([
    {
      id: 1,
      name: "Rau lá xanh",
      description:
        "Các loại rau lá xanh tươi ngon như cải bó xôi, cải ngọt, rau muống",
    },
    {
      id: 2,
      name: "Củ quả",
      description: "Củ cải, khoai tây, cà rốt và các loại củ quả khác",
    },
    {
      id: 3,
      name: "Quả mọng",
      description: "Cà chua, dưa chuột, ớt và các loại quả mọng",
    },
    {
      id: 4,
      name: "Thảo mộc",
      description: "Húng quế, ngò, tía tô và các loại thảo mộc gia vị",
    },
    {
      id: 5,
      name: "Rau gia vị",
      description: "Hành, tỏi, gừng và các loại rau gia vị khác",
    },
    {
      id: 6,
      name: "Rau quả",
      description: "Bí đỏ, bí ngô, mướp và các loại rau quả",
    },
    {
      id: 7,
      name: "Rau quả",
      description: "Bí đỏ, bí ngô, mướp và các loại rau quả",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalResults = categories.length;

  const handleView = (id) => {
    console.log("View category:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete category:", id);
  };

  const handleCreateCategory = () => {
    console.log("Create new category");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="gpcategory-category-management">
      <div className="gpcategory-header">
        <div className="gpcategory-header-content">
          <h1 className="gpcategory-title">Quản lý Danh mục Sản phẩm</h1>
          <p className="gpcategory-subtitle">
            Quản lý các danh mục sản phẩm cho vườn rau của bạn
          </p>
        </div>
        <button
          className="gpcategory-create-btn"
          onClick={handleCreateCategory}
        >
          <span className="gpcategory-plus-icon">+</span>
          Tạo danh mục
        </button>
      </div>

      <div className="gpcategory-table-container">
        <table className="gpcategory-category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TÊN DANH MỤC</th>
              <th>MÔ TẢ</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td className="gpcategory-category-name">{category.name}</td>
                <td className="gpcategory-category-description">
                  {category.description}
                </td>
                <td className="gpcategory-actions">
                  <button
                    className="gpcategory-action-btn gpcategory-view-btn"
                    onClick={() => handleView(category.id)}
                    title="Xem chi tiết"
                  >
                    <EyeFilled />
                  </button>
                  <button
                    className="gpcategory-action-btn gpcategory-edit-btn"
                    onClick={() => handleView(category.id)}
                    title="Chỉnh sửa"
                  >
                    <FaPenToSquare />
                  </button>
                  <button
                    className="gpcategory-action-btn gpcategory-delete-btn"
                    onClick={() => handleDelete(category.id)}
                    title="Xóa danh mục"
                  >
                    <DeleteFilled />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="gpcategory-pagination">
        <div className="gpcategory-pagination-info">
          Hiển thị từ 1 đến {totalResults} trong tổng số {totalResults} kết quả
        </div>
        <div className="gpcategory-pagination-controls">
          <button
            className="gpcategory-page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`gpcategory-page-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <span className="gpcategory-page-dots">...</span>
          {[8, 9, 10].map((page) => (
            <button
              key={page}
              className="gpcategory-page-btn"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="gpcategory-page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default GProductCategory;
