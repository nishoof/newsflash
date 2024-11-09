import ollama from 'ollama';

const systemPrompt = 'Your job is simply to summarize the content from the articles below. Please keep your response to around 300 words overall. Do not specify which article the information is from. Just read all of the articles I provide and paraphrase all of the information. For example, if there are 3 articles talking about a new game being released, just summarize in one paragraph the key points from the 3 articles. Here are the articles: ';

export async function summarizeArticle(articles: string) {
    const prompt = systemPrompt + '\n\n\n' + articles;

    console.warn('Summarizing article with prompt length: ' + prompt.length);

    const response = await ollama.generate({
        model: 'llama3.2',
        prompt: prompt,
        stream: true
    });

    return response;
}
