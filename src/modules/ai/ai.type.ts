export type AIIntent =
  | "MY_FEE_STATUS"
  | "CLASS_FEE_INFO"   // 👈 NEW
  | "FEE_DUE_DATE"
  | "SCHOOL_INFO"
  | "CLASS_SCHEDULE"
  | "UNKNOWN";



  
export interface AIChatRequest {
  message: string;
}

export interface AIChatResponse {
  intent: AIIntent;
  reply: string;
}