import { InferSchemaType, Schema, model } from "mongoose";

const questionnaireResponseSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  responses: {
    type: [Schema.Types.Mixed],
    required: true,
  },
});

type QuestionnaireResponse = InferSchemaType<
  typeof questionnaireResponseSchema
>;

export default model<QuestionnaireResponse>(
  "QuestionnaireResponse",
  questionnaireResponseSchema
);
