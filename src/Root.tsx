import React from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

function Root() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Typography.Title>This is the Home Page</Typography.Title>
            <Button>
                <Link to={"/buildings"}>View Buildings</Link>
            </Button>
        </div>
    );
}

export default Root;
