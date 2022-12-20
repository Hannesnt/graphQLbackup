import "./App.css";
import Testkarusell from "./components/carousel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayActors from "./components/DisplayActors";
import ShowActorMovie from "./components/showActorMovie";
import ShowSearchedMovies from "./components/showSearchedMovies";
import GenreMovie from "./components/genreMovie";
function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [searchTest, setSearchTest] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [visitedMovies, setVisitedMovies] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const saveToLocalStorage = (nyckel, items) => {
    localStorage.setItem(nyckel, JSON.stringify(items));
  };
  const hideSearch = () => {
    let searchbar = document.querySelector(".searchBarInput");
    searchbar.style.display = "none";
    let resultDiv = document.querySelector(".resultDiv");
    resultDiv.style.display = "none";
  };

  useEffect(() => {
    if (searchText) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=a84c81299cedd7c0344634dbbe38a768&language=en-US&query=${searchText}&page=1&include_adult=false`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results);
        });
    }
  }, [searchText]);

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Navbar
            searchText={searchText}
            setSearchText={setSearchText}
            inputFocus={inputFocus}
            setInputFocus={setInputFocus}
            hideSearch={hideSearch}
            searchTest={searchTest}
            setSearchTest={setSearchTest}
            searchResults={searchResults}
          />
          <SearchBar
            keyword={searchText}
            searchResults={searchResults}
            visitedMovies={visitedMovies}
            setVisitedMovies={setVisitedMovies}
            saveToLocalStorage={saveToLocalStorage}
            searchTest={searchTest}
            setSearchTest={setSearchTest}
            hideSearch={hideSearch}
          />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Testkarusell
                  visitedMovies={visitedMovies}
                  setVisitedMovies={setVisitedMovies}
                  saveToLocalStorage={saveToLocalStorage}
                  inputFocus={inputFocus}
                  setInputFocus={setInputFocus}
                  hideSearch={hideSearch}
                />
              }
            />
            <Route
              path="/actors"
              element={<DisplayActors hideSearch={hideSearch} />}
            />
            <Route
              path="/actors/:id"
              element={<ShowActorMovie hideSearch={hideSearch} />}
            />
            <Route
              path="/search"
              element={
                <ShowSearchedMovies
                  searchText={searchText}
                  searchResults={searchResults}
                  visitedMovies={visitedMovies}
                  setVisitedMovies={setVisitedMovies}
                  saveToLocalStorage={saveToLocalStorage}
                  searchTest={searchTest}
                  setSearchTest={setSearchTest}
                  hideSearch={hideSearch}
                />
              }
            />
            <Route
              path="/genre/:id"
              element={
                <GenreMovie
                  visitedMovies={visitedMovies}
                  setVisitedMovies={setVisitedMovies}
                  saveToLocalStorage={saveToLocalStorage}
                  hideSearch={hideSearch}
                />
              }
            />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
