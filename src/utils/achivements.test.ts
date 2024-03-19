import { HistoryItem } from "@/context/global";
import {
  achievements,
  getTotalConsecutiveDiff,
  getTotalPasswordsCreated,
} from "./achievements";

describe("achivements", () => {
  it("should activate “O início da jornada!” and get progress correctly", () => {
    const history: HistoryItem[] = [
      { type: "password", createdAt: new Date() },
    ];
    const result1 = achievements[0].activationFunction(history, []);
    const result2 = achievements[0].activationFunction([], []);
    const progress1 = achievements[0].getProgress(history, []);
    const progress2 = achievements[0].getProgress([], []);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(progress1).toBe(1);
    expect(progress2).toBe(0);
  });

  it("should activate “Pegando o jeito” and get progress correctly", () => {
    const history: HistoryItem[] = Array(10).fill({
      type: "password",
      createdAt: new Date(),
    });

    const result1 = achievements[1].activationFunction(history, []);
    const result2 = achievements[1].activationFunction([], []);
    const progress1 = achievements[1].getProgress(history, []);
    const progress2 = achievements[1].getProgress([], []);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(progress1).toBe(1);
    expect(progress2).toBe(0);
  });

  it("should activate “Pegando o jeito” and get progress correctly", () => {
    const history: HistoryItem[] = Array(20).fill({
      type: "password",
      createdAt: new Date(),
    });

    const result1 = achievements[2].activationFunction(history, []);
    const result2 = achievements[2].activationFunction([], []);
    const progress1 = achievements[2].getProgress(history, []);
    const progress2 = achievements[2].getProgress([], []);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(progress1).toBe(1);
    expect(progress2).toBe(0);
  });

  it("should activate “Hábitos seguros” and get progress correctly", () => {
    const history: HistoryItem[] = [
      { type: "password", createdAt: new Date("2024-02-26T16:44:27.772Z") },
      { type: "password", createdAt: new Date("2024-02-27T16:44:27.772Z") },
      { type: "password", createdAt: new Date("2024-02-28T16:44:27.772Z") },
    ];

    const result1 = achievements[3].activationFunction(history, []);
    const result2 = achievements[3].activationFunction([], []);
    const progress1 = achievements[3].getProgress(history, []);
    const progress2 = achievements[3].getProgress([], []);
    const progress3 = achievements[3].getProgress(history.slice(0, 1), []);
    const progress4 = achievements[3].getProgress(history.slice(0, 2), []);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(progress1).toBe(1);
    expect(progress2).toBe(0);
    expect(progress3).toBe(1 / 3);
    expect(progress4).toBe(2 / 3);
  });

  it("should activate “Persistente que chama?” and get progress correctly", () => {
    const history: HistoryItem[] = Array(5)
      .fill(1)
      .map((_, index) => ({
        type: "password",
        createdAt: new Date(`2024-02-0${index + 1}T16:44:27.772Z`),
      }));

    const result1 = achievements[4].activationFunction(history, []);
    const result2 = achievements[4].activationFunction([], []);
    const progress1 = achievements[4].getProgress(history, []);
    const progress2 = achievements[4].getProgress([], []);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(progress1).toBe(1);
    expect(progress2).toBe(0);
    expect(achievements[4].getProgress(history.slice(0, 1), [])).toBe(1 / 5);
    expect(achievements[4].getProgress(history.slice(0, 2), [])).toBe(2 / 5);
    expect(achievements[4].getProgress(history.slice(0, 3), [])).toBe(3 / 5);
    expect(achievements[4].getProgress(history.slice(0, 4), [])).toBe(4 / 5);
  });

  it("should activate “Dedicação inabalável” and get progress correctly", () => {
    const history: HistoryItem[] = Array(7)
      .fill(1)
      .map((_, index) => ({
        type: "password",
        createdAt: new Date(`2024-02-0${index + 1}T16:44:27.772Z`),
      }));

    const result1 = achievements[5].activationFunction(history, []);
    const result2 = achievements[5].activationFunction([], []);
    const zeroProgress = achievements[5].getProgress([], []);

    expect(result1).toBe(true);
    expect(result2).toBe(false);

    expect(zeroProgress).toBe(0);
    expect(achievements[5].getProgress(history.slice(0, 1), [])).toBe(1 / 7);
    expect(achievements[5].getProgress(history.slice(0, 2), [])).toBe(2 / 7);
    expect(achievements[5].getProgress(history.slice(0, 3), [])).toBe(3 / 7);
    expect(achievements[5].getProgress(history.slice(0, 4), [])).toBe(4 / 7);
    expect(achievements[5].getProgress(history.slice(0, 5), [])).toBe(5 / 7);
    expect(achievements[5].getProgress(history.slice(0, 6), [])).toBe(6 / 7);
    expect(achievements[5].getProgress(history.slice(0, 7), [])).toBe(7 / 7);
  });

  it("should activate “Acordando com os pássaros” and get progress correctly", () => {
    const history: HistoryItem[] = Array(3).fill({
      type: "password",
      createdAt: new Date(`2024-02-27T10:44:27.772Z`),
    });

    const result1 = achievements[6].activationFunction(history, []);
    const result2 = achievements[6].activationFunction([], []);
    const progress1 = achievements[6].getProgress(history, []);
    const progress2 = achievements[6].getProgress([], []);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(progress1).toBe(1);
    expect(progress2).toBe(0);
  });

  it("should activate “Coruja noturna” and get progress correctly", () => {
    const history: HistoryItem[] = Array(3).fill({
      type: "password",
      createdAt: new Date(`2024-02-27T22:44:27.772Z`),
    });

    const result1 = achievements[7].activationFunction(history, []);
    const result2 = achievements[7].activationFunction([], []);
    const progress1 = achievements[7].getProgress(history, []);
    const progress2 = achievements[7].getProgress([], []);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(progress1).toBe(1);
    expect(progress2).toBe(0);
  });

  it("should activate “Sextou!” and get progress correctly", () => {
    const history: HistoryItem[] = [
      { type: "password", createdAt: new Date("2024-03-22T22:44:27.772Z") },
    ];

    const result1 = achievements[8].activationFunction(history, []);
    const result2 = achievements[8].activationFunction([], []);
    const progress1 = achievements[8].getProgress(history, []);
    const progress2 = achievements[8].getProgress([], []);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
    expect(progress1).toBe(1);
    expect(progress2).toBe(0);
  });

  it("should activate “Topo do mundo” and get progress correctly", () => {
    const completed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result1 = achievements[9].activationFunction([], completed);
    const result2 = achievements[9].activationFunction([], []);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
    const progress1 = achievements[9].getProgress([], completed);
    const progress2 = achievements[9].getProgress([], []);
    const progress3 = achievements[9].getProgress([], [1, 2, 3, 4, 5]);
    expect(progress1).toBe(1);
    expect(progress2).toBe(0);
    expect(progress3).toBe(5 / 10);
  });
});

describe("getTotalConsecutiveDiff", () => {
  it("should return 0 for empty history", () => {
    const history: HistoryItem[] = [];
    const result = getTotalConsecutiveDiff(history, "day");
    expect(result).toBe(0);
  });

  it("should return the correct number of consecutive days", () => {
    const history: HistoryItem[] = [
      { type: "password", createdAt: new Date("2024-03-10") },
      { type: "password", createdAt: new Date("2024-03-11") },
      { type: "password", createdAt: new Date("2024-03-13") },
      { type: "password", createdAt: new Date("2024-03-14") },
      { type: "password", createdAt: new Date("2024-03-16") },
    ];
    const result = getTotalConsecutiveDiff(history, "day");
    expect(result).toBe(2); // 11-10, 14-13
  });

  it("should return the correct number of consecutive weeks", () => {
    const history: HistoryItem[] = [
      { type: "password", createdAt: new Date("2024-03-01") },
      { type: "password", createdAt: new Date("2024-03-08") },
      { type: "password", createdAt: new Date("2024-03-15") },
      { type: "password", createdAt: new Date("2024-03-22") },
    ];
    const result = getTotalConsecutiveDiff(history, "week");
    expect(result).toBe(4);
  });
});

describe("getTotalPasswordsCreated", () => {
  it("should return 0 for empty history", () => {
    const history: HistoryItem[] = [];
    const result = getTotalPasswordsCreated(history);
    expect(result).toBe(0);
  });

  it("should return the correct number of passwords created", () => {
    const history: HistoryItem[] = [
      { type: "password", createdAt: new Date() },
      { type: "password", createdAt: new Date() },
      { type: "password", createdAt: new Date() },
      { type: "password", createdAt: new Date() },
    ];
    const result = getTotalPasswordsCreated(history);
    expect(result).toBe(4);
  });
});
