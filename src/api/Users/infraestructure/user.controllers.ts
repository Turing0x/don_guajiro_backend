import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sendRes } from '../../../helpers/send.res';
import { UserModel } from '../models/user.model';
import { User } from '../interface/user.interface';

export class UsersControllers {

  static async getAllUsers (req: Request, res: Response) {

    try {
      const users = await UserModel.find().select('-password').lean();
      return sendRes(res, 200, true, 'Datos Obtenidos', users);
    } catch (error) { 
      if (error instanceof Error) {1
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message); 
      } else {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
      }
    }

  }

  static async getAllSeller (req: Request, res: Response) {

    try {
      const users = await UserModel.find({ role: 'seller' })
        .select('-password').lean();
      return sendRes(res, 200, true, 'Datos Obtenidos', users);
    } catch (error) { 
      if (error instanceof Error) {1
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message); 
      } else {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
      }
    }

  }

  static async getUsersById (req: Request, res: Response) {

    try {

      const { clientId } = req.params;
      if (!clientId) return sendRes(res,
        200,
        false,
        'Ha ocurrido algo grave', ''); 
    
      const user = await UserModel.findById(clientId).select('-password');
      if (!user) return sendRes(res, 200, false, 'Usuario no encontrado', ''); 
      
      return sendRes(res, 200, false, 'Resultado de la búsqueda', user); 
      
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message); 
      } else {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
      }
    }

  }

  static async saveUser(req: Request, res: Response) {
  
    try {

      const data: User = req.body;
      const exist = await UserModel.findOne({ username: data.username })

      if (exist) {
        return sendRes(res, 401, false, 'Ya existe ese nombre en nuestro sistema', '');
      }

      const hashPassword = bcrypt.hashSync(data.password!, 10);
      data.password = hashPassword;

      const user = new UserModel(data);
      await user.save();
      return sendRes(res, 200, true, 'Usuario Creado Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error);
    }

  }
  
  static async sign(req: Request, res: Response) {

    try {

      const { username, password } = req.body;
      const exist: User | null = await UserModel.findOne({ username })

      if (!exist) {
        return sendRes(res, 401, false, 'Ese usuario no está registrado en nuestro sistema', '');
      }
      
      const compare = bcrypt.compareSync(password, exist.password!);
      if (!compare) return sendRes(
        res,
        401,
        false,
        'Contraseña incorrecta', '');
        
      const token = jwt.sign(
        {
          username: exist.username,
          user_id: exist._id,
          enable: exist.enable
        },
        process.env.JWT_KEY_APP!,
        { expiresIn: '1d' }
      )
    
      return sendRes(res, 200, true, 'Inicio de sesión correcto', {
        user: {
          username: exist.username,
          userID: exist._id,
          role: exist.role!.toLocaleLowerCase()
        },
        token,
      });
      
    } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }

  }

  
  static async tokenVerify(req: Request, res: Response) {
  
    try {

      const { token } = req.params;

      if( !token ) return sendRes(res, 400, false, 'No se ha enviado el token', '');
      const decoded = jwt.verify(token, process.env.JWT_KEY_APP!) as { username: string }

      const user = await UserModel.findOne({ username: decoded['username'] });
      const newToken = jwt.sign(
        { username: user!.username, user_id: user!._id, status: user!.enable },
        process.env.JWT_KEY_APP!,
        { expiresIn: '1d' }
      )

      return sendRes(res, 200, true, 'todo ok', {
        user: {
          userID: user!._id,
          role: user!.role.toLocaleLowerCase()
        },
        token: newToken,
      });

    } catch (error) { 
      console.log(error)
      
      return sendRes(res, 400, false, 'Ha ocurrido algo grave', ''); }

  }

  static async deleteUser (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if( !id ) return sendRes(res, 200, false, 'Usuario no encontrado', ''); 
    
      await UserModel.deleteOne({ _id: id })
      return sendRes(res, 200, true, 'Usuario Eliminado Correctamente', '');

    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message); 
      } else {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
      }
    }

  }

  static async changeActive(req: Request, res: Response) {
    try {

      const data: User = req.body

      await UserModel.findOneAndUpdate({ _id: data._id }, {
        $set: {enable: data.enable}
      })

      return sendRes(res, 200, true, 'Usuario Editado', '');

    } catch (error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
    }
  }

}