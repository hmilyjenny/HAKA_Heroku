import {Router} from 'express';
import passport from 'passport';
import * as ProjectController from '../controllers/project.controller';

const projectRouterNoToken = new Router();

projectRouterNoToken.get('/getFileThumbnails/:projectId/:imgId', ProjectController.getFileThumbnails);
projectRouterNoToken.get('/getFileImage/:projectId/:imgId', ProjectController.getFileImage);

export default projectRouterNoToken