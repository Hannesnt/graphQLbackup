import { ActorList } from "../FakeData.js";
import { MovieList } from "../MovieData.js";
export const resolvers = {
  Query: {
    movies: () => MovieList,
    actors: () => ActorList,
  },
  Actor: {
    movies: (parent) => {
      return MovieList.filter((movie) => movie.actor === parent.id);
    },
  },
};
