import { toLeetSpeak, validateUserInput } from "./passwd";
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
