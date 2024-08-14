export type QuizDetail = {
  partName: string;
  questions: string[];
};

export type Quiz = {
  id: number;
  title: string;
  details?: QuizDetail[];
  semester: number;
  part: number;
  startTime?: Date;
  endTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type QuizRequest = {
  title: string;
  details: QuizDetail[];
  semester: number;
  part: number;
  startTime?: Date;
  endTime?: Date;
};

export type SetQuizDetailValue = {
  partIndex: number;
  questionIndex?: number;
  field: string;
  fieldValue: string;
};
