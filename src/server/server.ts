/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';

import { api } from '../routes/index.routes';
import { dbConnection } from '../database/config';

export class ExpressServer {
  
  app: any;

  constructor() {
    this.app = express()

    // Conectar la base de datos
    this.conectDB()

    // Middlewares
    this.middlewares()

    this.routes()
  }

  listen() {    
    this.app.listen(
      process.env.PORT, () => {
        console.clear();
        console.log('Servidor corriendo en el puerto', process.env.PORT)
      }
    )
  }

  async conectDB () { await dbConnection() }

  middlewares () {
    this.app.use(cors())

    // Lectura y parseo a formato JSON del body
    this.app.use(express.json())

    // Ruta publica para ver el html
    this.app.use(express.static('src/public'))
  }

  routes() { this.app.use(process.env.ROUTES_PREFIX, api) }
  
}