export const AuthResponse = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description: "The message of the response",
    },
    token: {
      type: "string",
      description: "The token of the user",
    },
  },
  example: {
    message: "User authenticated",
    token: "Bearer <JWT token here>",
  },
}