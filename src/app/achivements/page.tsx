"use client";

import Base from "@/components/Base";
import Achivement from "@/components/Achivement";

import { achievements } from "@/utils/achievements";

export default function Achivements() {
  return (
    <Base>
      <div className="flex flex-col p-6 gap-2 overflow-auto">
        <h1 className="text-[28px] font-bold text-foreground-700">
          Conquistas
        </h1>

        <section className="grid grid-cols-2 gap-2">
          {achievements.map((achivement) => (
            <Achivement key={achivement.id} {...achivement} />
          ))}
        </section>
      </div>
    </Base>
  );
}
