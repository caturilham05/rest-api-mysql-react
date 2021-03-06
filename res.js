'use strict';

exports.ok = function(values, res){
    var data = {
        'status' : 200,
        'values' : values,
    };

    res.json(data);
    res.end;
}

// response nested matkuliah
// select mahasiswa.*, matkuliah.matkul, matkuliah.sks from krs join mahasiswa JOIN matkuliah where krs.id_mahasiswa = mahasiswa.id_mahasiswa AND krs.id_matkul = matkuliah.id_matkul ORDER BY mahasiswa.id_mahasiswa 

exports.oknested = function(nilai, res){
    const hasil = nilai.reduce((akumulasikan, item) =>{
        if(akumulasikan[item.nama]){
            const group = akumulasikan[item.nama];
            if(Array.isArray(group.matkul)){
                group.matkul.push(item.matkul);
            }else{
                group.matkul = [group.matkul, item.matkul];
            }
            if(Array.isArray(group.sks)){
                group.sks.push(item.sks);
            }else{
                group.sks = [group.sks, item.sks];
            }
        }else{
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});
    var data = {
        'status' : 200,
        'values' : hasil
    };

    res.json(data);
    res.end;
}