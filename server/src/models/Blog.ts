import {
  Document, model, PaginateModel, Schema,
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import validator from 'validator';
import { omit } from 'lodash';

export interface BlogDocument extends Document {
  title: string;
  authorName: string;
  mainImageURL: string;
  body: string;
}

export type BlogModelType = PaginateModel<BlogDocument>;

const BlogSchema = new Schema<BlogDocument, BlogModelType>(
  {
    title: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    mainImageURL: {
      type: String,
      required: false,
      validate: validator.isURL,
    },
    body: {
      type: String,
      required: true,
    },
    __v: { type: Number, select: false },
  },
  {
    toJSON: {
      versionKey: false,
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        return omit(ret, ['_id']);
      },
    },
    timestamps: true,
  },
);

(BlogSchema as Schema).plugin(mongoosePaginate);

export const BlogModel = model<BlogDocument, BlogModelType>('blog', BlogSchema);

export default BlogModel;
