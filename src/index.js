const app = require('./app');
const { PORT } = require('../config/index');
app.listen(PORT, () => {
  console.log('Server is up on port ' + PORT);
});
