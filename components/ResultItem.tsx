import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { decode } from "html-entities";

interface ResultItemProps {
  index: number;
  questionText: string;
  correctAnswer: string;
  userAnswer: string;
  result: string;
}

const ResultItem = ({
  index,
  questionText,
  correctAnswer,
  userAnswer,
  result,
}: ResultItemProps) => {
  return (
    <div className="flex justify-between mb-3 pb-3 border-b border-dotted border-gray-300">
      <div className="flex">
        <p className="mr-3 text-gray-400">{index + 1}.</p>
        <div>
          <p className="text-sm mb-1">{decode(questionText)}</p>
          <p className="text-sm text-gray-400">
            The correct answer is{" "}
            <em
              className={`font-semibold ${
                correctAnswer === "True" ? "text-green-700" : "text-red-700"
              }`}
            >
              {correctAnswer}
            </em>
            . You answered{" "}
            <em
              className={`font-semibold ${
                userAnswer === "True" ? "text-green-700" : "text-red-700"
              }`}
            >
              {userAnswer}
            </em>
          </p>
        </div>
      </div>
      <div>
        {/* check */}
        {result === "Correct" && (
          <CheckIcon className="w-6 h-6 text-green-600" />
        )}

        {/* cross */}
        {result === "Wrong" && <XMarkIcon className="w-6 h-6 text-red-600" />}
      </div>
    </div>
  );
};

export default ResultItem;
