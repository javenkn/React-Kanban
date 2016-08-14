// Requires
const app = require('./appBack');

const server = app.listen(3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});