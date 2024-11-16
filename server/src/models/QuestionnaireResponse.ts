import { InferSchemaType, Schema, model } from "mongoose";

const questionnaireResponseSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  responses: {
    type: String,
    required: true,
  },
});

type QuestionnaireResponse = InferSchemaType<
  typeof questionnaireResponseSchema
>;

export default model<QuestionnaireResponse>(
  "User",
  questionnaireResponseSchema
);
