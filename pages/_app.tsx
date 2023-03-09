import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ResultsProvider } from "../contexts/answer-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ResultsProvider>
      <Component {...pageProps} />
    </ResultsProvider>
  );
}
