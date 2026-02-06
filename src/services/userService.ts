import { User } from "../types/user";

export async function fetchUserInfo(email: string, token: string): Promise<User> {
  const res = await fetch(
    `/api/utilities/getUserInfo?email=${encodeURIComponent(email)}`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Could not fetch user info");
  }
  return res.json();
}
