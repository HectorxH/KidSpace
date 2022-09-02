import { IApoderados } from './apoderados';

export interface IEstudiante {
  nestudiante: string,
  curso: string,
  apellidos: string,
  nombres: string,
  apoderados: IApoderados,
}

export type IEstudiantes = IEstudiante[]
