import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sendRes } from '../../../helpers/send.res';
import { User } from '../interface/user.interface';
import { UserModel } from '../models/user.model';

export class UsersControllers {

  static async getAllUsers (req: Request, res: Response) {

    try {
      const users = await UserModel.find().lean();
      return sendRes(res, 200, true, 'Datos Obtenidos', users);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getUsersById (req: Request, res: Response) {

    try {

      const { clientId } = req.params;
      if (!clientId) return sendRes(res,
        500,
        false,
        'Error Grave', ''); 
    
      const user = await UserModel.findById(clientId);
      if (!user) return sendRes(res, 500, false, 'Usuario no encontrado', ''); 
      
      return sendRes(res, 500, false, 'Resultado de la búsqueda', user); 
      
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'mess_0', error.message); 
      } else {
        return sendRes(res, 500, false, 'mess_0', '');
      }
    }

  }

  static async saveUser(req: Request, res: Response) {
  
    try {

      const data: User = req.body;
      const exist = await UserModel.findOne({ email: data.name })

      if (exist) {
        return sendRes(res, 401, false, 'Ya existe ese nombre en nuestro sistema', '');
      }

      const hashPassword = bcrypt.hashSync(data.password!, 10);
      data.password = hashPassword;

      const user = new UserModel(data);
      await user.save();
      return sendRes(res, 200, true, 'Usuario Creado Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 500, false, 'Ha ocurrido algo grave', error);
    }

  }
  
  static async sign(req: Request, res: Response) {

    try {

      const { email, password } = req.body;
      const exist: User | null = await UserModel.findOne({ email })

      if (!exist) {
        return sendRes(res, 401, false, 'Ese correo no está registrado en nuestro sistema', '');
      }
      
      const compare = bcrypt.compareSync(password, exist.password!);
      if (!compare) return sendRes(
        res,
        401,
        false,
        'Contraseña incorrecta', '');
    
      const token = jwt.sign(
        {
          username: exist.name,
          user_id: exist._id,
          enable: exist.enable
        },
        process.env.JWT_KEY_APP!,
        { expiresIn: '1d' }
      )
    
      return sendRes(res, 200, true, 'Inicio de sesión correcto', {
        user: {
          userID: exist._id,
          role: exist.role!.toLocaleLowerCase()
        },
        token,
      });
      
    } catch (error) { return sendRes(res, 500, false, 'mess_0', ''); }

  }

  static async deleteUser (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if( !id ) return sendRes(res, 500, false, 'Usuario no encontrado', ''); 
    
      await UserModel.deleteOne({ _id: id })
      return sendRes(res, 200, true, 'Usuario Eliminado Correctamente', '');

    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Interno', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Interno', '');
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
      return sendRes(res, 500, false, 'Error Interno', '');
    }
  }

}