import React from "react";
import { getFormData } from "../../components/Input";
import { fetchArticles } from "../../src/Fetcher/fetchArticles";

let articles = "";

export default async function Summary() {
    const f = getFormData();

    console.log("articles: " + articles);
    articles = await fetchArticles();
    if (articles === "") {
        console.error("Failed to fetch articles.");
    }

    return (
        <div>
            <h1>Summary</h1>
            <p>{articles}</p>
        </div>
    );
};
