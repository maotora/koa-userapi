import User from './../model/user';

const signUp = async (ctx, next) => {
    
    const user = await ctx.request.fields;

    try {
        if(!user.username || !user.password) {
            ctx.status = 402;
            ctx.body = "Error, username and password must be provided!";
        }

    }catch(err){
        ctx.status = 402;
        ctx.body = "You must fill the form!";
        return err;
    } 

    const toSave = new User(user);

    toSave.save((err, user) => {
        
        if(err) { return next(err); }

        next();
    });
};

export { signUp };
