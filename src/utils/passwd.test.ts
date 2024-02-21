import {
  generatePassword,
  toLeetSpeak,
  validateEntropy,
  validateUserInput,
} from "./passwd";
import {
  commonPortugueseWords,
  keyboardPatterns,
  leetSpeakLetters,
} from "./patterns";

describe("validateUserInput()", () => {
  it("should throws error if words length is less than 3", () => {
    expect(() => validateUserInput(["one", "word"], [1, 2])).toThrow(
      "Insira no mínimo três palavras."
    );
  });

  it("should throws error if numbers length is less than 2", () => {
    expect(() => validateUserInput(["one", "two", "three"], [])).toThrow(
      "Insira no mínimo dois números."
    );
  });

  it("should throws error if some word is less than 3 caracters", () => {
    expect(() => validateUserInput(["bo", "two", "three"], [1, 2])).toThrow(
      "A palavra “bo” é menor que três caracteres."
    );
  });

  it("should throws error if exists duplicated words", () => {
    expect(() => validateUserInput(["one", "one", "one"], [1, 2])).toThrow(
      "Existem palavras repetidas."
    );
  });

  it("should throws error if exists duplicated numbers", () => {
    expect(() => validateUserInput(["one", "two", "three"], [1, 1])).toThrow(
      "Existem números repetidos."
    );
  });

  it("should throws error for common Portuguese words", () => {
    commonPortugueseWords.forEach((word) => {
      if (word.length > 3) {
        expect(() => validateUserInput([word, "two", "three"], [1, 2])).toThrow(
          `${word} é uma palavra muito comum`
        );
      }
    });
  });

  it("should throws error for keyboard patterns", () => {
    keyboardPatterns.forEach((word) => {
      if (word.length > 3) {
        expect(() => validateUserInput([word, "two", "three"], [1, 2])).toThrow(
          "Não utilize padrões de teclado"
        );
      }
    });
  });

  test("does not throw error for valid input", () => {
    expect(() =>
      validateUserInput(["word1", "word2", "word3"], [1, 2])
    ).not.toThrow();
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

  it("should throw an error for a password with entropy less than 60 bits", () => {
    expect(() => validateEntropy("123456")).toThrow(
      "A senha gerada possui entropia menor que 60 bits"
    );
  });
});

describe("generatePassword()", () => {
  it("should thows error when the generated password is smaller than 16 caracters", () => {
    const words = ["a2c", "!ca", ".ab"];
    const numbers = [123, 456];
    expect(() => generatePassword(words, numbers)).toThrow(
      "A senha gerada é menor que 16 caracteres"
    );
  });

  it("should run toLeetSpeak when shouldUseLeetSpeak is true", () => {
    jest.spyOn(Math, "ceil").mockImplementation(() => 1);
    const password = generatePassword(
      ["aaaaaa", "aaaaaaa", "aaaaaaaa"],
      [1, 2]
    );

    expect(password.includes("@")).toBeTruthy();
  });

  it("should not run toLeetSpeak when shouldUseLeetSpeak is false", () => {
    jest.spyOn(Math, "ceil").mockImplementation(() => 2);
    const password = generatePassword(["aaaa", "aaaaa", "aaaaaa"], [1, 2]);

    expect(password.includes("a")).toBeTruthy();
  });
});
