import React, { useState } from "react";
import axios from "axios";

const CloudinaryUpload = ({ onUploaded }) => {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "clean_food_viet"); // ✅ đúng preset unsigned

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

    return (
        <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 8 }}>Chọn ảnh đại diện:</label>
            <input type="file" accept="image/*" onChange={handleUpload} />
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
