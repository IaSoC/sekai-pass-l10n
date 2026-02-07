// Web Crypto API based password hashing for Cloudflare Workers
// Using PBKDF2 instead of Scrypt for better compatibility

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const passwordData = encoder.encode(password);

  const key = await crypto.subtle.importKey(
    "raw",
    passwordData,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const hash = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    key,
    256
  );

  const hashArray = Array.from(new Uint8Array(hash));
  const saltArray = Array.from(salt);

  // Combine salt and hash
  const combined = saltArray.concat(hashArray);
  return combined.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const combined = new Uint8Array(
      hashedPassword.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    );

    const salt = combined.slice(0, 16);
    const originalHash = combined.slice(16);

    const passwordData = encoder.encode(password);

    const key = await crypto.subtle.importKey(
      "raw",
      passwordData,
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );

    const hash = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256"
      },
      key,
      256
    );

    const hashArray = new Uint8Array(hash);

    // Constant-time comparison
    if (hashArray.length !== originalHash.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < hashArray.length; i++) {
      result |= hashArray[i] ^ originalHash[i];
    }

    return result === 0;
  } catch (error) {
    return false;
  }
}

export function generateId(length: number = 16): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}
