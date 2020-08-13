const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('MD5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

//controller untuk pendaftaran user
exports.registrasi = function(req, res){
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }
    var query = "select email from ?? where ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function(error, row, fields){
        if(error){
            console.log(error)
        }else{
            if(row.length == 0){
                var query = "insert into ?? set ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(err, row){
                    if(err){
                        console.log(err)
                    }else{
                        response.ok("Berhasil Menambahkan User Baru!", res)
                    }
                })
            }else{
                response.ok("Email Sudah Terdaftar", res)
            }
        }
    })
}

// controller untuk login
exports.login = function(req, res){
    const post = {
        email: req.body.email,
        password: req.body.password
    }

    var query = "select * from ?? where ?? = ? and ?? = ?";
    var table = ["user",  "email", post.email, "password", md5(post.password)];

    query = mysql.format(query, table);
    connection.query(query, function(err, row, fields){
        if(err){
            console.log(err)
        }else{
            if(row.length == 1){
                var token = jwt.sign({row}, config.secret, {
                    expiresIn: 1440
                })
                id_user = row[0].id;
                
                var data = {
                    id_user: id_user,
                    akses_token: token,
                    ip_address: ip.address() 
                }
                var query = "insert into ?? set ?";
                var table = ["akses_token"];
    
                query = mysql.format(query, table);
                connection.query(query, data, function(err, row, fields){
                    if(err){
                        console.log(err)
                    }else{
                        res.json({
                            success: true,
                            message: 'token_JWT Generated!',
                            token: token,
                            currUser: data.id_user
                        })
                    }
                })
            }else{
                res.json({
                            "Error": true,
                            "Message": "Email Atau Password Salah!"
                        });
            }
        }
    })
} 