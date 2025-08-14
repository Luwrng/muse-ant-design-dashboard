import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const DetailButton = ({ icon, color = "#1890ff", onClick, tooltip, record, showModal }) => {
    const iconStyle = {
        fontSize: "16px",
        color,
        cursor: "pointer",
        transition: "transform 0.3s",
    };


    const iconElement = (
        <FontAwesomeIcon
            icon={faEye}
            onClick={() => {
                if (typeof onClick === "function") {
                    onClick(record);
                }
                if (typeof showModal === "function") {
                    showModal(record);
                }
            }}
            style={iconStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
    );

    return tooltip ? <Tooltip title={tooltip}>{iconElement}</Tooltip> : iconElement;
};

export default DetailButton;