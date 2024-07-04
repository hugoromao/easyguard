export interface ResultsResponse {
  knowledgeTestScore: KnowledgeTestScore;
  memoryScores: MemoryScore[];
  typingScores: TypingScore[];
  combinatedScores: CombinatedScore[];
  usabilityScores: UsabilityScore[];
  meanScores: { name: string; EasyGuard: number; Bitwarden: number }[];
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
  name: string;
  EasyGuard: number;
  Bitwarden: number;
}

export interface TypingScore {
  name: string;
  EasyGuard: number;
  Bitwarden: number;
}

export interface CombinatedScore {
  name: string;
  EasyGuard: number;
  Bitwarden: number;
}

export interface UsabilityScore {
  name: string;
  Utilidade: number;
  Informação: number;
  Interface: number;
}
