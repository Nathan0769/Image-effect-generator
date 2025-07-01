import { AllParams } from "@/src/params";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex lg:flex-col gap-8 min-h-full justify-center items-center ">
      <div className=" h-full">
        <AllParams />
      </div>
      <div>Preview</div>
    </main>
  );
}
