import { Schema, Types, model } from 'mongoose';
import { ICurso } from './Curso';

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
  favoritas?: Types.Array<IFavorita>,
  planificadas?: Types.Array<IPlanificada>,
  cursos?: Types.Array<ICurso>,
}

export const profesorSchema = new Schema<IProfesor>({
  uid: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
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
  cursos: [{ type: Types.ObjectId, ref: 'Curso' }],
});

export default model<IProfesor>('Profesor', profesorSchema);
