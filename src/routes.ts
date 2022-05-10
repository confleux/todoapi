import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import { validateRequest } from "./middleware/validator";

export default (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/api/users',
    validateRequest('createUser'),
    createUserHandler
  );
}