import mongoose, {
  Document, model, PaginateModel, Schema,
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { omit } from 'lodash';
import CustomError from '../helpers/customError';

export interface CommentDocument extends Document {
  authorName: string;
  body: string;
  blogId: string;
}

export type CommentModelType = PaginateModel<CommentDocument>;

const CommentSchema = new Schema<CommentDocument, CommentModelType>(
  {
    blogId: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
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

// eslint-disable-next-line func-names
CommentSchema.pre('save', async function (next) {
  if (!mongoose.Types.ObjectId.isValid(this.blogId)) next(new CustomError(422, 'UNPROCESSABLE ENTITY', 'Enter a Valid Blog ID'));
  const blog = await mongoose.models.blog.findById(new mongoose.Types.ObjectId(this.blogId)).exec();
  if (blog) {
    next();
  } else {
    next(new CustomError(401, 'Not Found', 'No Blog Exist with Provided ID'));
  }
});

(CommentSchema as Schema).plugin(mongoosePaginate);

export const CommentModel = model<CommentDocument, CommentModelType>('comment', CommentSchema);

export default CommentModel;
