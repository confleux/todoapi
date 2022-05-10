import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as createUserSchema from '../validationSchemes/createUser.schema.json';
import { Request, Response, NextFunction } from 'express';
import log from "../logger";

export const ajv: Ajv = new Ajv();
addFormats(ajv);

ajv.addSchema(createUserSchema, "createUser");

const validateRequest = (schemaKey: string) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = ajv.getSchema(schemaKey);
  if (!(validate) || validate(req.body)) {
    return next();
  } else {
    const errors: string = ajv.errorsText(validate.errors);
    log.error(errors);
    res.status(400).send(errors);
  }
}

export { validateRequest };