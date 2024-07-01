import { distance } from "fastest-levenshtein";

import { prismaClient } from "../../../utils/prisma";

import { ResultsResponse } from "./types";
import { mapResult, mean } from "./utils";

function percent(number: number) {
  return Number(((16 - number) * 100) / 16);
}

export async function GET() {
  try {
    const usabilityTest = await prismaClient.usabilitySurvey.findMany();
    const preResult = await prismaClient.strongPasswordKnowledgeTest.findMany({
      where: { posTest: false },
      orderBy: { id: "asc" },
    });
    const posResult = await prismaClient.strongPasswordKnowledgeTest.findMany({
      where: { posTest: true },
      orderBy: { id: "asc" },
    });

    const memoryResult = await prismaClient.memoryTest.findMany({
      orderBy: { id: "asc" },
    });
    const typingResult = await prismaClient.typingTest.findMany({
      orderBy: { id: "asc" },
    });
    const combinatedResult = await prismaClient.combinatedTest.findMany({
      orderBy: { id: "asc" },
    });

    const memoryScores = memoryResult.map(
      ({
        name,
        egPassword1,
        egTypedPassword1,
        egPassword2,
        egTypedPassword2,
        btPassword1,
        btPassword2,
        btTypedPassword1,
        btTypedPassword2,
      }) => ({
        name,
        EasyGuard: mean([
          percent(distance(egPassword1, egTypedPassword1)),
          percent(distance(egPassword2, egTypedPassword2)),
        ]),
        Bitwarden: mean([
          percent(distance(btPassword1, btTypedPassword1)),
          percent(distance(btPassword2, btTypedPassword2)),
        ]),
      }),
    );

    const typingScores = typingResult.map(
      ({
        name,
        egPassword,
        egTypedPassword1,
        egTypedPassword2,
        egTypedPassword3,
        egTypedPassword4,
        egTypedPassword5,
        btPassword,
        btTypedPassword1,
        btTypedPassword2,
        btTypedPassword3,
        btTypedPassword4,
        btTypedPassword5,
      }) => ({
        name,
        EasyGuard: mean([
          percent(distance(egPassword, egTypedPassword1)),
          percent(distance(egPassword, egTypedPassword2)),
          percent(distance(egPassword, egTypedPassword3)),
          percent(distance(egPassword, egTypedPassword4)),
          percent(distance(egPassword, egTypedPassword5)),
        ]),
        Bitwarden: mean([
          percent(distance(btPassword, btTypedPassword1)),
          percent(distance(btPassword, btTypedPassword2)),
          percent(distance(btPassword, btTypedPassword3)),
          percent(distance(btPassword, btTypedPassword4)),
          percent(distance(btPassword, btTypedPassword5)),
        ]),
      }),
    );

    const combinatedScores = combinatedResult.map(
      ({
        name,
        egPassword,
        egTypedPassword1,
        egTypedPassword2,
        egTypedPassword3,
        egTypedPassword4,
        egTypedPassword5,
        btPassword,
        btTypedPassword1,
        btTypedPassword2,
        btTypedPassword3,
        btTypedPassword4,
        btTypedPassword5,
      }) => ({
        name,
        EasyGuard: mean([
          percent(distance(egPassword, egTypedPassword1)),
          percent(distance(egPassword, egTypedPassword2)),
          percent(distance(egPassword, egTypedPassword3)),
          percent(distance(egPassword, egTypedPassword4)),
          percent(distance(egPassword, egTypedPassword5)),
        ]),
        Bitwarden: mean([
          percent(distance(btPassword, btTypedPassword1)),
          percent(distance(btPassword, btTypedPassword2)),
          percent(distance(btPassword, btTypedPassword3)),
          percent(distance(btPassword, btTypedPassword4)),
          percent(distance(btPassword, btTypedPassword5)),
        ]),
      }),
    );

    const usabilityScores = usabilityTest.map((data) => ({
      name: data.name,
      Usabilidade: mean([data.q1, data.q2, data.q3, data.q4, data.q5, data.q6]),
      Informação: mean([
        data.q7,
        data.q8,
        data.q9,
        data.q10,
        data.q11,
        data.q12,
      ]),
      Interface: mean([data.q13, data.q14, data.q15]),
    }));

    const meanScores = [
      {
        name: "Teste de memória",
        EasyGuard:
          memoryScores.reduce((prev, cur) => prev + cur.EasyGuard, 0) /
          memoryScores.length,
        Bitwarden:
          memoryScores.reduce((prev, cur) => prev + cur.Bitwarden, 0) /
          memoryScores.length,
      },
      {
        name: "Teste de digitação",
        EasyGuard:
          typingScores.reduce((prev, cur) => prev + cur.EasyGuard, 0) /
          memoryScores.length,
        Bitwarden:
          typingScores.reduce((prev, cur) => prev + cur.Bitwarden, 0) /
          memoryScores.length,
      },
      {
        name: "Teste combinado",
        EasyGuard:
          combinatedScores.reduce((prev, cur) => prev + cur.EasyGuard, 0) /
          memoryScores.length,
        Bitwarden:
          combinatedScores.reduce((prev, cur) => prev + cur.Bitwarden, 0) /
          memoryScores.length,
      },
    ];

    return Response.json({
      knowledgeTestScore: {
        pre: mapResult(preResult),
        pos: mapResult(posResult),
      },
      memoryScores,
      typingScores,
      combinatedScores,
      usabilityScores,
      meanScores,
    } as ResultsResponse);
  } catch (error: any) {
    return new Response(`Failed: ${error.message}`, {
      status: 500,
    });
  }
}
