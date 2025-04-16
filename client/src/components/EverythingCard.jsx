import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
function EverythingCard(props) {
  return (
    <div className="everything-card mt-10 pb-10 shadow-lg rounded-lg overflow-hidden border bg-white max-w-sm mx-auto min-h-[450px]">
      <div className="p-6 pt-8 pr-6 pl-6 flex flex-col h-full">
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
        <div className="description flex flex-col items-center flex-grow justify-center">
          <p className="description-text leading-6 text-gray-700 text-center line-clamp-3">
            {props.description}
          </p>
        </div>

        {/* Anchor Link at the bottom */}
        <div className="flex justify-center mt-auto pt-4">
          <Link
            to={`/news?category=${props.category}&id=${props.id}`}
            className="text-blue-500 font-semibold text-lg hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faCircleChevronDown} className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EverythingCard;
