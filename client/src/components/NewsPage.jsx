import React from "react";
import EverythingCard from "./EverythingCard";
import NewsDetail from "./NewsDetail";

function NewsPage() {
  const newsData = [
    {
      id: "1",
      title: "News Title 1",
      imgUrl: "https://via.placeholder.com/150",
      description: "This is a brief summary of the news item.",
      source: "http://source1.com, http://source2.com",
      newsProvider: "Provider 1, Provider 2",
      content: "This is the detailed content of the news item."
    },
    // More news items...
  ];

  return (
    <div className="news-page">
      {newsData.map(news => (
        <EverythingCard key={news.id} />
      ))}

      {/* Show detailed view for each news item on the same page */}
      {newsData.map(news => (
        <NewsDetail key={news.id}  />
      ))}
    </div>
  );
}

export default NewsPage;
