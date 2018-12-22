const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const fs = require('fs');
const webpackConfiguration = require('../webpack.config.dev');

const app = express();
const compiler = webpack(webpackConfiguration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(middleware(compiler, {
  hot: true,
  publicPath: webpackConfiguration.output.publicPath,
  noInfo: true
}));

app.post('/save', (req, res) => {
  const { body } = req;
  /**
   * save phone numbers to file storage
   */
  fs.appendFile('./phonenumbers.csv', body, (err) => {
    if (err) throw err;
    res.json({ message: 'Phone numbers saved!'});
  });
});

if (process.env.NODE_ENV === 'development') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}

const port = parseInt(process.env.PORT, 10) || 8080;
app.listen(port, () => console.log('Example app listening on port 8080!'));
