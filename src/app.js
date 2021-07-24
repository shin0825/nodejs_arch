require('dotenv').config();

//モジュールのインポート
const http = require('http');
const express = require('express');
const request = require('request');

//expressオブジェクトの生成
const app = express();

//getでリクエスト時に処理するコールバック関数指定
app.get("/", function(req, res){
    return res.send("Hello World");
});

//サーバの設定
const server = http.createServer(app);
const port = process.env.PORT || 8114;
server.listen(port, () => {
    console.log("OK, Application is running now on port " + port + " !");
});

app.get('/get-music-profile', function (req, res) {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.SECRET;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const id = req.query.id || '5MueU1zNabzwtYbeqvyDKg';
        const options = {
          url: `https://api.spotify.com/v1/tracks/${id}`,
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        request.get(options, function(error, response, body) {
          res.send(body.name + ' / ' + body.artists[0].name);
        });
      } else {
        return res.send(response);}
    });
  });