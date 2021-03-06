import { Schema, model } from 'mongoose';

interface ISoloActivity {
  title: String,
  description: String
}

export const soloActivitySchema = new Schema<ISoloActivity>({
  title: String,
  description: String,
});

export default model<ISoloActivity>('SoloActivity', soloActivitySchema);
