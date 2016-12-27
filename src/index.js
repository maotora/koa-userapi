import 'babel-polyfill';
import koa from 'koa';

const app = new koa();

app.use(async (cxt, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    cxt.body = `X-Reponse-Time is: ${ms}ms\n`;
});

app.use(logger(':url :method'));
app.use(logger());

function logger(format=":method :url") {
    
    return async (ctx, next) => {

        const str = format
            .replace(':method', ctx.method)
            .replace(':url', ctx.url);

        console.log(`logging\n${str}`);

        await next();

    }
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port: ${port}`));
