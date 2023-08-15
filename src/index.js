import { render } from "@testing-library/react";
import React, { StrictMode } from "react";
import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
