import { Router } from 'express';
import passport from 'passport';
import * as ChannelsController from '../controllers/channels.controller';

const channelsRouter = new Router();
channelsRouter.use(passport.authenticate('jwt', { session: false}));//经过passport-jwt中间件

channelsRouter.get('/getChannelsAll',ChannelsController.getChannelsAll);
channelsRouter.post('/createChannels',ChannelsController.createChannels);
channelsRouter.post('/removeChannels',ChannelsController.removeChannels);

export default channelsRouter