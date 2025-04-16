import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setError("No search query provided");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:3000/search?query=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        if (json.success) {
          setData(json.data);
        } else {
          setError(json.message || "An error occurred");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, query]);

  return (
    <>
      {error && (
        <div className="text-red-500 mb-4 flex items-center gap-4">
          <span>{error}</span>
          <button
            onClick={() => setPage(page)} // Re-trigger fetch
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      )}

      <div className="today-header mt-8 mb-4 text-center font-semibold text-3xl text-gray-800">
        <h3>Search Result</h3>
      </div>

      <div className="mt-16 mb-10 cards grid grid-cols-1 gap-4 xs:p-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:px-16 lg:gap-6 xl:gap-8">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => {
              const isGroup = !!element.group_id;

              if (
                isGroup &&
                (!element.articles || element.articles.length === 0)
              ) {
                return null;
              }

              const urls = isGroup
                ? element.articles.map((article) => article.url).join(",")
                : element.url;

              const newsProviders = isGroup
                ? element.articles.map((article) => article.source).join(",")
                : element.source;

              return (
                <EverythingCard
                  key={index}
                  title={isGroup ? element.representative_title : element.title}
                  description={element.short_summary}
                  summary={element.long_summary}
                  imgUrl={
                    isGroup
                      ? element.articles[0].cover_image
                      : element.cover_image
                  }
                  publishedDate={
                    isGroup
                      ? element.articles[0].date_published
                      : element.date_published
                  }
                  newsProvider={newsProviders}
                  source={urls}
                  id={element.id}
                  category={element.category}
                />
              );
            })
          ) : (
            <p>No articles found for this search query.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default Search;
