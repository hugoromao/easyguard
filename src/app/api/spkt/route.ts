export async function POST(req: Request) {
  try {
    const json = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/strong-password-knowledge-tests`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({ data: json }),
      }
    ).then((r) => r.json());

    return Response.json({ data: response });
  } catch (error: any) {
    return new Response(`Failed: ${error.message}`, {
      status: 500,
    });
  }
}
