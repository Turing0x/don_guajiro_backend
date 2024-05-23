import express from 'express';
export const api = express.Router()

import { COLLECTIONS } from "../helpers/collections";

import { UsersRouter } from "../api/Users/router/user.router";
import { DebtsRouter } from '../api/Debts/router/debts.router';

api.use(`/${COLLECTIONS.USERS}`, UsersRouter)
api.use(`/${COLLECTIONS.DEBTS}`, DebtsRouter)
