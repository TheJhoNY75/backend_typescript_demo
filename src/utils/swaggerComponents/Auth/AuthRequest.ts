export const AuthRequest = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      description: "The email of the user",
    },
    password: {
      type: "string",
      description: "The password of the user",
    }
  },
  example: {
    email: "example@mail.com",
    password: "123456",
  },
}