import React from "react";

import { ResultsResponse } from "../api/results/types";

import TestChart from "@/components/TestChart";

const index = async () => {
  const response = await fetch("http://easyguard.vercel.app/api/results", {
    next: { revalidate: 0 },
  });
  const data: ResultsResponse = await response.json();

  return (
    <main className="flex flex-col items-center max-w-5xl mx-auto">
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
    </main>
  );
};

export default index;
