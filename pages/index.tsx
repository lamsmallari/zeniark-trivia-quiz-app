import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Simple Quiz App</title>
        <meta name="description" content="A simple quiz app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen w-screen flex justify-center items-center">
        <div className="w-full max-w-xl bg-white px-8 py-14 rounded-md shadow-md">
          <div className="logo text-center mb-10">
            <Image
              priority
              src="/images/zeniark-logo.png"
              height={60}
              width={225}
              alt="Zeniark"
              className="inline-block"
            />
          </div>

          <h1 className="text-2xl text-center font-medium mb-2">
            Welcome to the Trivia Challenge!
          </h1>
          <p className="text-center mb-8">
            You will be presented with 10 True or False questions.
          </p>

          <div className="text-center mb-8">
            <div className="inline-block px-5 py-3 bg-zeniark rounded-md text-white text-xl">
              Can you score 10/10?
            </div>
          </div>

          <div className="text-center">
            <Link
              href="quiz"
              className="text-zeniark text-xl font-semibold pb-1 border-b-2 border-zeniark"
            >
              LET&apos;S START!
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
