import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { summarizeArticle } from './summarizer';
import { getCombinedArticles } from './testArticles/Set2/articleGetter';

function getSet1TestArticles(): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const articlePath = path.join(__dirname, 'testArticle.txt');
    const article = fs.readFileSync(articlePath, 'utf-8');

    return article;
}

function getSet2TestArticles(): string {
    return getCombinedArticles();
}

(async () => {
    try {
        const article: string = getSet2TestArticles();
        
        console.log(article);
        console.warn("-------------- Summarizing...");

        const stream = await summarizeArticle(article);

        for await (const chunk of stream) {
            process.stdout.write(chunk.choices[0]?.delta?.content || "");
        }

        console.log('\ndone');
    } catch (error) {
        console.error('Error:', error);
    }
})();
