export const PostRequestUpdate = {
  type: "object",
  required: ["title", "description"],
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
  },
  example: {
    title: "Post One",
    description: "This is the first post",
    image_url: "https://picsum.photos/200/300",
  },
}