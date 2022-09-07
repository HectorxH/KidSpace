import { Schema, Types, model } from 'mongoose';
import { IEstudiante } from './Estudiante';

export interface IApoderado {
  user: any,
  estudiantes?: Types.Array<IEstudiante>
}

export const apoderadoSchema = new Schema<IApoderado>({
  user: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
  estudiantes: [{ type: Types.ObjectId, ref: 'Estudiante' }],
});

export default model<IApoderado>('Apoderado', apoderadoSchema);
