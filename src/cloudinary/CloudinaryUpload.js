import React, { useRef, useState } from "react";
import axios from "axios";

const CloudinaryUpload = ({ onUploaded }) => {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const fileInputRef = useRef(null); // để trigger input ẩn

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "clean_food_viet");

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dhin0zlf7/image/upload",
                formData
            );

            const url = res.data.secure_url;
            setImageUrl(url);
            if (onUploaded) onUploaded(url);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload ảnh thất bại. Vui lòng kiểm tra lại preset hoặc kết nối mạng.");
        } finally {
            setUploading(false);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click(); // khi click vào khu vực thì gọi input file
    };

    return (
        <div style={{ marginBottom: 16 }}>
            {/* Upload Area thay thế */}
            <div className="siup-upload-area" onClick={handleClick} style={{ cursor: "pointer" }}>
                <div className="siup-upload-icon">📁</div>
                <p className="siup-upload-text">
                    + Thêm ảnh ảnh của bạn ở đây
                </p>
            </div>

            {/* Ẩn input file */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUpload}
                style={{ display: "none" }}
            />

            {/* Đang tải + preview ảnh */}
            {uploading && <p>Đang tải ảnh lên...</p>}
            {imageUrl && (
                <div style={{ marginTop: 8 }}>
                    <img src={imageUrl} alt="Uploaded" width={100} />
                    <p style={{ wordBreak: "break-word", fontSize: 12 }}>{imageUrl}</p>
                </div>
            )}
        </div>
    );
};

export default CloudinaryUpload;
