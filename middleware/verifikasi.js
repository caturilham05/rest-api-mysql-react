const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(){
    return function(req, rest, next){
        var role = req.body.role;
        // cek autorisasi header
        const tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            const token = tokenWithBearer.split(' ')[1];
            // jwt verifikasi
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return rest.status(401).send({auth: false, message: "Token Tidak Valid"});
                }else{
                    if(role == 2){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({auth: false, message: "Gagal Otorisasi Role Anda"});
                    }
                }
            })
        }else{
            return rest.status(401).send({auth: false, message: "Token Tidak Tersedia"});
        }
    }
}

module.exports = verifikasi;