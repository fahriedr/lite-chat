import About from "./about/page";
import LoginCard from "./components/LoginCard";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
      </Head>
      <main>
        <div className={`flex justify-center items-center m-auto h-screen w-screen px-10`}>
          <LoginCard/>
        </div>
      </main>
    </>
  );
}
