import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Buildings, BuildingDetail } from "./pages";
import { AuthContextProvider } from "./store/AuthContext";

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
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </React.StrictMode>
);
