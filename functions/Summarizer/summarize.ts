"use server";

import OpenAI from "openai";

async function ask(prompt: string) {
    const key = process.env.OPENAI_API_KEY;
    console.log("[summarize.ts] Key: " + key);
    if (!key) {
        throw new Error("OpenAI API key not found");
    }

    let openai = new OpenAI({ apiKey: key });

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "ChatGPT, please summarize a set of articles in the following format: start each summary with ### followed by the topic title, then provide a concise summary below it. Maintain this format consistently for each article, with one topic heading (###) per summary, followed by the summary text. Here’s the structure: ### [Topic Title] [Summary Text]. Ensure each article summary follows this format for clarity and organization." },
            {
                role: "user",
                content: prompt,
            },
        ],
        stream: true
    });

    return completion;
}


export async function summarizeArticle(articles: string) {
    const prompt = "Summarize each articles and have the more important topics higher up. Limit 2000 words. \n\n\n" + articles;

    console.warn("Summarizing article with prompt length: " + prompt.length);

    const response = await ask(prompt);

    return response;
}
