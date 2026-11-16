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
    const existingInWatchList = await prisma.orm.public.WatchListItem.where({
      movieId: movieId,
      userId: userId
    }).first();
    if (existingInWatchList) {
      return res.status(400).json({ error: 'Movie already in watchlist' });
    }

    const newWatchlistEntry = await prisma.orm.public.WatchListItem.create({
    userId: userId,
    movieId: movieId,
    status: status,
    rating: rating,
    notes: notes
    });
    res.status(201).json({ status: 'success', data: {newWatchlistEntry} });

  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  
}

const deleteFromWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.body;

    const deletedItem = await prisma.orm.public.WatchListItem
      .where({ userId: userId, movieId: movieId })
      .delete();

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found in watchlist' });
    }

    res.status(200).json({ status: 'success', data: { deletedItem } });
  } catch (error) {
    console.error('Error deleting from watchlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const watchlist = await prisma.orm.public.WatchListItem
      .where({ userId: userId })
      .all();
    if (!watchlist || watchlist.length === 0) {
      return res.status(404).json({ error: 'No watchlist found for this user' });
    }
    res.status(200).json({ status: 'success', data: { watchlist } });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { addToWatchlist, deleteFromWatchlist, getWatchlist };