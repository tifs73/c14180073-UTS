import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FotoService } from '../services/foto.service';

export interface filefoto {
  name : string; //di isi filepath
  path : string //di isi webview path
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  urlimagestorage : string[] = [];

  constructor(afs : AngularFirestore, private afStorage : AngularFireStorage,
    public FotoService:FotoService) {
    this.isiDataColl = afs.collection('dataNotes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  async ionViewDidEnter() {
    await this.FotoService.loadfoto();
    this.tampilkandata();
  }

  tampilkandata() {
    this.urlimagestorage=[]; //kosongkan semua tampungan url
    var refimage = this.afStorage.storage.ref('storageimg');
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

export interface tampilfoto {
  urlimage : string;
  filepath : string;
}

interface data {
  judul : string,
  isi : string,
  tgl : string,
  nilai : string,
  isiurl : string
}
