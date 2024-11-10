import { fetchArticles } from "./fetchArticles";

const articles = await fetchArticles();
if (articles === "") {
    console.error("Failed to fetch articles.");
}
console.warn("Fetched articles: " + articles);
