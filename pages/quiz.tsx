import { isTest, liveSetId, questionsAPI, testSetId } from "@/lib/api";
import { calculateResults, QuestionItem, UserAnswer } from "@/lib/questions";

import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { useState, useRef } from "react";
import { decode } from "html-entities";
import { useResultsContext } from "../contexts/answer-context";
import AnswerButton from "@/components/AnswerButton";

export default function Quiz({ questions }: { questions: QuestionItem[] }) {
  const [current, setCurrent] = useState(0);
  const [disableQuiz, setDisableQuiz] = useState(false);
  const userAnswers = useRef<UserAnswer[]>([]);

  const { setResults } = useResultsContext();
  const router = useRouter();

  const handleSubmitAnswer = async (itemAnswer: string) => {
    userAnswers.current = [
      ...userAnswers.current,
      {
        [questions[current]["id"]]: itemAnswer,
      },
    ];

    if (current === questions.length - 1) {
      setDisableQuiz(true);
      const questionIDs = questions.map((q) => q.id);
      const serializedData = encodeURIComponent(JSON.stringify(questionIDs));

      const requestCalculation = await fetch(
        `${questionsAPI}/result/?data=${serializedData}&setId=${
          isTest ? testSetId : liveSetId
        }`
      );

      const correctAnswers = await requestCalculation.json();
      const results = calculateResults(
        userAnswers.current,
        JSON.parse(correctAnswers)
      );

      setResults(results);
      setTimeout(() => {
        router.push("/results");
      }, 2000);
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <>
      <Head>
        <title>Simple Quiz App | Start</title>
        <meta name="description" content="A simple quiz app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen flex justify-center items-center">
        <div className="w-full max-w-4xl bg-white px-7 py-8 rounded-md shadow-md">
          {/* header */}
          <section className="quiz-header border-b border-gray-300 pb-4 flex justify-between items-center">
            <div className="flex items-center">
              <Image
                priority
                src="/images/logo.png"
                height={50}
                width={55}
                alt="Zeniark"
                className="inline-block"
              />
              <h2 className="text-2xl font-bold ml-4">
                Category: {questions[current]["category"]}
              </h2>
            </div>
            <div className="step" style={{ minWidth: "70px" }}>
              <p className="text-xl">{`${current + 1} of ${
                questions.length
              }`}</p>
            </div>
          </section>
          {/* question */}
          <section className="text-4xl text-center py-16 border-b border-gray-300">
            {decode(questions[current]["question"])}
          </section>

          {/* buttons */}
          <section className="flex justify-around pt-4">
            <div></div>
            <AnswerButton
              type={true}
              disable={disableQuiz}
              onClick={() => {
                handleSubmitAnswer("True");
              }}
            />
            <AnswerButton
              type={false}
              disable={disableQuiz}
              onClick={() => {
                handleSubmitAnswer("False");
              }}
            />
            <div></div>
          </section>
        </div>
      </main>
    </>
  );
}

// This function gets called at build time on server-side.
export const getStaticProps: GetStaticProps = async () => {
  const docId = isTest ? testSetId : liveSetId;

  // Call an external API endpoint to get questions.
  // apipath/:setID/:length
  const res = await fetch(`${questionsAPI}/${docId}/10`);
  const questions = await res.json();

  // By returning { props: { questions } }, the Quiz component
  // will receive `questions` as a prop at build time
  return {
    props: {
      questions: JSON.parse(questions),
    },
  };
};
