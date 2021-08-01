import {Router, Request, Response} from 'express';
import {Comment} from '../models/Comment';
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

/*router.post('/:feed_id',
    requireAuth,
    async (req: Request, res: Response) => {

      if (!caption) {
        return res.status(400).send({message: 'Caption is required or malformed.'});
      }

      if (!fileName) {
        return res.status(400).send({message: 'File url is required.'});
      }

      const item = await new Comment({
        caption: caption,
        url: fileName,
      });

      const savedItem = await item.save();

      savedItem.url = AWS.getGetSignedUrl(savedItem.url);
      res.status(201).send(savedItem);
    });*/

export const CommentRouter: Router = router;
