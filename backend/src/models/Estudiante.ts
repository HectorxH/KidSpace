import { Schema, Types, model } from 'mongoose';
import { IApoderado } from './Apoderado';
import { ICurso } from './Curso';
import { IProfesor } from './Profesor';

export interface IEstudiante {
  uid: any
  curso?: ICurso,
  profesor?: IProfesor
  apoderados?: Types.Array<IApoderado>
}

export const estudianteSchema = new Schema<IEstudiante>({
  uid: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
  curso: { type: Types.ObjectId, ref: 'Curso' },
  profesor: { type: Types.ObjectId, ref: 'Profesor' },
  apoderados: [{ type: Types.ObjectId, ref: 'Apoderado' }],
});

export default model<IEstudiante>('Estudiante', estudianteSchema);
