import React from "react";
import { getFormData } from "../components/Input";
import { log } from "console";

const Summary = () => {
    const categories = getFormData();

    console.log(categories);

    return (
        <div>
            <h1>Summary</h1>

            <p> {
                categories.categories
            } </p>
        </div>
    );
};

export default Summary;