import React from "react";
import "./Paginate.css";

function Paginate({ currentPage, totalPages, totalResults, onPageChange }) {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Add first page and leading dots
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`component-page-btn ${currentPage === 1 ? "active" : ""}`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-dots" className="component-page-dots">
            ...
          </span>
        );
      }
    }

    // Main range of buttons
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`component-page-btn ${currentPage === i ? "active" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Add trailing dots and last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-dots" className="component-page-dots">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          className={`component-page-btn ${
            currentPage === totalPages ? "active" : ""
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="component-pagination">
      <div className="component-pagination-info">
        Hiển thị từ {(currentPage - 1) * 10 + 1} đến{" "}
        {Math.min(currentPage * 10, totalResults)} trong tổng số {totalResults}{" "}
        kết quả
      </div>

      <div className="component-pagination-controls">
        <button
          className="component-page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {renderPageNumbers()}

        <button
          className="component-page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Paginate;
