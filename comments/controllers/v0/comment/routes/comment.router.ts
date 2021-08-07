import {Router, Request, Response} from 'express';
import {Comment} from '../models/Comment';
import {FeedItem} from '../models/FeedItem';
import {NextFunction} from 'connect';
import * as jwt from 'jsonwebtoken';
import * as c from '../../../../config/config';

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({message: 'No authorization headers.'});
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length != 2) {
    return res.status(401).send({message: 'Malformed token.'});
  }

  const token = tokenBearer[1];
  return jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
    }
    return next();
  });
}

/*const checkFeedExists = (feedId: string) => {
  const feed = await FeedItem.findByPK(feedId)    
  if(feed) return true
      return false
}*/

router.get('/feed/:feed_id', async (req: Request, res: Response) => {
  const items = await Comment.findAndCountAll({order: [['id', 'DESC']]});
  res.send(items.rows);
});

router.get('/:id',
    requireAuth,       
    async (req: Request, res: Response) => {
      const {id} = req.params;
      const item = await Comment.findByPk(id);
      res.send(item);
    });

router.post('/:feed_id',
    requireAuth,
    async (req: Request, res: Response) => {
     const {feed_id} = req.params;
     const {content} = req.body;
      if (!feed_id) {
        return res.status(400).send({message: 'Feed ID is required.'});
      }

      if (!content) {
        return res.status(400).send({message: 'content is required.'});
      }

      const item = await new Comment({
        content: content,
        feedId: feed_id,
      });

      const savedItem = await item.save();

      res.status(201).send(savedItem);
    });

export const CommentRouter: Router = router;
