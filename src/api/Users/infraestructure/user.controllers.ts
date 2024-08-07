import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sendRes } from '../../../helpers/send.res';
import { UserModel } from '../models/user.model';
import { User } from '../interface/user.interface';
import { Environment } from '../../../environments/env';

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

    const entity = req.query.entity;
    if(entity) {

      const users = await UserModel.find({
        $and: [{ role: 'seller' }, { entity }]
      })
      .select('-password').lean();
    
      return sendRes(res, 200, true, 'Datos Obtenidos', users);

    }
    
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
      Environment.JWT_KEY_APP || '',
      { expiresIn: '1d' }
    )
  
    return sendRes(res, 200, true, 'Inicio de sesión correcto', {
      userID: exist._id,
      name: exist.name,
      username: exist.username,
      entity: exist.entity,
      role: exist.role?.toLocaleLowerCase(),
      token,
    });
    
  } catch (error) { 
    return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }

}

async function tokenVerify(req: Request, res: Response) {

  try {

    const token: string = req.headers['access-token'] as string;


    if( !token ) return sendRes(res, 400, false, 'No se ha enviado el token', '');
    const decoded = jwt.verify(token, Environment.JWT_KEY_APP || '') as { username: string }

    const user = await UserModel.findOne({ username: decoded['username'] });
    const newToken = jwt.sign(
      { id: user?._id, username: user?.username },
      Environment.JWT_KEY_APP || '',
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

    const { id, enable } = req.params;

    await UserModel.updateOne({ _id: id }, 
      { $set: { enable } });

    return sendRes(res, 200, true, 'Usuario Editado', '');

  } catch (error) {
    return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
  }
}

async function changePassword(req: Request, res: Response) {
  try {

    let { actualPass, newPass } = req.body;
    const existingUser = await UserModel.findOne({
      _id: req.userData!.id
    }).select('password');

    bcrypt.compare(actualPass, existingUser?.password!, async (err, result) => {
      if (!result) {
        return sendRes(res, 200, false, 'Error al cambiar su clave de acceso', '');
      }

      if (err) {
        return sendRes(res, 200, false, 'Error al cambiar su clave de acceso', '');
      }

      newPass = await bcrypt.hash(newPass, 10);

      UserModel.updateOne({ _id: existingUser?.id }, { $set: { password: newPass } })
        .then(() => {
          return sendRes(res, 200, true, 'La clave de acceso ha sido cambiada correctamente', '');
        })
        .catch((err) => {
          return sendRes(res, 200, false, 'Error al cambiar su clave de acceso', err.message);
        });
    });

  } catch (error) {
    if (error instanceof Error) {
      return sendRes(res, 200, false, 'Error al cambiar su clave de acceso', error.message);
    } else {
      return sendRes(res, 200, false, 'Error al cambiar su clave de acceso', '');
    }
  }
};

async function resetPassword(req: Request, res: Response) {
  try {

    const existingUser = await UserModel.findOne({
      _id: req.query.userId
    }).select('password');

    const newPass = await bcrypt.hash('0000', 10);

    UserModel.updateOne({ _id: existingUser?.id }, { $set: { password: newPass } })
      .then(() => {
        return sendRes(res, 200, true, 'La clave de acceso ha sido reestablecida correctamente', '');
      })
      .catch((err) => {
        return sendRes(res, 200, false, 'Error al cambiar su clave de acceso', err.message);
      });

  } catch (error) {
    if (error instanceof Error) {
      return sendRes(res, 200, false, 'Error al cambiar su clave de acceso', error.message);
    } else {
      return sendRes(res, 200, false, 'Error al cambiar su clave de acceso', '');
    }
  }
};

export const UsersControllers = {
  changePassword,
  resetPassword,
  getAllSeller,
  getUsersById,
  changeActive,
  getAllUsers,
  tokenVerify,
  deleteUser,
  saveUser,
  sign
}