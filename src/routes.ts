import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify'

export function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get('/', (request, reply) => {
        
    });
    
};