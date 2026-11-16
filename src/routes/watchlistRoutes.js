import express from 'express'
import { addToWatchlist,deleteFromWatchlist,getWatchlist } from '../controllers/watchListController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import {validateRequest} from '../middleware/validateRequest.js'
import { addWatchlistSchema, deleteWatchlistSchema } from '../validators/watchlistValidators.js';
const router = express.Router();
router.use(authMiddleware); // Apply the authMiddleware to all routes in this router

router.post('/', validateRequest(addWatchlistSchema), addToWatchlist);

router.get('/:userId', getWatchlist);

router.delete('/:userId',validateRequest(deleteWatchlistSchema), deleteFromWatchlist);

export default router;