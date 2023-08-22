import React from "react";
import { Typography } from "antd";

interface TitleProps {
    children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
    return (
        <div style={{ background: "#D3D3D3", padding: "0.5rem", margin: "0.5rem 0rem" }}>
            <Typography.Title style={{ margin: 0, fontWeight: "bold" }} level={4}>
                {children}
            </Typography.Title>
        </div>
    );
};

export default Title;
