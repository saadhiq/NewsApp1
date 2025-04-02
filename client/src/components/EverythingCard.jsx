import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function EverythingCard(props) {
  return (
    <div className="everything-card mt-10 shadow-lg rounded-lg overflow-hidden border bg-white max-w-sm mx-auto">
      <div className="p-6 pt-8 pr-6 pl-6 flex flex-col gap-4">
        {/* Title */}
        <b className="title text-lg font-semibold text-center line-clamp-2">
          {props.title}
        </b>

        {/* Image */}
        <div className="w-full flex justify-center">
          <img
            className="w-60 h-48 object-cover rounded"
            src={props.imgUrl}
            alt="news"
          />
        </div>

        {/* Description */}
        <div className="description">
          <p className="description-text leading-6 text-gray-700 text-center line-clamp-3">
            {props.description}
          </p>
        </div>

        {/* Info Section */}
        <div className="info compact space-y-2 text-center">
          {/* <div className="source-info flex flex-col gap-1 items-center">
            {props.source.split(",").map((url, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="font-semibold">Source {idx + 1}:</span>
                <a
                  href={url.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all line-clamp-1"
                >
                  {url.trim()}
                </a>
              </div>
            ))}
          </div> */}

          {/* <div className="origin flex flex-col space-y-1 text-sm text-gray-600 items-center">
            {props.newsProvider.split(",").map((provider, idx) => (
              <p key={idx} className="origin-item line-clamp-1">
                <span className="font-semibold">News Provider {idx + 1}:</span>{" "}
                {provider.trim()}
              </p>
            ))}
          </div> */}
        </div>
        {/* Link to the same page's news detail section */}
        <Link
          to={`/news?category=${props.category}&id=${props.id}`}  // Links to a specific section in the page
          className="text-center text-blue-500 mt-4 font-semibold text-lg hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-120"
        >
          <span className="mr-2">➡️</span> Read more
       </Link>
      </div>
    </div>
  );
}

export default EverythingCard;
