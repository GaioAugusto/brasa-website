import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID ?? "",
      userPoolClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID ?? "",
    },
  },
});
