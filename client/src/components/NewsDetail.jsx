import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Helper function to shorten URL to base domain
const shortenUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.origin;
  } catch (e) {
    console.log("error = ", e);
    return url;
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

  if (isLoading) return <p className="text-center text-white text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-400 text-lg">{error}</p>;
  if (!news) return <p className="text-center text-red-400 text-lg">No news details available.</p>;

  const mainArticle = news.articles?.find((article) => article.id === news.id);

  // Deduplicate URLs for Article URLs and News Provider
  const uniqueArticleUrls = [...new Set(news.articles?.map((article) => article.url).filter(Boolean))];
  const uniqueSources = [...new Set(news.articles?.map((article) => article.source).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 text-white p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
        >
          {news.representative_title}
        </h1>

        {/* Image */}
        {mainArticle?.cover_image && (
          <img
            className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg mb-6 mx-auto"
            src={mainArticle.cover_image}
            alt={mainArticle.title || "News cover image"}
            onError={(e) => (e.target.src = "/fallback-image.jpg")} // Fallback image
          />
        )}

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Summary</h2>
          <p className="text-gray-200 leading-relaxed">{news.summary}</p>
        </section>

        {/* Article URLs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Article URLs</h2>
          {uniqueArticleUrls.length > 0 ? (
            <ul className="space-y-2">
              {uniqueArticleUrls.map((url, idx) => (
                <li key={idx}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline"
                  >
                    {shortenUrl(url)}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No source available</p>
          )}
        </section>

        {/* News Provider */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">News Provider</h2>
          {uniqueSources.length > 0 ? (
            <ul className="space-y-2">
              {uniqueSources.map((source, idx) => (
                <li key={idx}>
                  <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline"
                  >
                    {shortenUrl(source)}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No source available</p>
          )}
        </section>

        {/* Full Content */}
        {news.content && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Full Content</h2>
            <p className="text-gray-200 leading-relaxed">{news.content}</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default NewsDetail;
