export interface ResultsResponse {
  knowledgeTestScore: KnowledgeTestScore;
  memoryScores: MemoryScore[];
  typingScores: TypingScore[];
  combinatedScores: CombinatedScore[];
  usabilityScores: UsabilityScore[];
}

export interface KnowledgeTestScore {
  pre: Pre[];
  pos: Po[];
}

export interface Pre {
  name: string;
  posTest: boolean;
  scorePercent: string;
  passwordLength: number;
  passwordTotalCharacterGroups: number;
  passwordEntropy: number;
}

export interface Po {
  name: string;
  posTest: boolean;
  scorePercent: string;
  passwordLength: number;
  passwordTotalCharacterGroups: number;
  passwordEntropy: number;
}

export interface MemoryScore {
  egScore: number;
  btScore: number;
}

export interface TypingScore {
  egScore: number;
  btScore: number;
}

export interface CombinatedScore {
  egScore: number;
  btScore: number;
}

export interface UsabilityScore {
  usability: number;
  information: number;
  interface: number;
}
