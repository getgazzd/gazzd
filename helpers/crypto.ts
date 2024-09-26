import { createHash as cH } from "crypto";

export const createHash = (input: string) => {
  return cH("sha512").update(input).digest("hex");
};

export const hashIsEqual = (hash1: string, hash2: string) => hash1 === hash2;
