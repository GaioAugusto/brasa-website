export const ADMIN_GROUP = "admins";

export const getGroupsFromIdToken = (idToken: string | null): string[] => {
    if (!idToken) {
        return [];
    }

    try {
        const payload = idToken.split(".")[1];
        if (!payload) {
            return [];
        }

        const claims = JSON.parse(
            atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
        );
        const groups = claims["cognito:groups"];

        return Array.isArray(groups) ? groups : [];
    } catch {
        return [];
    }
};

/** True when the ID token's `cognito:groups` claim contains the admins group. */
export const isAdminIdToken = (idToken: string | null): boolean =>
    getGroupsFromIdToken(idToken).includes(ADMIN_GROUP);
