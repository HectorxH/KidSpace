import { Schema, Model } from 'mongoose';

const unitSchema = new Schema({
  title: String,
  activities: [{ type: Schema.Types.ObjectId, ref: 'ClassActivity' }],
});

export default new Model('Unit', unitSchema);
