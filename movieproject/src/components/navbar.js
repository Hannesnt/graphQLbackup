import React, { useRef } from "react";
import { Link } from "react-router-dom";
const Navbar = ({
  setSearchText,
  searchText,
  searchResults,
  setSearchTest,
}) => {
  let inputref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updateSearch = () => {
    if (inputref.current.value === " ") {
      setSearchText("");
    } else {
      if (inputref.current.value.length === 0) {
        let resultDiv = document.querySelector(".resultDiv");
        resultDiv.style.display = "none";
        let searchbar = document.querySelector(".searchBarInput");
        searchbar.style.display = "none";
      }
      if (inputref.current.value.length > 0) {
        let resultDiv = document.querySelector(".resultDiv");
        resultDiv.style.display = "block";
        let searchbar = document.querySelector(".searchBarInput");
        searchbar.style.display = "block";
      }
      setSearchText(inputref.current.value);
    }
  };
  const searchClick = () => {
    let searchbar = document.querySelector(".searchBarInput");
    searchbar.style.display = "block";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark py-5">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item h3 mx-5">
                <Link
                  className="nav-link text-light"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item h3 mx-3">
                <Link className="nav-link text-light" to="/actors">
                  Actors
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2 searchy"
                type="search"
                placeholder="Search your movies"
                aria-label="Search"
                ref={inputref}
                value={searchText}
                onChange={updateSearch}
                onClick={searchClick}
              />
              <Link
                to="/search"
                onClick={() => {
                  setSearchTest([searchResults]);
                }}
              >
                <button type="submit" className="btn btn-warning">
                  Search
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
