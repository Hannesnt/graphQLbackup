import React from "react";
import { Link } from "react-router-dom";
import OnClick from "./onClick";
const urlImage = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, visitedMovies, setVisitedMovies }) => {
  const posterUrl = `${urlImage}${movie.poster_path}`;
  if (movie.poster_path === null) {
    return null;
  }
  return (
    <div
      className="searchDiv"
      onClick={() => {
        OnClick((movie = { movie }), {
          visitedMovies,
          setVisitedMovies,
        });
      }}
    >
      <img className="searchImg" src={posterUrl} alt={movie.original_title} />
      <p className="searchText">{movie.original_title}</p>
    </div>
  );
};

const SearchBar = ({
  searchResults,
  visitedMovies,
  setVisitedMovies,
  setSearchTest,
  hideSearch,
}) => {
  const htmlResults = searchResults.map((obj, i) => {
    return (
      <MovieCard
        movie={obj}
        key={i}
        visitedMovies={visitedMovies}
        setVisitedMovies={setVisitedMovies}
        hideSearch={hideSearch}
      />
    );
  });

  return (
    <>
      {htmlResults && (
        <div className="movieContainer">
          <div className="row gx-0 justify-content-center searchBarInput">
            {htmlResults}
          </div>
          <div className="resultDiv" onClick={hideSearch}>
            <Link
              to="/search"
              onClick={() => {
                setSearchTest([searchResults]);
              }}
            >
              <p className="resultsPara">See all results...</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export { SearchBar, MovieCard };
