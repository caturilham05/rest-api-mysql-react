'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/').get(jsonku.index);

    app.route('/tampil').get(jsonku.tampilSemuaDataMahasiswa);

    app.route('/tampil/:nim').get(jsonku.tampilDataById);

    app.route('/posts').post(jsonku.postMahasiswa);

    app.route('/edit').put(jsonku.editMahasiswa);

    app.route('/delete').delete(jsonku.hapusMahasiswaById);

    app.route('/delete-all').delete(jsonku.hapusMahasiswa);

    // --------------------------------------------------------
    // routing untuk matakuliah
    app.route('/tambah-matkul').post(jsonku.tambahMatkul);

    app.route('/tampil-matkul').get(jsonku.getMatkul);

    // ---------------------------------------------------------
    // routing join krs, matkul, mahasiswa
    app.route('/krs-mahasiswa').get(jsonku.join);
}