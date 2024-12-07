import { randomUUID } from "crypto";

export const generateUuid = (): { storage: string; designer: string } => {
  const storage = randomUUID();
  const designer = randomUUID();

  return { storage, designer };
};
