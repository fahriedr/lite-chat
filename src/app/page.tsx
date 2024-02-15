import Image from "next/image";
import About from "./about/page";
import LoginCard from "./components/LoginCard";

export default function Home() {
  return (
    <main className="">
      <div className={`flex flex-col justify-items-center items-center px-28 py-6`}>
        <LoginCard/>
      </div>
    </main>
  );
}
