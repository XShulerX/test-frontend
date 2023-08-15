import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import Posts from "./pages/Posts";
import "./styles/App.css";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Posts />}/>
                <Route path="/game/:gameId" element={<Post />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
