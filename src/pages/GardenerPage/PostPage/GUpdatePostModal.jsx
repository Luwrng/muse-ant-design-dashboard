import React from "react";
import { useState, useEffect } from "react";
import "./GUpdatePostModal.css";

function GUpdatePostModal({ post, isOpen, onClose, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [harvestStatus, setHarvestStatus] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setHarvestStatus(post.harvestStatus || "");
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate({ ...post, title, content, harvestStatus });
    onClose();
  };

  const harvestStatusList = [
    { status: "PREORDEROPEN", display: "Mỏ đặt cọc" },
    { status: "PLANTING", display: "Đang trồng" },
    { status: "HARVESTING", display: "Thu hoạch" },
    { status: "PROCESSING", display: "Đóng gói" },
    { status: "READYFORSALE", display: "Có hàng" },
  ];

  if (!isOpen) return null;

  return (
    <div className="gpupdate-overlay" onClick={onClose}>
      <div className="gpupdate-popup" onClick={(e) => e.stopPropagation()}>
        <div className="gpupdate-header">
          <h2 className="gpupdate-title">Chỉnh sửa bài viết</h2>
          <button className="gpupdate-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="gpupdate-form">
          <div className="gpupdate-field">
            <label className="gpupdate-label">Tiêu đề</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="gpupdate-input"
              placeholder="Nhập tiêu đề bài viết"
              required
            />
          </div>

          <div className="gpupdate-field">
            <label className="gpupdate-label">Nội dung</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="gpupdate-textarea"
              placeholder="Nhập nội dung bài viết"
              rows={6}
              required
            />
          </div>

          <div className="gpupdate-field">
            <label className="gpupdate-label">Tiêu đề</label>
            <select
              onChange={(e) => setHarvestStatus(e.target.value)}
              className="gpupdate-input"
              value={harvestStatus}
            >
              <option value="">-- Chọn trạng thái mùa vụ --</option>
              {Array.isArray(harvestStatusList) &&
                harvestStatusList.map((hs) => (
                  <option key={hs.status} value={hs.status}>
                    {hs.label}
                  </option>
                ))}
            </select>
          </div>

          <div className="gpupdate-actions">
            <button
              type="button"
              className="gpupdate-btn gpupdate-btn-cancel"
              onClick={onClose}
            >
              Hủy
            </button>
            <button type="submit" className="gpupdate-btn gpupdate-btn-save">
              Sửa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GUpdatePostModal;
