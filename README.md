# Newsflash

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Summary

The goal of the project is:

- An AI-powered news debrief
- Easy access to current events
- Wide range of categories
- Short, digestible summaries

## Resources used

- Framework: [next.js](https://github.com/vercel/next.js)
- News API: [GNews.io](https://github.com/gnews-io)
- LLM: [ChatGPT](https://openai.com/chatgpt/overview/)

## Process

- User inputs categories, keywords, and dates
- Inputs are fed into GNews, which returns relevant news articles
- Articles are fed into ChatGPT, which returns a summary of the various topics

## Our Timeline

1. Created React website, first tried to use [Ollama](https://ollama.com/) locally and [NewsAPI.ai](https://newsapi.ai/)
2. Switched to ChatGPT and GNews API
3. Migrated to Next.js, finished front end input page
4. Connected GNews to ChatGPT to display on page
5. Connected front end input page to backend calls

## What's next?

- Subscription service
- Sort by source
- Appearance customization
- Providing source links
