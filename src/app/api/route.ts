import { isInvalidPassword, isLeakedPassword } from "@/utils/webscraping";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const password = searchParams.get("password");

    if (!password) {
      return new Response(`Informe a senha`, {
        status: 400,
      });
    }

    return Response.json({
      isLeakedPassword: await isLeakedPassword(password),
      isInvalidPassword: await isInvalidPassword(password),
    });
  } catch (error: any) {
    return new Response(`Failed: ${error.message}`, {
      status: 500,
    });
  }
}
