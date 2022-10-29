const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3005;
const app = express();

//express.json() is a middleware function in Express that parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());

//express.urlencoded is a middleware function that parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_network_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected to port ${PORT}`));