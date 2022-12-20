const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
const saveToLocalStorage = (nyckel, items) => {
  localStorage.setItem(nyckel, JSON.stringify(items));
};
function OnClick(props, { visitedMovies, setVisitedMovies }) {
  openInNewTab(`https://www.themoviedb.org/movie/${props.movie.id}`);
  visitedMovies.map((test) => {
    let index = visitedMovies.indexOf(test);
    return test.id === props.movie.id
      ? visitedMovies.splice(index, 1) && localStorage.removeItem(test.id)
      : "";
  });
  if (visitedMovies.length < 5) {
    saveToLocalStorage(props.movie.id, props.movie);
    setVisitedMovies([props.movie, ...visitedMovies]);
  }
  if (visitedMovies.length === 5) {
    localStorage.removeItem(visitedMovies[4].id);
    visitedMovies.pop();
    saveToLocalStorage(props.movie.id, props.movie);
    setVisitedMovies([props.movie, ...visitedMovies]);
  }
}

export default OnClick;
