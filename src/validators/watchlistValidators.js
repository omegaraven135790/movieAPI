import {z} from 'zod';

const addWatchlistSchema = z.object({
  userId: z.string().uuid(),
  movieId: z.string().uuid(),
    status: z.enum(['watched', 'watching', 'to-watch']),
    rating: z.number().min(0).max(5),
    notes: z.string().max(255).optional()
});

const deleteWatchlistSchema = z.object({
  movieId: z.string().uuid()
});

export { addWatchlistSchema, deleteWatchlistSchema };