import { ICurso } from './cursos';

export interface IPlanificada {
  nactividad: number,
  nunidad: number,
  curso: ICurso,
  fecha: string,
}

export type IPlanificadas = IPlanificada[]
