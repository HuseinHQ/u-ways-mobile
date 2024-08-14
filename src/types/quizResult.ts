export type QuizResult = {
  id: number;
  StudentId: number;
  QuizId: number;
  semester: number;
  part: number;
  score: string;
  answer: number[][];
  updatedAt: string;
};
