export const UserRequest = {
  type: "object",
  required: ["first_name", "last_name", "email", "password"],
  properties: {
    first_name: {
      type: "string",
      description: "The first name of the user",
    },
    last_name: {
      type: "string",
      description: "The last name of the user",
    },
    email: {
      type: "string",
      description: "The email of the user",
    },
    password: {
      type: "string",
      description: "The password of the user",
    },
  },
  example: {
    first_name: "John",
    last_name: "Doe",
    email: "example@mail.com",
    password: "123456",
  },
}