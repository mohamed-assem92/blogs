export default {
  findOne: {
    $id: 'findOneRouteParam',
    type: 'object',
    required: ['blogId'],
    properties: {
      blogId: { type: 'string' },
    },
  },
};
