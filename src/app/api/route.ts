import puppeteer from "puppeteer";

export async function isLeakedPassword(password: string): Promise<boolean> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://haveibeenpwned.com/Passwords");
    await page.type("#Password", password);
    await page.click("#searchPwnedPasswords");

    const resultSelector = await page.waitForSelector(".in .pwnTitle > h2");
    const resultText = await resultSelector?.evaluate((el) => el.textContent);

    await browser.close();

    return !resultText?.includes("Good news");
  } catch (err) {
    throw new Error(`Falha ao validar em base de senhas vazadas: ${err}`);
  }
}

export async function isInvalidPassword(password: string): Promise<boolean> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://passwordmeter.com");
    await page.type("#passwordPwd", password);
    const scoreSelector = await page.waitForSelector("#score");
    const scoreValue = await scoreSelector
      ?.evaluate((s) => s.textContent)
      .then((v) => v?.replace("%", ""));

    if (!scoreValue || isNaN(Number(scoreValue))) {
      throw new Error("Score inválido");
    }

    await browser.close();

    return Number(scoreValue) <= 80;
  } catch (err) {
    throw new Error(`Falha ao validar senha: ${err}`);
  }
}

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
