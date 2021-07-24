//モジュールのインポート
const http = require('http');
const express = require('express');

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
