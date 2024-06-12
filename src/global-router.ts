import { Router } from 'express';
import authRouter from './auth/auth-router';
import messageRouter from './chat/message-routes';
import chatRouter from './chat/chat-routes';
// other routers can be imported here

const globalRouter = Router();


globalRouter.use(authRouter);
globalRouter.use(messageRouter);
globalRouter.use(chatRouter);


// other routers can be added here

export default globalRouter;
