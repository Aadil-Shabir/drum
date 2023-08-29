import React, { useState, useContext } from "react";
import { Typography, Row, Col } from "antd";
import AuthContext, { AuthContextType } from "../../store/AuthContext";
import BuildingsList from "./BuildingsList";
import Filters from "./Filters";
import { Navigate } from "react-router-dom";

interface Data {
    rows: any;
}

const Buildings: React.FC = () => {
    const [data, setData] = useState<Data>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isAuthenticated } = useContext(AuthContext) as AuthContextType;

    if (isAuthenticated) {
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
                        <BuildingsList
                            data={data}
                            setData={setData}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    </Col>
                    <Col span={6}>
                        <Filters data={data} setData={setData} isLoading={isLoading} setIsLoading={setIsLoading} />
                    </Col>
                </Row>
            </div>
        );
    } else {
        return <Navigate to="/" />;
    }

    // return (
    //     <div style={{ margin: "1rem" }}>
    //         <Typography.Title style={{ margin: 0, fontWeight: "bold" }} level={3}>
    //             Energy Performance of Buildings Data
    //         </Typography.Title>
    //         <Typography.Title style={{ margin: 0, fontWeight: "bold" }} level={3}>
    //             England and Wales
    //         </Typography.Title>
    //         <Row gutter={[8, 16]}>
    //             <Col span={18}>
    //                 <BuildingsList data={data} setData={setData} isLoading={isLoading} setIsLoading={setIsLoading} />
    //             </Col>
    //             <Col span={6}>
    //                 <Filters data={data} setData={setData} isLoading={isLoading} setIsLoading={setIsLoading} />
    //             </Col>
    //         </Row>
    //     </div>
    // );
};

export default Buildings;
