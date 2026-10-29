import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get' });
});

router.post('/', (req, res) => {
  res.status(200).json({ message: 'Post' });
});

router.put('/', (req, res) => {
  res.status(200).json({ message: 'Put' });
});

router.delete('/', (req, res) => {
  res.status(200).json({ message: 'Delete' });
});

export default router;