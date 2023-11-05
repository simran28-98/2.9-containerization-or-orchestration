var express = require('express');
var router = express.Router();

let mainArray = [];

router.get('/all', function (req, res, next) {
  res.send({
    message: 'Success',
    data: mainArray,
  });
});

router.post('/empty', function (req, res, next) {
  mainArray = [];
  res.send({
    message: 'Success',
  });
});

router.post('/addition', function (req, res, next) {
  const ans = Number(req.body.first) + Number(req.body.second);
  mainArray.push({
    action: 'Addition',
    input: `${req.body.first} + ${req.body.second}`,
    result: ans,
  });

  res.send({
    message: 'Success',
    data: ans,
  });
});

router.post('/subtraction', function (req, res, next) {
  const ans = Number(req.body.first) - Number(req.body.second);
  mainArray.push({
    action: 'Subtraction',
    input: `${req.body.first} - ${req.body.second}`,
    result: ans,
  });

  res.send({
    message: 'Success',
    data: ans,
  });
});

router.post('/multiplication', function (req, res, next) {
  const ans = Number(req.body.first) * Number(req.body.second);
  mainArray.push({
    action: 'Multiplication',
    input: `${req.body.first} * ${req.body.second}`,
    result: ans,
  });

  console.log(JSON.stringify(mainArray), mainArray.length);

  res.send({
    message: 'Success',
    data: ans,
  });
});

router.post('/division', function (req, res, next) {
  const ans = parseFloat(
    (Number(req.body.first) / Number(req.body.second)).toFixed(2)
  );
  mainArray.push({
    action: 'Division',
    input: `${req.body.first} / ${req.body.second}`,
    result: ans,
  });

  console.log(JSON.stringify(mainArray), mainArray.length);

  res.send({
    message: 'Success',
    data: parseFloat(ans.toFixed(2)),
  });
});

module.exports = router;
