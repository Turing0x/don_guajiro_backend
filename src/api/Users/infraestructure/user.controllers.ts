import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sendRes } from '../../../helpers/send.res';
import { UserModel } from '../models/user.model';
import { User } from '../interface/user.interface';

async function getAllUsers (req: Request, res: Response) {

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

async function getAllSeller (req: Request, res: Response) {

  try {
    
    const users = await UserModel.find({ role: 'seller' })
      .select('-password').lean();
    
    return sendRes(res, 200, true, 'Datos Obtenidos', users);

  } catch (error) { 
    if (error instanceof Error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message); 
    } else {
      return sendRes(res, 200, false, 'Ha ocurridodasdasdas algo grave', '');
    }
  }

}

async function getUsersById (req: Request, res: Response) {

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

async function saveUser(req: Request, res: Response) {

  try {

    const data: User = req.body;
    const exist = await UserModel.findOne({ username: data.username })

    if (exist) {
      return sendRes(res, 400, false, 'Ya existe ese nombre en nuestro sistema', '');
    }

    const hashPassword = bcrypt.hashSync(data.password || '', 10);
    data.password = hashPassword;

    const user = new UserModel(data);
    await user.save();
    return sendRes(res, 200, true, 'Usuario Creado Exitosamente', '');
    
  } catch (error) {
    return sendRes(res, 200, false, 'Ha ocurrido algo grave', error);
  }

}

async function sign(req: Request, res: Response) {

  try {

    const { username, password } = req.body;
    const exist: User | null = await UserModel.findOne({ username })

    if (!exist) {
      return sendRes(res, 200, false, 'Ese usuario no está registrado en nuestro sistema', '');
    }
    
    const compare = bcrypt.compareSync(password, exist.password || '');
    if (!compare) return sendRes(
      res,
      200,
      false,
      'Contraseña incorrecta', '');
      
    const token = jwt.sign(
      {
        id: exist._id,
        username: exist.username,
        entity: exist.entity
      },
      process.env.JWT_KEY_APP || '',
      { expiresIn: '1d' }
    )
  
    return sendRes(res, 200, true, 'Inicio de sesión correcto', {
      username: exist.username,
      userID: exist._id,
      entity: exist.entity,
      role: exist.role?.toLocaleLowerCase(),
      token,
    });
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }

}

async function tokenVerify(req: Request, res: Response) {

  try {

    const token: string = req.headers['access-token'] as string;


    if( !token ) return sendRes(res, 400, false, 'No se ha enviado el token', '');
    const decoded = jwt.verify(token, process.env.JWT_KEY_APP || '') as { username: string }

    const user = await UserModel.findOne({ username: decoded['username'] });
    const newToken = jwt.sign(
      { id: user?._id, username: user?.username },
      process.env.JWT_KEY_APP || '',
      { expiresIn: '1d' }
    )

    return sendRes(res, 200, true, 'todo ok', {
      user: {
        userID: user?._id,
        role: user?.role.toLocaleLowerCase()
      },
      token: newToken,
    });

  } catch (error) { 
    console.log(error)
    
    return sendRes(res, 400, false, 'Ha ocurrido algo grave', ''); }

}

async function deleteUser (req: Request, res: Response) {

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

async function changeActive(req: Request, res: Response) {
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

export const UsersControllers = {
  getAllUsers,
  getAllSeller,
  getUsersById,
  saveUser,
  sign,
  tokenVerify,
  deleteUser,
  changeActive
}