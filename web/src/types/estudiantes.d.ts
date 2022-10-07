import { IUser } from './user';
import { IApoderados } from './apoderados';
import { ICurso } from './cursos';

export interface IEstudiante {
  _id: string,
  user: IUser,
  apoderados: IApoderados,
  curso: ICurso
}

export type IEstudiantes = IEstudiante[]
