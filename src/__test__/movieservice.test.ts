/**
 *@jest-environment jsdom
 */

import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import { IMovie } from "../ts/models/IMovie";
import { getData } from "../ts/services/movieservice";
import axios from "axios";
import { mockData } from "../ts/services/__mocks__/movieservice";

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

// jest.mock("axios", () => ({
//   get: async () => {
//     return new Promise((resolve, reject) => {
//       if (Promise<IMovie[]>) {
//         resolve({
//           data: {
//             Search: mockData,
//           },
//         });
//       } else {
//         reject({
//           // data: "Ingenting finns här",
//         });
//       }
//     });
//   },
// }));

describe("should test api", () => {
  test("should successfully get data with mocked axios", async () => {
    // jest.mock("axios", () => ({
    //   get: async () => {
    //     return new Promise((resolve) => {
    //       resolve({
    //         data: {
    //           Search: mockData,
    //         },
    //       });
    //     });
    //   },
    // }));
    // arrange
    let text: string = "shrek";

    //act
    let movies: IMovie[] = await getData(text);

    //assert
    expect(movies.length).toBe(3);
    expect(movies[0].Title).toBe("Star Wars IV");
    expect(movies[2].Year).toBe("2004");
  });

  test("should reject and fail", async () => {
    jest.mock("axios", () => ({
      get: async () => {
        return new Promise((reject) => {
          reject({
            data: [],
          });
        });
      },
    }));

    let text: string = "";
    let movies: IMovie[] = [];
    try {
      movies = await getData(text);
    } catch (error: any) {
      //catch (response: any) {
      // expect(response.data).toBe("Ingenting finns här");
      // expect(response.data.length).toBe(0);
      expect(error).toBe([]);
    }
  });
});
