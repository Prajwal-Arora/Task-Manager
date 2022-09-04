const express = require('express');
const app = express();
const mongoose = require('./database');
const { auth } = require('./middleware/auth');
const { PORT } = require('../config/index');
app.listen(PORT, () => {
  console.log('Server is up on port ' + PORT);
});

app.use(express.json());

const loginRoute = require('./routers/loginRoute');
const signupRoute = require('./routers/signupRoute');
const userRoute = require('./routers/api/user');
const taskRoute = require('./routers/api/task');

app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/api/users', auth, userRoute);
app.use('/api/tasks', auth, taskRoute);
