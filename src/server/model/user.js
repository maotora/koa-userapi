import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    age: Number,
    height: Number,
    avatar: Buffer
});

userSchema.pre('save', async function(next) {
    
    const user = await this;

    //- make salt
    bcrypt.genSalt(10, (err, salt) => {
        
        if(err) { return next(err); }

        bcrypt.hash(user.password, salt, null, (err, hash) => {

            if(err) { return next(err); }
            
            user.password = hash;

            next();
        });
    });
});

userSchema.methods.comparePasswords = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, user) => {
        
        if(err) { return cb(err); }

        if(user) { return cb(null, user); }
    });
};

let user;

try {
   user = mongoose.model('user');
} catch(err) {
   user = mongoose.model('user', userSchema);
}

export default user;
