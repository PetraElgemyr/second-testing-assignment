import axios from "axios";
import { IMovie } from "../../models/IMovie";
//mocken

export const mockData: IMovie[] = [
  {
    Title: "Shrek",
    imdbID: "019462",
    Type: "genre",
    Poster: "poster",
    Year: "2003",
  },
  {
    Title: "Shrek 2",
    imdbID: "019542",
    Type: "genre",
    Poster: "poster",
    Year: "2005",
  },
  {
    Title: "Shrek 2",
    imdbID: "02341",
    Type: "genre",
    Poster: "poster",
    Year: "2007",
  },
];

// export const getData = async (searchText: string): Promise<IMovie[]> => {
//   return new Promise((resolve) => {
//     resolve(mockData);
//   });
// };

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    if (searchText.length > 0) {
      resolve(mockData);
    } else {
      reject();
    }
  });
};
