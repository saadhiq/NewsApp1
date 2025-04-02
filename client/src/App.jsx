import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import Footer from "./components/Footer";
import TopHeadlines from "./components/TopHeadlines";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryNews from "./components/CountryNews";
import NewsDetail from "./components/NewsDetail"; // Assuming you'll create this component for detailed view
import NewsPage from "./components/NewsPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
          {/* Route for news details */}
          <Route path="/news:id" element={<NewsDetail />} />
          {/* <Route path="/news/:id" element={<NewsPage />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
