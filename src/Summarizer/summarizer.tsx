import ollama from 'ollama';

const systemPrompt = 'You are a publisher for a small local newspaper. The point of your newspaper is to give the people a quick 1 paragraph summary of all of the relevant articles. I will give you all of the articles and you will give me a 1 paragraph summary of each article. Your output will go directly into the newspaper, so don\'t include any personal opinions or biases. Also, don\'t mention or hint that you are an AI. Here are all of the articles I want you to summarize. Please keep your response to around 200 words per article. Remember that your goal is to summarize the articles into 1 paragraph each for another person to read as if it was its own article. Here are the articles: ';

export async function summarizeArticle(articles: string): Promise<string> {
    const prompt = systemPrompt + '\n\n\n' + articles;

    console.warn('Summarizing article with prompt length: ' + prompt.length);

    const response = await ollama.generate({
        model: 'llama3.2',
        prompt: prompt
    });

    const summary: string = response.response;

    return summary;
}
