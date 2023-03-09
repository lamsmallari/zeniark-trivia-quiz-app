import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { MouseEventHandler } from "react";

const AnswerButton = ({
  type,
  disable,
  onClick,
}: {
  type: boolean;
  disable: boolean;
  onClick: () => void;
}) => {
  if (type) {
    return (
      <button
        type="button"
        className={`${
          disable ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
        } w-32 text-white text-lg p-3 rounded-md flex justify-center items-center`}
        disabled={disable}
        onClick={onClick}
      >
        <CheckIcon className="w-6 h-6 text-white mr-2" />
        True
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className={`${
          disable ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
        } w-32 text-white text-lg p-3 rounded-md flex justify-center items-center`}
        disabled={disable}
        onClick={onClick}
      >
        <XMarkIcon className="w-6 h-6 text-white mr-2" />
        False
      </button>
    );
  }
};

export default AnswerButton;
