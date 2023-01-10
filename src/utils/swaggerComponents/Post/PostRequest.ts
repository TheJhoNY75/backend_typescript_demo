export const PostRequest = {
  type: "object",
  required: ["title", "description", "user_id"],
  properties: {
    title: {
      type: "string",
      description: "The title of the post",
    },
    description: {
      type: "string",
      description: "The description of the post",
    },
    image_url: {
      type: "string",
      description: "The image url of the post",
    },
    user_id: {
      type: "string",
      description: "The user id of the post",
    },
  },
  example: {
    title: "Post One",
    description: "This is the first post",
    image_url: "https://picsum.photos/200/300",
    user_id: "6704a3f8-c141-4239-9f27-c275a55f1fd1",
  },
};
