import { Omit } from "@reduxjs/toolkit/dist/tsHelpers";



import { IActor, IGenre } from "@/shared/types/movie.types";


export interface IActorEditInput extends Omit<IActor, '_id'> {

} // омит - штука которая походу убирает лишнее поле из интерфейса при наследовании