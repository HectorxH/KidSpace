import { IUser } from './user';
import { IApoderados } from './apoderados';

export interface IEstudiante {
  _id: string,
  user: IUser,
  apoderados: IApoderados,
  curso: string
}

export type IEstudiantes = IEstudiante[]
