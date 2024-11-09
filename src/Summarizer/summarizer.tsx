import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not defined in the environment variables. Get the key from the groupchat or github repo, ask Nish if you need help setting it up.");
}

const openai = new OpenAI({apiKey});

async function ask(prompt: string) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    return completion.choices[0].message.content;
}

export async function summarizeArticle(articles: string) {
    const prompt = "Your job is simply to summarize the content from the articles below. Please keep your response to around 300 words overall. Do not specify which article the information is from. Just read all of the articles I provide and paraphrase all of the information. For example, if there are 3 articles talking about a new game being released, just summarize in one paragraph the key points from the 3 articles. Do not specify the articles you are getting the information from. Just give a paragraph. Here are the articles: \n\n\n" + articles;

    console.warn("Summarizing article with prompt length: " + prompt.length);

    const response = await ask(prompt);

    return response;
}
