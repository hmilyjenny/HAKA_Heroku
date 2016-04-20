import { Router } from 'express';
import passport from 'passport';
import * as ProjectController from '../controllers/project.controller';


const projectRouter = new Router();
projectRouter.use(passport.authenticate('jwt', { session: false}));//经过passport-jwt中间件

projectRouter.route('/createProjectName').post(ProjectController.createProjectName);


export default projectRouter
