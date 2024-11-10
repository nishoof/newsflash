import fs from 'fs';
import path from 'path';

const articlesDirectory = path.join(__dirname);

export function getCombinedArticles(): string {
    const files = fs.readdirSync(articlesDirectory);
    let combinedArticles = '';

    files.forEach(file => {
        if (file.endsWith('.txt')) {
            const filePath = path.join(articlesDirectory, file);
            const articleContent = fs.readFileSync(filePath, 'utf-8');
            combinedArticles += `\n-------NEW ARTICLE STARTS HERE-------\n${articleContent}\n`;
        }
    });

    return combinedArticles;
};