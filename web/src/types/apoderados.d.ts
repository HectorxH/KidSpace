import { IEstudiantes } from './estudiantes.d';
import { IUser } from './user.d';

export interface IApoderado {
  _id?: string,
  user: IUser,
  new: boolean,
  enviado: boolean,
  estudiantes: IEstudiantes | [string]
}

export type IApoderados = IApoderado[]
