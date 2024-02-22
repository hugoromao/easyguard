import {
  generatePassword,
  toLeetSpeak,
  validateEntropy,
  validateUserWords,
  validateUserNumbers,
} from "./passwd";
import {
  commonPortugueseWords,
  keyboardPatterns,
  leetSpeakLetters,
} from "./patterns";

describe("validateUserWords()", () => {
  it("should throws error if words length is less than 3", () => {
    expect(validateUserWords(["one", "word"])).toStrictEqual([
      {
        type: "wordError",
        message: "Insira no mínimo três palavras.",
        index: undefined,
      },
    ]);
  });

  it("should throws error if some word is less than 3 caracters", () => {
    expect(validateUserWords(["bo", "two", "three"])).toStrictEqual([
      {
        type: "wordError",
        message: "A palavra “bo” é menor que três caracteres.",
        index: 0,
      },
    ]);
  });

  it("should throws error if exists duplicated words", () => {
    expect(validateUserWords(["one", "one", "one"])).toStrictEqual([
      {
        type: "wordError",
        message: "Existem palavras repetidas.",
        index: undefined,
      },
    ]);
  });

  it("should throws error for common Portuguese words", () => {
    commonPortugueseWords.forEach((word) => {
      if (word.length > 3) {
        expect(validateUserWords([word, "two", "three"])).toStrictEqual([
          {
            type: "wordError",
            message: `${word} é uma palavra muito comum`,
            index: 0,
          },
        ]);
      }
    });
  });

  it("should throws error for keyboard patterns", () => {
    keyboardPatterns.forEach((word) => {
      if (word.length > 3) {
        expect(validateUserWords([word, "two", "three"])).toStrictEqual([
          {
            type: "wordError",
            message: "Não utilize padrões de teclado",
            index: 0,
          },
        ]);
      }
    });
  });

  it("does not throw error for valid input", () => {
    expect(validateUserWords(["word1", "word2", "word3"])).toStrictEqual([]);
  });
});

describe("validateUserNumbers()", () => {
  it("should throws error if numbers length is less than 2", () => {
    expect(validateUserNumbers([1])).toStrictEqual([
      {
        type: "numberError",
        message: "Insira no mínimo dois números.",
        index: undefined,
      },
    ]);
  });

  it("should throws error if exists duplicated numbers", () => {
    expect(validateUserNumbers([1, 1])).toStrictEqual([
      {
        type: "numberError",
        message: "Existem números repetidos.",
        index: undefined,
      },
    ]);
  });

  it("does not throw error for valid input", () => {
    expect(validateUserNumbers([1, 2])).toStrictEqual([]);
  });
});

describe("toLeetSpeak()", () => {
  it("should converts string to Leet Speak", () => {
    for (let letter in leetSpeakLetters) {
      expect(toLeetSpeak(letter)).toBe(leetSpeakLetters[letter as "A"]);
    }
    expect(false).toBeFalsy();
  });

  test("should not convert characters not in the Leet dictionary", () => {
    const result = toLeetSpeak("xy123");
    expect(result).toEqual("xy123");
  });
});

describe("validateEntropy()", () => {
  it("should return the correct entropy for a valid password", () => {
    expect(() => validateEntropy("StrongPassword123!@")).not.toThrow();
  });
});

describe("generatePassword()", () => {
  it("should thows error when the generated password is smaller than 16 caracters", () => {
    const data = generatePassword(["aaa", "b.b", "ccc"], [1, 4]);
    expect(data).toStrictEqual({
      ...data,
      errors: [
        {
          index: undefined,
          message: "A senha gerada é menor que 16 caracteres",
          type: "generatedPasswordError",
        },
      ],
    });
  });

  it("should throw an error for a password with entropy less than 60 bits", () => {
    expect(
      generatePassword(["aaa", "aaa"], [1, 2]).errors.findIndex(
        (e) => e.message === "A senha gerada possui entropia menor que 60 bits"
      ) !== -1
    ).toBeTruthy();
  });

  it("should run toLeetSpeak when shouldUseLeetSpeak is true", () => {
    jest.spyOn(Math, "ceil").mockImplementation(() => 1);
    const data = generatePassword(["aaaaaa", "aaaaaaa", "aaaaaaaa"], [1, 2]);

    expect(data.password?.includes("@")).toBeTruthy();
  });

  it("should not run toLeetSpeak when shouldUseLeetSpeak is false", () => {
    jest.spyOn(Math, "ceil").mockImplementation(() => 2);
    const data = generatePassword(["aaaa", "aaaaa", "aaaaaa"], [1, 2]);

    expect(data.password?.includes("a")).toBeTruthy();
  });
});
