import supertest from 'supertest';
import { createApp } from '../utils/createApp';

const app = createApp();
const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlYWQxYzQ3LWMwY2UtNDMzZS1hMjE2LTFiMThmMjM0ZTk4YSIsInR5cGUiOiJzZXNzaW9uIiwiaWF0IjoxNjk1NTEyNTc0LCJleHAiOjE5MTE1MTI1NzR9.9F_EyuXrkNsD2AEBK9rcsWEznIIgvbAgevKeijjGEuY`
const postId = "00757477-ebdd-43c0-b10a-c112b64ba5bc"

describe('Post', () => {
  describe(' Get Post by ID /api/post', () => {
    describe('When the post exists', () => {
      it('Should return the post a 200', async () => {
        const response = await supertest(app)
        .get(`/api/post/${postId}`)
        .set('Authorization', token)
        .set('Content-Type', 'application/json');
          expect(response.status).toBe(200);
        });
        it('Should return the full post object', async () => {
          const response = await supertest(app)
          .get(`/api/post/${postId}`)
          .set('Authorization', token)
          .set('Content-Type', 'application/json');
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
          it('Should return not found 404', async () => {
            const response = await supertest(app)
            .get(`/api/post/error`)
            .set('Authorization', token)
            .set('Content-Type', 'application/json');
              expect(response.status).toBe(404);
          });
          it('Should return the unauthorized error 401', async () => {
            const response = await supertest(app)
            .get(`/api/post/${postId}`)
            .set('Content-Type', 'application/json');
              expect(response.status).toBe(401);
            });
      });
    });
});