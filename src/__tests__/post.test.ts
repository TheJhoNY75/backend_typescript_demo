import supertest from "supertest";
import { createApp } from "../utils/createApp";

const app = createApp();
const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEyNmJlY2I4LWMwOWUtNDE1NC04MTc5LWQwMzFiNmFhZTVjMiIsInR5cGUiOiJzZXNzaW9uIiwiaWF0IjoxNjk1NTgyNDg3LCJleHAiOjE5MTE1ODI0ODd9.JVoT6RlLpiO_o7NlraPu1H-1L7haXqs_z4mRwJIuf_0`;
const postId = "e6c11b54-dcfd-4cd1-9484-b2b93fb9d232";

describe("Post", () => {
  describe(" Get Post by ID /api/post", () => {
    describe("When the post exists", () => {
      it("Should return the post a 200", async () => {
        const response = await supertest(app)
          .get(`/api/post/${postId}`)
          .set("Authorization", token)
          .set("Content-Type", "application/json");
        expect(response.status).toBe(200);
      });
      it("Should return the full post object", async () => {
        const response = await supertest(app)
          .get(`/api/post/${postId}`)
          .set("Authorization", token)
          .set("Content-Type", "application/json");
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            image_url: expect.any(String || null || undefined),
            user_id: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
          })
        );
      });
      it("Should return not found 404", async () => {
        const response = await supertest(app)
          .get(`/api/post/error`)
          .set("Authorization", token)
          .set("Content-Type", "application/json");
        expect(response.status).toBe(404);
      });
      it("Should return the unauthorized error 401", async () => {
        const response = await supertest(app)
          .get(`/api/post/${postId}`)
          .set("Content-Type", "application/json");
        expect(response.status).toBe(401);
      });
    });
  });
});
