import { askAI } from "./openai.service";
import { AIIntent } from "./ai.type";

// 🔹 Intent Detection
export const detectIntent = async (message: string): Promise<AIIntent> => {
  const prompt = `
Allowed intents:
- MY_FEE_STATUS
- CLASS_FEE_INFO
- FEE_DUE_DATE
- SCHOOL_INFO
- CLASS_SCHEDULE
- UNKNOWN

User message:
"${message}"

Return only one intent.
`;

  return (await askAI(prompt)) as AIIntent;
};

// 🔹 Language Detection
export const detectLanguage = async (
  message: string
): Promise<"ENGLISH" | "HINGLISH"> => {
  const prompt = `
Detect language.
Return only: ENGLISH or HINGLISH.

Message:
"${message}"
`;
  return (await askAI(prompt)) as "ENGLISH" | "HINGLISH";
};

// 🔹 Class Extraction (ADMIN)
export const extractClassName = async (
  message: string
): Promise<string | null> => {
  const prompt = `
Extract class from message.
Return only class (example: 5, 10, 8A).
If none, return NONE.

Message:
"${message}"
`;
  const res = await askAI(prompt);
  return res === "NONE" ? null : res;
};

// 🔹 Explanation
export const explainData = async (
  data: string,
  language: "ENGLISH" | "HINGLISH"
): Promise<string> => {
  const prompt = `
Explain in ${language === "ENGLISH" ? "clear English" : "simple Hinglish"}.
Do NOT change numbers.

Data:
${data}
`;
  return askAI(prompt);
};
