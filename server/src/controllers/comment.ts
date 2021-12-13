import { FastifyRequest } from 'fastify';
import CommentModel, { CommentDocument } from '../models/Comment';

export const getComments = (filter: FastifyRequest['mongoQuery'], blogId: string) => CommentModel.paginate({ ...filter.criteria, blogId },
  { ...filter.options });

export const addComment = (commentDocument:
CommentDocument) => CommentModel.create(commentDocument);
