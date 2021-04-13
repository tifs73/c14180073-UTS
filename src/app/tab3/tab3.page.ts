import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(afs : AngularFirestore) {
    this.isiDataColl = afs.collection('dataNotes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  

}

interface data {
  judul : string,
  isi : string,
  tgl : string,
  nilai : string,
  isiurl : string
}
