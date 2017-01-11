import app from './../dist/server/app';
import supertest, { agent } from 'supertest';
import User from './../src/server/model/user';
import Router from './../src/server/routes/auth';

let request;

try {
    request = agent(app.listen());
}catch(err) {
    console.log(err);
}

describe('User Api', () => {

    let a_user = {};

    beforeEach(async () => {
        a_user = { "username": "testing", "password": 'newpassword', "age": 22, "height": 179 };
        await User.remove({});
    })

    afterEach(async () => await User.remove({}));

    it('Gets users', async () => {
        const response = await request.post('/api/v1/signup/').send(a_user);
        const { text } = response;

        await request
            .post('/api/v1/users')
            .set('authorization', text)
            .expect(200);
    });

    it('Posts users', async () => {
        await request
            .post('/api/v1/users')
            .send(a_user)
            .expect(200);
    });

    it('Update user', async () => {
        let user = new User(a_user);
        let insertedUser = await user.save();

        await request
            .put(`/api/v1/users/${insertedUser._id}`)
            .expect(302);
    });

    it('Delete User', async () => {
        let user = new User(a_user);
        let insertedUser = await user.save();

        request
            .del(`/api/v1/users/${insertedUser._id}`)
            .expect(302);
    });
});
