export interface QuestionnaireResponse {
  _id: string;
  userId: string;
  date: Date;
  responses: (string | number | boolean)[];
}

export interface QuestionnaireResponseJSON {
  _id: string;
  userId: string;
  date: string;
  responses: (string | number | boolean)[];
}

export interface CreateQuestionnaireResponseRequest {
  userId: string;
  date: Date;
  responses: (string | number | boolean)[];
}

export interface UpdateQuestionnaireResponseRequest {
  responses?: (string | number | boolean)[];
}
