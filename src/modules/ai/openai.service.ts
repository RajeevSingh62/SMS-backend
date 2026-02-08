import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const askAI = async (prompt: string): Promise<string> => {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  return response.choices[0].message.content?.trim() || "";
};
export const detectLanguage = async (message: string) => {
  const prompt = `
Detect the language of this message.
Return only one word: ENGLISH or HINGLISH.

Message:
"${message}"
`;
  return askAI(prompt);
};
/**
 * STEP 2: Explain Data Safely
 */
export const explainData = async (data: string): Promise<string> => {
  const prompt = `
Explain the following information in simple Hinglish.
Do NOT add new facts.
Do NOT change numbers.

Data:
${data}
`;

  return askAI(prompt);
};