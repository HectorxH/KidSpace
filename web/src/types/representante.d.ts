import { IUser } from './user';
import { IProfesor } from './profesores';

export interface IRepresentante {
  _id: string,
  user: IUser,
  plan: number,
  profesores: IProfesor[]
}
