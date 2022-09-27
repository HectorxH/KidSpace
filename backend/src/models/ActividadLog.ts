import { Schema, model, Types } from 'mongoose';
import { ICurso } from './Curso';
import { IEstudiante } from './Estudiante';

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

export const actividadLogSchema = new Schema<IActividadLog>({
  tipo: String,
  actividad: String,
  unidad: String,
  steam: { type: [Number], default: [0, 0, 0, 0, 0] },
  estudiante: { type: Types.ObjectId, ref: 'Estudiante' },
  curso: { type: Types.ObjectId, ref: 'Curso' },
  quizFinal: [{ pregunta: String, respuesta: String }],
  duracion: String,
  fecha: Date,
});

export default model<IActividadLog>('ActividadLog', actividadLogSchema);
