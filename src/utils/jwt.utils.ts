import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey: string = config.get('privateKey');

const sign = (obj: Object, opts?: jwt.SignOptions | undefined): string => {
  return jwt.sign(obj, privateKey, opts);
}

const decode = () => {

}

export { sign };