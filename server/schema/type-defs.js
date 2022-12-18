import { gql } from "apollo-server";

export const typeDefs = gql`
  type Movie {
    id: ID!
    poster_path: String!
    title: String!
    vote_average: Float!
    actor: ID!
    overview: String!
  }
  type Actor {
    id: ID!
    name: String!
    popularity: Float!
    profile_path: String!
    vote_average: Float!
    movies: [Movie!]
  }
  type Query {
    actors: [Actor!]!
    movies: [Movie!]!
  }
`;
