import { FastifyRequest } from 'fastify';
import mongoose from 'mongoose';
import BlogModel, { BlogDocument } from '../models/Blog';
import CustomError from '../helpers/customError';

export const getBlogs = (filter: FastifyRequest['mongoQuery']) => BlogModel.paginate(filter.criteria,
  { ...filter.options });

export const getBlog = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return new CustomError(422, 'UNPROCESSABLE ENTITY', 'Enter a Valid Blog ID');
  return BlogModel.findById(new mongoose.Types.ObjectId(id));
};

export const addBlog = (blogDocument: BlogDocument) => BlogModel.create(blogDocument);
