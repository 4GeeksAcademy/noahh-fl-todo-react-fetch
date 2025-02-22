import React from "react";
import ReactDOM from "react-dom/client";
import "../js/index.css"; // check this
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Home />
    </React.StrictMode>
);
