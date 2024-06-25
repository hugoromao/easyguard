import React from "react";

import { ResultsResponse } from "../api/results/types";

import TestChart from "@/components/TestChart";

const index = async () => {
  const response = await fetch(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/results"
      : "https://easyguard.vercel.app/api/results",
    {
      next: { revalidate: 0 },
    },
  );
  const data: ResultsResponse = await response.json();

  return (
    <main className="h-[calc(100dvh)] flex flex-col items-center overflow-x-hidden">
      <TestChart
        title="Percentual de acertos no teste de memória"
        data={data.memoryScores}
      />
      <TestChart
        title="Percentual de acertos no teste de digitação"
        data={data.typingScores}
      />
      <TestChart
        title="Percentual de acertos no teste combinado"
        data={data.combinatedScores}
      />
      <TestChart
        title="Escores das subescalas do PSSUQ"
        keys={["Usabilidade", "Informação", "Interface"]}
        colors={["#4285F4", "#EA4335", "#FBBC04"]}
        leftAxisLegend="Escore PSSUQ"
        maxValue={7}
        data={data.usabilityScores}
      />
    </main>
  );
};

export default index;
