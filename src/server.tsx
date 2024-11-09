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


export async function getNewsArticles({
    startDate = new Date().toISOString().split('T')[0],
    endDate = new Date().toISOString().split('T')[0],
    category = "dmoz/Technology",
    language = "eng",
    startPercentile = 90,
    endPercentile = 100,
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

        for(let i = 0; i < data.articles.results.length; i++) {
            console.log("NEW ARTICLE STARTS HERE -------------------");
            console.log(data.articles.results[i].body);
        }

        console.log(data.articles.results.length);
        // Create a single string from all article bodies
        const articlesString = data.articles.results
            .map((article: Article) => article.body)
            .join('\n\n-------NEW ARTICLE STARTS HERE-------\n\n');
        return articlesString;
    } catch (error) {
        console.error('Error:', error);
        return '';
    }
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

getNewsArticles();