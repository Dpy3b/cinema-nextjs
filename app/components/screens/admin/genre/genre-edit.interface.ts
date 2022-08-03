import { Omit } from "@reduxjs/toolkit/dist/tsHelpers";



import { IGenre } from "@/shared/types/movie.types";


export interface IGenreEditInput extends Omit<IGenre, '_id'> {

} // омит - штука которая походу убирает лишнее поле из интерфейса при наследовании