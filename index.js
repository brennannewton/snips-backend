const app = require('./app');

/* Application */
app.listen(process.env.PORT || 5000, () => {
  console.log('Snipps listening on port 5000');
});
