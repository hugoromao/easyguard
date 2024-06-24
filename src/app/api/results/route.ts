import { distance } from "fastest-levenshtein";

import { prismaClient } from "../../../utils/prisma";

import { ResultsResponse } from "./types";
import { mapResult, mean } from "./utils";

export async function GET() {
  try {
    const usabilityTest = await prismaClient.usabilitySurvey.findMany();
    const preResult = await prismaClient.strongPasswordKnowledgeTest.findMany({
      where: { posTest: false },
      orderBy: { name: "asc" },
    });
    const posResult = await prismaClient.strongPasswordKnowledgeTest.findMany({
      where: { posTest: true },
      orderBy: { name: "asc" },
    });

    const memoryResult = await prismaClient.memoryTest.findMany();
    const typingResult = await prismaClient.typingTest.findMany();
    const combinatedResult = await prismaClient.combinatedTest.findMany();

    const memoryScores = memoryResult.map(
      ({
        egPassword1,
        egTypedPassword1,
        egPassword2,
        egTypedPassword2,
        btPassword1,
        btPassword2,
        btTypedPassword1,
        btTypedPassword2,
      }) => ({
        egScore: mean([
          distance(egPassword1, egTypedPassword1),
          distance(egPassword2, egTypedPassword2),
        ]),
        btScore: mean([
          distance(btPassword1, btTypedPassword1),
          distance(btPassword2, btTypedPassword2),
        ]),
      }),
    );

    const typingScores = typingResult.map(
      ({
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
        egScore: mean([
          distance(egPassword, egTypedPassword1),
          distance(egPassword, egTypedPassword2),
          distance(egPassword, egTypedPassword3),
          distance(egPassword, egTypedPassword4),
          distance(egPassword, egTypedPassword5),
        ]),
        btScore: mean([
          distance(btPassword, btTypedPassword1),
          distance(btPassword, btTypedPassword2),
          distance(btPassword, btTypedPassword3),
          distance(btPassword, btTypedPassword4),
          distance(btPassword, btTypedPassword5),
        ]),
      }),
    );

    const combinatedScores = combinatedResult.map(
      ({
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
        egScore: mean([
          distance(egPassword, egTypedPassword1),
          distance(egPassword, egTypedPassword2),
          distance(egPassword, egTypedPassword3),
          distance(egPassword, egTypedPassword4),
          distance(egPassword, egTypedPassword5),
        ]),
        btScore: mean([
          distance(btPassword, btTypedPassword1),
          distance(btPassword, btTypedPassword2),
          distance(btPassword, btTypedPassword3),
          distance(btPassword, btTypedPassword4),
          distance(btPassword, btTypedPassword5),
        ]),
      }),
    );

    const usabilityScores = usabilityTest.map((data) => ({
      usability: mean([data.q1, data.q2, data.q3, data.q4, data.q5, data.q6]),
      information: mean([
        data.q7,
        data.q8,
        data.q9,
        data.q10,
        data.q11,
        data.q12,
      ]),
      interface: mean([data.q13, data.q14, data.q15]),
    }));

    return Response.json({
      knowledgeTestScore: {
        pre: mapResult(preResult),
        pos: mapResult(posResult),
      },
      memoryScores,
      typingScores,
      combinatedScores,
      usabilityScores,
    } as ResultsResponse);
  } catch (error: any) {
    return new Response(`Failed: ${error.message}`, {
      status: 500,
    });
  }
}
