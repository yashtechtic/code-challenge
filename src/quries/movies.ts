import { DocumentNode, gql } from "@apollo/client";

export const GET_STAR_WARS_MOVIES: DocumentNode = gql`
  query GetStarWarsMovies {
    allFilms {
      films {
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
            classification
            homeworld {
              name
            }
          }
        }
      }
    }
  }
`;