/**
 *@jest-environment jsdom
 */
import { IMovie } from "../ts/models/IMovie";
import * as movieAppFunctions from "./../ts/movieApp";
import * as serviceFunctions from "../ts/services/movieservice";
import { describe, test, expect, jest } from "@jest/globals";

describe("init function", () => {
  test("should call handleSubmit at submit", () => {
    document.body.innerHTML = `<form id="searchForm">
  <input type="text" id="searchText" placeholder="Skriv titel här" />
  <button type="submit" id="search">Sök</button> </form> `;
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

// test("should run handleSubmit and call getData", () => {
//   // let spy = jest.spyOn(service, "getData").mockImplementation(
//   //   () =>
//   //     new Promise((resolve) => {
//   //       resolve();
//   //     })
//   // );
//   let spy = jest.spyOn(service, "getData").mockReturnValue();

//   movieAppFunctions.handleSubmit();

//   expect(spy).toHaveBeenCalled();
// });

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
    expect(document.querySelectorAll("h3").length).toBe(3);
    expect(document.querySelectorAll("div.movie").length).toBe(3);
    expect(document.querySelectorAll("img").length).toBe(3);

    document.body.innerHTML = "";
  });
});
