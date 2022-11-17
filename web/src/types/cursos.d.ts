import { IEstudiantes } from './estudiantes.d';

export interface ICurso {
  _id: string,
  createdAt: string,
  updatedAt: string,
  nombre: string,
  estudiantes: IEstudiantes
}

export type ICursos = ICurso[]
