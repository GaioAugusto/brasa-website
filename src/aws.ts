import { Amplify } from "aws-amplify";

const env = import.meta.env;

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId:
                env.VITE_AWS_COGNITO_USER_POOL_ID ??
                env.REACT_APP_AWS_COGNITO_USER_POOL_ID ??
                "",
            userPoolClientId:
                env.VITE_AWS_COGNITO_CLIENT_ID ??
                env.REACT_APP_AWS_COGNITO_CLIENT_ID ??
                "",
        },
    },
});
