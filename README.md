# Koa User Api Example.

Koa v2 user api.

## Contains

* `koa-rest-router`.
* `koa-better-body`.
* `koa-passport` with `passport-jwt` & `passport-local` Auth
* `jwt-simple` creating my jwts.
* `mongoose`.
* async/awaits *If I should even mention this*.

### App Preparations.

Run your `mongod` service. 

**Unix**

    $ systemctl start mongod.service

**Windows**

    > md C:\data\db && path/to/mongo/bin/mongod

Install npm packages from `package.json`

    npm install 

**Run App** 

Start compiling ES2016/2017 files.

    npm run watch

Start server with (uses files from `/dist/server` so you need the above step
for this to work properly.

    npm run start

**Tests** 

Run tests with 

    npm run test

Watch them as you code with

    npm run test:watch

Contribution welcome!

Special Thanks to: 

- [tunnckoCore](https://github.com/tunnckoCore/)
- [rkusa](https://github.com/rkusa/)
