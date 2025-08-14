import React from "react";
import ReactDOM from "react-dom/client"; // 👈 dùng từ 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container); // 👈 tạo root mới

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
