import React from "react";
import { Button, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import BuildingDetails from "./BuildingDetails";

const BuildingDetail: React.FC = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
            <Typography.Title style={{ margin: 0, fontWeight: "bold" }} level={3}>
                Energy Performance of Buildings Data
            </Typography.Title>
            <Typography.Title style={{ margin: 0, fontWeight: "bold" }} level={3}>
                England and Wales
            </Typography.Title>
            <Button size="large" icon={<LeftOutlined />} style={{ width: "10%", margin: "1rem 0rem" }} type="link">
                <Link to="/buildings">back to your search results</Link>
            </Button>

            <BuildingDetails />
        </div>
    );
};

export default BuildingDetail;
