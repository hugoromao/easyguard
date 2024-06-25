import { validateEntropy } from "@/utils/passwd";

export const gabarito = {
  qo1: "false",
  qo2: "false",
  qo3: "true",
  qo4: "true",
  qo5: "false",
  qo6: "true",
  qo7: "false",
  qo8: "true",
  qo9: "false",
  qo10: "true",
  qo11: "false",
  qo12: "false",
  qo13: "false",
  qo14: "true",
  qo15: "true",
  qo16: "false",
  qo17: "true",
  qo18: "true",
  qo19: "false",
  qo20: "false",
};

export function mean(values: number[]) {
  return Number(
    (values.reduce((prev, curr) => prev + curr) / values.length).toFixed(2),
  );
}

export function getKnowledgeTestScorePercent(qos: any) {
  const hitsCount = Object.entries(qos).reduce((count, [key, value]) => {
    return count + (gabarito[key as "qo1"] === value ? 1 : 0);
  }, 0);

  return (hitsCount / 20).toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2,
  });
}

export function mapResult(result: any) {
  return result.map(
    // eslint-disable-next-line no-unused-vars
    ({ id, name, posTest, createdAt, updatedAt, qd1, qd2, ...qos }: any) => ({
      name,
      posTest,
      scorePercent: getKnowledgeTestScorePercent(qos),
      passwordLength: qd1.length,
      passwordTotalCharacterGroups: countCharacterGroups(qd1),
      passwordEntropy: validateEntropy(qd1),
    }),
  );
}

export function countCharacterGroups(str: string) {
  const groups = {
    lowerCase: false,
    upperCase: false,
    digits: false,
    specialChars: false,
  };

  for (const char of str) {
    if (/[a-z]/.test(char)) {
      groups.lowerCase = true;
    } else if (/[A-Z]/.test(char)) {
      groups.upperCase = true;
    } else if (/\d/.test(char)) {
      groups.digits = true;
    } else {
      groups.specialChars = true;
    }
  }

  return Object.values(groups).filter(Boolean).length;
}
