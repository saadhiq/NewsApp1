import React, { useState, useEffect } from "react";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function AllNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 15;

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`http://localhost:3000/latest-news`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((json) => {
        if (json.success) {
          setTotalResults(json.data.length);
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
  }, [page]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="today-header mt-8 mb-4 text-center font-semibold text-3xl text-gray-800">
        <h3>Latest News</h3>
      </div>

      <div className="mt-16 mb-10 cards grid grid-cols-1 gap-4 xs:p-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:px-16 lg:gap-6 xl:gap-8">
  {!isLoading ? (
    data.map((element, index) => {
      const isGroup = !!element.group_id;

      if (
        isGroup &&
        (!element.articles || element.articles.length === 0)
      ) {
        return null; // Don't render the card if no articles exist
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
          description={element.summary}
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
    <Loader />
  )}
</div>


      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-25 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn text-center"
            onClick={handlePrev}
          >
            &larr; Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            className="pagination-btn text-center"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default AllNews;
