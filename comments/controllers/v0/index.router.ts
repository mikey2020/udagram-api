import {Router, Request, Response} from 'express';
import {CommentRouter} from './comment/routes/comment.router';

const router: Router = Router();

router.use('/comment', CommentRouter);

router.get('/', async (req: Request, res: Response) => {
  res.send(`V0`);
});

export const IndexRouter: Router = router;
