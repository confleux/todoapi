import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Request, Response, NextFunction } from 'express';
import log from "../logger";

import * as createUserSchema from '../validationSchemes/createUser.schema.json';
import * as createUserSessionSchema from '../validationSchemes/createUserSession.schema.json';

export const ajv: Ajv = new Ajv();
addFormats(ajv);

ajv.addSchema(createUserSchema, "createUser");
ajv.addSchema(createUserSessionSchema, "createUserSession");

const validateRequest = (schemaKey: string) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const validate = ajv.getSchema(schemaKey);
  if (!(validate) || validate(req.body)) {
    return next();
  } else {
    const errors = ajv.errorsText(validate.errors);
    log.error(errors);
    return res.status(400).send(errors);
  }
}

export { validateRequest };