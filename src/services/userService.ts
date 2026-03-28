import { User } from "../types/user";

export async function fetchUserInfo(
    email: string,
    token: string,
): Promise<User> {
    const res = await fetch(
        `/api/utilities/getUserInfo?email=${encodeURIComponent(email)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Could not fetch user info");
    }
    return res.json();
}

const externalRegisterPath = "/users/register";

const baseUrl =
    process.env.REACT_APP_USERS_API_BASE_URL ||
    "https://kd1muhiyb9.execute-api.us-east-2.amazonaws.com";
const routeUrl = `${baseUrl}/users/me`;

export const getUser = async (email: string, token: string): Promise<User> => {
    const response = await fetch(routeUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const message =
            errorBody?.message ||
            errorBody?.error ||
            "Failed to register user in external API.";
        throw new Error(message);
    }

    const user: User = await response.json();
    return user;
};
