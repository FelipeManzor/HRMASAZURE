import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import "@/global.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
