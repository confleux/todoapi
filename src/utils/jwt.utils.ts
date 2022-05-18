import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey: string = config.get('privateKey');

const sign = (obj: Object, opts?: jwt.SignOptions | undefined): string => {
  return jwt.sign(obj, privateKey, opts);
}

const decode = (token: string): { valid: boolean, expired: boolean, decoded: string | jwt.JwtPayload | null} => {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null
    }
  }
}

export { sign, decode };