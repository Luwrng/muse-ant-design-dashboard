import React from "react";
import { useState, useEffect } from "react";
import "./GUpdatePostModal.css";

function GUpdatePostModal({ post, isOpen, onClose, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [harvestStatus, setHarvestStatus] = useState("");
  const [harvestDate, setHarvestDate] = useState(new Date());
  const [postEndDate, setPostEndDate] = useState(new Date());

  useEffect(() => {
    if (post && isOpen) {
      // console.log(post);
      setTitle(post.title || "");
      setContent(post.content || "");
      setHarvestStatus(post.harvestStatus || "");
      setHarvestDate(post.harvestDate || new Date());
      setPostEndDate(post.postEndDate || new Date());
    }
  }, [post, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate({
      ...post,
      title,
      content,
      harvestStatus,
      harvestDate,
      postEndDate,
    });
    onClose();
  };

  const harvestStatusList = [
    { status: "PREORDEROPEN", label: "Mở đặt cọc", order: 1 },
    { status: "PLANTING", label: "Đang trồng", order: 2 },
    { status: "HARVESTING", label: "Thu hoạch", order: 4 },
    { status: "PROCESSING", label: "Đóng gói", order: 5 },
    { status: "READYFORSALE", label: "Có hàng", order: 6 },
    { status: "HARVESTFAILED", label: "Mất mùa", order: 3 },
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
            <label className="gpupdate-label">Trạng thái mùa vụ</label>
            <select
              onChange={(e) => setHarvestStatus(e.target.value)}
              className="gpupdate-input"
              value={harvestStatus}
            >
              <option value="">-- Chọn trạng thái mùa vụ --</option>
              {Array.isArray(harvestStatusList) &&
                harvestStatusList
                  .filter((hs) => {
                    const current = harvestStatusList.find(
                      (s) => s.status === post.harvestStatus
                    );
                    if (!current) return true;

                    // Always allow current status so it shows in the UI
                    if (hs.status === current.status) return true;

                    // Allow only higher order OR HARVESTFAILED
                    return (
                      hs.order > current.order || hs.status === "HARVESTFAILED"
                    );
                  })
                  .map((hs) => (
                    <option
                      key={hs.status}
                      value={hs.status}
                      disabled={hs.status === harvestStatus}
                    >
                      {hs.label}
                    </option>
                  ))}
            </select>
          </div>

          {["PREORDEROPEN", "PLANTING", "HARVESTING"].includes(
            harvestStatus
          ) && (
            <div className="gpupdate-field">
              <label className="gpupdate-label">
                Ngày bắt đầu thu hoạch (Dự kiến)
              </label>
              <input
                type="date"
                value={new Date(harvestDate).toISOString().split("T")[0]}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="gpupdate-input"
                min={new Date().toISOString().split("T")[0]}
                max={postEndDate || undefined}
                required
              />
            </div>
          )}

          {harvestStatus !== "HARVESTFAILED" && (
            <div className="gpupdate-field">
              <label className="gpupdate-label">
                Ngày kết thúc bài đăng (Dự kiến) *
              </label>
              <input
                type="date"
                value={new Date(postEndDate).toISOString().split("T")[0]}
                onChange={(e) => setPostEndDate(e.target.value)}
                className="gpupdate-input"
                min={harvestDate || new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          )}

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
