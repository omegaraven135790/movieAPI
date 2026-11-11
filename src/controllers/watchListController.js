import 'temporal-polyfill/full/global';
import { prisma } from '../config/db.js';   // see note below
const addToWatchlist = async (req, res) => {
  try {
    const {movieId,status,rating,notes,userId } = req.body;
    
const movie = await prisma.orm.public.movie.first({ id: movieId });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    //check if already added
    const existingInWatchList = await prisma.orm.public.watchlist.first({ where: { movieId, userId } });
    if (existingInWatchList) {
      return res.status(400).json({ error: 'Movie already in watchlist' });
    }

  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}