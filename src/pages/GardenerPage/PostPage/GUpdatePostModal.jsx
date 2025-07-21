import React from "react";
import { useState, useEffect } from "react";
import "./GUpdatePostModal.css";

function GUpdatePostModal({ post, isOpen, onClose, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate({ ...post, title, content });
    onClose();
  };

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
