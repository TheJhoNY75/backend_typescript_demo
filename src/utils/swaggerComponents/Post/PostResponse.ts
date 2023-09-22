export const PostResponse = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "The auto-generated id of the post",
    },
    user_id: {
      type: "string",
      description: "The user id of the post",
    },
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
    created_at: {
      type: "string",
      description: "The date of the post",
    },
    updated_at: {
      type: "string",
      description: "The date of the post",
    },
  },
  example: {
    id: "6704a3f8-c141-4239-9f27-c275a55f1fd1",
    title: "Post One",
    description: "This is the first post",
    image_url: "https://picsum.photos/200/300",
    user_id: "6704a3f8-c141-4239-9f27-c275a55f1fd1",
    created_at: "2021-01-01T00:00:00.000Z",
    updated_at: "2021-01-01T00:00:00.000Z",
  },
}