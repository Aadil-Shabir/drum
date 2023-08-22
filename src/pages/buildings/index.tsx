import React, { useEffect, useState } from "react";
import { Typography, Row, Col } from "antd";
import BuildingsList from "./BuildingsList";
import Filters from "./Filters";

interface Data {
    rows: any;
}

const Buildings: React.FC = () => {
    const [data, setData] = useState<Data>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div style={{ margin: "1rem" }}>
            <Typography.Title style={{ margin: 0, fontWeight: "bold" }} level={3}>
                Energy Performance of Buildings Data
            </Typography.Title>
            <Typography.Title style={{ margin: 0, fontWeight: "bold" }} level={3}>
                England and Wales
            </Typography.Title>
            <Row gutter={[8, 16]}>
                <Col span={18}>
                    <BuildingsList data={data} setData={setData} isLoading={isLoading} setIsLoading={setIsLoading} />
                </Col>
                <Col span={6}>
                    <Filters data={data} setData={setData} isLoading={isLoading} setIsLoading={setIsLoading} />
                </Col>
            </Row>
        </div>
    );
};

export default Buildings;
