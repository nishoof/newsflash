"use server";

import { fetchArticles } from "@/functions/Fetcher/fetchArticles";
import { summarizeArticle } from "@/functions/Summarizer/summarize";
// import MarkdownIt from "markdown-it";
import { FormData } from "@/app/preferences/actions";
import Tabs from "./Tabs"; // Import the client component
import "./page.css";

// Initialize markdown-it
// const md = new MarkdownIt();

// Initial saved form data


export default async function Summary({ searchParams }: { searchParams: { [key: string]: string } }) {
    const { fromDate, toDate, keywords, categories } = searchParams;
    console.log("startDate: " + fromDate);
    console.log("endDate: " + toDate);
    console.log("keywords: " + keywords);
    console.log("categories: " + categories);

    let savedFormData: FormData = {
        subscribe: false,
        categories: categories.split(","), // Example categories
        fromDate: fromDate, // Today's date as default
        toDate: toDate,   // Today's date as default
        keywords: keywords,
    };



    // Initialize an object to hold the content for each category
    const categoryContent: Record<string, string> = {};

    // Fetch and summarize content for all categories
    await Promise.all(
        savedFormData.categories.map(async (category) => {
            const formDataWithCategory = { ...savedFormData, category };

            // Fetch articles for the specific category
            const articlesString = await fetchArticles({
                startDate: formDataWithCategory.fromDate,
                endDate: formDataWithCategory.toDate,
                maxArticles: 20,
                category: formDataWithCategory.category,
                query: formDataWithCategory.keywords,
            });

            console.log(articlesString);

            // Start summarizing
            const response = await summarizeArticle(articlesString);
            let resultText = "";

            // Process the stream as it arrives
            for await (const part of response) {
                const content = part.choices[0]?.delta?.content || "";
                resultText += content;
            }

            console.log("Result text: ", resultText);

            // Convert the accumulated text to HTML using markdown-it
            //   const htmlContent = md.render(resultText);
            const htmlContent = resultText;

            // Store the content in the categoryContent object
            categoryContent[category] = htmlContent;
        })
    );

    return (
        <div>
            {/* Loading Screen */}
            {!Object.keys(categoryContent).length ? (
                <div className="loading-screen">
                    <p>Loading content...</p>
                </div>
            ) : (
                <Tabs
                    categories={savedFormData.categories}
                    categoryContent={categoryContent}
                />
            )}
        </div>
    );
}