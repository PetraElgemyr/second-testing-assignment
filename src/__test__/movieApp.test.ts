/**
 *@jest-environment jsdom
 */
import { IMovie } from "../ts/models/IMovie";
import * as movieAppFunctions from "./../ts/movieApp";
import * as serviceFunctions from "../ts/services/movieservice";
import { describe, test, expect, jest } from "@jest/globals";
import { mockData } from "../ts/services/__mocks__/movieservice"; //används ej för nuvarande

describe("init function", () => {
  test("should call handleSubmit at submit", () => {
    document.body.innerHTML = `<form id="searchForm">
  <input type="text" id="searchText" placeholder="Skriv titel här" /> `;
    //<button type="submit" id="search">Sök</button> </form>
    let spy = jest.spyOn(movieAppFunctions, "handleSubmit").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve();
        })
    );

    movieAppFunctions.init();
    // (document.getElementById("search") as HTMLButtonElement).click();
    (document.getElementById("searchForm") as HTMLFormElement).submit();

    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });
});

describe("displayNoResult", () => {
  test("should create p-tag in container div", () => {
    document.body.innerHTML = `<div id="movie-container"></div> `;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    movieAppFunctions.displayNoResult(container);

    expect(container.innerHTML).toContain("<p>Inga sökresultat att visa</p>");
    document.body.innerHTML = "";
  });
});

jest.mock("./../ts/services/movieservice.ts"); //mocka "riktiga" movieservice, man vill inte köra den

describe("createHtml function", () => {
  test("should create html for movie", async () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div> `;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;
    let searchText: string = "star";
    //för att få tillbaka sin filmlista men ej göra en riktig sökning

    let movies: IMovie[] = await serviceFunctions.getData(searchText);
    //Act
    movieAppFunctions.createHtml(movies, container);

    //Assert
    expect(document.querySelectorAll("h3")[0].innerHTML).toBe("Star Wars IV");
    expect(document.querySelectorAll("h3").length).toBe(3);
    expect(document.querySelectorAll("div.movie").length).toBe(3);
    expect(document.querySelectorAll("img").length).toBe(3);

    document.body.innerHTML = "";
  });
});

// jest.mock("./../ts/services/movieservice.ts");
describe("handleSubmit", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  jest.mock("axios", () => ({
    get: async () => {
      return new Promise((reject) => {
        reject({
          data: [],
        });
      });
    },
  }));

  test("should call createHtml", async () => {
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" value="star" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
    </form> <div id="movie-container"></div>`;
    let spy = jest.spyOn(movieAppFunctions, "createHtml").mockReturnValue();

    //Act
    await movieAppFunctions.handleSubmit();

    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });

  test("should call displayNoResult", async () => {
    //arrange
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" value="star" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
  </form>
  <div id="movie-container"></div>`;
    let searchText = (document.getElementById("searchText") as HTMLInputElement)
      .value;
    searchText = "";
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    let dataSpy = jest.spyOn(serviceFunctions, "getData").mockImplementation(
      () =>
        new Promise((reject) => {
          reject([]);
        })
    );

    let spy = jest
      .spyOn(movieAppFunctions, "displayNoResult")
      .mockReturnValue();

    //act
    await movieAppFunctions.handleSubmit();

    // expect(spy).toHaveReturnedWith([]);
    // if (dataSpy) {
    //assert
    expect(dataSpy).toHaveBeenCalled();
    expect(spy).toBeCalledWith(container);
    expect(serviceFunctions.getData).toHaveBeenCalledTimes(1);
    // }
  });

  test("should call displayNoResult in catch", () => {});
});

/*    


describe("handleSubmit", () => {

  test("should call on function displayNoResult", async () => {
    //arrange
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" value="star" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
  </form>
  <div id="movie-container"></div>`;
    let spy = jest
      .spyOn(movieAppFunctions, "displayNoResult")
      .mockReturnValue();

    //act
    await movieAppFunctions.handleSubmit();

    //assert
    expect(spy).toHaveBeenCalled();
  });
});


*/
