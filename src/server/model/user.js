import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: String,
    age: Number,
    height: Number,
    avatar: Buffer
});

let user;

try {
   user = mongoose.model('user');
} catch(err) {
   user = mongoose.model('user', userSchema);
}

export default user;
