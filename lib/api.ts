const isTest = false;

const questionsPath = {
  test: "http://localhost:5001/simple-quiz-app-f71f3/us-central1/api/questions",
  prod: "https://us-central1-simple-quiz-app-f71f3.cloudfunctions.net/api/questions",
};

const testSetId = "k2bMc1R1zeLlvnfGRF73";
const liveSetId = "5pDBcI98HPdTGV5LOUKS";

const questionsAPI = isTest ? questionsPath.test : questionsPath.prod;

export { isTest, questionsAPI, testSetId, liveSetId };
