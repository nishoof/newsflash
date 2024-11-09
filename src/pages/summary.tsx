import React from "react";
import { getCategories } from "../components/Input";

const Summary = () => {
    const categories: string = getCategories();

    return (
        <div>
            <h1>Summary</h1>

            <p>{categories}</p>
        </div>
    );
};

export default Summary;