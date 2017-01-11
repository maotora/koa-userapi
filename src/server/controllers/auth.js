import User from './../model/user';
import jwt from 'jwt-simple';
import secret from './../secret';

function tokenForUser({id}) {
    
    const timeStamp = new Date().getTime,
          payload = {sub: id, iat: timeStamp},
          token = jwt.encode(payload, secret);

    return token;
}

const signIn = async (ctx, next) => {
    
    const user = await ctx.request.body;
    const token = tokenForUser(user);

    ctx.set('authorization', token);
    ctx.status = 200;
    ctx.redirect('/api/v1/success');
};

const signUp = async (ctx, next) => {
    
    const bodyInfo = await ctx.request.body;

    const userInst = new User(bodyInfo);

    const user = await userInst.save();

    const token = tokenForUser(user);

    ctx.status = 200;
    ctx.response.body = token;

    return next();
};

export { signUp, signIn };
