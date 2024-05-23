import dotenv from 'dotenv';
dotenv.config();

import { ExpressServer } from './src/server/server'
const server = new ExpressServer()

server.listen()
