import { Schema, Types, model } from 'mongoose';

export interface IFavorita {
  nunidad: Number,
  nactividad: Number,
  titulo: String,
}

export interface IPlanificada {
  nunidad: Number,
  nactividad: Number,
  curso: String,
  fecha: Date,
}

export interface IProfesor {
    nombre: String,
    apellidos: String,
    mail: String,
    password: String,
    favoritas: Types.Array<IFavorita>,
    planificadas: Types.Array<IPlanificada>,
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
  planificadas: {
    type: [{
      nunidad: Number, nactividad: Number, curso: String, fecha: Date,
    }],
    default: [],
  },
});

export default model<IProfesor>('Profesor', teacherSchema);
