import {
  commonPortugueseWords,
  keyboardPatterns,
  leetSpeakLetters,
} from "./patterns";

export function validateUserInput(words: string[], numbers: number[]) {
  if (words.length < 3) throw new Error("Insira no mínimo três palavras.");

  if (numbers.length < 2) throw new Error("Insira no mínimo dois números.");

  words.forEach((word) => {
    if (word.length < 3)
      throw new Error(`A palavra “${word}” é menor que três caracteres.`);
  });

  const wordsSet = new Set(words);
  if (words.length !== wordsSet.size)
    throw new Error("Existem palavras repetidas.");

  const numbersSet = new Set(numbers);
  if (numbers.length !== numbersSet.size)
    throw new Error("Existem números repetidos.");

  words.forEach((word) => {
    if (commonPortugueseWords.includes(word))
      throw new Error(`${word} é uma palavra muito comum`);
    if (keyboardPatterns.includes(word))
      throw new Error("Não utilize padrões de teclado");
  });
}

export function toLeetSpeak(string: string): string {
  const randomString = string[Math.floor(Math.random() * string.length)] as "A";

  if (leetSpeakLetters[randomString] !== undefined) {
    return string.replaceAll(randomString, leetSpeakLetters[randomString]);
  }

  return string;
}

export function validateEntropy(password: string): number {
  let chars = 0;
  if (/[a-z]/.test(password)) chars = chars + 26;
  if (/[A-Z]/.test(password)) chars = chars + 26;
  if (/[0-9]/.test(password)) chars = chars + 10;
  if (/[!"£$%^&*()]/.test(password)) chars = chars + 10;
  if (/[`¬\-=_+[\]{};'#:@~,./<>?\\|]/.test(password)) chars = chars + 23;

  let entropy = parseInt(
    String(Math.log2(Math.pow(chars, password.length))),
    10
  );

  if (entropy < 60)
    throw new Error("A senha gerada possui entropia menor que 60 bits");

  return entropy;
}

export function generatePassword(
  iw: string[],
  inu: number[]
): { password: string; entropy: number } {
  const words = [...iw];
  const numbers = [...inu];

  const specialCaracters = [
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "{",
    "}",
    "]",
    "[",
    "`",
    ",",
    ".",
    "/",
    "?",
    ";",
    ":",
    "'",
    '"',
    "<",
    ">",
  ];

  validateUserInput(words, numbers);

  let temp: string[] = [];

  words.forEach((word, index) => {
    temp.push(word);
    if (index === words.length - 1) return;
    const randomNumber = Math.floor(Math.random() * numbers.length);

    if (randomNumber === 1 || numbers.length === 0) {
      const randomSpecialIndex = Math.floor(
        Math.random() * specialCaracters.length
      );
      temp.push(specialCaracters[randomSpecialIndex]);
    }

    if (randomNumber === 0 && numbers.length !== 0) {
      const randomNumberIndex = Math.floor(Math.random() * numbers.length);
      temp.push(String(numbers[randomNumberIndex]));
      numbers.splice(randomNumberIndex, 1);
    }
  });

  const shouldUseLeetSpeak = Math.ceil(Math.random() * 2);
  const password =
    shouldUseLeetSpeak === 1 ? toLeetSpeak(temp.join("")) : temp.join("");

  const entropy = validateEntropy(password);

  if (password.length < 16) {
    throw new Error("A senha gerada é menor que 16 caracteres");
  }

  // TODO: Validate against the following password meters: Passfault, The password meter and How secure is my password.
  return { password, entropy };
}
