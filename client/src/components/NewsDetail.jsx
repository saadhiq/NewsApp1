import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Helper function to shorten URL to base domain
const shortenUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.origin; // Returns protocol + hostname (e.g., "https://sinhala.adaderana.lk")
  } catch (e) {
    console.log("error = ", e);
    return url; // Fallback to original URL if parsing fails
  }
};

function NewsDetail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const id = queryParams.get("id");

  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!category || !id) {
      setError("Invalid news details");
      setIsLoading(false);
      return;
    }

    fetch(`http://localhost:3000/news?category=${category}&id=${id}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          setNews(json.data);
        } else {
          setError(json.message || "News not found");
        }
      })
      .catch(() => setError("Failed to fetch news"))
      .finally(() => setIsLoading(false));
  }, [category, id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!news) return <p className="text-red-600">No news details available.</p>;
  const mainArticle = news.articles.find((article) => article.id === news.id);

  return (
    <div className="container mx-auto p-6">
      <h1 className="sin-title font-semibold">{news.representative_title}</h1>
      <img
        className="w-200 h-200 md:w-100 md:h-100 object-cover rounded mt-4"
        src={mainArticle.cover_image}
        alt={mainArticle.title}
      />

      <h2 className="text-2xl font-semibold">Summary</h2>
      <p className="mt-4">{news.summary}</p>

      <div className="mt-4">
        <b>Article URLs:</b>
        {news.url ? (
          <ul>
            <li>
              <a
                href={news.url.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {shortenUrl(news.url.trim())}
              </a>
            </li>
          </ul>
        ) : news.articles && news.articles.length > 0 ? (
          <ul>
            {news.articles.map((article, idx) => (
              <li key={idx}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {shortenUrl(article.url)}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No source available</p>
        )}
      </div>

      <div className="mt-4">
        <b>News Provider:</b>
        {news.source ? (
          <ul>
            <li>
              <a
                href={news.url.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {shortenUrl(news.url.trim())}
              </a>
            </li>
          </ul>
        ) : news.articles && news.articles.length > 0 ? (
          <ul>
            {news.articles.map((article, idx) => (
              <li key={idx}>
                <a
                  href={article.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {shortenUrl(article.source)}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No source available</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold">Full Content</h2>
      <p className="mt-4">{news.content}</p>
    </div>
  );
}

export default NewsDetail;
