import React from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom"

const Preferences = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Input onSubmit={function (): void {
                navigate("/summary");
            }} />
        </div>
    );
};

export default Preferences;