var express = require('express');
var router = express.Router();



//mysql 연결
var mysql = require('mysql');
const config = require('../config/key');
var pool = mysql.createPool(config.mySQL_config);

//비밀 번호 암호화
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

//인증
const { auth } = require("../middleware/auth");
const app = require('../app');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//사진 - 하영
const multer = require('multer');
const path = require('path');
//const upload = multer({ dest: 'public/'});
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});


router.get('/api', (req, res, next) => {
  console.log("hello");
  pool.getConnection(function (err, connection) {
    var sqlForSelectList = "SELECT * FROM products ORDER BY product_interest DESC  LIMIT 15"
    connection.query(sqlForSelectList, function (err, rows) {
      console.log("hello");

      if (err) console.error("error : " + err);
      console.log("rows : " + JSON.stringify(rows));

      //res.render('/*render할 페이지*/', /*{넘겨야하는 변수}*/);
      connection.release();

      return res.status(200).json({
        sucess: true,
        rows: rows
      });
    });
  });
});

router.post('/api/users/search', function (req, res, next) {
  //찾을 키워드: req.body.searchwd
  var search_word = req.body.searchwd;
  console.log(req.body)
  pool.getConnection(function (err, connection) {
    var sqlForSelectList = "SELECT * FROM products WHERE product_title LIKE " +
      connection.escape('%' + search_word + '%') +
      "OR product_content LIKE " + connection.escape('%' + search_word + '%');
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("error : " + err);
      console.log("rows : " + JSON.stringify(rows));

      //res.render('*render할 페이지*/', /*{넘겨야하는 변수}*/);
      connection.release();
      return res.status(200).json({
        success: true,
        rows: rows
      });
    })
  })

})
router.get('/api/users/register', function (req, res, next) {
  //res.render(/*가져올 페이지*/ */, { title: 'Express' });
});

router.post('/api/users/register', function (req, res, next) {
  console.log(req.body)

  var member_email = req.body.member_email;
  var member_password = req.body.member_password;
  var member_address = req.body.member_address;
  var member_score = 0;

  // 비밀 번호 암호화
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) console.error("bcrypt err: " + err);
    bcrypt.hash(member_password, salt, function (err, hash) {
      if (err) console.error("bcrypt err: " + err);
      member_password = hash
      var datas = [member_email, member_password, member_address, member_score]

      pool.getConnection(function (err, connection) {
        var sqlForInsertMember = "INSERT INTO members(member_email, member_password, member_address, member_score) values(?, ?, ?, ?)"
        connection.query(sqlForInsertMember, datas, function (err, rows) {
          if (err) console.error("err: " + err);
          console.log("rows : " + JSON.stringify(rows));

          //res.redirect('/') //-> board로 redirect
          connection.release();
          console.log('success');
          return res.status(200).json({
            success: true
          })
        });
      });
    });
  });
});

router.post('/api/users/login', function (req, res) {
  var member_email = req.body.member_email
  var member_password = req.body.member_password

  pool.getConnection(function (err, connection) {
    var sqlForSelectMember = "SELECT * FROM members where member_email = ? "

    connection.query(sqlForSelectMember, member_email, function (err, rows) {
      //요청된 이메일을 데이터베이스에서 있는지 찾는다.
      if (err) console.error("err: " + err);
      console.log("rows : " + JSON.stringify(rows));
      // rows가 어떤 값을 갖는지 보기
      // 없다면
      console.log(rows.length)
      if (rows.length === 0) {
        return res.json({
          loginSucess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }

      console.log(rows[0].member_password)
      //있다면
      //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
      bcrypt.compare(member_password, rows[0].member_password, function (err, isMatch) {
        if (err) console.error("login_bcrpyt_compare_eror: " + err);
        if (!isMatch)
          return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
        //비밀번호 까지 맞다면 토큰을 생성하기.
        //jsonwebtoken을 이용해서 token생성
        var token = jwt.sign(rows[0].member_id, 'secretToken')
        var data = [token, member_email]
        var sqlForUpdateMember = "Update members SET token=? WHERE member_email=?"
        connection.query(sqlForUpdateMember, data, function (err, result) {
          console.log(data);
          // 토큰 저장-> 쿠키 
          if (err) console.error("login_token_update_err: ", err);
          res.cookie("x_auth", token).status(200).json({ loginSuccess: true, userId: token })
        });
        //res.redirect('/') //-> board로 redirect
        //connection.release();
      });


    });
  });
});

router.post('/api/users/auth', auth, function (req, res) {
  console.log('auth given req.rows: ' + JSON.stringify(req.row))
  //auth middle ware를 통과했다는 얘기는 authentication이 성공적으로 되었다는 말
  return res.status(200).json({
    member_id: req.row.member_id,
    member_email: req.row.member_email
  });
});

router.get('/api/users/logout', auth, function (req, res) {
  console.log('auth given req.rows: ' + JSON.stringify(req.row));
  pool.getConnection(function (err, connection) {
    var data = ["", req.row.member_id]
    var sqlForSelectMember = "Update members SET token=? where member_id=?"
    connection.query(sqlForSelectMember, data, function (err, rows) {
      if (err) console.error("err: " + err);

      //res.redirect('/') //-> board로 redirect
      connection.release();
      return res.status(200).send({
        success: true
      });
    });
  });
});

router.post('/api/users/comment', function (req, res) {
  var sender_email = req.body.sender_email;
  var comment = req.body.comment_content;
  var product = req.body.comment_product_id;
  pool.getConnection(function (err, connection) {
    var data = [sender_email, comment, product];
    var sqlForInsertMember = "INSERT INTO comments(comment_sender_email, comment_content, comment_product_id) values(?, ?, ?)";
    connection.query(sqlForInsertMember, data, function (err, rows) {
      if (err) console.error("err: " + err);
      connection.release();
      return res.status(200).send({
        Insertion_success: true
      });
    });
  });
});

//////////////////////////////////////////////////////////////////// 하영 코드 /////////////////////////////////////////////////////////////////////////
router.get('/api/member_selling', auth, function (req, res) { // 개인판매상품 목록 - 테스트 완료
  try {
    var member_email = req.row.member_email;

    pool.getConnection(function (err, connection) {
      var sqlForSelectList = "SELECT * FROM products WHERE product_saler = ? ;";
      connection.query(sqlForSelectList, member_email, function (err, rows) {
        if (err) console.error("err : " + err);
        console.log("rows : " + JSON.stringify(rows[0]));
        Sele
        res.send(rows);
        connection.release();
      });
    });
  }
  catch (e) {
    throw e;
  }
});


router.get('/api/info/:product_id', auth, function (req, res) { // 특정 판매상품 구매페이지 - 테스트 완료
  var product_id = req.params.product_id; //승건 참고
  var member_id = req.row.member_id;
  //var product_id = req.body.product_id; //승건 참고
  //var member_id = req.body.member_id;
  try {
    pool.getConnection(function (err, connection) {
      var sqlForSelectList = "SELECT * FROM products WHERE product_id = ? ; SELECT * FROM comments WHERE comment_product_id = ? ;" // 상품 정보 가져오기
      connection.query(sqlForSelectList, [product_id, product_id], function (err, rows) { // rows에 상품 정보 담김
        if (err) console.error("err : " + err);
        //console.log("rows : " + JSON.stringify(rows));
        var product_saler = rows[0].product_saler;
        datas = [member_id, product_id, product_saler];
        var checkzzim = "SELECT interest_id FROM interest_products WHERE member_id = ? AND product_id = ?; SELECT * FROM members WHERE member_email = ? ;" // 해당 상품을 고객이 찜했는지
        connection.query(checkzzim, datas, function (err, zzim_res) {
          if (err) console.error("err : " + err);
          //console.log("rows : " + JSON.stringify(zzim_res));
          if (zzim_res[0].length == 0) {
            console.log("Noop");
          }
          var photoSQL = "SELECT photo_data FROM photos WHERE product_id = ? ;" // 사진 데이터 반환
          connection.query(photoSQL, product_id, function (err, photo_data) {
            if (err) console.error("err : " + err);
            //console.log("rows : " + JSON.stringify(zzim_res));
            res.send([rows, zzim_res, photo_data]); // 두개 반환
            connection.release();
          });
        });
      });
    });
  }
  catch (e) {
    throw e;
  }
});


router.post('/api/info/:product_id', auth, function (req, res) { // 찜버튼 눌렀을때 동적으로 반응
  var product_id = req.params.product_id; //승건 참고
  var member_id = req.row.member_id;
  //var product_id = req.body.product_id; //승건 참고
  //var member_id = req.body.member_id;


  pool.getConnection(function (err, connection) {
    datas = [member_id, product_id, product_id];
    var checkzzim = "SELECT interest_id FROM interest_products WHERE member_id = ? AND product_id = ?; SELECT product_interest FROM products WHERE product_id = ?;" // 해당 상품을 고객이 찜했는지
    connection.query(checkzzim, datas, function (err, zzim_res) {
      if (err) console.error("err : " + err);
      var zzim_num = zzim_res[1][0].product_interest;
      //console.log(zzim_res[0]);
      if (zzim_res[0].length == 0) { //찜을 안한상태일때
        zzim_num = parseInt(zzim_num) + 1;
        var updatezzim =
          "UPDATE products SET product_interest = ? WHERE product_id = ? ; INSERT INTO interest_products(product_id, member_id) VALUES (?, ?); SELECT product_interest FROM products WHERE product_id = ?" // 해당 상품을 고객이 찜했는지
        add_zzim = [zzim_num, product_id, product_id, member_id, product_id];
        connection.query(updatezzim, add_zzim, function (err, zzim_res) {
          if (err) console.error("err : " + err);
          //console.log("rows : " + JSON.stringify(zzim_res[2]));
          res.send(zzim_res); // 두개 반환params

        });
      } else {
        console.log("Delete zzim");
        zzim_num = parseInt(zzim_num) - 1;
        var updatezzim =
          "UPDATE products SET product_interest = ? WHERE product_id = ? ; DELETE FROM interest_products WHERE member_id = ? AND product_id = ? ; SELECT product_interest FROM products WHERE product_id = ?" // 해당 상품을 고객이 찜했는지
        add_zzim = [zzim_num, product_id, member_id, product_id, product_id];
        connection.query(updatezzim, add_zzim, function (err, zzim_res) {
          if (err) console.error("err : " + err);
          console.log("rows : " + JSON.stringify(zzim_res[2]));
          res.send(zzim_res);
        });
      };
      connection.release();

    });
  });
});

router.get('/api/zzim', auth, function (req, res) { // 찜기능 테스트 완료
  console.log(req.row.member_id);
  try {
    pool.getConnection(function (err, connection) {
      var sqlForSelectList = "SELECT product_id FROM interest_products WHERE member_id = ?"
      connection.query(sqlForSelectList, req.row.member_id, function (err, rows) {
        if (err) console.error("err : " + err);
        console.log("rows : " + JSON.stringify(rows));

        res.send(rows);
        connection.release();
      });
    });
  }
  catch (e) {
    throw e;
  }
})


router.get('/api/sellwrite', auth, function (req, res, next) { //물건 판매하기 사이트 불러오기
  var member_id = req.params.member_id;

  res.send();
});


router.post('/api/sellwrite', auth, upload.array('img'), function (req, res) { // 게시글 업로드
  var product_title = req.body.product_title;
  var product_saler = req.row.member_email;
  var product_price = req.body.product_price;
  var product_interest = 0;
  var product_state = 0; //판매중: 0
  var product_content = req.body.product_content;
  var product_image = new Array();

  pool.getConnection(function (err, connection) {
    var sqlForSelectList = "INSERT INTO products(product_title, product_saler, product_price, product_interest, product_state, product_content) VALUES (?, ?, ?, ?, ?, ?);"
    datas = [product_title, product_saler, product_price, product_interest, product_state, product_content];
    connection.query(sqlForSelectList, datas, function (err, result) {
      if (err) console.error("err : " + err);
      console.log("insert ID : " + JSON.stringify(result.insertId));
      insertID = result.insertId;
      for (let i = 0; i < req.files.length; i++) {
        product_image.push([insertID, req.files[i].filename]);
      };
      var sqlForPhoto = "INSERT INTO photos (product_id, photo_data) VALUES ?;";
      connection.query(sqlForPhoto, [product_image], function (err, res) {
        if (err) console.error("err : " + err);
        //console.log("insert ID : " + JSON.stringify(result.insertId));
        var sqlForPP = "UPDATE products SET product_photo = ? WHERE product_id = ?;";
        var temp = req.files[0].filename;
        console.log(typeof(temp));
        connection.query(sqlForPP, [temp, insertID], function (err, result) {
          if (err) console.error("err : " + err);
          console.log("insert ID : " + JSON.stringify(result.insertId));
  
          res.send('Success');
          connection.release();
        });
      });
    });
  });
});

router.get('/api/cor/:product_id', auth, function (req, res) { // 수정을 요청하는 자가 판매자가 맞는지 확인
  var member_email = req.row.member_email;

  console.log("member_email : ", member_email.length)
  var product_id = req.params.product_id;
  //var member_email = req.body.member_email;
  //var product_id = req.body.product_id;
  pool.getConnection(function (err, connection) {
    if (err) console.error("커넥션 객체 얻어오기 에러 : ", err);

    var sql = "SELECT product_saler FROM products WHERE product_id = ?";
    connection.query(sql, product_id, function (err, result) {
      if (err) console.error(err);
      var product_saler = result[0].product_saler;
      console.log("update에서 1개 글 조회 결과 확인 : ", product_saler.length);
      console.log(product_saler[0] === member_email[0])
      console.log(product_saler[1] === member_email[1])
      console.log(product_saler[2] === member_email[2])
      console.log(product_saler[3] === member_email[3])
      console.log(product_saler[4] === member_email[4])
      console.log(product_saler === member_email)
      var r = product_saler === member_email
      res.send(r);
      connection.release();
    });
  });

});

router.get('/api/sellupdate', auth, function (req, res) { //물건 판매하기 사이트 불러오기
  var product_id = req.query.idx;

  pool.getConnection(function (err, connection) {
    if (err) console.error("커넥션 객체 얻어오기 에러 : ", err);

    var sql = "SELECT * FROM products WHERE product_id = ?";
    connection.query(sql, product_id, function (err, rows) {
      if (err) console.error(err);
      console.log("update에서 1개 글 조회 결과 확인 : ", rows);
      res.send(rows);
      connection.release();
    });
  });
});

router.post('/api/sellupdate', auth, upload.array('img'), function (req, res) { //데이터 업로드
  var product_id = req.body.product_id;
  var product_title = req.body.product_title;
  var product_price = req.body.product_price;
  var product_state = req.body.product_state; //판매중: 0
  var product_content = req.body.product_content;
  var product_image = new Array();

  pool.getConnection(function (err, connection) {
    var sqlForSelectList = "UPDATE products SET product_title = ?, product_price = ?, product_state = ?, product_content = ? WHERE product_id = ?; DELETE FROM photos WHERE product_id = ? ;"
    datas = [product_title, product_price, product_state, product_content, product_id, product_id];
    connection.query(sqlForSelectList, datas, function (err, result) {
      if (err) console.error("err : " + err);
      //console.log("insert ID : "+JSON.stringify(result.insertId));
      //insertID = result.insertId;
      for (let i = 0; i < req.files.length; i++) {
        product_image.push([product_id, req.files[i].filename]);
      };
      var sqlForPhoto = "INSERT INTO photos (product_id, photo_data) VALUES ?";
      connection.query(sqlForPhoto, [product_image], function (err, result) {
        if (err) console.error("err : " + err);
        console.log("insert ID : " + JSON.stringify(result.insertId));

        res.send('Success');
        connection.release();
      });
    });
  });
});


router.get('/api/QnA_list', auth, function (req, res) {
  pool.getConnection(function (err, connection) {
    var sqlForSelectList = "SELECT qna_title, qna_content FROM qna ;";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : " + err);
      console.log("rows : " + JSON.stringify(rows[0]));

      res.send(rows);
      connection.release();
    });
  });
});

router.post('/api/QnA_write', auth, function (req, res) { // 미완성
  // pool.getConnection(function (err, connection) {
  //   var sqlForSelectList = "SELECT qna_title, qna_content FROM qna ;";
  //   connection.query(sqlForSelectList, function (err, rows) {
  //     if (err) console.error("err : " + err);
  //     console.log("rows : " + JSON.stringify(rows[0]));

  //     res.send(rows);
  //     connection.release();
  //   });
  // });
});

router.get('/api/notice_list', auth, function (req, res) {
  pool.getConnection(function (err, connection) {
    var sqlForSelectList = "SELECT notice_title FROM notices ;";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : " + err);
      console.log("rows : " + JSON.stringify(rows[0]));

      res.send(rows);
      connection.release();
    });
  });
});

router.get('/api/notice_list_write', auth, function (req, res) {
  var member_email = req.row.member_email;
  //var member_email = req.body.member_email;
  pool.getConnection(function (err, connection) {
    var sqlForSelectList = "SELECT admin_id FROM admins WHERE admin_email = ?;";
    connection.query(sqlForSelectList, member_email, function (err, rows) {
      if (err) console.error("err : " + err);
      if (rows == 0) {
        res.send(false);
      } else {
        res.send(true);
      }
      connection.release();
    });
  });
});

router.post('/api/notice_list_write', auth, function (req, res) {
  var member_email = req.row.member_email;
  var notice_title = req.body.notice_title;
  var notice_content = req.body.notice_content;

  pool.getConnection(function (err, connection) {
    var sqlForSelectList = "SELECT admin_id FROM admins WHERE admin_email = ?;";
    connection.query(sqlForSelectList, member_email, function (err, rows) {
      if (err) console.error("err : " + err);
      var admin_id = rows[0].admin_id;
      var datas = [notice_title, admin_id, notice_content];
      var SQL = "INSERT INTO notices(notice_title, admin_id, notice_content) VALUES (?, ?, ?);"

      connection.query(SQL, datas, function (err, rows) {
        if (err) console.error("err : " + err);
        if (rows.insertID != 0) res.send(true);
        else res.send(false);

        connection.release();
      });
    });
  });
});

router.get('/api/notice/:notice_id', auth, function (req, res) {
  var notice_id = req.params.notice_id;
  pool.getConnection(function (err, connection) {
    var sqlForSelectList = "SELECT * FROM notices WHERE notice_id = ?;";
    connection.query(sqlForSelectList, notice_id, function (err, rows) {
      if (err) console.error("err : " + err);
      console.log("rows : " + JSON.stringify(rows[0]));

      res.send(rows);
      connection.release();
    });
  });
});


router.get('/delete/:product_id', auth, function (req, res) {
  var member_email = req.row.member_email;
  console.log("member_email" + member_email);
  var product_id = req.params.product_id;
  //console.log("product_id", product_id)
  //var member_email = req.body.member_email;
  //var product_id = req.body.product_id;
  pool.getConnection(function (err, connection) {
    if (err) console.error("커넥션 객체 얻어오기 에러 : ", err);

    var sql = "SELECT product_saler FROM products WHERE product_id = ?";
    connection.query(sql, product_id, function (err, result) {
      if (err) console.error(err);
      var product_saler = result[0].product_saler;
      console.log("update에서 1개 글 조회 결과 확인 : ", product_saler);
      if (product_saler == member_email) {
        var sqlForSelectList = "DELETE FROM products WHERE product_id = ?; DELETE FROM comments WHERE comment_product_id = ?; DELETE FROM photos WHERE product_id = ?; DELETE FROM interest_products WHERE product_id = ?;";
        connection.query(sqlForSelectList, [product_id, product_id, product_id, product_id], function (err, rows) {
          if (err) console.error("err : " + err);
          res.send(product_saler == member_email);
        });
      } else {
        res.send(product_saler == member_email);
      }
      connection.release();
    });
  });
})
/////////////////////////////////////////////////////////////////////////////


module.exports = router;
