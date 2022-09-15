import { Schema, Types, model } from 'mongoose';
import { IEstudiante } from './Estudiante';

export interface IApoderado {
  user: any,
  enviado: boolean,
  password: string,
  estudiantes: Types.Array<IEstudiante>
}

export const apoderadoSchema = new Schema<IApoderado>({
  user: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
  enviado: { type: Boolean, default: false },
  password: String,
  estudiantes: [{ type: Types.ObjectId, ref: 'Estudiante', default: [] }],
});

export default model<IApoderado>('Apoderado', apoderadoSchema);
