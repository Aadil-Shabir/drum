import { Space, Typography } from "antd";
import React from "react";

const labels = [
    { text1: "(92+)", text2: "A", Width: "20%", color: "#008054" },
    { text1: "(81-91)", text2: "B", Width: "26%", color: "#19b459" },
    { text1: "(69-80)", text2: "C", Width: "32%", color: "#8dce46" },
    { text1: "(55-68)", text2: "D", Width: "38%", color: "#ffd500" },
    { text1: "(39-54)", text2: "E", Width: "44%", color: "#fcaa65" },
    { text1: "(21-38)", text2: "F", Width: "50%", color: "#ef8023" },
    { text1: "(1-20)", text2: "G", Width: "56%", color: "#e9153b" },
];

interface DomesticEPCProps {
    building: any;
}

const DomesticEPC: React.FC<DomesticEPCProps> = ({ building }) => {
    return (
        <div style={{ display: "flex", width: "450px" }}>
            <div style={{ border: "1px solid black", width: "100%" }}>
                <div
                    style={{
                        borderBottom: "1px solid black",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.2rem 1rem",
                    }}
                >
                    <Typography.Text>Energy Rating</Typography.Text>
                    <Space size="large">
                        <Typography.Text>C=Current</Typography.Text>
                        <Typography.Text>P=Potential</Typography.Text>
                    </Space>
                </div>
                <div style={{ padding: "0.2rem 0.5rem" }}>
                    <Typography.Text style={{ color: "gray" }}>
                        very energy efficient - lower running costs
                    </Typography.Text>

                    <div style={{ display: "flex", flexDirection: "column", padding: "0.2rem 0rem" }}>
                        {labels.map((label, index) => (
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        width: label.Width,
                                        background: label.color,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "0.2rem 0.5rem",
                                    }}
                                >
                                    <Typography.Text style={{ fontWeight: "bold" }}>{label.text1}</Typography.Text>
                                    <Typography.Title style={{ margin: 0, color: "white" }} level={5}>
                                        {label.text2}
                                    </Typography.Title>
                                </div>
                                {building && building["current-energy-rating"] === label.text2 && (
                                    <div
                                        style={{
                                            display: "flex",
                                            background: label.color,
                                            padding: "0.2rem 1rem",
                                        }}
                                    >
                                        <Typography.Title style={{ margin: 0, color: "white" }} level={5}>
                                            {`${building["current-energy-efficiency"]} (C)`}
                                        </Typography.Title>
                                    </div>
                                )}
                                {building && building["potential-energy-rating"] === label.text2 && (
                                    <div
                                        style={{
                                            display: "flex",
                                            background: label.color,
                                            padding: "0.2rem 1rem",
                                        }}
                                    >
                                        <Typography.Title style={{ margin: 0, color: "white" }} level={5}>
                                            {`${building["potential-energy-efficiency"]} (P)`}
                                        </Typography.Title>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <Typography.Text style={{ color: "gray" }}>
                        not energy efficient - higher running costs
                    </Typography.Text>
                </div>
            </div>
        </div>
    );
};

export default DomesticEPC;
