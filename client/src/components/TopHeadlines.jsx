import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function TopHeadlines() {
  const { category } = useParams(); // Destructure for clarity
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:3000/top-headlines/${category}`)
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
  }, [page, category]); // Dependency on category, not params.category

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
        <h3> {category} news</h3>
      </div>
      <div className="mt-16 mb-10 cards grid grid-cols-1 gap-4 xs:p-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:px-16 lg:gap-6 xl:gap-8">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.summary}
                imgUrl={element.cover_image}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source?.name || element.source}
                id={element.id}
                category={element.category} // Handle source as object or string
              />
            ))
          ) : (
            <p>No articles found for this category or criteria.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default TopHeadlines;
