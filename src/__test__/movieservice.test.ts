/**
 *@jest-environment jsdom
 */

import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import { IMovie } from "../ts/models/IMovie";
import { getData } from "../ts/services/movieservice";
import axios from "axios";
import { mockData } from "../ts/services/__mocks__/movieservice";

/* PETRA KOLLA LÄNKAR!!!
Tips om att mocka (axios):
https://stackoverflow.com/questions/51495473/typescript-and-jest-avoiding-type-errors-on-mocked-functions
https://ooanishoo.medium.com/mock-axios-with-jest-and-react-testing-library-in-typescript-react-1c084d9ea880
https://jestjs.io/docs/mock-function-api#mockfnmockresolvedvaluevalue
https://www.appsloveworld.com/reactjs/100/4/type-of-axios-mock-using-jest-typescript 


*/

jest.mock("axios"); //mockar axios-anropet

//sparar objekt av typ axios för att kunna använda sen. Finns två sätt att skriva det på:
// const mockedAxios = jest.mocked(axios); // <-- funkar den att använda jest.mocked()  jest-dokumentation?
const mockedAxios = axios as jest.Mocked<typeof axios>;
//ett objekt av DATATYPEN axios för att kunna använda mockResolve/RejectValue(), fick ej att funka annars???

describe("should test getData axios", () => {
  test("should successfully get data with mocked axios", async () => {
    mockedAxios.get.mockResolvedValue({ data: { Search: mockData } }); //använd variabeln för att get/hämta resolves

    let text: string = "filmtext"; //testtext för att inte få reject i getData

    //få tillbaka
    let movies: IMovie[] = await getData(text);

    //ska få min mocklista mockData jag skapat
    expect(movies.length).toBe(3);
    expect(movies[0].Title).toBe("Star Wars IV");
    expect(movies[2].Year).toBe("2004");
  });

  test("should fail and return empty list", async () => {
    mockedAxios.get.mockRejectedValue({
      data: { mockData },
    }); //använd variabeln för att get/hämta rejects data

    let text: string = ""; //skicka tom text, kör else-sats i getData då (fejka fel)

    //anropa getData som ger tillbaka ett nytt löfte med ANTINGEN resolve eller reject. Nu reject
    let rejectResponse: IMovie[] = await getData(text);
    //här är rejectResponse det man får tillbaka från vår mockade getData vid fail/reject, dvs tom array [].
    //movies-listan utan movies

    expect(rejectResponse.length).toBe(0);
    expect(rejectResponse).toEqual([]);
  });
});

//Ej löst med detta sätt nedan??

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

// describe("should test api", () => {
//   test("should successfully get data with mocked axios", async () => {
//     // arrange
//     let text: string = "shrek";

//     //act
//     let movies: IMovie[] = await getData(text);

//     //assert
//     expect(movies.length).toBe(3);
//     expect(movies[0].Title).toBe("Star Wars IV");
//     expect(movies[2].Year).toBe("2004");
//   });

//   test("should reject and fail", async () => {
//     jest.mock("axios", () => ({
//       get: async () => {
//         return new Promise((reject) => {
//           reject({
//             data: [],
//           });
//         });
//       },
//     }));

//     let text: string = "";
//     let movies: IMovie[] = [];
//     try {
//       movies = await getData(text);
//     } catch (error: any) {
//       //catch (response: any) {
//       // expect(response.data).toBe("Ingenting finns här");
//       // expect(response.data.length).toBe(0);
//       expect(error).toBe([]);
//     }
//   });
// });
