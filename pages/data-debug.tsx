import { questionsAPI } from "@/lib/api";
import { useState } from "react";
import { questions, answers } from "../lib/questions";

export default function DataDebug() {
  const [clicked, setClicked] = useState(false);

  const handleOnSubmit = async () => {
    setClicked(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questions, answers }),
    };

    try {
      await fetch(questionsAPI, requestOptions);

      console.log("Data added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <button
        onClick={handleOnSubmit}
        className={`${
          clicked ? "opacity-50" : "opacity-100"
        } bg-lime-600 text-white rounded-md p-4`}
        disabled={clicked}
      >
        Upload Data
      </button>
    </main>
  );
}
