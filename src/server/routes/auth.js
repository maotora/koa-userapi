import Router from 'koa-rest-router';
import passport from 'koa-passport';
import jwt from 'jwt-simple';
import secret from './../secret';
import { signIn } from './../controllers/auth';

const api = new Router({prefix: '/api/v1'});

const router = api.loadMethods();

const requireAuth = passport.authenticate('local', { session: false});

const requireJwtAuth = passport.authenticate('jwt', {session: false});

router.post('/login', requireAuth, signIn);

router.get('/', async (ctx, next) => ctx.body = await "Welcome To User api!");

router.get('/success', async (ctx, next) => ctx.body = await "success!");

router.get('/fail', async (ctx, next) => ctx.body = await "fail!");

export default router;
