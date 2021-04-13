import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  urlimagestorage : string[] = [];

  constructor(afs : AngularFirestore, private afStorage : AngularFireStorage,
    public fotoservice : FotoService,
    public navCtrl: NavController) {
    this.isiDataColl = afs.collection('dataNotes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  hapusdata() {
    //this.isiDataColl.doc(this.Judul).delete;
  }

  hapusfoto() {
    var refimage = this.afStorage.storage.ref('imgstorage');
    refimage.listAll()
    .then((res) => {
      res.items.forEach((itemref) => {
        itemref.delete().then(() => {
          //menampilkan data
          this.tampilkandata();
        });
      });
    }).catch((error) => { //utk menampilkan error
      console.log(error);
    });

  }

  tampilkandata() {
    this.urlimagestorage=[]; //kosongkan semua tampungan url
    var refimage = this.afStorage.storage.ref('imgstorage');
    refimage.listAll()
    .then((res) => {
      res.items.forEach((itemref) => {
        itemref.getDownloadURL().then(url => {
          this.urlimagestorage.unshift(url);
        })
      });
    }).catch((error) => { //utk menampilkan error
      console.log(error);
    });
  }

}

interface data {
  judul : string,
  isi : string,
  tgl : string,
  nilai : string,
  isiurl : string
}
