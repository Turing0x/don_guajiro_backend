import express from 'express';
export const api = express.Router()

import { COLLECTIONS } from "../helpers/collections";

import { UsersRouter } from "../api/Users/router/user.router";
import { DebtsRouter } from '../api/Debts/router/debts.router';
import { SalesRouter } from '../api/Sale/router/sales.router';

api.use(`/${COLLECTIONS.USERS}`, UsersRouter)
api.use(`/${COLLECTIONS.DEBTS}`, DebtsRouter)
api.use(`/${COLLECTIONS.SALES}`, SalesRouter)
