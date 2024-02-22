import {
  commonPortugueseWords,
  keyboardPatterns,
  leetSpeakLetters,
  specialCaracters,
} from "./patterns";

export function validateUserWords(words: string[]): CustomError[] {
  const errors: CustomError[] = [];

  if (words.length < 3) {
    errors.push({
      type: "wordError",
      message: "Insira no mínimo três palavras.",
      index: undefined,
    });
  }

  words.forEach((word, index) => {
    if (word.length < 3) {
      errors.push({
        type: "wordError",
        message: `A palavra “${word}” é menor que três caracteres.`,
        index,
      });
    }
  });

  const wordsSet = new Set(words);
  if (words.length !== wordsSet.size) {
    errors.push({
      type: "wordError",
      message: "Existem palavras repetidas.",
      index: undefined,
    });
  }

  words.forEach((word, index) => {
    if (commonPortugueseWords.includes(word)) {
      errors.push({
        type: "wordError",
        message: `${word} é uma palavra muito comum`,
        index,
      });
    }
    if (keyboardPatterns.includes(word)) {
      errors.push({
        type: "wordError",
        message: "Não utilize padrões de teclado",
        index,
      });
    }
  });

  return errors;
}

export function validateUserNumbers(numbers: number[]) {
  const errors: CustomError[] = [];

  if (numbers.length < 2) {
    errors.push({
      type: "numberError",
      message: "Insira no mínimo dois números.",
      index: undefined,
    });
  }

  const numbersSet = new Set(numbers);
  if (numbers.length !== numbersSet.size) {
    errors.push({
      type: "numberError",
      message: "Existem números repetidos.",
      index: undefined,
    });
  }

  return errors;
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

  return entropy;
}

type CustomError = {
  type: "wordError" | "numberError" | "generatedPasswordError";
  index: number | undefined;
  message: string;
};

type Data = {
  success: boolean;
  password: string | null;
  entropy: number;
  errors: CustomError[];
};

export function generatePassword(iw: string[], inu: number[]): Data {
  const words = [...iw];
  const numbers = [...inu];

  let generatedPasswordErrors: CustomError[] = [];
  let wordErrors = validateUserWords(words);
  let numberErrors = validateUserNumbers(numbers);

  let password = null;
  let entropy = 0;

  let hasErrors = !wordErrors.length && !numberErrors.length;

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
  password =
    shouldUseLeetSpeak === 1 ? toLeetSpeak(temp.join("")) : temp.join("");

  entropy = validateEntropy(password);

  if (entropy < 60) {
    generatedPasswordErrors.push({
      type: "generatedPasswordError",
      message: "A senha gerada possui entropia menor que 60 bits",
      index: undefined,
    });
  }

  if (password.length < 16) {
    generatedPasswordErrors.push({
      type: "generatedPasswordError",
      message: "A senha gerada é menor que 16 caracteres",
      index: undefined,
    });
  }

  hasErrors =
    !wordErrors.length && !numberErrors.length && !generatePassword.length;

  // TODO: Validate against the following password meters: Passfault, The password meter and How secure is my password.
  return {
    success: !hasErrors,
    password: password,
    entropy,
    errors: [...wordErrors, ...numberErrors, ...generatedPasswordErrors],
  };
}
