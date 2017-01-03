import passport from 'koa-passport';
import { Strategy as localStrategy } from 'passport-local';
import secret from './../secret';
import User from './../model/user';

passport.use(new localStrategy({}, function(username, password, done) {
    User.findOne({username}, (err, user) => {
        
        if(err) { return done(err); }

        if(!user) { return done(null, false); }

        return done(null, user);
    });
}));
