import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    onclick = () => {
        navigate("/preferences");
    }

    return (
        <div>
            <h1>Home :D</h1>
        </div>
    );
};

export default Home;