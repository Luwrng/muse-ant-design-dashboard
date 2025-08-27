import React, { useState } from "react";
import axios from "axios";

function Test() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "clean_food_viet"); // from Cloudinary dashboard

    setUploading(true);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dhin0zlf7/raw/upload",
        formData
      );
      setUrl(res.data.secure_url);
      console.log(res.data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept=".doc,.docx" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {url && (
        <p>
          File uploaded:{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </p>
      )}
    </div>
  );
}

export default Test;
