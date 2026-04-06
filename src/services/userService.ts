import { User } from "../types/user";

const baseUrl =
    import.meta.env.VITE_USERS_API_BASE_URL ||
    import.meta.env.REACT_APP_USERS_API_BASE_URL ||
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
            errorBody?.message || errorBody?.error || "Failed to get user.";
        throw new Error(message);
    }

    const user: User = await response.json();
    return user;
};
