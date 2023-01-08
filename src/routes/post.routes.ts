import { Router } from "express";
import {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/post.controller";
import { validateToken, validatePost, validatePostId } from "../middlewares";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    PostResponse:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the post
 *        title:
 *          type: string
 *          description: The title of the post
 *        description:
 *          type: string
 *          description: The description of the post
 *        image_url:
 *          type: string
 *          description: The image url of the post
 *        created_at:
 *          type: string
 *          description: The date of the post
 *        updated_at:
 *          type: string
 *          description: The date of the post
 *      example:
 *        id: 6704a3f8-c141-4239-9f27-c275a55f1fd1
 *        title: Post One
 *        description: This is the first post
 *        image_url: https://picsum.photos/200/300
 *        created_at: 2021-01-01T00:00:00.000Z
 *        updated_at: 2021-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    PostRequest:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          description: The title of the post
 *        description:
 *          type: string
 *          description: The description of the post
 *        image_url:
 *          type: string
 *          description: The image url of the post
 *      example:
 *        title: Post One
 *        description: This is the first post
 *        image_url: https://picsum.photos/200/300
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Paginate:
 *      type: object
 *      properties:
 *        page:
 *          type: number
 *          description: The page number
 *        count:
 *          type: 
 *            - string
 *            - null
 *          description: The number of items per page
 *        next:
 *          type: string
 *          description: The next page url
 *        prev:
 *          type: 
 *            - string
 *            - null
 *          description: The previous page url
 *        pages:
 *          type: number
 *          description: The total number of pages
 *      example:
 *        page: 1
 *        count: 20
 *        next: /api/post?page=1&limmit=10&sortBy=created_at&order=ASC
 *        prev: null
 *        pages: 2
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: The error message
 *      example:
 *        message: Error message
 */

/**
 * @swagger
 * tags:
 *  name: Post
 *  description: The post API
 */

/**
 * @swagger
 * /api/post:
 *  get:
 *    security:
 *      - Authorization: []
 *    tags:
 *      - Post
 *    summary: Get all posts
 *    description: Use to request all posts
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                results:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/PostResponse'
 *                info:
 *                  $ref: '#/components/schemas/Paginate'
 *      400:
 *        description: Bad request
 */


router.get("/", validateToken, getPosts);

/**
 * @swagger
 * /api/post:
 *  post:
 *    summary: Create a new post
 *    security:
 *      - Authorization: []
 *    tags:
 *      - Post
 *    description: This enpoint create a new post
 *    requestBody:
 *      required: 
 *        - title
 *        - description
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostRequest'
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */

router.post("/", validateToken, validatePost, createPost);

router.put("/", validateToken, validatePostId);

router.delete("/", validateToken, validatePostId);

router.get("/:postId", validateToken, getPost);

router.delete("/:postId", validateToken, deletePost);

router.put("/:postId", validateToken, validatePost, updatePost);

export default router;
