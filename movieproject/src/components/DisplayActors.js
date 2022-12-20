import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Hero from "./hero";
const QUERY_ALL_ACTORS = gql`
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
      }
    }
  }
`;
function DisplayActors({ hideSearch }) {
  const { data, loading, error } = useQuery(QUERY_ALL_ACTORS);
  if (loading) {
    return <h1> DATA IS LOADING...</h1>;
  }
  if (error) {
    console.log(error);
  }
  return (
    <>
      <Hero title="Popular Actors" hideSearch={hideSearch} />
      <div className="actorContainer">
        {data &&
          data.actors.map((actor) => {
            return (
              <Link to={`/actors/${actor.id}`} key={actor.id}>
                <div className="actorDiv">
                  <h2 className="actorName">{actor.name}</h2>
                  <img
                    className="actorImg"
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`}
                    alt={actor.name}
                  />
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default DisplayActors;
