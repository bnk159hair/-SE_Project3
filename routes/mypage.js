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
const {auth} = require("../middleware/auth");
const app = require('../app');

//사진
const multer = require('multer');
//const upload = multer({ dest: 'public/'});
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null,'public/');
        },
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    }),
});


router.get('/member_selling', auth, function(req, res){ // 개인판매상품 목록 - 테스트 완료
    try {
        pool.getConnection(function(err, connection){
            var sqlForSelectList = "SELECT * FROM products WHERE product_saler = ? ;";
            connection.query(sqlForSelectList, req.body.product_saler, function(err, rows){
                if(err) console.error("err : "+err);
                console.log("rows : "+JSON.stringify(rows[0]));

                res.render('승건이 사이트', {title: '판매목록', rows:rows});
                connection.release();
            });
        });
    }
    catch(e){
        throw e;
    }
});

router.get('/info/:idx', auth, function(req, res){ // 특정 판매상품 구매페이지 - 테스트 완료
    var idx = req.body.product_id; //승건 참고
    try {
        pool.getConnection(function(err, connection){
            var sqlForSelectList = "SELECT * FROM products WHERE product_id = ? "
            connection.query(sqlForSelectList, req.body.product_id, function(err, rows){
                if(err) console.error("err : "+err);
                console.log("rows : "+JSON.stringify(rows));

                res.render('승건이 사이트', {title: '판매목록', rows:rows});
                connection.release();
            });
        });
    }
    catch(e){
        throw e;
    }
});

router.get('/sellwrite', auth, function(req, res, next){ //물건 판매하기 사이트 불러오기
    var member_id = req.body.member_id;

    res.render('selwrite', {title: "물건 판매글 등록"});
});

router.post('/sellwrite', upload.array('img'), function(req,res){ //데이터 업로드
    var product_title = req.body.product_title;
    var product_saler = req.body.product_saler;
    var product_price = req.body.product_price;
    var product_interest = 0;
    var product_state = 0; //판매중: 0
    var product_content = req.body.product_content;
    var product_image = new Array();
    //var filename = ['a.jpg', 'b.jpg', 'c.jpg'];// for Test
    
    pool.getConnection(function(err, connection){
        var sqlForSelectList = "INSERT INTO products(product_title, product_saler, product_price, product_interest, product_state, product_content) VALUES (?, ?, ?, ?, ?, ?);"
        datas = [product_title, product_saler, product_price, product_interest, product_state, product_content];
        connection.query(sqlForSelectList, datas, function(err, result){
            if(err) console.error("err : "+err);
            console.log("insert ID : "+JSON.stringify(result.insertId));
            insertID = result.insertId;
            for(let i =0; i<req.files.length; i++){
            //     product_image.push([insertID, req.files[i].filename]);
            };
            // for(let i =0; i<filename.length; i++){
            //     product_image.push([insertID, filename[i]]);
            // }
            var sqlForPhoto = "INSERT INTO photos (product_id, photo_data) VALUES ?";
            connection.query(sqlForPhoto, [product_image], function(err, result){
                if(err) console.error("err : "+err);
                console.log("insert ID : "+JSON.stringify(result.insertId));
                
                res.render('sellwrite', {title: "물건 판매글 등록"});
                connection.release();
            });
        });
    });
});

router.get('/zzim', auth, function(req, res){ // 찜기능 테스트 완료
    console.log(req.body.member_id);
    try {
        pool.getConnection(function(err, connection){
            var sqlForSelectList = "SELECT product_id FROM interest_products WHERE member_id = ?"
            connection.query(sqlForSelectList, req.body.member_id, function(err, rows){
                if(err) console.error("err : "+err);
                console.log("rows : "+JSON.stringify(rows));

                res.render('승건이 사이트', {title: '찜목록', rows:rows});
                connection.release();
            });
        });
    }
    catch(e){
        throw e;
    }
})

// router.post('/api/users/auth', auth, function(req,res){
//     console.log('auth given req.rows: ' + JSON.stringify(req.row))
//     //auth middle ware를 통과했다는 얘기는 authentication이 성공적으로 되었다는 말
//     return res.status(200).json({
//       member_id: req.row.member_id,
//       member_email: req.row.member_email
//     });
//   });
  

// router.get('/')



// /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Express' });
// // });

// router.get('/', (req, res) => {
//   res.send({test: "hi"});
// })

// router.get('/register', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



// router.post('/api/users/register', function(req, res, next){
//   console.log(req.body)

//   var member_email = req.body.member_email;
//   var member_password = req.body.member_password;
//   var member_address = req.body.member_address
//   var deal_count = 0
//   var member_score = 0
//   var member_interest = req.body.member_interest

//   // 비밀 번호 암호화
//   bcrypt.genSalt(saltRounds, function(err, salt){
//     if(err) console.error("bcrypt err: "+err);
//     bcrypt.hash(member_password, salt, function(err, hash){
//       if(err) console.error("bcrypt err: "+err);
//       member_password = hash
//       var datas = [member_email, member_password, member_address, deal_count, member_score, member_interest]

//       pool.getConnection(function(err, connection){
//         var sqlForInsertMember = "INSERT INTO members(member_email, member_password, member_address, deal_count, member_score, member_interest) values(?, ?, ?, ?, ?, ?)"
//           connection.query(sqlForInsertMember, datas, function(err,rows){
//             if(err) console.error("err: "+err);
//             console.log("rows : "+JSON.stringify(rows));
//             res.redirect('/') //-> board로 redirect
//             connection.release();
          
//           /*
//           return res.status(200).json({
//             sucess: true
//           })
//           */
//           });
//       });
//     });
//   });
// });

// router.post('/api/users/login', function(req, res){
//   var member_email= req.body.member_email
//   var member_password = req.body.member_password
  
//   pool.getConnection(function(err, connection){
//     var sqlForSelectMember = "SELECT * FROM members where member_email = ? "
//     connection.query(sqlForSelectMember, member_email, function(err,rows){
//       //요청된 이메일을 데이터베이스에서 있는지 찾는다.
//       if(err) console.error("err: "+err);
//       console.log("rows : "+JSON.stringify(rows));
//       // rows가 어떤 값을 갖는지 보기
//       // 없다면
//       console.log(rows.length)
//       if(rows.length === 0){
//         return res.json({
//           loginSucess: false,
//           message: "제공된 이메일에 해당하는 유저가 없습니다."
//         })
//       }
//       console.log(rows[0].member_password)
//       //있다면
//       //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
//       bcrypt.compare(member_password, rows[0].member_password, function(err, isMatch){
//         if(err) console.error("login_bcrpyt_compare_eror: "+err);
//         if(!isMatch)
//         return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."});
//         //비밀번호 까지 맞다면 토큰을 생성하기.
//         //jsonwebtoken을 이용해서 token생성
//         var token = jwt.sign(rows[0].member_id, 'secretToken')
//         var data = [token, member_email]
//         var sqlForUpdateMember = "Update members SET token=? WHERE member_email=?"
//         connection.query(sqlForUpdateMember, data, function(err, result){
//           // 토큰 저장-> 쿠키 
//           if(err) console.error("login_token_update_err: ", err);
//           res.cookie("x_auth",token).status(200).json({loginSuccess: true, userId: token})
//         });
//       });
      
//       //return res.status(200).json({
//       //  sucess: true
//       //}); 

//       //res.redirect('/') //-> board로 redirect
//       //connection.release();
//     });
//   });
// });

// router.post('/api/users/auth', auth, function(req,res){
//   console.log('auth given req.rows: ' + JSON.stringify(req.row))
//   //auth middle ware를 통과했다는 얘기는 authentication이 성공적으로 되었다는 말
//   return res.status(200).json({
//     member_id: req.row.member_id,
//     member_email: req.row.member_email
//   });
// });

// router.get('/api/users/logout', auth, function(req, res){
//   console.log('auth given req.rows: ' + JSON.stringify(req.row));
//   pool.getConnection(function(err, connection){
//     var data = ["",req.row.member_id]
//     var sqlForSelectMember = "Update members SET token=? where member_id=?"
//     connection.query(sqlForSelectMember, data, function(err,rows){
//       if(err) console.error("err: "+err);
//       return res.status(200).send({
//         success: true
//       });
//     });
//   });
// });

module.exports = router;
