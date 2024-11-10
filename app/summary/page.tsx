"use server";

import { useState, useEffect } from "react";
import { fetchArticles } from "@/functions/Fetcher/fetchArticles";
import { summarizeArticle } from "@/functions/Summarizer/summarize";
import MarkdownIt from "markdown-it";

import { FormData } from "@/app/preferences/actions";

// Initialize markdown-it
const md = new MarkdownIt();

// Initial saved form data
let savedFormData: FormData = {
    subscribe: false,
    categories: ["general", "business", "technology"], // Example categories
    fromDate: new Date().toISOString(), // Today's date as default
    toDate: new Date().toISOString(), // Today's date as default
    keywords: "",
};

export default function Summary() {
    const [activeCategory, setActiveCategory] = useState<string>(savedFormData.categories[0]);
    const [categoryContent, setCategoryContent] = useState<Record<string, string>>({});

    const fetchAndSummarize = async (category: string) => {
        const formDataWithCategory = { ...savedFormData, category };

        // Fetch articles for the specific category
        const articlesString = await fetchArticles({
            startDate: formDataWithCategory.fromDate,
            endDate: formDataWithCategory.toDate,
            maxArticles: 10,
            category: formDataWithCategory.category,
            query: formDataWithCategory.keywords,
        });
        console.log(articlesString);
        // Start summarizing with streaming updates
        const response = await summarizeArticle(articlesString);
        console.log(response);
        let resultText = "";

        // Process the stream as it arrives
        for await (const part of response) {
            const content = part.choices[0]?.delta?.content || "";
            resultText += content;
            console.log(content);

            // Convert the current accumulated text to HTML using markdown-it
            const htmlContent = md.render(resultText);

            // Update the state with the parsed HTML content
            setCategoryContent((prevContent) => ({
                ...prevContent,
                [category]: htmlContent,
            }));
        }

    };

    useEffect(() => {
        console.log("key", process.env.OPENAI_API_KEY);
        fetchAndSummarize(activeCategory);
    }, [activeCategory]);

    return (
        <div>
            {/* Tab navigation */}
            <div className="tabs">
                {savedFormData.categories.map((category) => (
                    <button
                        key={category}
                        className={category === activeCategory ? "active-tab" : ""}
                        onClick={() => setActiveCategory(category)}
                        disabled={category === activeCategory}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content display for the active category */}
            <div className="tab-content">
                {categoryContent[activeCategory] ? (
                    <div dangerouslySetInnerHTML={{ __html: categoryContent[activeCategory] }} />
                ) : (
                    <p>Loading content...</p>
                )}
            </div>
        </div>
    );
}