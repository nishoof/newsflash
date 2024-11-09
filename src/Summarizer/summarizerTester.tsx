import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getNewsArticles } from '../server';
import { allArticles } from '../server';

import { summarizeArticle } from './summarizer';

function getTestArticle(): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const articlePath = path.join(__dirname, 'testArticle.txt');
    const article = fs.readFileSync(articlePath, 'utf-8');

    return article;
}

async function getArticles(): Promise<string> {
    await getNewsArticles();
    return allArticles;
}

(async () => {
    try {
        const article: string = await getArticles();
        const summary: string = await summarizeArticle(article);
        console.log(summary);
    } catch (error) {
        console.error('Error:', error);
    }
})();
