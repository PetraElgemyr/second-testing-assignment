/**
 *@jest-environment jsdom
 */

import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import { IMovie } from "../ts/models/IMovie";
import { getData } from "../ts/services/movieservice";
import axios from "axios";

let mockData: IMovie[] = [
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

// jest.mock("./../ts/services/movieservice.ts");
jest.mock("axios", () => ({
  get: async () => {
    return new Promise((resolve) => {
      resolve({
        data: {
          Search: mockData,
        },
      });
    });
  },
}));

describe("should test api", () => {
  test("should test get data", async () => {
    // arrange
    expect.assertions(3);
    let text: string = "shrek";
    //   document.body.innerHTML = `  <input type="text" id="searchText" placeholder="Skriv titel här" /> `;
    //   let text: string = (document.getElementById("searchText") as HTMLInputElement).value;

    //act
    let movieInfos: IMovie[] = await getData(text);

    //assert
    expect(movieInfos.length).toBe(3);
    expect(movieInfos[0].Title).toBe("Shrek");
    expect(movieInfos[2].Year).toBe("2007");
  });
});
