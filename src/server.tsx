interface NewsAPIParams {
    startDate?: string;
    endDate?: string;
    category?: string;
    language?: string;
    startPercentile?: number;
    endPercentile?: number;
    sortBy?: string;
    resultType?: string;
    includeBasicInfo?: boolean;
    includeEventUri?: boolean;
    apiKey?: string;
}

interface Article {
    body: string;
    // Add other article properties if needed
}

interface NewsAPIResponse {
    articles: {
        results: Article[];
    };
}

async function getNewsArticles({
    startDate = new Date().toISOString().split('T')[0],
    endDate = new Date().toISOString().split('T')[0],
    category = "dmoz/Business",
    language = "eng",
    startPercentile = 0,
    endPercentile = 10,
    sortBy = "date",
    resultType = "articles",
    includeBasicInfo = false,
    includeEventUri = false,
    apiKey = "f3ddb276-19c9-4890-bd41-f6c4812c84d1"
}: NewsAPIParams = {}): Promise<string> {
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
                                categoryUri: category
                            },
                            {
                                dateStart: startDate,
                                dateEnd: endDate,
                                lang: language
                            }
                        ]
                    },
                    $filter: {
                        startSourceRankPercentile: startPercentile,
                        endSourceRankPercentile: endPercentile
                    }
                },
                resultType: resultType,
                articlesSortBy: sortBy,
                includeArticleBasicInfo: includeBasicInfo,
                includeArticleEventUri: includeEventUri,
                apiKey: apiKey
            })
        });
        
        const data: NewsAPIResponse = await response.json();
        
        // Create a single string from all article bodies
        const allArticles = data.articles.results
            .map((article: Article) => article.body)
            .join('\n\n');
        
        return allArticles;
    } catch (error) {
        console.error('Error:', error);
        return '';
    }
}

// Example usage:
// Basic usage with defaults
getNewsArticles();

// Usage with some custom parameters
getNewsArticles({
    startDate: '2024-11-01',
    endDate: '2024-11-08',
    category: 'dmoz/Technology',
    startPercentile: 0,
    endPercentile: 20,
    sortBy: 'relevance'
});
export{};