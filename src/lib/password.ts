import { Scrypt } from "oslo/password";
import { generateRandomString, alphabet } from "oslo/crypto";

const scrypt = new Scrypt();

export async function hashPassword(password: string): Promise<string> {
  return await scrypt.hash(password);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await scrypt.verify(hashedPassword, password);
}

export function generateId(length: number = 16): string {
  return generateRandomString(length, alphabet("a-z", "A-Z", "0-9"));
}
