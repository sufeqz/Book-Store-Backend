import express from 'express';
const router = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { title, author, description, publishYear } = req.body;

   
    if (!title || !author || !publishYear) {
        return res.status(400).json({ error: 'Title, author, and publish year are required.' });
    }

    try {
        const book = await prisma.book.create({
            data: {
                title,
                author,
                description,
                publishYear: new Date(publishYear) 
            }
        });
        return res.status(201).json(book); 
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/', async (req, res) => {
  try {
      const books = await prisma.book.findMany();
      return res.json(books);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
  }

});

router.get('/:id', async (req, res) => { 
  const { id } = req.params;
  try {
      const book = await prisma.book.findUnique({
          where: {
              id: parseInt(id)
          }
      });
      if (!book) {
          return res.status(404).json({ error: 'Book not found' });
      }
      return res.json(book);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
  }
});

router.put('/:id', async (req, res) => {
const { id } = req.params;
const { title, author, description, publishYear } = req.body;

const updateData = {};
if (title) updateData.title = title;
if (author) updateData.author = author;
if (description !== undefined) updateData.description = description;
if (publishYear) updateData.publishYear = new Date(publishYear);

try {
    const book = await prisma.book.update({
        where: {
            id: parseInt(id)
        },
        data: updateData
    });
    return res.json(book);
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
}
});

router.delete('/:id', async (req, res) => {
const { id } = req.params;
try {
    await prisma.book.delete({
        where: {
            id: parseInt(id)
        }
    });
    return res.json({ message: 'Book deleted' });
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
}
});

export default router;