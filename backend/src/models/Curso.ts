import { Schema, Types, model } from 'mongoose';
import { IEstudiante } from './Estudiante';
import { IProfesor } from './Profesor';

export interface ICurso {
  nombre?: string,
  profesor?: IProfesor | Types.ObjectId
  estudiantes?: Types.Array<IEstudiante>
}

export const cursoSchema = new Schema<ICurso>({
  nombre: String,
  profesor: { type: Types.ObjectId, ref: 'Profesor' },
  estudiantes: [{ type: Types.ObjectId, ref: 'Estudiante' }],
});

export default model<ICurso>('Curso', cursoSchema);
