import { Schema, Types, model } from 'mongoose';
import { defaultProgresoAI, defaultProgresoAC } from '../mock/DefaultActividades';
import { IApoderado } from './Apoderado';
import { IProfesor } from './Profesor';

export interface IEstudiante {
  user: any
  curso?: any
  profesor?: IProfesor
  apoderados: Types.Array<IApoderado>
  monedas: number
  personaje: number[]
  actividadesIndividuales: {[key: string]: number}
  actividadesClase: {[key:string]: number}
  compras: number[][]
}
const lenghtLimit = (val: number[]) => val.length === 12;

const defaultCompras = [
  Array.from({ length: 31 }, () => 0),
  Array.from({ length: 39 }, () => 0),
  Array.from({ length: 11 }, () => 0),
];
defaultCompras[0][0] = 1;
defaultCompras[0][1] = 1;
defaultCompras[0][2] = 1;
defaultCompras[1][0] = 1;
defaultCompras[2][0] = 1;

export const estudianteSchema = new Schema<IEstudiante>({
  user: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
  curso: { type: Types.ObjectId, ref: 'Curso' },
  profesor: { type: Types.ObjectId, ref: 'Profesor' },
  apoderados: [{ type: Types.ObjectId, ref: 'Apoderado', default: [] }],
  monedas: { type: Number, default: 0, min: 0 },
  personaje: { type: [Number], validate: [lenghtLimit, 'Lenght should be 12'], default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  actividadesIndividuales: { type: Object, default: defaultProgresoAI },
  actividadesClase: { type: Object, default: defaultProgresoAC },
  compras: { type: [[Number]], default: defaultCompras },
});

export default model<IEstudiante>('Estudiante', estudianteSchema);
