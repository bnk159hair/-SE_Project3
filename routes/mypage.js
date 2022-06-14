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

                res.send(rows);
                connection.release();
            });
        });
    }
    catch(e){
        throw e;
    }
});

router.get('/info/:product_id', /*auth,*/ function(req, res){ // 특정 판매상품 구매페이지 - 테스트 완료
    var product_id = req.body.product_id; //승건 참고
    var member_id = req.body.member_id;
    try {
        pool.getConnection(function(err, connection){
            var sqlForSelectList = "SELECT * FROM products WHERE product_id = ? ;" // 상품 정보 가져오기
            connection.query(sqlForSelectList, req.body.product_id, function(err, rows){ // rows에 상품 정보 담김
                if(err) console.error("err : "+err);
                console.log("rows : "+JSON.stringify(rows));
                datas = [member_id, product_id];
                var checkzzim = "SELECT interest_id FROM interest_products WHERE member_id = ? AND product_id = ?;" // 해당 상품을 고객이 찜했는지
                connection.query(checkzzim, datas, function(err, zzim_res){
                    if(err) console.error("err : "+err);
                    console.log("rows : "+JSON.stringify(zzim_res));
                    if(zzim_res.length == 0){
                        console.log("Noop");
                    }
                    res.send(rows, zzim_res); // 두개 반환
                    connection.release();
                });
            });
        });
    }
    catch(e){
        throw e;
    }
});

router.post('/info/:product_id', /*auth,*/ function(req, res){ // 찜버튼 눌렀을때 동적으로 반응
    var product_id = req.body.product_id; //승건 참고
    var member_id = req.body.member_id;
    var zzim_num = req.body.zzim_num; //찜개수 승건이가 넘겨줘야함

    pool.getConnection(function(err, connection){
        datas = [member_id, product_id];
        var checkzzim = "SELECT interest_id FROM interest_products WHERE member_id = ? AND product_id = ?;" // 해당 상품을 고객이 찜했는지
        connection.query(checkzzim, datas, function(err, zzim_res){
            if(err) console.error("err : "+err);
            if(zzim_res.length == 0){ //찜을 안한상태일때
                zzim_num = parseInt(zzim_num)+1;
                var updatezzim = 
                "UPDATE products SET product_interest = ? WHERE product_id = ? ; INSERT INTO interest_products(product_id, member_id) VALUES (?, ?); SELECT product_interest FROM products WHERE product_id = ?" // 해당 상품을 고객이 찜했는지
                add_zzim = [zzim_num, product_id, product_id, member_id, product_id];
                connection.query(updatezzim, add_zzim, function(err, zzim_res){
                    if(err) console.error("err : "+err);
                    console.log("rows : "+JSON.stringify(zzim_res[2]));
                    res.send(zzim_res); // 두개 반환
                    
                });
            }else{
                console.log("Delete zzim");
                zzim_num = parseInt(zzim_num)-1;
                var updatezzim = 
                "UPDATE products SET product_interest = ? WHERE product_id = ? ; DELETE FROM interest_products WHERE member_id = ? AND product_id = ? ; SELECT product_interest FROM products WHERE product_id = ?" // 해당 상품을 고객이 찜했는지
                add_zzim = [zzim_num, product_id, member_id, product_id, product_id];
                connection.query(updatezzim, add_zzim, function(err, zzim_res){
                    if(err) console.error("err : "+err);
                    console.log("rows : "+JSON.stringify(zzim_res[2]));
                    res.send(zzim_res);
                });
            };
            connection.release();

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

                res.send(rows);
                connection.release();
            });
        });
    }
    catch(e){
        throw e;
    }
})


router.get('/sellwrite', auth, function(req, res, next){ //물건 판매하기 사이트 불러오기
    var member_id = req.body.member_id;

    res.send();
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
                 product_image.push([insertID, req.files[i].filename]);
            };
            // for(let i =0; i<filename.length; i++){
            //     product_image.push([insertID, filename[i]]);
            // }
            var sqlForPhoto = "INSERT INTO photos (product_id, photo_data) VALUES ?";
            connection.query(sqlForPhoto, [product_image], function(err, result){
                if(err) console.error("err : "+err);
                console.log("insert ID : "+JSON.stringify(result.insertId));
                
                res.send('Success');
                connection.release();
            });
        });
    });
});

// router.get('/sellupdate', auth, function(req, res, next){ //물건 판매하기 사이트 불러오기
//     var idx = req.query.idx;

//     res.render('selwrite', {title: "물건 판매글 등록"});
// });

// router.post('/sellupdate', upload.array('img'), function(req,res){ //데이터 업로드
//     var product_title = req.body.product_title;
//     var product_saler = req.body.product_saler;
//     var product_price = req.body.product_price;
//     var product_interest = 0;
//     var product_state = 0; //판매중: 0
//     var product_content = req.body.product_content;
//     var product_image = new Array();
//     //var filename = ['a.jpg', 'b.jpg', 'c.jpg'];// for Test
    
//     pool.getConnection(function(err, connection){
//         var sqlForSelectList = "INSERT INTO products(product_title, product_saler, product_price, product_interest, product_state, product_content) VALUES (?, ?, ?, ?, ?, ?);"
//         datas = [product_title, product_saler, product_price, product_interest, product_state, product_content];
//         connection.query(sqlForSelectList, datas, function(err, result){
//             if(err) console.error("err : "+err);
//             console.log("insert ID : "+JSON.stringify(result.insertId));
//             insertID = result.insertId;
//             for(let i =0; i<req.files.length; i++){
//                  product_image.push([insertID, req.files[i].filename]);
//             };
//             // for(let i =0; i<filename.length; i++){
//             //     product_image.push([insertID, filename[i]]);
//             // }
//             var sqlForPhoto = "INSERT INTO photos (product_id, photo_data) VALUES ?";
//             connection.query(sqlForPhoto, [product_image], function(err, result){
//                 if(err) console.error("err : "+err);
//                 console.log("insert ID : "+JSON.stringify(result.insertId));
                
//                 res.render('sellwrite', {title: "물건 판매글 등록"});
//                 connection.release();
//             });
//         });
//     });
// });


module.exports = router;
