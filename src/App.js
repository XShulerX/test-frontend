import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import "./styles/App.css";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Posts />}/>
                <Route path="/about" element={<About />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
