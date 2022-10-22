import { Schema, Types, model } from 'mongoose';
import { IProfesor } from './Profesor';

export const PlanLimit = {
  basic: 2,
  pro: 5,
  'pro+': 100,
};

export interface IRepresentante {
  user: any,
  plan: String,
  profesores: Types.Array<IProfesor>
}

export const representanteSchema = new Schema<IRepresentante>({
  user: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
  plan: String,
  profesores: [{ type: Types.ObjectId, ref: 'Profesor', default: [] }],
});

export default model<IRepresentante>('Representante', representanteSchema);
