import React, { useEffect, useState } from "react";
import { Typography, Spin, List } from "antd";
import { Link } from "react-router-dom";

interface Data {
    rows: any;
}

interface BuildingsListProps {
    data: Data | undefined;
    setData: React.Dispatch<React.SetStateAction<Data | undefined>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const BuildingsList: React.FC<BuildingsListProps> = ({ data, setData, isLoading, setIsLoading }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                fetch("https://epc.opendatacommunities.org/api/v1/domestic/search?size=5000&from=5000", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization:
                            "Basic YWFkaWwuc2hhYmlyMTNAZ21haWwuY29tOjE2Y2E3MzAxZGM4ZjBmZDYzNzBlMTlhMjU0YWIyMGQxMmRjMGViYTU=",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setData(data);
                        setIsLoading(false);
                    });
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                margin: "1rem 0rem",
            }}
        >
            {isLoading ? (
                <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Spin size="large" />
                </div>
            ) : (
                <div>
                    <div style={{ background: "#D3D3D3", padding: "0.75rem" }}>
                        <Typography.Title style={{ margin: 0, fontWeight: "bold" }} level={4}>
                            {(data && data.rows.length) || 0} Domestic EPCs found
                        </Typography.Title>
                    </div>
                    {data && (
                        <List
                            itemLayout="horizontal"
                            dataSource={data.rows}
                            style={{ width: "100%" }}
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 25,
                            }}
                            renderItem={(item: any, index) => (
                                <List.Item
                                    style={{ background: "#F5F5F5", margin: "0.5rem 0rem", padding: "0rem 0.5rem" }}
                                >
                                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                        <Typography.Text style={{ color: "black" }}>
                                            {item["lodgement-date"]}
                                        </Typography.Text>
                                        <Typography.Text style={{ color: "black", fontSize: "18px" }}>
                                            <Link to={`/buildingdetail/${item["lmk-key"]}`}>{item.address}</Link>
                                        </Typography.Text>
                                    </div>
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default BuildingsList;
