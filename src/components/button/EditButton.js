import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "antd";

const EditButton = ({ icon, color = "#FFD700", onClick, tooltip }) => {
    const iconStyle = {
        fontSize: "16px",
        color,
        cursor: "pointer",
        transition: "transform 0.3s",
    };

    const iconElement = (
        <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={onClick}
            style={iconStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
    );

    return tooltip ? <Tooltip title={tooltip}>{iconElement}</Tooltip> : iconElement;
};

export default EditButton;