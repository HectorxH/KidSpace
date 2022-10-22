import { Schema, Types, model } from 'mongoose';
import { ICurso } from './Curso';

export interface IFavorita {
  nunidad: number,
  nactividad: number,
}

export interface IPlanificada {
  nunidad: number,
  nactividad: number,
  curso: any,
  fecha: Date,
}

export interface IProfesor {
  user: any,
  validado: Boolean,
  favoritas?: Types.Array<IFavorita>,
  planificadas?: Types.Array<IPlanificada>,
  cursos?: Types.Array<ICurso>,
  actividades: {[key: string]: Boolean}
}

export const profesorSchema = new Schema<IProfesor>({
  user: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
  validado: { type: Boolean, default: false },
  favoritas: {
    type: [{ nunidad: Number, nactividad: Number, titulo: String }],
    default: [],
  },
  planificadas: {
    type: [{
      nunidad: Number,
      nactividad: Number,
      curso: { type: Types.ObjectId, ref: 'Curso' },
      fecha: Date,
    }],
    default: [],
  },
  cursos: [{ type: Types.ObjectId, ref: 'Curso' }],
  actividades: { type: Object, default: {} },
});

export default model<IProfesor>('Profesor', profesorSchema);
