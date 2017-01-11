import app from './../dist/server/app';
import request from 'supertest';
import User from './../src/server/model/user';
import { expect } from 'chai';

const inst = app.listen();

describe('Authentication', () => {

    let a_user = {};

    beforeEach(async () => {
        a_user = { "username": "testing", "password": 'newpassword', "age": 22, "height": 179 };
        await User.remove({});
    })

    after(async () => await User.remove({}));
    
    it('signs up', async () => {
        await request(inst)
            .post('/api/v1/signup')
            .send(a_user)
            .expect(/[a-zA-Z0-9-_]+?\.[a-zA-Z0-9-_]+?\.([a-zA-Z0-9-_]+)[/a-zA-Z0-9-_]+?$/); //- Token
    });

    it('signs in', async () => {
        await request(inst)
            .post('/api/v1/signup')
            .send(a_user);

        delete a_user.age;
        delete a_user.height;

        await request(inst)
            .post('/api/v1/login')
            .send(a_user)
            .expect(/success/); //- Redirected Url
    });

    it('signs out', async () => {
        await request(inst)
            .get('/api/v1/users')
            .expect(/Unauthorized/); //- Authenticated request fails!
    });
});
