import Router from 'koa-rest-router';
import User from './../model/user';
import formurlencoded from 'form-urlencoded';

const api = new Router({prefix: '/api/v1'});

api.resource('users', {

    index: async (ctx, next) => {
        //- fetching from the db then list 
        let userList = await User.find({});
        let list = '';

        userList.forEach(user => list += `Name: ${user.username}\nAge: ${user.age}\nId: ${user._id}\n`);

        ctx.status = 200;
        ctx.body = list;

        await next(); 
    },

    show: async (ctx, next) => {
        //- fetch a user..
        let userId = await ctx.params.user;

        let lastUser = await User.findOne({_id: userId});

        ctx.status = 200;
        ctx.body = `Name: ${lastUser.username}\nAge: ${lastUser.age}\nHeight: ${lastUser.height}`;

        await next(); 
    },

    create: async (ctx, next) => {
        //- post a new user
        let userData = await ctx.request.fields;

        let user = await new User(userData);

        let savedUser = await user.save();
        console.log(savedUser._id);

        ctx.status = 301;

        ctx.response.redirect(`${savedUser._id}`);

        return next(); 
    },

    edit: (ctx, next) => {
        //- single user details for editing
        ctx.body = "Performs exactly like show.. so nope!\n"; return next(); 
    },

    update: async (ctx, next) => {
        //- put new user details

        let userId = await ctx.params.user;

        await User.update({_id: userId}, ctx.request.fields);

        ctx.status = 202;
        ctx.response.redirect(`${userId}`);

        return next(); 
    },

    remove: async (ctx, next) => {
        //- deleting a new user
        const userId = await ctx.params.user;

        await User.remove({_id: userId});

        ctx.status = 200;
        ctx.response.redirect('http://localhost:3000/api/v1/users');
    }

});

export default api;
