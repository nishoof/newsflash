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
            { role: "system", content: "You are a helpful assistant." },
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
    const prompt = "You will be given a huge text of articles. Summarize each articles and sort them into different topics. Have the more important topics higher up. Use markdown to format the text. You are only able to use h3 headers if needed, otherwise have it as plaintext. Limit 2000 words. \n\n\n" + articles;

    console.warn("Summarizing article with prompt length: " + prompt.length);

    const response = await ask(prompt);

    return response;
}
