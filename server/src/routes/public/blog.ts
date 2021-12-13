import {
  FastifyPluginAsync,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import {
  getBlogs,
  getBlog,
  addBlog,
} from '../../controllers/blog';
import { BlogDocument } from '../../models/Blog';

const blogsRoutes: FastifyPluginAsync<FastifyPluginOptions> = async (fastify) => {
  // Get All Blogs Route
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Blogs'],
      description: 'Get Blogs',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { redisClient } = fastify as any;
      const { mongoQuery: { options } } = request;
      redisClient.get(`blogs${options?.limit}${options?.offset}`, async (err, data) => {
        if (data) {
          const resultData = JSON.parse(data);
          reply.status(200).send(resultData);
        } else {
          const blogs = await getBlogs(request.mongoQuery);
          redisClient.setex(`blogs${options?.limit}${options?.offset}`, 600, JSON.stringify(blogs));
          reply.status(200).send(blogs);
        }
      });
    },
  });

  // Get Blog by ID Route
  fastify.route({
    method: 'GET',
    url: '/:blogId',
    schema: {
      params: {
        $ref: 'findOneRouteParam#',
      },
      tags: ['Blogs'],
      description: 'Get Blog by ID',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { blogId: string };
      const { redisClient } = fastify as any;
      redisClient.get(params.blogId, async (err, data) => {
        if (data) {
          const resultData = JSON.parse(data);
          reply.status(200).send(resultData);
        } else {
          const blog = await getBlog(params.blogId);
          redisClient.set(params.blogId, JSON.stringify(blog));
          reply.status(200).send(blog);
        }
      });
    },
  });

  // Create Blog Route
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        $ref: 'addBlog#',
      },
      tags: ['Blogs'],
      description: 'Blog Creation',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { redisClient } = fastify as any;
      const blogData = request.body as BlogDocument;
      const blog = await addBlog(blogData);
      redisClient.del('blogs50');
      reply.status(200).send(blog);
    },
  });
};

export default blogsRoutes;
