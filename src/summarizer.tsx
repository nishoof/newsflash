import ollama from 'ollama';

export async function summarizeArticle(article: string): Promise<string> {
    const command = 'Keep your response to 200 words. Please summarize the following news articles in paragraph format: ';
    const prompt = command + article;

    const response = await ollama.chat({
        model: 'llama3.1',
        messages: [{ role: 'user', content: prompt }],
    });

    const summary: string = response.message.content;

    return summary;
}
