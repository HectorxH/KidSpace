import { Schema, model, Types } from 'mongoose';
import { ICurso } from './Curso';
import { IEstudiante } from './Estudiante';

export interface IActividadLog {
  tipo: 'individual' | 'clase'
  actividad: string
  unidad: string
  categoria: string
  estudiante: string | IEstudiante
  curso: string | ICurso
  quizFinal?: { pregunta: string, respuesta: string}[]
  duracion: string
  fecha: string
}

export const actividadLogSchema = new Schema<IActividadLog>({
  tipo: String,
  actividad: String,
  unidad: String,
  categoria: String,
  estudiante: { type: Types.ObjectId, ref: 'Estudiante' },
  curso: { type: Types.ObjectId, ref: 'Curso' },
  quizFinal: [{ pregunta: String, respuesta: String }],
  duracion: String,
  fecha: String,
});

export default model<IActividadLog>('ActividadLog', actividadLogSchema);
