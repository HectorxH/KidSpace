import { Schema, Types, model } from 'mongoose';
import { IProfesor } from './Profesor';

export const PlanLimit = [2, 5, 100, 0];

export interface IRepresentante {
  user: any,
  plan: number,
  profesores: Types.Array<IProfesor>
}

function maxLen(this: IRepresentante, arr: any[]) {
  return arr.length <= PlanLimit[this.plan];
}

export const representanteSchema = new Schema<IRepresentante>({
  user: {
    type: Types.ObjectId, ref: 'User', unique: true, index: true,
  },
  plan: { type: Number, default: 3 },
  profesores: [{
    type: Types.ObjectId,
    ref: 'Profesor',
    default: [],
    validate: maxLen,
  }],
});

export default model<IRepresentante>('Representante', representanteSchema);
