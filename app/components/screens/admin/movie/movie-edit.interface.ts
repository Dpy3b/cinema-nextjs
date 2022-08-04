import { Omit } from "@reduxjs/toolkit/dist/tsHelpers";



import { IGenre, IMovie } from "@/shared/types/movie.types";


export interface IMovieEditInput
	extends Omit<IMovie, '_id' | 'rating' | 'countOpened' | 'genres' | 'actors'> {
	genres: string[];
	actors: string[];
	isSendTelegram: boolean;
} // омит - штука которая походу убирает лишнее поле из интерфейса при наследовании