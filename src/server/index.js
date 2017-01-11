import 'babel-polyfill';

import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`\nlistening on port: ${port}`));
