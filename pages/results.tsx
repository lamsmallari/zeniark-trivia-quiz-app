import { isTest, liveSetId, questionsAPI, testSetId } from "@/lib/api";
import { QuestionItem } from "@/lib/questions";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useResultsContext } from "../contexts/answer-context";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ResultItem from "@/components/ResultItem";

export default function Results({ questions }: { questions: QuestionItem[] }) {
  const { results } = useResultsContext();
  const [score, setScore] = useState<number | null>(null);
  const questionsRef = useRef<{ [id: string]: any }>({});

  useEffect(() => {
    if (score === null) {
      const total = (results as any[]).reduce((accumulator, currentValue) => {
        const values = Object.values(currentValue)[0] as {
          [id: string]: string;
        };

        if (values.result === "Correct") {
          accumulator = accumulator + 1;
        }

        return accumulator;
      }, 0);

      // convert questions to object for quick reference
      questions.forEach((question) => {
        questionsRef.current = {
          ...questionsRef.current,
          [question.id]: question,
        };
      });

      setScore(total);
    }
  }, [results, score, questions]);

  return (
    <>
      <Head>
        <title>Simple Quiz App | Results</title>
        <meta name="description" content="A simple quiz app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center py-8">
        <div className="w-full max-w-5xl bg-white px-7 pt-5 pb-10 rounded-md shadow-md">
          {/* header  */}
          <section className="quiz-header border-b border-gray-300 pb-4 relative">
            <Image
              priority
              src="/images/logo.png"
              height={50}
              width={55}
              alt="Zeniark"
              className="inline-block"
            />
            <h1 className="text-2xl font-bold absolute left-0 top-0 w-full h-full flex justify-center items-center pb-4">
              Final Result
            </h1>
          </section>
          {/* score  */}
          <section className="text-center border-b border-gray-300 pt-10 pb-6 mb-8">
            <h2 className="text-6xl font-bold mb-2">
              {score}/{questions.length}
            </h2>
            <p className="text-lg">Your Score</p>
          </section>
          {/* summary */}
          <section>
            {results.map((item, idx) => {
              const { correctAnswer, userAnswer, result } = Object.values(
                item
              )[0] as {
                [id: string]: string;
              };
              const key: string = Object.keys(item)[0];

              return (
                <ResultItem
                  key={key}
                  index={idx}
                  questionText={questionsRef.current[key]?.question}
                  correctAnswer={correctAnswer}
                  userAnswer={userAnswer}
                  result={result}
                />
              );
            })}
          </section>

          <div className="text-center mt-8">
            <Link
              href="quiz"
              className="text-zeniark text-2xl font-semibold pb-1 border-b-2 border-zeniark"
            >
              PLAY AGAIN!
            </Link>
          </div>
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
