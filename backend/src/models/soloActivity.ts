import { Schema, Model } from 'mongoose';

const soloActivitySchema = new Schema({
  title: String,
  description: String,
});

export default new Model('SoloActivity', soloActivitySchema);
