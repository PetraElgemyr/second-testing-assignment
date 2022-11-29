/**
 *@jest-environment jsdom
 */
import * as movieAppFunctions from "./../ts/movieApp";

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

  //   movieAppFunctions.init();
  expect(spy).toHaveBeenCalled();
});

test("should create p-tag in container div", () => {
  document.body.innerHTML = `<div id="movie-container"></div> `;
  let container: HTMLDivElement = document.getElementById(
    "movie-container"
  ) as HTMLDivElement;

  movieAppFunctions.displayNoResult(container);

  expect(container.innerHTML).toContain("<p>Inga sökresultat att visa</p>");
});
