import React from "react";
import Hero from "./hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import OnClick from "./onClick";
function showSearchedMovies({
  searchTest,
  searchText,
  hideSearch,
  visitedMovies,
  setVisitedMovies,
}) {
  if (searchTest.length > 0) {
    const htmlResults = searchTest[0].map((movie) => {
      return (
        <div
          key={movie.id}
          className="karuseller searchedMovies"
          onClick={() => {
            OnClick((movie = { movie }), {
              visitedMovies,
              setVisitedMovies,
            });
          }}
        >
          <img
            className="carouselImg"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
          <h4 className="searchedMoviesTitle">{movie.original_title}</h4>
          <span className="voteSpan">
            <FontAwesomeIcon icon={faStar} className="star" />
            {movie.vote_average}
          </span>
        </div>
      );
    });

    return (
      <>
        <Hero
          title={`You have searched for "${searchText}"`}
          hideSearch={hideSearch}
        />
        {htmlResults && (
          <div className="searchedMovieContainer">{htmlResults}</div>
        )}
      </>
    );
  }
  if (searchTest.length === 0) {
    return <Hero title="Search for a movie.." hideSearch={hideSearch} />;
  }
}

export default showSearchedMovies;
