import "server-only";
import { createHmac, scryptSync, timingSafeEqual, randomBytes } from "node:crypto";

const SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  "dev-secret-change-me-in-production-please-use-a-real-random-secret-of-32+-chars";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@justsoftsolution.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export const SESSION_COOKIE = "jss_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function b64urlEncode(buf: Buffer | string): string {
  const b = typeof buf === "string" ? Buffer.from(buf) : buf;
  return b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

export interface SessionPayload {
  email: string;
  iat: number;
  exp: number;
}

export function signSession(payload: SessionPayload): string {
  const data = b64urlEncode(JSON.stringify(payload));
  const sig = createHmac("sha256", SECRET).update(data).digest();
  return `${data}.${b64urlEncode(sig)}`;
}

export function verifySession(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = createHmac("sha256", SECRET).update(data).digest();
  const provided = b64urlDecode(sig);
  if (provided.length !== expected.length) return null;
  if (!timingSafeEqual(provided, expected)) return null;
  try {
    const payload = JSON.parse(b64urlDecode(data).toString("utf8")) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function makeSession(email: string): string {
  const now = Math.floor(Date.now() / 1000);
  return signSession({ email, iat: now, exp: now + SESSION_MAX_AGE });
}

function hash(password: string, salt: Buffer): Buffer {
  return scryptSync(password, salt, 32);
}

export function verifyCredentials(email: string, password: string): boolean {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return false;
  const salt = Buffer.from("jss-static-salt-ok-for-single-admin");
  const a = hash(password, salt);
  const b = hash(ADMIN_PASSWORD, salt);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function generateRandomToken(): string {
  return b64urlEncode(randomBytes(24));
}
