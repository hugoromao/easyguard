import { prismaClient } from "../../../utils/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const result = await prismaClient.combinatedTest.create({
      data,
    });

    return Response.json(result);
  } catch (error: any) {
    return new Response(`Failed: ${error.message}`, {
      status: 500,
    });
  }
}
