/**
 *@jest-environment jsdom
 */

import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import { IMovie } from "../ts/models/IMovie";
import { getData } from "../ts/services/movieservice";
import axios from "axios";
import { mockData } from "../ts/services/__mocks__/movieservice";

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
    let movies: IMovie[] = await getData(text);

    //assert
    expect(movies.length).toBe(3);
    expect(movies[0].Title).toBe("Shrek");
    expect(movies[2].Year).toBe("2007");
  });

  test("should reject and error", async () => {
    jest.mock("axios", () => ({
      get: async () => {
        return new Promise((resolve, reject) => {
          reject({
            data: "Ingenting finns här",
          });
        });
      },
    }));

    let text: string = "";
    let movies: IMovie[];
    try {
      movies = await getData(text);
    } catch (response: any) {
      expect(response.data).toBe("Ingenting finns här");
    }
  });
});
