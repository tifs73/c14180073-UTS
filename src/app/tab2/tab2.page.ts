import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(afs : AngularFirestore) {
    this.isiDataColl = afs.collection('dataNotes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  detail(i) {
    //this.isiDataColl = this.afs.collection('posts', ref => ref.orderBy('isiurl'));
  }

}

interface data {
  judul : string,
  isi : string,
  tgl : string,
  nilai : string,
  isiurl : string
}
