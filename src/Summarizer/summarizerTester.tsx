import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getNewsArticles } from '../server';
import { summarizeArticle } from './summarizer';

function getTestArticle(): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const articlePath = path.join(__dirname, 'testArticle.txt');
    const article = fs.readFileSync(articlePath, 'utf-8');

    return article;
}

(async () => {
    try {
        const article: string = await getNewsArticles();
        console.log(article);
        console.warn("Done fetching articles, summarizing...");

        const response = summarizeArticle(article);

        for await (const part of await response) {
            process.stdout.write(part.response);
        }

        console.log('\n');
    } catch (error) {
        console.error('Error:', error);
    }
})();