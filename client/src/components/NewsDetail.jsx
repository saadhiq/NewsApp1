import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

    fetch(`http://localhost:3000/news?category=${category}&id=${id}`) // I have changed the port to python
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

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold">{news.title}</h2>
      <img className="w-full h-64 object-cover rounded mt-4" src={news.imgUrl} alt={news.title} />
      <p className="mt-4">{news.description}</p>

      <div className="mt-4">
        <b>Source:</b>
        <ul>
          {news.source.split(",").map((url, idx) => (
            <li key={idx}>
              <a href={url.trim()} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {url.trim()}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <b>News Provider:</b>
        <ul>
          {news.newsProvider.split(",").map((provider, idx) => (
            <li key={idx}>{provider.trim()}</li>
          ))}
        </ul>
      </div>

      <p className="mt-4">{news.content}</p>
    </div>
  );
}

export default NewsDetail;
