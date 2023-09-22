export const Message = {
  type: "object",
  required: ["message"],
  properties: {
    message: {
      type: "string",
      description: "message description by default",
    },
  },
  example: {
    message: "Message description",
  },
};
