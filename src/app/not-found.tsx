import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <main
        className={`p-8 flex justify-center flex-col items-center w-screen h-screen bg-[#003C96]`}
      >
        <div className="h-[64px] ">
          <h1 className="text-[#EF4545] gap-4 p-4 py-4 text-[28px]">
            Такая страница не нашлась – 404!
          </h1>
        </div>

        <div className="h-[48]">
          <div className="flex items-center justify-center ">
            <button className="text-2xl font-bold transition duration-150 border-b-4 border-transparent hover:border-[#ffb900]">
              <Link href="/" className={`h-full  text-white  `}>
                вернуться ко входу
              </Link>
            </button>
          </div>
        </div>
        <div className="h-[48]" />
      </main>
    </>
  );
}
