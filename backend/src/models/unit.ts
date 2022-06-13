import { Schema, Types, model } from 'mongoose';

interface IUnit {
  title: String,
  activities: Types.Array<Types.ObjectId>
}

const unitSchema = new Schema<IUnit>({
  title: String,
  activities: { type: [Schema.Types.ObjectId], ref: 'ClassActivity', default: [] },
});

export default model<IUnit>('Unit', unitSchema);
