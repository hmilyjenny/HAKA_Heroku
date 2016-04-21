import { Router } from 'express';
import passport from 'passport';
import * as SystemController from '../controllers/system.controller';

const systemRouter = new Router();

systemRouter.use(passport.authenticate('jwt', { session: false}));//经过passport-jwt中间件
systemRouter.route('/getCategories').get(SystemController.getCategories);

export default systemRouter
