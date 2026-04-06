export interface RegisterPayload {
    email: string;
    firstName: string;
    lastName: string;
    studentId: string;
    password: string;
}

export interface ExternalRegisterPayload {
    firstName: string;
    lastName: string;
    studentId: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: {
        email: string;
        firstName: string;
        lastName: string;
        studentId: string;
        verified: boolean;
    };
}

const externalUsersApiBaseUrl =
    import.meta.env.VITE_USERS_API_BASE_URL ||
    import.meta.env.REACT_APP_USERS_API_BASE_URL ||
    "https://kd1muhiyb9.execute-api.us-east-2.amazonaws.com";

const externalRegisterPath = "/users/register";

export async function registerUserInExternalApi(
    payload: ExternalRegisterPayload,
    token: string,
): Promise<void> {
    const response = await fetch(
        `${externalUsersApiBaseUrl}${externalRegisterPath}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        },
    );

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const message =
            errorBody?.message ||
            errorBody?.error ||
            "Failed to register user in external API.";
        throw new Error(message);
    }
}
