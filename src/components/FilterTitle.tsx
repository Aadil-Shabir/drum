import { Typography } from "antd";
import React from "react";

interface FilterTitleProps {
    children: React.ReactNode;
}

const FilterTitle: React.FC<FilterTitleProps> = ({ children }) => {
    return (
        <div style={{ background: "#D3D3D3", display: "flex", padding: "0.5rem 1rem", margin: "0.5rem 0rem" }}>
            <Typography.Title style={{ margin: 0, color: "grey" }} level={5}>
                {children}
            </Typography.Title>
        </div>
    );
};

export default FilterTitle;
