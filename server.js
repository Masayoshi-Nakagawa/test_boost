const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDBに接続
mongoose.connect('mongodb://localhost:27017/novelDB', { useNewUrlParser: true, useUnifiedTopology: true });

// データモデルを定義
const novelSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Novel = mongoose.model('Novel', novelSchema);

// ミドルウェアの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// ルートエンドポイント
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/write.html');
});

// 小説一覧を取得するエンドポイント
app.get('/novels', async (req, res) => {
  try {
    const novels = await Novel.find();
    res.json(novels);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 小説を保存するエンドポイント
app.post('/novels', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNovel = new Novel({ title, content });
    await newNovel.save();
    res.status(201).send(newNovel);
  } catch (error) {
    res.status(500).send(error);
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
