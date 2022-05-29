var express = require('express');
var router = express.Router();

//mysql 연결
var mysql = require('mysql');
const config = require('../config/key');
var pool = mysql.createPool(config.mySQL_config);

//비밀 번호 암호화
const bcrypt = require('bcrypt');
const saltRounds = 10


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next){
  console.log(req.body)

  var member_email = req.body.member_email;
  var member_password = req.body.member_password;
  var member_address = req.body.member_address
  var deal_count = 0
  var member_score = 0
  var member_interest = req.body.member_interest

  // 비밀 번호 암호화
  bcrypt.genSalt(saltRounds, function(err, salt){
    if(err) console.error("bcrypt err: "+err);
    bcrypt.hash(member_password, salt, function(err, hash){
      if(err) console.error("bcrypt err: "+err);
      member_password = hash
      var datas = [member_email, member_password, member_address, deal_count, member_score, member_interest]

      pool.getConnection(function(err, connection){
        var sqlForInsertMember = "INSERT INTO members(member_email, member_password, member_address, deal_count, member_score, member_interest) values(?, ?, ?, ?, ?, ?)"
          connection.query(sqlForInsertMember, datas, function(err,rows){
            if(err) console.error("err: "+err);
            console.log("rows : "+JSON.stringify(rows));
            res.redirect('/') //-> board로 redirect
            connection.release();
          
          /*
          return res.status(200).json({
            sucess: true
          })
          */
          });
      });
    });
  });
});
module.exports = router;
