import { User } from "../types/user";

export async function fetchUserInfo(email: string): Promise<User> {
  const res = await fetch(
    `/api/utilities/getUserInfo?email=${encodeURIComponent(email)}`
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Could not fetch user info");
  }
  return res.json();
}
