import passport from 'koa-passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';
import secret from './../secret';
import User from './../model/user';

const localLogin = new localStrategy({passReqToCallback: true}, async(req, username, password, done) => {

    User.findOne({username}, (err, user) => {
        
        if(err) { return done(err) }

        if(!user) { return done(err) }

        user.comparePasswords(password, async(err, isMatch) => {

            if(!isMatch) { return done(null, false) }

            req.body = user;
            await done(null, user);
        });
    });
});

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret,
};

const jwtLogin = new jwtStrategy(jwtOpts, ({sub}, done) => {

    User.findById(sub, (err, user) => {
        
        if(err) { return done(err) }

        if(!user) { return done(null, false) }

        done(null, user);
    });
});

passport.use(localLogin);
passport.use(jwtLogin);
