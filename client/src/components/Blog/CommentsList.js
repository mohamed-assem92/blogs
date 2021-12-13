import React from 'react';
import Comment from 'antd/es/comment';
import Avatar from 'antd/es/avatar';
import Tooltip from 'antd/es/tooltip';

const CommentsList = ({
  comments,
}) => (
  comments.sort().map((comment) => (
    <Comment
      key={comment.id}
      author={comment.authorName}
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt={comment.authorName} />}
      content={(
        <p>
          {comment.body}
        </p>
      )}
      datetime={(
        <Tooltip>
          <span>{new Date(comment.createdAt).toUTCString()}</span>
        </Tooltip>
      )}
    />
  ))
);

export default CommentsList;
