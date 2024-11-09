import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { summarizeArticle } from './summarizer';

function getArticle(): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const articlePath = path.join(__dirname, 'testArticle.txt');
    const article = fs.readFileSync(articlePath, 'utf-8');

    return article;
}

(async () => {
    const article: string = getArticle();
    const summary: string = await summarizeArticle(article);
    console.log(summary);
})();