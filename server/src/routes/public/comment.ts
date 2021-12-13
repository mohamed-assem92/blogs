import {
  FastifyPluginAsync,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import {
  getComments,
  addComment,
} from '../../controllers/comment';
import { CommentDocument } from '../../models/Comment';

const commentsRoutes: FastifyPluginAsync<FastifyPluginOptions> = async (fastify) => {
  // Get All Blog Comment
  fastify.route({
    method: 'GET',
    url: '/:blogId',
    schema: {
      params: {
        $ref: 'findOneRouteParam#',
      },
      tags: ['Comments'],
      description: 'Get Blog Comments',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { blogId: string };
      const { redisClient } = fastify as any;
      const { mongoQuery: { options } } = request;
      redisClient.get(`comments${params.blogId}${options?.limit}${options?.offset}`, async (err, data) => {
        if (data) {
          const resultData = JSON.parse(data);
          reply.status(200).send(resultData);
        } else {
          const comments = await getComments(request.mongoQuery, params.blogId);
          if (comments.totalDocs) redisClient.setex(`comments${params.blogId}${options?.limit}${options?.offset}`, 600, JSON.stringify(comments));
          reply.status(200).send(comments);
        }
      });
    },
  });

  // Add Comment Route
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        $ref: 'addComment#',
      },
      tags: ['Comments'],
      description: 'Comment Creation',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { redisClient } = fastify as any;
      const commentData = request.body as CommentDocument;
      const comment = await addComment(commentData);
      redisClient.del(`comments${commentData.blogId}50`);
      reply.status(200).send(comment);
    },
  });
};

export default commentsRoutes;
