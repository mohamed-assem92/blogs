export default {
  addBlog: {
    title: 'Create Blog',
    $id: 'addBlog',
    type: 'object',
    required: ['title', 'authorName', 'body'],
    properties: {
      title: { type: 'string' },
      authorName: { type: 'string' },
      mainImageURL: { type: 'string' },
      body: { type: 'string' },
    },
    additionalProperties: false,
  },
};
