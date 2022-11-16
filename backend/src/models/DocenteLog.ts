import { Schema, model, Types } from 'mongoose';
import { ICurso } from './Curso';
import { IProfesor } from './Profesor';

export interface IDocenteLog {
  actividad: string
  curso: string | ICurso
  profesor: string | IProfesor
  createdAt: string,
  updatedAt: string,
}

export const docenteLogSchema = new Schema<IDocenteLog>({
  actividad: String,
  curso: { type: Types.ObjectId, ref: 'Curso' },
  profesor: { type: Types.ObjectId, ref: 'Profesor' },
}, { timestamps: true });

export default model<IDocenteLog>('DocenteLog', docenteLogSchema);
