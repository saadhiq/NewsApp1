import "./App.css";
import Header from "./components/Header";
import LatestNews from "./components/LatestNews";
import Footer from "./components/Footer";
import TopHeadlines from "./components/TopHeadlines";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsDetail from "./components/NewsDetail";
import Search from "./components/Search";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LatestNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/news" element={<NewsDetail />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
