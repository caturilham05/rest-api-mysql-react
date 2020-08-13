const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('MD5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

//controller untuk pendaftaran user
exports.registrasi = function(req, res){
    const post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }
    const query = "select email from ?? where ??";
    const table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function(error, row){
        if(error){
            console.log(error)
        }else{
            if(row.length == 0){
                const query = "insert into ?? set ?";
                const table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(err, row){
                    if(err){
                        console.log(err)
                    }else{
                        response.ok("Berhasil Menambahkan User Baru!", res)
                    }
                })
            }else{
                response.ok("Email Sudah Terdaftar")
            }
        }
    })
}