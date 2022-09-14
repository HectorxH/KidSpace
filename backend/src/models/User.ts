import { Schema, model } from 'mongoose';

export interface IUser {
  _id: string,
  nombres: string,
  apellidos: string,
  username: string,
  password: string,
  email: string,
  tipo: 'profesor' | 'representante' | 'apoderado' | 'estudiante',
}

export const userSchema = new Schema<IUser>({
  username: { type: String, unique: true, index: true },
  nombres: String,
  apellidos: String,
  password: String,
  email: { type: String, unique: true, index: true },
  tipo: { type: String, enum: ['profesor', 'representante', 'apoderado', 'estudiante'] },
});

export default model<IUser>('User', userSchema);
