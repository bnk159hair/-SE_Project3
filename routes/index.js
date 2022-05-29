var express = require('express');
var router = express.Router();


var mysql = require('mysql');
const config = require('../config/key');
var pool = mysql.createPool(config.mySQL_config);

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
      })
  })
})
module.exports = router;
