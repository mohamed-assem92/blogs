import { FastifyInstance } from 'fastify';
import blogsRoutes from './blog';
import commentsRoutes from './comment';

const routes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(blogsRoutes, { prefix: '/blogs' });
  fastify.register(commentsRoutes, { prefix: '/comments' });
};

export default routes;
