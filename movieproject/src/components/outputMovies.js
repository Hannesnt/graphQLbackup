import React from "react";
function OutPutMovies(props) {
  return (
    <>
      <img
        width="200px"
        src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
        alt={props.movie.title}
      />
    </>
  );
}
export default OutPutMovies;
