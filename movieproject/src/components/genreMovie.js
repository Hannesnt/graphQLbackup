import React from "react";
import Carousel from "better-react-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Hero from "./hero";
import OnClick from "./onClick";
function GenreMovie({ visitedMovies, setVisitedMovies, hideSearch }) {
  let { id } = useParams();
  const [test, setTest] = useState([]);
  const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=a84c81299cedd7c0344634dbbe38a768&with_genres=${id}`;

  const getGenreMovies = async () => {
    const res = await fetch(genreUrl);
    const movies = await res.json();
    setTest(movies.results);
  };
  getGenreMovies();

  function output() {
    return (
      <>
        <Hero title="Movies:" hideSearch={hideSearch} />
        <Carousel cols={5} rows={1} gap={10} loop>
          {test.map((movie) => {
            return (
              <Carousel.Item key={movie.id}>
                <div
                  className="karuseller"
                  onClick={() => {
                    OnClick((movie = { movie }), {
                      visitedMovies,
                      setVisitedMovies,
                    });
                  }}
                >
                  <img
                    className="carouselImg"
                    width="75%"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h4 className="carouselTitle">{movie.title}</h4>
                  <span className="voteSpan">
                    <FontAwesomeIcon icon={faStar} className="star" />
                    {movie.vote_average}
                  </span>
                  <div className="btnDiv d-flex justify-content-center py-2"></div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </>
    );
  }

  return output({
    visitedMovies,
    setVisitedMovies,
    hideSearch,
  });
}

export default GenreMovie;
