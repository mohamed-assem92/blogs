export default {
  addComment: {
    title: 'Add Comment',
    $id: 'addComment',
    type: 'object',
    required: ['blogId', 'authorName', 'body'],
    properties: {
      blogId: { type: 'string' },
      authorName: { type: 'string' },
      body: { type: 'string' },
    },
    additionalProperties: false,
  },
};
