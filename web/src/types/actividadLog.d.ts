import { IEstudiante } from './estudiantes';
import { ICurso } from './cursos';

export interface IActividadLog {
  tipo: 'individual' | 'clase'
  actividad: string
  unidad: string
  steam: number[]
  estudiante: string | IEstudiante
  curso: string | ICurso
  quizFinal?: { pregunta: string, respuesta: string}[]
  duracion: string
  fecha: Date
}

export type IActividadLogs = IActividadLog[]
