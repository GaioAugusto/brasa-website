import { Amplify } from "aws-amplify";

const env = import.meta.env;

const userPoolId =
    env.VITE_AWS_COGNITO_USER_POOL_ID ??
    env.VITE_COGNITO_USER_POOL_ID ??
    env.REACT_APP_AWS_COGNITO_USER_POOL_ID ??
    env.REACT_APP_COGNITO_USER_POOL_ID ??
    "";

const userPoolClientId =
    env.VITE_AWS_COGNITO_CLIENT_ID ??
    env.VITE_COGNITO_USER_POOL_CLIENT_ID ??
    env.REACT_APP_AWS_COGNITO_CLIENT_ID ??
    env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID ??
    "";

if (!userPoolId || !userPoolClientId) {
    throw new Error(
        "Missing Cognito configuration. Set one of: " +
            "VITE_AWS_COGNITO_USER_POOL_ID or VITE_COGNITO_USER_POOL_ID, and " +
            "VITE_AWS_COGNITO_CLIENT_ID or VITE_COGNITO_USER_POOL_CLIENT_ID.",
    );
}

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId,
            userPoolClientId,
        },
    },
});
