import { fastify } from 'fastify';
import { routes } from './routes';


export const app = fastify();

app.register(routes);

const port = 3333;
app.listen({port}, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
