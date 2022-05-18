import { Express, Request, Response } from 'express';
import { validateRequest } from "./middleware/validator";
import { createUserHandler } from './controller/user.controller';
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import requiresUser from './middleware/requiresUser';

export default (app: Express): void => {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/api/users',
    validateRequest('createUser'),
    createUserHandler
  );

  app.post('/api/sessions',
    validateRequest('createUserSession'),
    createUserSessionHandler
  );

  app.get( '/api/sessions', getUserSessionsHandler);

  app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);
}