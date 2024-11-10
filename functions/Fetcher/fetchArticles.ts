import axios, { AxiosResponse } from 'axios';

const API_KEY = '510bb4d4264d9a5048faccc2e23f2baa'; // Replace with your actual GNews API key
const BASE_URL = 'https://gnews.io/api/v4/top-headlines';

interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export async function fetchArticles({
  startDate = new Date().toISOString(),
  endDate = new Date().toISOString(),
  maxArticles = 10,
  category = 'business',
  query = '',
} = {}) {
  try {
    const response: AxiosResponse<{ articles: Article[] }> = await axios.get(BASE_URL, {  
      params: {
        category: category,
        max: maxArticles,
        token: API_KEY,
        from: startDate,
        to: endDate,
        q: query,
        lang: 'en', // Specify language if needed
        expand: 'content',
      },
    });
    const articles: Article[] = response.data.articles;
    console.log("dates from fetcharticles: " + startDate + " to " + endDate);
    console.log(articles.map((article: Article) => `Published: ${article.publishedAt}\n\n`).join('\n\n'));
    const articlesString = articles.map((article: Article) => `TITLE: ${article.title}\n\n BODY: ${article.content}`).join('\n\n');
    // console.log(articlesString);
    return articlesString;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return "";
  }
}

fetchArticles();
