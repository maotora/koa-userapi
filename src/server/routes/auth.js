import Router from 'koa-rest-router';
import passport from 'koa-passport';
import { signUp } from './../controllers/auth';

const api = new Router({prefix: '/api/v1'});

const router = api.loadMethods();

router.post('/login', async function(ctx, next) {
    
    const user = await ctx.request.fields;

    ctx.body = await user;
    console.log(user);
    await next();
}, passport.authenticate('local', {successRedirect: 'http://localhost:3000/api/v1/success', failureRedirect: 'http://localhost:3000/api/v1/fail', session: false}));

router.post('/signup', signUp, async (ctx, next) => {
    
    const user = await ctx.request.fields;
    console.log(user);
    await next();
});

router.get('/success', async (ctx, next) => ctx.body = await "success!");
router.get('/fail', async (ctx, next) => ctx.body = await "fail!");

export default router;
