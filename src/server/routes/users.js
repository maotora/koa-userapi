import Router from 'koa-rest-router';
import User from './../model/user';
import formurlencoded from 'form-urlencoded';
import passport from 'koa-passport';
import { signUp, signIn } from './../controllers/auth';

const requireJwtAuth = passport.authenticate('jwt', {session: false});

const api = new Router({prefix: '/api/v1'});

api.resource('users', {

    index: [
        requireJwtAuth,
        async (ctx, next) => {
            const list = await User.find({});

            ctx.status = 200;
            ctx.body = list;
            await next(); 
        }
    ],

    show: async (ctx, next) => {
        const id = await ctx.params.user;
        const user = await User.findOne({id});

        ctx.status = 200;
        ctx.body = user;
        await next(); 
    },

    create:[
        signUp,
        async (ctx, next) => {
            ctx.status = 201;
            await next(); 
        }
    ],

    edit: async (ctx, next) => {
        const id = await ctx.params.user;
        const user = await User.findOne({id});

        ctx.status = 200;
        ctx.body = user;
        await next(); 
    },

    update: async (ctx, next) => {
        const id = await ctx.params.user;
        const content = ctx.request.body;

        await User.update({id}, content);
        ctx.status = 202;
        await next(); 
    },

    remove: async (ctx, next) => {
        const id = await ctx.params.user;

        await User.remove({id});
        ctx.status = 202;
    }

});

export default api;
