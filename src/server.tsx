async function getNewsArticles({
    startDate = new Date().toISOString().split('T')[0], // Default to today
    endDate = new Date().toISOString().split('T')[0],   // Default to today
    category = "dmoz/Business",                         // Default category
    language = "eng",                                   // Default language
    startPercentile = 0,                               // Default start percentile
    endPercentile = 10,                                // Default end percentile
    sortBy = "date",                                   // Default sort
    resultType = "articles",                           // Default result type
    includeBasicInfo = false,                          // Default basic info setting
    includeEventUri = false,                           // Default event URI setting
    apiKey = "f3ddb276-19c9-4890-bd41-f6c4812c84d1"   // Default API key
} = {}) {
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
        
        const data = await response.json();
        
        // Create a single string from all article bodies
        const allArticles = data.articles.results
            .map(article => article.body)
            .join('\n\n'); // Add two newlines between articles for better readability
        
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

// Usage with all parameters
getNewsArticles({
    startDate: '2024-11-01',
    endDate: '2024-11-08',
    category: 'dmoz/Technology',
    language: 'eng',
    startPercentile: 0,
    endPercentile: 20,
    sortBy: 'relevance',
    resultType: 'articles',
    includeBasicInfo: true,
    includeEventUri: true,
    apiKey: 'your-api-key'
});