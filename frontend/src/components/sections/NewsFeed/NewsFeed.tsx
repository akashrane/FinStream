import React, { useEffect, useState } from "react";
import ArticleCard from "../../ui/ArticleCard";
import { newsService } from "../../../services/newsService";
import "./NewsFeed.css";

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Use backend proxy via newsService
        const articlesData = await newsService.getNews('market');

        if (Array.isArray(articlesData) && articlesData.length > 0) {
          // Slice to get a reasonable number of articles
          const displayedArticles = articlesData.slice(0, 10);
          setArticles(displayedArticles);
          console.log("Fetched articles for news feed:", displayedArticles);
        } else {
          console.warn("No articles returned from news service for NewsFeed");
        }
      } catch (err) {
        console.error("Error fetching latest news:", err);
      }
    };

    fetchNews();
  }, []);

  if (articles.length === 0) {
    return <div className="news-feed-loading">Loading latest news...</div>;
  }

  return (
    <div className="news-feed">
      {articles.map((article, index) => (
        <ArticleCard
          key={article?.url || index}
          article={article}
          variant="standard"
          onClick={() => article?.url && window.open(article.url, "_blank")}
        />
      ))}
    </div>
  );
};

export default NewsFeed;