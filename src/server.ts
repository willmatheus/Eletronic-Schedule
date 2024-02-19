import express from 'express';
import { router } from './router.ts';
import cors from 'cors'


export const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const port = 3333;
app.listen({port}, () => {
    console.log(`Server running on http://localhost:${port}/`);
});