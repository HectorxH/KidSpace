import { Schema, Types, model } from 'mongoose';

interface IQuiz {
  question: String,
  answers: Types.Array<String>,
  correct_answer: Number,
}

interface IClassActivity {
  title: String,
  description: String,
  intro_story: {
    title: String,
    description: String,
  },
  intro_challenge: {
    title: String,
    description: String,
  },
  interactive_story: {
    title: String,
    description: String,
  },
  creative_challenge: {
    title: String,
    description: String,
  },
  quiz: Types.Array<IQuiz>
}

export const classActivitySchema = new Schema<IClassActivity>({
  title: String,
  description: String,
  intro_story: {
    title: String,
    description: String,
  },
  intro_challenge: {
    title: String,
    description: String,
  },
  interactive_story: {
    title: String,
    description: String,
  },
  creative_challenge: {
    title: String,
    description: String,
  },
  quiz: [
    new Schema({
      question: String,
      answers: { type: [String], default: [] },
      correct_answer: Number,
    }),
  ],
});

export default model<IClassActivity>('ClassActivity', classActivitySchema);
