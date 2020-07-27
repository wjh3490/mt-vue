const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get('/getFood', function(req, res) {
  //   let data = fs.createReadStream(path.join(__dirname, 'mock', 'food.json')).pipe(res);

  readFile('food.json', data => {
    res.status(200).json({
      status: 200,
      message: 'ok',
      data: JSON.parse(data)
    });
  });
});

router.get('/getComment', function(req, res) {
  readFile('comment.json', data => {
    res.status(200).json({
      status: 200,
      message: 'ok',
      data: JSON.parse(data)
    });
  });
});

router.get('/getInfo', function(req, res) {
  readFile('info.json', data => {
    res.status(200).json({
      status: 200,
      message: 'ok',
      data: JSON.parse(data)
    });
  });
});

module.exports = router;

function readFile(file, callback) {
  fs.readFile(path.join(__dirname, 'mock', file), 'utf8', (err, data) => {
    if (err) return console.log('读取文件失败', err);

    callback(data);
  });
}
