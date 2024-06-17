import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import { sendRes } from './send.res';

export async function checkAuth(req: Request, res: CustomResponse, next: NextFunction) {

  
  try {
    const token: string = req.headers['access-token'] as string;
    if (!token) return sendRes(res, 500, false, 'Ha ocurrido algo grave', '');

    const { username, id } = jwt.verify(token, process.env!.JWT_KEY_APP!) as { id : string, username: string };
    res.userData = { id, username };
    return next();
  } catch (error) {
    return sendRes(res, 500, false, 'Problema con el token de acceso', error);
  }
}

export interface CustomResponse extends Response {
  id?:string;
  username?: string;
}

declare global {
  namespace Express {
    interface Response {
      userData?: {
        id: string,
        username: string
      };
    }
  }
}