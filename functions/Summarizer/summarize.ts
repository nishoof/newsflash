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
            { role: "system", content: "You are a helpful assistant. Your job is to summarize news articles and sort them into different topics (more important topics higher up). Give your response in HTML. You may pick the most important or interesting pieces of information and summarize it under a topic (which will be your heading in html). Please keep to 150 words per topic. Use only heading 2 and paragraphs. Do not include ```html or ``` in your response." },
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
    const prompt = "\n\n ARTICLES: " + articles;

    console.warn("Summarizing article with prompt length: " + prompt.length);

    const response = await ask(prompt);

    return response;
}