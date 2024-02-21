import Image from "next/image";

import Base from "@/components/Base";

export default function Home() {
  return (
    <Base>
      <div className="w-full h-2/5 relative">
        <Image
          src={"/green.jpg"}
          alt="hero"
          priority
          fill
          className="object-cover"
        />
      </div>
      <h1>Home</h1>
    </Base>
  );
}
