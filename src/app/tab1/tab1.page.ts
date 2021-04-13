import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;
  Judul : string;
  Isi : string;
  Tgl : string;
  Nilai : string;
  urlsave : string;

  urlimagestorage : photo[] = [];
  constructor(private afStorage : AngularFireStorage,
    public FotoService:FotoService, afs : AngularFirestore) {
      this.isiDataColl = afs.collection('dataNotes');
      this.isiData = this.isiDataColl.valueChanges();
    }

  async ngOnInit() {
    await this.FotoService.loadfoto();
  }

  tambahfoto() {
    this.FotoService.tambahfoto();
  }

  upload() {
    this.urlimagestorage=[];
    console.log(this.Judul);
    console.log(this.Isi);
    for (var index in this.FotoService.datafoto) {
    const imgfilepath = `storageimg/${this.FotoService.datafoto[index].filepath}`;
    this.afStorage.upload(imgfilepath, this.FotoService.datafoto[index].dataimage).then(() => {
      this.afStorage.storage.ref().child(imgfilepath).getDownloadURL().then((url) => { 
        this.urlimagestorage.unshift(url);
        alert("Upload foto berhasil");
        this.urlsave = url;
        this.isiDataColl.doc(this.Judul).set({
          judul : this.Judul,
          isi : this.Isi,
          tgl : this.Tgl,
          nilai : this.Nilai,
          isiurl : this.urlsave
        })
        
        alert("Data sudah tersimpan");
      });
    });
    console.log(this.urlsave);
    }
  }
  
}

export interface photo {
  filepath : string; //sebagai folder/alamatnya
  webviewpath : string; //file name
  dataimage : File;
  statusfoto : boolean
}

interface data {
  judul : string,
  isi : string,
  tgl : string,
  nilai : string,
  isiurl : string
}
