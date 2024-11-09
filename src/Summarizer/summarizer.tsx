import ollama from 'ollama';

export async function summarizeArticle(article: string): Promise<string> {
    const command = 'You are a publisher for a small local newspaper. The point of your newspaper is to give the people a quick 1 paragraph summary of all of the relevant articles. I will give you all of the articles and you will give me a 1 paragraph summary of each article. Your output will go directly into the newspaper, so don\'t include any personal opinions or biases. Also, don\'t mention or hint that you are an AI. Here are all of the articles I want you to summarize. Please keep your response to around 200 words per article. Remember that your goal is to summarize the articles into 1 paragraph each for another person to read as if it was its own article. Here are the articles: \n\n\n';
    const prompt = command + article;

    const response = await ollama.chat({
        model: 'llama3.1',
        messages: [{ role: 'user', content: prompt }],
    });

    const summary: string = response.message.content;

    return summary;
}
