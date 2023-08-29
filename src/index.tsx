import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Buildings, BuildingDetail, Signin } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/buildings",
        element: <Buildings />,
    },
    {
        path: "/buildingdetail/:buildingId",
        element: <BuildingDetail />,
    },
    {
        path: "/signin",
        element: <Signin />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
