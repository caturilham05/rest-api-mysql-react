'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req, res){
    response.ok('Aplikasi REST API Berjalan', res)
};


//get data mahasiswa
exports.tampilSemuaDataMahasiswa = function(req, res){
    connection.query('select * from mahasiswa', function(error, row, fields){
        if(error){
            console.log(error);
        }else{
            response.ok(row, res)
        }
    })
}

//get data mahasiswa berdasarkan NIM
exports.tampilDataById = function(req, res){
    const nim = req.params.nim;
    connection.query('select * from mahasiswa where nim = ?', [nim],
        function(error, row, fields){
            if(error){
                console.log(error)
            }else{
                response.ok(row, res)
            }
        })
}

// post data mahasiswa
exports.postMahasiswa = function(req, res){
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('insert into mahasiswa (nim, nama, jurusan) values(?, ?, ?)',
    [nim, nama, jurusan], function(error, row, fields){
        if(error){
            console.log(error)
        }else{
            response.ok('Data Mahasiswa Berhasil Ditambahkan!',res)
        }
    })
}

//edit data mahasiswa
exports.editMahasiswa = function(req, res){
    const id = req.body.id_mahasiswa;
    const nim = req.body.nim;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;

    connection.query('update mahasiswa set nim = ?, nama = ?, jurusan = ? where id_mahasiswa = ?', [nim, nama, jurusan, id],
    function(error,row, fields){
        if(error){
            console.log(error)
        }else{
            response.ok('Data Mahasiswa Berhasil Diupdate!', res)
        }
    })
} 

// delete mahasiswa by id
exports.hapusMahasiswaById = function(req, res){
    const id = req.body.id_mahasiswa;

    connection.query('delete from mahasiswa where id_mahasiswa = ?', [id], function(error, row, fields){
        if(error){
            console.log(error)
        }else{
            response.ok('Data Mahasiswa Berhasil Dihapus!', res)
        }
    })
}

//delete semua mahasiswa
exports.hapusMahasiswa = function(req, res){
    connection.query('delete from mahasiswa', function(error, row, fields){
        if(error){
            console.log(error)
        }else{
            response.ok('Semua Data Berhasil Dihapus', res)
        }
    })
}

//insert matkul
exports.tambahMatkul = function(req, res){
    const matkul = req.body.matkul;
    const sks = req.body.sks;

    connection.query('insert into matakuliah (matkul, sks) values (?, ?)', [matkul, sks],
    function(error, row, fields){
        if(error){
            console.log(error)
        }else{
            response.ok('Data Mata Kuliah Berhasil Ditambahkan', res)
        }
    })
}

//get matkul
exports.getMatkul = function(req, res){
    connection.query('select * from matakuliah', function(err, row, fields){
        if(err){
            console.log(err)
        }else{
            response.ok(row, res)
        }
    })
}

// menampilkan join krs, matkul, mhs
exports.join = function(req, res){
    connection.query('select mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matkul, matakuliah.sks from krs join mahasiswa JOIN matakuliah where krs.id_mahasiswa = mahasiswa.id_mahasiswa AND krs.id_matkul = matakuliah.id_matkul ORDER BY mahasiswa.id_mahasiswa',
    function(err, row, fields){
        if(err){
            console.log(err)
        }else{
            response.oknested(row, res);
        }
    })
}