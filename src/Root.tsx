import React, { useContext } from "react";
import { Typography, Form, Input, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import AuthContext, { AuthContextType } from "./store/AuthContext";

const Root: React.FC = () => {
    const { setIsAuthenticated } = useContext<AuthContextType>(AuthContext);
    const navigate = useNavigate();

    const onFinishHandler = (values: any) => {
        if (values.email.includes("Bhuttohuzaifah@gmail.com") && values.password === "qwerty1234") {
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true");
            navigate("/buildings");
        } else {
            alert("Wrong Credentials");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "1rem",
                minHeight: "calc(100vh - 2rem)",
                height: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid grey",
                    minHeight: "300px",
                    minWidth: "350px",
                    borderRadius: "0.5rem",
                    background: "#FCF9D2",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                        borderBottom: "1px solid grey",
                        background: "#38B856",
                        borderTopRightRadius: "0.5rem",
                        borderTopLeftRadius: "0.5rem",
                    }}
                >
                    <Typography.Title style={{ margin: 0, fontWeight: "bold", color: "white" }} level={4}>
                        Evergreen Energy Property Search
                    </Typography.Title>
                </div>
                <div style={{ display: "flex", justifyContent: "center", padding: "0.5rem 1rem" }}>
                    <Typography.Title style={{ margin: 0, color: "#38B856" }} level={4}>
                        Sign into your Account
                    </Typography.Title>
                </div>
                <Form onFinish={onFinishHandler} style={{ padding: "1rem" }}>
                    <Form.Item name="email">
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Typography.Text style={{ color: "#38B856" }}>Email:</Typography.Text>
                            <Input style={{ borderColor: "#38B856" }} placeholder="Email" type="Email" />
                        </Space>
                    </Form.Item>

                    <Form.Item name="password">
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Typography.Text style={{ color: "#38B856" }}>Password:</Typography.Text>
                            <Input style={{ borderColor: "#38B856" }} placeholder="Password" type="password" />
                        </Space>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%", background: "#38B856" }}>
                            Signin
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Root;
