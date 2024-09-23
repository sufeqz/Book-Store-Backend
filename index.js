import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import booksRoute from './routes/booksRoute.js';

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));

app.get('/', (req, res) => {
    console.log(req);
    return res.send('Server is ready');
    });

app.use('/books', booksRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
