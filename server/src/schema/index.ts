import { FastifyPluginCallback, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import general from './general';
import blogs from './blogs';
import comments from './comments';

const addSchemaToContext: FastifyPluginCallback<FastifyPluginOptions> = (fastify, opts, done) => {
  const schemas = [
    general,
    blogs,
    comments,
  ];
  schemas.forEach((schema) => Object.values(schema).forEach((s) => fastify.addSchema(s)));
  done();
};

const addSchemaToContextPlugin = fastifyPlugin(addSchemaToContext, { name: 'add-schema-to-context' });

export default addSchemaToContextPlugin;
