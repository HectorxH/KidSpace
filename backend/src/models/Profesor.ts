import { Schema, Types, model } from 'mongoose';

export interface IFavorita {
  nunidad: Number,
  nactividad: Number,
  titulo: String,
}

export interface IProfesor {
    nombre: String,
    apellidos: String,
    mail: String,
    password: String,
    favoritas: Types.Array<IFavorita>,
    planificadas: [],
}

export const teacherSchema = new Schema<IProfesor>({
  nombre: String,
  apellidos: String,
  mail: String,
  password: String,
  favoritas: {
    type: [{ nunidad: Number, nactividad: Number, titulo: String }],
    default: [],
  },
  planificadas: [],
});

export default model<IProfesor>('Profesor', teacherSchema);
