import Router from 'koa-rest-router';
import passport from 'koa-passport';
import jwt from 'jwt-simple';
import secret from './../secret';
import { signUp, signIn } from './../controllers/auth';

const api = new Router({prefix: '/api/v1'});

const router = api.loadMethods();

const requireAuth = passport.authenticate('local', { session: false});

const requireJwtAuth = passport.authenticate('jwt', {session: false});

router.post('/login', requireAuth, signIn);

router.post('/signup', signUp);

router.get('/success', async (ctx, next) => ctx.body = await "success!");

router.get('/fail', async (ctx, next) => ctx.body = await "fail!");

export default router;
