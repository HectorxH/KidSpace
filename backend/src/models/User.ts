import { Schema, model } from 'mongoose';

export interface IUser {
  _id: string,
  username: string,
  password: string,
  email: string,
  tipo: 'profesor' | 'representante',
}

export const userSchema = new Schema<IUser>({
  username: { type: String, unique: true, index: true },
  password: String,
  email: String,
  tipo: { type: String, enum: ['profesor', 'representante'] },
});

export default model<IUser>('User', userSchema);
