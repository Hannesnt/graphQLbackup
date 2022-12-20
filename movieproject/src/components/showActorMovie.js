import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Hero from "./hero";
const QUERY_ALL_MOVIES = gql`
  query Query {
    actors {
      id
      name
      popularity
      profile_path
      movies {
        poster_path
        title
        id
        actor
        overview
        vote_average
      }
    }
  }
`;

function ShowActorMovie({ hideSearch }) {
  let { id } = useParams();
  const { data, loading, error } = useQuery(QUERY_ALL_MOVIES);
  if (loading) {
    return <h3 className="loading"> Loading...</h3>;
  }
  if (error) {
    console.log(error);
  }
  return (
    <>
      {data.actors.map((actor) => {
        return id === actor.id ? (
          <div key={actor.id}>
            <Hero title={actor.name} text="Movies" hideSearch={hideSearch} />
          </div>
        ) : (
          ""
        );
      })}

      <div className="actorContainer">
        {data &&
          data.actors.map((actor) => {
            return id === actor.id
              ? actor.movies.map((movie) => {
                  return (
                    <div key={movie.id} className="actorMovieDiv">
                      <h2 className="actorName">{movie.title}</h2>
                      <img
                        className="carouselImg"
                        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                        alt={movie.title}
                      />

                      <p className="movieOverview">{movie.overview}</p>
                      <span className="voteSpan">
                        <FontAwesomeIcon icon={faStar} className="star" />
                        {movie.vote_average}
                      </span>
                    </div>
                  );
                })
              : "";
          })}
      </div>
    </>
  );
}

export default ShowActorMovie;
