import { Schema, Types, model } from 'mongoose';

export interface IFavorita {
  nunidad: number,
  nactividad: number,
}

export interface IPlanificada {
  nunidad: number,
  nactividad: number,
  curso: string,
  fecha: Date,
}

export interface IProfesor {
  uid: any,
  nombre: string,
  apellidos: string,
  favoritas: Types.Array<IFavorita>,
  planificadas: Types.Array<IPlanificada>,
}

export const profesorSchema = new Schema<IProfesor>({
  uid: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
  nombre: String,
  apellidos: String,
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

export default model<IProfesor>('Profesor', profesorSchema);
