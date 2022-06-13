import { Schema, Types, model } from 'mongoose';

export interface ITeacher {
    names: String,
    last_names: String,
    mail: String,
    password: String,
    favorites: Types.Array<Types.ObjectId>,
    classes: Types.Array<Types.ObjectId>,
    planned: [],
}

export const teacherSchema = new Schema<ITeacher>({
  names: String,
  last_names: String,
  mail: String,
  password: String,
  favorites: { type: [Schema.Types.ObjectId], ref: 'ClassActivity', default: [] },
  classes: { type: [Schema.Types.ObjectId], ref: 'Class', default: [] },
  planned: [],
});

export default model<ITeacher>('Teacher', teacherSchema);
