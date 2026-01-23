import React from 'react';
import { ArticleCardProps } from '../../../types';
import StockTicker from '../StockTicker';
import './ArticleCard.css';

const ArticleCard: React.FC<ArticleCardProps> =
  ({
    article,
    variant = 'standard',
    onClick
  }) => {
    const [imgError, setImgError] = React.useState(false);

    // Handle both NewsAPI (urlToImage) and Backend (imageUrl) formats
    const rawArticle = (article as any) || {};
    const title = rawArticle.title;
    const description = rawArticle.description;
    const imageUrl = rawArticle.imageUrl || rawArticle.urlToImage;
    const stockTicker = rawArticle.stockTicker;
    const stockChange = rawArticle.stockChange;
    const stockChangePercent = rawArticle.stockChangePercent;

    // Handle source which can be string (Backend) or object (NewsAPI)
    const sourceName = typeof rawArticle.source === 'string'
      ? rawArticle.source
      : rawArticle.source?.name;



    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    const renderStockTicker = () => {
      if (stockTicker && stockChange !== undefined && stockChangePercent !== undefined) {
        return (
          <StockTicker
            ticker={{
              symbol: stockTicker,
              price: 0,
              change: stockChange,
              changePercent: stockChangePercent
            }}
            showChange={true}
            className="inline"
          />
        );
      }
      return null;
    };

    if (!article) return null; // Safety check

    return (
      <article className={`article-card article-card--${variant} ${onClick ? 'clickable' : ''}`}
        onClick={handleClick}>
        <div className="article-content">
          <h3 className="article-title">{title}</h3>

          {imageUrl && variant === 'featured' && (
            <div className="article-image">
              {imgError ? (
                <img
                  src="https://images.unsplash.com/photo-1611974765270-ca125863436d?q=80&w=2664&auto=format&fit=crop"
                  alt="Market News"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <img
                  src={imageUrl}
                  alt={title || 'Article image'}
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          )}


          {description && variant !== 'compact' && (
            <p className="article-description">{description}</p>
          )}
          <div className="article-meta">
            <div className="article-source-info">
              <span className="article-source">{sourceName}</span>
            </div>
            {renderStockTicker()}
          </div>
        </div>
      </article>
    );
  };

export default ArticleCard;