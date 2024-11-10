"use server";

import { fetchArticles } from "@/functions/Fetcher/fetchArticles";
import { summarizeArticle } from "@/functions/Summarizer/summarize";
import MarkdownIt from "markdown-it";
import { FormData } from "@/app/preferences/actions";
import Tabs from "./Tabs"; // Import the client component

// Initialize markdown-it
const md = new MarkdownIt();

// Initial saved form data
let savedFormData: FormData = {
  subscribe: false,
  categories: ["general", "business", "technology"], // Example categories
  fromDate: new Date().toISOString(), // Today's date as default
  toDate: new Date().toISOString(),   // Today's date as default
  keywords: "",
};

export default async function Summary() {
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

      // Start summarizing
      const response = await summarizeArticle(articlesString);
      let resultText = "";

      // Process the stream as it arrives
      for await (const part of response) {
        const content = part.choices[0]?.delta?.content || "";
        resultText += content;
      }

      // Convert the accumulated text to HTML using markdown-it
      const htmlContent = md.render(resultText);

      // Store the content in the categoryContent object
      categoryContent[category] = htmlContent;
    })
  );

  // Render the client component and pass the data as props
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