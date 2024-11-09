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

async function fetchArticles() {
  try {
    const response: AxiosResponse<{ articles: Article[] }> = await axios.get(BASE_URL, {
      params: {
        category: 'business',
        max: 100,
        token: API_KEY,
        lang: 'en', // Specify language if needed
      },
    });

    const articles: Article[] = response.data.articles;

    articles.forEach((article: Article, index: number) => {
      console.log(`Article ${index + 1}: ${article.title}`);
      console.log(`Source: ${article.source.name}`);
      console.log(`Published At: ${article.publishedAt}`);
      console.log(`URL: ${article.url}`);
      console.log(``)
      console.log('----------------------------------------');
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}
export{};
fetchArticles();