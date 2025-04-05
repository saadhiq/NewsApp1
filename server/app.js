require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// const API_KEY = process.env.API_KEY;

// function fetchNews(url, res) {
//   axios
//     .get(url)
//     .then((response) => {
//       if (response.data.totalResults > 0) {
//         console.log("Received data from Flask server:", response.data);
//         res.json({
//           status: 200,
//           success: true,
//           message: "successfully fetched the data",
//           data: response.data,
//         });
//       } else {
//         res.json({
//           status: 200,
//           success: true,
//           message: "No more results to show",
//         });
//       }
//     })
//     .catch((error) => {
//       res.json({
//         status: 500,
//         success: false,
//         message: " Failed to fetch",
//         error: error.message,
//       });
//     });
// }

function fetchNews(url, res) {
  axios
    .get(url)
    .then((response) => {
      console.log("Received data from Flask server:", response.data);
      const length_of_data = response.data.length;

      if (response.status == 200 && length_of_data > 0) {
        res.status(200).json({
          success: true,
          message: "Successfully fetched the data",
          data: response.data,
        });
      } else {
        res.status(200).json({
          success: true,
          // message: "News list is empty",
          data: response.data,
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching from Scraper:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch data from Scraper",
        error: error.message,
      });
    });
}

app.options("/all-news", cors());
app.get("/all-news", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 40;
  let page = parseInt(req.query.page) || 1;
  let url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apikey=${API_KEY}`;
  fetchNews(url, res);
});

//latest news
app.options("latest-news", cors());
app.get("/latest-news", (req, res) => {
  let url = "http://127.0.0.1:8000/latest-news";
  fetchNews(url, res);
});

//top-headlines
app.options("/top-headlines/:category", cors());
app.get("/top-headlines/:category", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
 
  // let category = req.query.category || "Business";
  let category = req.params.category;

  // if (category=='politics'){
  //   category = "politics";
  // }
  console.log(category)


  let url = `http://127.0.0.1:8000/news?category=${category}`;
  fetchNews(url, res);
});

//Search
// app.options("/search/:query", cors());
// app.get("/search/:query", (req, res) => {
//   let pageSize = parseInt(req.query.pageSize) || 80;
//   let page = parseInt(req.query.page) || 1;
 
//   // let category = req.query.category || "Business";
//   let query = req.params.query;

//   // if (category=='politics'){
//   //   category = "politics";
//   // }
//   console.log(query)


//   let url = `http://127.0.0.1:8000/search?query=${query}`;
//   fetchNews(url, res);
// });

//country
// app.options("/country/:iso", cors());
// app.get("/country/:iso", (req, res) => {
//   let pageSize = parseInt(req.query.pageSize) || 80;
//   let page = parseInt(req.query.page) || 1;

//   const country = req.params.iso;
//   let url = `https://newsapi.org/v2/top-headlines?country=${country}&apikey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
//   fetchNews(url, res);
// });

//specific news
app.options("/news", cors());
app.get("/news", (req, res) => {
  const category = req.query.category;
  const id = req.query.id;

  if (!category || !id) {
    return res.status(400).json({
      success: false,
      message: "Missing required query parameters: category and id",
    });
  }

  // Assuming your Flask API provides details via this URL
  const url = `http://127.0.0.1:8000/news?category=${category}&id=${id}`;
  console.log("Forwarding request to Python backend:", url);

  fetchNews(url, res);
});

app.options("/search", cors());
app.get("/search", (req, res) => {
  const query = req.query.query; // Extract 'query' from query string
  const pageSize = parseInt(req.query.pageSize) || 80;
  const page = parseInt(req.query.page) || 1;

  // Validate query parameter
  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Missing required query parameter: query",
    });
  }

  // Log for debugging
  // console.log("Search query:", query);

  // Construct Flask URL with query, page, and pageSize
  const url = `http://127.0.0.1:8000/search?query=${query}`;
  // console.log("Forwarding request to Flask backend:", url);

  fetchNews(url, res);
});

//port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
