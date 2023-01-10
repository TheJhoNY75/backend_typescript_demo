export const Paginate = {
  type: "object",
  properties: {
    page: {
      type: "number",
      description: "The current page",
    },
    count: {
      type: "number",
      description: "The count of items",
    },
    next: {
      type: ["string", "null"],
      description: "The next page",
    },
    prev: {
      type: ["string", "null"],
      description: "The previous page",
    },
    pages: {
      type: "number",
      description: "The total pages",
    },
  },
  example: {
    page: 1,
    count: 10,
    next: "http://localhost:3333/api/post?page=2",
    prev: null,
    pages: 1,
  },
};