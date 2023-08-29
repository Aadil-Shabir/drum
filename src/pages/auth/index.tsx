import React from "react";
import { Typography } from "antd";

const Signin: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "ceenter",
                margin: "1rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solud grey",
                    minHeight: "400px",
                    minWidth: "200px",
                }}
            ></div>
            <p>Signin</p>
        </div>
    );
};

export default Signin;
