import React from "react";

function NewsDetail(props) {
  return (
    <div id={`news-detail-${props.id}`} className="news-detail mt-10 p-6">
      <h2 className="text-2xl font-semibold">{props.title}</h2>
      <img
        className="w-full h-64 object-cover rounded mt-4"
        src={props.imgUrl}
        alt="news detail"
      />
      <p className="mt-4">{props.description}</p>
      <div className="mt-4">
        <b>Source:</b>
        <ul>
          {props.source.split(",").map((url, idx) => (
            <li key={idx}>
              <a
                href={url.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {url.trim()}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <b>News Provider:</b>
        <ul>
          {props.newsProvider.split(",").map((provider, idx) => (
            <li key={idx}>{provider.trim()}</li>
          ))}
        </ul>
      </div>
      <p className="mt-4">{props.content}</p>
    </div>
  );
}

export default NewsDetail;
