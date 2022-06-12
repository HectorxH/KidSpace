import { Schema, Model } from 'mongoose';

const classActivitySchema = new Schema({
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
    {
      question: String,
      answers: [String],
      correct_answer: Number,
    },
  ],
});

export default new Model('ClassActivity', classActivitySchema);
