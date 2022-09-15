import { Schema, Types, model } from 'mongoose';
import { IApoderado } from './Apoderado';
import { IProfesor } from './Profesor';

export interface IEstudiante {
  user: any
  curso?: any,
  profesor?: IProfesor
  apoderados: Types.Array<IApoderado>
}

export const estudianteSchema = new Schema<IEstudiante>({
  user: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
  curso: { type: Types.ObjectId, ref: 'Curso' },
  profesor: { type: Types.ObjectId, ref: 'Profesor' },
  apoderados: [{ type: Types.ObjectId, ref: 'Apoderado', default: [] }],
});

export default model<IEstudiante>('Estudiante', estudianteSchema);
