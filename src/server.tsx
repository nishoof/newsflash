// Types for the API response
interface NewsArticle {
    body: string;
    // Add other article properties as needed
  }
  
  interface NewsApiResponse {
    articles: {
      results: NewsArticle[];
    };
  }
  
  interface NewsApiQuery {
    $query: {
      $and: Array<{
        categoryUri?: string;
        dateStart?: string;
        dateEnd?: string;
        lang?: string;
      }>;
    };
    $filter: {
      startSourceRankPercentile: number;
      endSourceRankPercentile: number;
    };
  }
  
  export async function getNewsArticles(): Promise<NewsArticle[]> {
    try {
      const response = await fetch("https://www.newsapi.ai/api/v1/article/getArticles", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: {
            $query: {
              $and: [
                {
                  categoryUri: "dmoz/Business"
                },
                {
                  dateStart: "2024-11-07",
                  dateEnd: "2024-11-08",
                  lang: "eng"
                }
              ]
            },
            $filter: {
              startSourceRankPercentile: 0,
              endSourceRankPercentile: 10
            }
          },
          resultType: "articles",
          articlesSortBy: "date",
          includeArticleBasicInfo: false,
          includeArticleEventUri: false,
          apiKey: "f3ddb276-19c9-4890-bd41-f6c4812c84d1"
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: NewsApiResponse = await response.json();
      return data.articles.results;
    } catch (error) {
      console.error('Error fetching news articles:', error);
      throw error;
    }
  }
  
  // Example usage
  export const fetchNews = async () => {
    try {
      const articles = await getNewsArticles();
      console.log(articles[0]?.body);
      return articles;
    } catch (error) {
      console.error('Error in fetchNews:', error);
      throw error;
    }
  };