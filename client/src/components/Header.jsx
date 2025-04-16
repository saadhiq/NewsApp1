import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown, faHouse } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [active, setActive] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate(); // For programmatic navigation

  const category = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
    "Politics",
  ];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  }

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm(""); // Clear input after search
    }
  };

  return (
    <header>
      <nav className="pl-2 pr-2 fixed top-0 left-0 w-full h-auto bg-gray-600 z-10 flex items-center justify-between px-8">
        <div className="pl-2 flex items-center md:basis-1/6 sm:basis-1/4 basis-1/3 ">
          <a href="/" className="group">
            <FontAwesomeIcon icon={faHouse} className="text-4xl " />
          </a>
        </div>

        {/* Search Bar (Middle) */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search news..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>
        </form>

        {/* Navigation Links (Right) */}
        <ul
          className={
            active
              ? "nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active"
              : "nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end"
          }
        >
          <li>
            <Link
              className="no-underline font-semibold text-white"
              to="/"
              onClick={() => setActive(!active)}
            >
              All News
            </Link>
          </li>
          <li className="dropdown-li">
            <Link
              className="no-underline font-semibold text-white flex items-center gap-2"
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
              }}
            >
              Top-Headlines{" "}
              <FontAwesomeIcon
                className={
                  showCategoryDropdown
                    ? "down-arrow-icon down-arrow-icon-active"
                    : "down-arrow-icon"
                }
                icon={faCircleArrowDown}
              />
            </Link>
            <ul
              className={
                showCategoryDropdown
                  ? "dropdown p-2 show-dropdown bg-gray-700"
                  : "dropdown p-2 bg-gray-700"
              }
            >
              {category.map((element, index) => (
                <li
                  key={index}
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                >
                  <Link
                    to={`/top-headlines/${element}`}
                    className="flex gap-3 capitalize text-white"
                    onClick={() => setActive(!active)}
                  >
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link className="no-underline font-semibold text-white" to="/">
              About Us
            </Link>
          </li>
          <li>
            <Link
              className="no-underline font-semibold text-white"
              to="#"
              onClick={() => toggleTheme()}
            >
              <input type="checkbox" className="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label>
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu */}
        <div
          className={
            active
              ? "ham-burger z-index-100 ham-open"
              : "ham-burger z-index-100"
          }
          onClick={() => setActive(!active)}
        >
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
