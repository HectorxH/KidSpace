import { Schema, Types, model } from 'mongoose';
import { IEstudiante } from './Estudiante';

export interface IApoderado {
  uid: any,
  estudiantes?: Types.Array<IEstudiante>
}

export const apoderadoSchema = new Schema<IApoderado>({
  uid: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
  estudiantes: [{ type: Types.ObjectId, ref: 'Estudiante' }],
});

export default model<IApoderado>('Estudiante', apoderadoSchema);
