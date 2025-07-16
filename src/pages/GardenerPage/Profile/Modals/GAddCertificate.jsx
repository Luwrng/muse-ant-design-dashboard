import React, { useEffect } from "react";
import certificateService from "../../../services/apiServices/certificateService";
import { useState } from "react";
import axios from "axios";
import "./GAddCertificate.css";

function GAddCertificate({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    issuingAuthority: "",
    issueDate: "",
    expiryDate: "",
    imageUrl: "",
    status: "ACTIVE"
  });

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onAdd(formData);
  // };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const chosenFile = e.target.files[0];
    if(!chosenFile) return;

    setFile(chosenFile);
    // const objectUrl = URL.createObjectURL(chosenFile);
    // setPreviewUrl(objectUrl);
  }

//   // Cleanup object URLs
// useEffect(() => {
//   return () => {
//     if (previewUrl) URL.revokeObjectURL(previewUrl);
//   };
// }, [previewUrl]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCreateSubmit = async (e) => {
    try {
       e.preventDefault();
      const fileData = new FormData();
      fileData.append('file', file); // This will work
      fileData.append('upload_preset', 'clean_food_viet');
      
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dhin0zlf7/image/upload",
        fileData
      );
      
      const updatedFormData = formData;
      updatedFormData.imageUrl = res.data.url;
      console.log(updatedFormData.status)

      const gardenerId = localStorage.getItem("account_id");
      await certificateService.createCertificate(gardenerId, updatedFormData);

      console.log(updatedFormData.status)
      onAdd(formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="gaddcertificate-popup-overlay" onClick={handleOverlayClick}>
      <div className="gaddcertificate-popup-container">
        <div className="gaddcertificate-popup-header">
          <button className="gaddcertificate-back-btn" onClick={onClose}>
            ←
          </button>
          <h2>Thêm chứng chỉ</h2>
        </div>

        <form onSubmit={handleCreateSubmit} className="gaddcertificate-popup-form">
          <div className="gaddcertificate-form-group">
            <label htmlFor="name">Tên chứng chỉ</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gaddcertificate-form-group">
            <label htmlFor="issuingAuthority">Cấp bởi</label>
            <input
              type="text"
              id="issuingAuthority"
              name="issuingAuthority"
              value={formData.issuingAuthority}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gaddcertificate-form-group">
            <label htmlFor="issueDate">Ngày cấp</label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gaddcertificate-form-group">
            <label htmlFor="expiryDate">Ngày hết hạn</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="gaddcertificate-form-group">
            <label htmlFor="status">Trạng thái</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="ACTIVE">Active</option>
              <option value="EXPIRED">Expired</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>

          <div className="gaddcertificate-form-group">
            <label htmlFor="imageUrl">Hình ảnh</label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {/* {previewUrl && <img src={previewUrl} alt="Preview" style={{width: "100%"}}/> } */}
          </div>

          <div className="gaddcertificate-popup-actions">
            <button type="submit" className="gaddcertificate-btn-primary">
              Thêm
            </button>
            <button
              type="button"
              className="gaddcertificate-btn-secondary"
              onClick={handleCreateSubmit}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GAddCertificate;
