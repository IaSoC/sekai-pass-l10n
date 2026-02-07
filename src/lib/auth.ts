import { Lucia } from "lucia";
import { D1Adapter } from "@lucia-auth/adapter-d1";
import type { D1Database } from "@cloudflare/workers-types";

export function initializeLucia(db: D1Database) {
  const adapter = new D1Adapter(db, {
    user: "users",
    session: "sessions"
  });

  return new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: true,
        sameSite: "lax"
      }
    },
    getUserAttributes: (attributes) => {
      return {
        username: attributes.username,
        email: attributes.email,
        displayName: attributes.display_name,
        avatarUrl: attributes.avatar_url
      };
    }
  });
}

export interface DatabaseUser {
  id: string;
  username: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
}

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof initializeLucia>;
    DatabaseUserAttributes: DatabaseUser;
  }
}
