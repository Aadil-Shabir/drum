import React from "react";
import { Typography, Row, Col } from "antd";

interface DetailListProps {
    list: { name: string; value: string }[];
    recommendations?: boolean;
}

const DetailList: React.FC<DetailListProps> = ({ list, recommendations }) => {
    return (
        <div>
            {recommendations && (
                <Row style={{ background: "grey" }}>
                    <Col span={12}>
                        <div style={{ padding: "0.25rem", margin: "0.25rem" }}>
                            <Typography.Title style={{ margin: 0, color: "white", fontWeight: "bold" }} level={4}>
                                improvement
                            </Typography.Title>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ padding: "0.25rem", margin: "0.25rem" }}>
                            <Typography.Title style={{ margin: 0, color: "white" }} level={4}>
                                indicative cost
                            </Typography.Title>
                        </div>
                    </Col>
                </Row>
            )}
            {list.map((item, index) => (
                <Row key={index} style={{ background: index % 2 === 1 ? "#F5F5F5" : "" }}>
                    <Col span={12}>
                        <div style={{ padding: "0.25rem", margin: "0.25rem" }}>
                            <Typography.Title style={{ margin: 0, color: "grey", fontWeight: "bold" }} level={5}>
                                {item.name}
                            </Typography.Title>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ padding: "0.25rem", margin: "0.25rem" }}>
                            <Typography.Title style={{ margin: 0 }} level={5}>
                                {item.value}
                            </Typography.Title>
                        </div>
                    </Col>
                </Row>
            ))}
        </div>
    );
};

export default DetailList;
