import { IUser } from './user';
import { ICurso } from './cursos';

export interface IProfesor {
  _id: string,
  user: IUser,
  cursos: ICurso[],
}
