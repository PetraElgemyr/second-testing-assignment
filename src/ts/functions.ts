import { IMovie } from "./models/IMovie";
import { describe, test, expect, jest } from "@jest/globals";

export const movieSort = (movies: IMovie[], desc: boolean = true) => {
  return movies.sort((a: IMovie, b: IMovie) => {
    if (desc) {
      if (a.Title > b.Title) return 1; //om a större än b, flyttas upp ett steg
      if (a.Title < b.Title) return -1; //a mindre än b, flytta ner

      return 0; //om titlar är lika stora
    } else {
      //Om desc=false så ska detta ske, reverse
      if (a.Title > b.Title) return -1;
      if (a.Title < b.Title) return 1;

      return 0;
    }
  });
};
