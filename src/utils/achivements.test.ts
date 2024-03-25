import { HistoryItem } from "@/context/global";
import { getTotalConsecutiveDiff } from "./achievements";

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
