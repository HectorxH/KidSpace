import { IEstudiantes } from './estudiantes.d';

export interface ICurso {
  _id: string,
  nombre: string,
  estudiantes: IEstudiantes
}

export type ICursos = ICurso[]
