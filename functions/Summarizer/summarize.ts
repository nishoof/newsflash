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
    const prompt = "Your job is simply to summarize the content from the articles below. Please keep your response to around 300 words overall. Do not specify which article the information is from. Just read all of the articles I provide and paraphrase all of the information. For example, if there are 3 articles talking about a new game being released, just summarize in one paragraph the key points from the 3 articles. Do not specify the articles you are getting the information from. Just give a paragraph. Write it in markdown. Here are the articles: \n\n\n" + articles;

    console.warn("Summarizing article with prompt length: " + prompt.length);

    const response = await ask(prompt);

    return response;
}
