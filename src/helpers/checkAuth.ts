import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import { sendRes } from './send.res';

export async function checkAuth(req: CustomRequest, res: Response, next: NextFunction) {

  try {

    const token: string = req.headers['access-token'] as string;

    if (!token) return sendRes(res, 500, false, 'No hay token en la peticion', '');

    const { username, id, entity } = jwt.verify(token, (process.env.JWT_KEY_APP || '')
      ) as { id: string, username: string, entity: string };

    req.userData = { id, username, entity };

    return next();

  } catch (error) {
    return sendRes(res, 500, false, 'Problema con el token de acceso', error);
  }
}

export interface CustomRequest extends Request {
  id?: string; username?: string;
}
  
declare module 'express' {
  interface Request {
    userData?: {
      id: string;
      username: string;
      entity: string;
    };
  }
}