export const UserResponse = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "The auto-generated id of the user",
    },
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
    created_at: {
      type: "string",
      description: "The date of the user",
    },
    updated_at: {
      type: "string",
      description: "The date of the user",
    },
  },
  example: {
    id: "6704a3f8-c141-4239-9f27-c275a55f1fd1",
    first_name: "John",
    last_name: "Doe",
    email: "example@mail.com",
    created_at: "2021-01-01T00:00:00.000Z",
    updated_at: "2021-01-01T00:00:00.000Z",
  },
};