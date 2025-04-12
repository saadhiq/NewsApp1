import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Replace useParams with useLocation
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function Search1() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query"); // Get query from URL (e.g., ?query=technology)
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageSize = 6; // Constant since it’s not dynamic

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

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
          setTotalResults(json.data.length);
          setData(json.data);
          //   setTotalResults(json.data.totalResults || 0);
          //   setData(json.data.articles || []);
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
  }, [page, query]); // Depend on query, not search

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
        <h3> Search Result </h3>
      </div>
      <div className="mt-16 mb-10 cards grid grid-cols-1 gap-4 xs:p-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:px-16 lg:gap-6 xl:gap-8">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.short_summary}
                imgUrl={element.cover_image}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source?.name || element.source} // Handle source as object or string
              />
            ))
          ) : (
            <p>No articles found for this search query.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className="pagination-btn"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default Search1;
