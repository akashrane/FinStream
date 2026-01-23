import React, { useEffect, useState } from "react";
import ArticleCard from "../../ui/ArticleCard";
import { newsService } from "../../../services/newsService";
import "./FeaturedArticle.css";

const FeaturedArticle: React.FC = () => {
  const [featured, setFeatured] = useState<any>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Use the centralized news service which proxies to the backend
        const articles = await newsService.getNews('market');

        if (Array.isArray(articles) && articles.length > 0) {
          // Pick the first valid article
          const validArticle = articles.find(
            (a: any) =>
              a.imageUrl &&
              a.title &&
              !a.source?.toLowerCase().includes('biztoc')
          );

          if (validArticle) {
            setFeatured(validArticle);
          } else {
            console.warn("No suitable featured article found with image");
            // Fallback to first article even without image if necessary, but UI prefers image
            if (articles.length > 0) setFeatured(articles[0]);
          }
        } else {
          console.warn("No articles returned from news service");
        }
      } catch (error) {
        console.error("Error fetching featured article:", error);
      }
    };

    fetchNews();
  }, []);

  if (!featured) {
    return <div className="featured-article-loading">Loading featured article...</div>;
  }

  return (
    <div className="featured-article">
      <ArticleCard
        article={featured}
        variant="featured"
        onClick={() => window.open(featured.url, "_blank")}
      />
    </div>
  );
};

export default FeaturedArticle;
