import app from './../dist/server/app';
import supertest, { agent } from 'supertest';
import User from './../src/server/model/user';

let request;

try {
    request = agent(app.listen());
}catch(err) {
    console.log(err);
}

describe('Main App', () => {

    let a_user = {};

    beforeEach(async () => {
        a_user = { username: "testing", password: 'newpassword', age: 22, height: 179 };
        await User.remove({});
    })

    afterEach(async () => await User.remove({}))

    it('Get http requests', (done) => {
        request
            .get('/api/v1/users')
            .expect(200, done);
    });

    it('makes post http requests', (done) => {
        request
            .post('/api/v1/users')
            .send(a_user)
            .expect(301, done);
    });

    it('makes put http requests', async () => {
        let user = new User(a_user);
        let insertedUser = await user.save();

        request
            .put(`/api/v1/users/${insertedUser._id}`)
            .expect(302);
    });

    it('makes del http requests', async () => {
        let user = new User(a_user);
        let insertedUser = await user.save();

        request
            .del(`/api/v1/users/${insertedUser._id}`)
            .expect(302);
    });
});
