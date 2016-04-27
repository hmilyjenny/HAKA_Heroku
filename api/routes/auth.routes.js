import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

/*
*     需要验证token是否存在的API方法调用的模式为以下方式
*    router.get('/auth/xxx', passport.authenticate('jwt', { session: false }), function(req, res) {
*    });
*
*/
const authRouter = new Router();
authRouter.post('/signIn',AuthController.signIn);
authRouter.post('/register',AuthController.register);
authRouter.get('/allUser',AuthController.GetAllUser);



export default authRouter;
