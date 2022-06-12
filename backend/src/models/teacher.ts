import { Schema, Model } from 'mongoose';

const teacherSchema = new Schema({
  names: String,
  last_names: String,
  mail: String,
  password: String,
  favorites: [
    {
      activity: { type: Schema.Types.ObjectId, ref: 'ClassActivity' },
      favorite: Boolean,
    },
  ],
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  planned: [],
});

export default new Model('Teacher', teacherSchema);
