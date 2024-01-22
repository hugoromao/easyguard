import Image from "next/image";
import { Button } from "@nextui-org/button";
import Base from "@/templates/Base";

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
        <Button
          color="success"
          className="absolute"
          style={{
            top: "100%",
            left: "50%",
            opacity: 1,
            transform: "translate(-50%, -50%)",
          }}
        >
          Nova senha
        </Button>
      </div>
      {/* <h1>Home</h1> */}
    </Base>
  );
}
