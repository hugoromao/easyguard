/**
 * @jest-environment node
 */

import { isLeakedPassword, isInvalidPassword } from "./route";

describe("Password Validation Functions", () => {
  describe("isLeakedPassword", () => {
    it("should return true if password is leaked", async () => {
      const result = await isLeakedPassword("password123");
      expect(result).toBe(true);
    }, 30000);

    it("should return false if password is not leaked", async () => {
      const result = await isLeakedPassword(
        "content2010taça14piscina_infância"
      );
      expect(result).toBe(false);
    }, 30000);
  });

  describe("isInvalidPassword", () => {
    it("should return true if password is invalid", async () => {
      const result = await isInvalidPassword("password");
      expect(result).toBe(true);
    }, 30000);

    it("should return false if password is valid", async () => {
      const result = await isInvalidPassword(
        "content2010taça14piscina_infância"
      );
      expect(result).toBe(false);
    }, 30000);
  });
});
