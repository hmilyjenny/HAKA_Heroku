import { Router } from 'express';
import passport from 'passport';
import * as ProjectController from '../controllers/project.controller';


const projectRouter = new Router();
projectRouter.use(passport.authenticate('jwt', { session: false}));//经过passport-jwt中间件

projectRouter.route('/getProjectById').get(ProjectController.getProjectById);
projectRouter.route('/getProjectByName').get(ProjectController.getProjectByName);
projectRouter.route('/createProjectName').post(ProjectController.createProjectName);
projectRouter.route('/createProjectCategories').post(ProjectController.createProjectCategories);


export default projectRouter
