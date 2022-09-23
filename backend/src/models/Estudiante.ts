import { Schema, Types, model } from 'mongoose';
import { IApoderado } from './Apoderado';
import { IProfesor } from './Profesor';

export interface IEstudiante {
  user: any
  curso?: any
  profesor?: IProfesor
  apoderados: Types.Array<IApoderado>
  monedas: number
  personaje: number[]
  progreso: {[key: string]: string}
  compras: number[][]
}
const lenghtLimit = (val: number[]) => val.length === 12;

export const estudianteSchema = new Schema<IEstudiante>({
  user: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
  curso: { type: Types.ObjectId, ref: 'Curso' },
  profesor: { type: Types.ObjectId, ref: 'Profesor' },
  apoderados: [{ type: Types.ObjectId, ref: 'Apoderado', default: [] }],
  monedas: { type: Number, default: 0, min: 0 },
  personaje: { type: [Number], validate: [lenghtLimit, 'Lenght should be 12'] },
  progreso: Object,
  compras: [[Number]],
});

export default model<IEstudiante>('Estudiante', estudianteSchema);
