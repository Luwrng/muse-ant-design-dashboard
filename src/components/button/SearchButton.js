import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const SearchButton = ({ placeholder = "Tìm kiếm...", value, onChange, width = 200, borderRadius = 10,
    border = "1px solid #d9d9d9", }) => {
    return (
        <Input
            placeholder={placeholder}
            prefix={<SearchOutlined />}
            value={value}
            onChange={onChange}
            style={{ width, borderRadius, border }}
            allowClear
            size="small"


        />
    );
};

export default SearchButton;
